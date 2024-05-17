import { useNavigate } from "react-router-dom";
import FullTable from "../../Table/FullTable";
import "./ReservationsPage.css";

export default function ReservationsPage() {
  const mockData = [
    {
      bookingInformation: {
        id: 1,
        booking_typeid: 1,
        user_id: 1,
        people_amount: 3,
        reservation_time: new Date("22-04-2024"),
        booking_type: "Bowling Lane",
      },
      // If it is a bowling lane, it will have is_child_friendly boolean.
      bookingType: {
        is_child_friendly: false,
        id: 1,
      },
      user: {
        id: 1,
        date_created: new Date("11.01.2023"),
        date_edited: new Date("14.03.2024"),
        date_last_login: new Date("18.04.2024"),
        email: "mockemailaddress@mail.com",
        name: "James Johnson McAdams",
        roles: ["admin", "user", "reservation-staff"],
      },
    },
    {
      bookingInformation: {
        id: 2,
        booking_typeid: 2,
        user_id: 2,
        people_amount: 6,
        reservation_time: new Date("21.03.2024"),
        booking_type: "Air Hockey Table",
      },
      // If it is a bowling lane, it will have is_child_friendly boolean.
      bookingType: {
        id: 1,
      },
      user: {
        id: 2,
        date_created: new Date("11.01.2023"),
        date_edited: new Date("14.03.2024"),
        date_last_login: new Date("18.04.2024"),
        email: "acoolemail@email.com",
        name: "Sarah Jessica Adams",
        roles: ["admin", "user", "reservation-staff"],
      },
    },
  ];

  // const fetchUsers = () => {
  //   getUsers()
  //     .then((res) => setUsers(res))
  //     .catch(() => setError("Error fetching users, is the server running?"));
  // };

  const navigate = useNavigate();

  const handleClick = (v: { id: 2; name: "Sarah Jessica Adams" }) => {
    // navigate("/" + v.id);
    console.log(v);
  };

  return (
    <div id="reservations-page-container">
      <h1>Reservations Page</h1>
      <FullTable
        schema={[
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
            header: "Id",
            accessorKey: "id",
            type: "number",
            searchByValue: true,
          },
          {
            header: "People Amount",
            accessorKey: "peopleAmount",
            type: "number",
            searchByValue: false,
          },
          {
            header: "Fun Number ",
            accessorKey: "funNumber",
            type: "number",
            searchByValue: false,
          },
        ]}
        onClick={(v) => handleClick(v)}
        data={mockData.map((item) => ({
          ...item.user,
          peopleAmount: item.bookingInformation.people_amount,
          funNumber: Math.random(),
        }))}
      />
    </div>
  );
}
