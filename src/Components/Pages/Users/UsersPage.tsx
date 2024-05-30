import { useEffect, useState } from "react";
import FullTable from "../../Table/FullTable";
import "./UsersPage.css";
import { getUsers } from "../../../Services/apiFacade";
import { User, APIUser } from "../../../Types";
import { parseISO } from "date-fns";

// const mockData = [
//   {
//     id: 1,
//     date_created: new Date("11/01/2023"),
//     date_edited: new Date("03/03/2024"),
//     date_last_login: new Date("18.04.2024"),
//     email: "mockemailaddress@mail.com",
//     username: "James Johnson McAdams",
//     roles: ["admin", "user", "reservation-staff"],
//   },
// ];

export default function ReservationsPage() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [error, setError] = useState<string | null>(null);

  // Maps APIUser into User object
  function mapApiUserToUser(apiUser: APIUser): User {
    return {
      id: Number(apiUser.id),
      username: apiUser.username,
      email: apiUser.email,
      roles: apiUser.roles,
      created: parseISO(apiUser.created),
      edited: apiUser.edited ? parseISO(apiUser.edited) : undefined,
    };
  }

  useEffect(() => {
    getUsers()
      .then((data: APIUser[]) => {
        const formattedUsers = data.map(mapApiUserToUser); // Map each APIUser to a User instead
        setUsers(formattedUsers);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
  }, [users]);

  return (
    <div id="users-page-container">
      <h1>Users</h1>
      <FullTable
        schema={[
          {
            header: "ID",
            accessorKey: "id",
            type: "number",
            searchByValue: true,
          },
          {
            header: "Username",
            accessorKey: "username",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Email",
            accessorKey: "email",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Roles",
            accessorKey: "roles",
            type: "array",
            searchByValue: true,
          },
          {
            header: "Last Edit",
            accessorKey: "edited",
            type: "date",
            searchByValue: false,
          },
          {
            header: "Date Created",
            accessorKey: "created",
            type: "date",
            searchByValue: false,
          },
        ]}
        roleFilter={true}
        data={users.map((item) => ({
          ...item,
          id: item.id,
        }))}
        createButton={true}
        clickableItems={true}
        error={error || ""}
      />
    </div>
  );
}
