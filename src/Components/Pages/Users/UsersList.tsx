import "../styling/adminuserstable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../../Services/apiFacade";
import { Button } from "@mui/material";
import UserListDialog from "./UsersListDialog";
import AdminUsersListAddUser from "./UsersListAddUser";
import "../styling/adminuserstable.css";

export default function AdminUsersList() {
  // Fetch data
  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res))
      .catch(() => setError("Error fetching users, is the server running?"));
  }, []);

  // Interfaces
  interface APIUser {
    username: string;
    email: string;
    roles: Array<Role>;
    created: Date | string;
    edited: Date | string;
    [key: string]: unknown; // Add index signature with type 'unknown'
  }

  interface Role {
    roleName: string;
  }

  // State
  const [users, setUsers] = useState<Array<APIUser>>([]);
  const [error, setError] = useState("");

  // Filtering the users list
  const [roleFilter, setRoleFilter] = useState("all");
  const [clickCount, setClickCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Edit dialog
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<APIUser | null>(null);

  // Filtering the users list
  const handleRoleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRoleFilter(event.target.value);
  };

  const fetchUsers = () => {
    getUsers()
      .then((res) => setUsers(res))
      .catch(() => setError("Error fetching users, is the server running?"));
  };

  const filteredUsers = users
    .filter(
      // Filter by role
      (user) =>
        roleFilter === "all" ||
        user.roles.some((role) => role.roleName === roleFilter)
    )
    .filter((user) =>
      Object.values(user).some(
        // Filter by search term
        (value) =>
          (typeof value === "string" || typeof value === "number") &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  // Sorting the users list
  const handleHeaderClick = (field: string) => {
    if (sortField === field) {
      if (clickCount === 2) {
        // If the field has been clicked three times in a row, remove sorting
        setSortField(null);
        setClickCount(0);
      } else {
        // If the field has been clicked twice in a row, reverse the direction
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        setClickCount(clickCount + 1);
      }
    } else {
      // If a new field is clicked, sort by that field in ascending order
      setSortField(field);
      setSortDirection("asc");
      setClickCount(1);
    }
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;

    if ((a[sortField] as string) < (b[sortField] as string))
      return sortDirection === "asc" ? -1 : 1;
    if ((a[sortField] as string) > (b[sortField] as string))
      return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle edit user button
  const handleEditClick = (user: APIUser) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleSave = () => {
    setEditingUser(null);
    setOpen(false);
  };

  const handleAddSave = () => {
    setAddOpen(false);
    //wait 1 second before fetching the users again
    setTimeout(() => {
      getUsers()
        .then((res) => setUsers(res))
        .catch(() => setError("Error fetching users, is the server running?"));
    }, 1000);
  };

  // Search in the users list
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Pagination
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(event.currentTarget.id));
  };

  // Delete and edit buttons
  const handleDeleteClick = async (username: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await deleteUser(username);
        // Remove the user from the local state
        setUsers(users.filter((user) => user.username !== username));
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleAddUserClick = () => {
    setEditingUser({
      username: "",
      email: "",
      roles: [],
      created: new Date(),
      edited: new Date(),
    });
    setAddOpen(true);
  };

  // Displaying the users list

  const userListItems = currentUsers.map((user, index) => (
    <tr key={index}>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        {(user.roles as unknown as { roleName: string }[])
          .map((role) => role.roleName)
          .join(", ")}
      </td>
      <td>{new Date(user.created).toLocaleString("da-DK")}</td>
      <td>{new Date(user.edited).toLocaleString("da-DK")}</td>
      <td className="list-button">
        <Button onClick={() => handleEditClick(user)}>
          <EditIcon />
        </Button>
      </td>
      <td className="list-button">
        <Button color="error" onClick={() => handleDeleteClick(user.username)}>
          <DeleteIcon />
        </Button>
      </td>
    </tr>
  ));

  return (
    <div id="admin-users-table-container">
      <div id="admin-users-table-header">
        <label htmlFor="admin-users-search">Søg:</label>
        <input
          type="text"
          id="admin-users-search"
          placeholder="Search users"
          onChange={handleSearchChange}
        />
        <label htmlFor="admin-users-role-filter">Rolle:</label>
        <select
          name="role"
          id="admin-users-role-filter"
          value={roleFilter}
          onChange={handleRoleFilterChange}
        >
          <option value="all">Alle</option>
          <option value="ADMIN">Administrator</option>
          <option value="STAFF">Personale</option>
          <option value="USER">Bruger</option>
        </select>
        <button id="admin-users-add-user" onClick={handleAddUserClick}>
          Tilføj Bruger
        </button>
      </div>
      <table id="admin-users-table">
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick("username")}>
              Brugernavn
              {sortField === "username" &&
                (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
            <th onClick={() => handleHeaderClick("email")}>
              E-mail adresse
              {sortField === "email" && (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
            <th onClick={() => handleHeaderClick("roles")}>
              Roller
              {sortField === "roles" && (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
            <th onClick={() => handleHeaderClick("created")}>
              Oprettet
              {sortField === "created" &&
                (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
            <th onClick={() => handleHeaderClick("edited")}>
              Redigeret sidst
              {sortField === "edited" &&
                (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
            <th id="users-table-edit-header">Redigér</th>
            <th id="users-table-delete-header">Slet</th>
          </tr>
        </thead>
        <tbody>
          {userListItems}
          {error && <p>{error}</p>}
        </tbody>
      </table>
      <div>
        {sortedUsers.length > usersPerPage &&
          pageNumbers.map((number) => (
            <button
              key={number}
              id={number.toString()}
              onClick={handlePageClick}
              className="pageButton"
            >
              {number}
            </button>
          ))}
      </div>
      <UserListDialog
        open={open}
        onSave={handleSave}
        user={editingUser as APIUser} // Fix: Ensure that the user prop is of type APIUser
        setUsers={setUsers}
        onClose={() => setOpen(false)}
      />
      <AdminUsersListAddUser
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAddSave}
        onUserAdded={fetchUsers}
      />
    </div>
  );
}
