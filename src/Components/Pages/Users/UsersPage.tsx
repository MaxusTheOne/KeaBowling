import FullTable from "../../Table/FullTable";
import "./UsersPage.css";

const mockData = [
  {
    id: 1,
    date_created: new Date("11/01/2023"),
    date_edited: new Date("03/03/2024"),
    date_last_login: new Date("18.04.2024"),
    email: "mockemailaddress@mail.com",
    name: "James Johnson McAdams",
    roles: ["admin", "user", "reservation-staff"],
  },
];

export default function ReservationsPage() {
  return (
    <div id="users-page-container">
      <h1>Users Page</h1>
      <FullTable
        schema={[
          {
            header: "Id",
            accessorKey: "id",
            type: "number",
            searchByValue: true,
          },
          {
            header: "Name",
            accessorKey: "name",
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
            type: "string",
            searchByValue: true,
          },
          {
            header: "Last Login",
            accessorKey: "date_last_login",
            type: "date",
            searchByValue: false,
          },
          {
            header: "Last Edit",
            accessorKey: "date_edited",
            type: "date",
            searchByValue: false,
          },
          {
            header: "Date Created",
            accessorKey: "date_created",
            type: "date",
            searchByValue: false,
          },
        ]}
        roleFilter={true}
        data={mockData.map((item) => ({
          ...item,
          id: item.id,
        }))}
      />
    </div>
  );
}
