import "./FullTable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../Services/apiFacade";
import { Button } from "@mui/material";
import FullTableAddDialog from "./FullTableAddDialog";
import FullTableDialog from "./FullTableDialog";
import { reservation, user} from "../../Types"
import ReservationsTableItem from "./TableRenderers/ReservationsTableItem";

// PROPS
export interface Props<T> {
  data: T[];
}



// DATA -> FullTable -> Generic Objects array -> 

const FullTable = <T extends object> ({
  data,
}: Props<T>) => {
  // Interfaces



  // State
  const [dataItems, setDataItems] = useState(data);
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
  const [editingUser, setEditingUser] = useState<user | null>(null);

  // Filtering the users list
  const handleRoleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRoleFilter(event.target.value);
  };

  const filteredData = dataItems.filter((filterItem) =>
    Object.values(filterItem).some(
      // Filter by search term
      (value) =>
        (typeof value === "string" || typeof value === "number") &&
        searchByValues
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
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

  const sortedData = [...filteredData].sort(() => {
    if (!sortField) return 0;

    // if ((a[sortField] as string) < (b[sortField] as string))
    //   return sortDirection === "asc" ? -1 : 1;
    // if ((a[sortField] as string) > (b[sortField] as string))
    //   return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle edit user button
  const handleEditClick = (object: user) => {
    setEditingUser(object);
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
        .then((res) => setDataItems(res))
        .catch(() => setError("Error fetching users, is the server running?"));
    }, 1000);
  };

  // Search in the users list
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Pagination
  const currentData = sortedData.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedData.length / usersPerPage); i++) {
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
        setDataItems(
          dataItems.filter((item) => item.userData?.username !== username)
        );
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleAddUserClick = () => {
    const _user: user = {
      id: 0,
      name: "",
      username: "",
      email: "",
      roles: [],
      date_created: new Date(),
      date_edited: new Date(),
    };

    setEditingUser(_user);
    setAddOpen(true);
  };



  return (
    {
      dataType = "Reservations" && data.map((reservation, i) => {
        <ReservationsTable  reservation={reservation as reservation} index={i} handleEditClicked={handleEditClick} handleDeleteClicked={handleDeleteClick}/>
      });
    } 


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
        {sortedData.length > usersPerPage &&
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
      <FullTableAddDialog
        open={open}
        onSave={handleSave}
        user={editingUser as APIUser} // Fix: Ensure that the user prop is of type APIUser
        setUsers={setDataItems}
        onClose={() => setOpen(false)}
      />
      <FullTableDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAddSave}
        onUserAdded={fetchUsers}
      />
    </div>
  );
};

export default FullTable;
