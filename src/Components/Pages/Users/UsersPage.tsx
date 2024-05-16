import FullTable from "../../Table/FullTable";
import "./UsersPage.css";

const mockData = {
  id: 1,
  date_created: new Date("11.01.2023"),
  date_edited: new Date("14.03.2024"),
  date_last_login: new Date("18.04.2024"),
  email: "mockemailaddress@mail.com",
  name: "James Johnson McAdams",
  roles: ["admin", "user", "reservation-staff"],
};

export default function ReservationsPage() {
  return (
    <div id="users-page-container">
      <h1>Users Page</h1>
      <FullTable />
    </div>
  );
}
