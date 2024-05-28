import { Link } from "react-router-dom";
import FullTable from "../../Table/FullTable";
import "./MyPage.css";

export default function MyPage() {
  const rolesString = localStorage
    .getItem("roles")
    ?.replace(/[[\]"]+/g, "")
    .replace(",", ", ");

  const mockData = [
    {
      bookingInformation: {
        id: 1,
        booking_typeid: 1,
        user_id: 1,
        people_amount: 3,
        reservation_time: new Date("02/04/2024"),
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
        roles: ["ADMIN", "USER", "RESERVATION-STAFF"],
      },
    },
    {
      bookingInformation: {
        id: 2,
        booking_typeid: 2,
        user_id: 2,
        people_amount: 6,
        reservation_time: new Date("01/11/2023"),
        booking_type: "Air Hockey Table",
      },
      // If it is a bowling lane, it will have is_child_friendly boolean.
      bookingType: {
        id: 1,
      },
      user: {
        id: 2,
        date_created: new Date("01/11/2023"),
        date_edited: new Date("14.03.2024"),
        date_last_login: new Date("18.04.2024"),
        email: "acoolemail@email.com",
        name: "Sarah Jessica Adams",
        roles: ["USER", "RESERVATION-STAFF"],
      },
    },
  ];

  return (
    <div id="my-page-container">
      <h1>User</h1>
      <p>Logged in as: {localStorage.getItem("username")}</p>
      <p>Role: {rolesString}</p>
      <br />
      <h1>Your Reservations</h1>
      <Link to="/my-page/calendar" className="link-no-underline">
        <div id="to-calendar-button">
          <p>View Calendar</p>
        </div>
      </Link>
      <FullTable
        schema={[
          {
            header: "Date",
            accessorKey: "reservation_time",
            type: "date",
            searchByValue: false,
          },
          {
            header: "Name",
            accessorKey: "name",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Booking Type",
            accessorKey: "bookingType",
            type: "string",
            searchByValue: true,
          },
          {
            header: "People Amount",
            accessorKey: "peopleAmount",
            type: "number",
            searchByValue: true,
          },
          {
            header: "Price",
            accessorKey: "price",
            type: "number",
            searchByValue: false,
          },
        ]}
        data={mockData.map((item) => ({
          ...item.user,
          peopleAmount: item.bookingInformation.people_amount,
          bookingType: item.bookingInformation.booking_type,
          reservation_time: item.bookingInformation.reservation_time,
          price: item.bookingInformation.people_amount * 100, // Remove the semicolon at the end of this line.
        }))}
        clickableItems={false}
      />
    </div>
  );
}
