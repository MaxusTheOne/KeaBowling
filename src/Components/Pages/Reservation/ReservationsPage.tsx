import { useEffect, useState } from "react";
import FullTable from "../../Table/FullTable";
import { getReservations } from "../../../Services/apiFacade";
import "./ReservationsPage.css";
import { Reservation, ReservationType } from "../../../Types";


export default function ReservationsPage() {
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
  const [reservations , setReservations]  = useState<ReservationType[] | null>(null);

  useEffect(() => {
  const fetchReservations = async () => {
    const res = await getReservations();
    setReservations(res);
  }
  fetchReservations();
},[])
  // const fetchUsers = () => {
  //   getUsers()
  //     .then((res) => setUsers(res))
  //     .catch(() => setError("Error fetching users, is the server running?"));
  // };

  return (
    <div id="reservations-page-container">
      <h1>Reservations</h1>
      <FullTable
        schema={[
          {
            header: "Id",
            accessorKey: "id",
            type: "number",
            searchByValue: true,
          },
          {
            header: "Type",
            accessorKey: "bookingType",
            type: "string",
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
            header: "People Amount",
            accessorKey: "peopleAmount",
            type: "number",
            searchByValue: false,
          },
          {
            header: "Time",
            accessorKey: "reservation_time",
            type: "date",
            searchByValue: false,
          },
        ]}
        roleFilter={false}
        createButton={true}
        data={reservations ? reservations.map((item: ReservationType) => {
          if (!item) {
            return { id: 0, roles: [] }; // or some default object
          }
          return {
            id: item.id, // ensure id is always provided and is a number
            email: item.userMail,
            peopleAmount: item.peopleAmount,
            bookingType: item.bookingType,
            reservation_time: item.reservationDateTime,
          };
        }).filter(Boolean) : []} // filter out any null values
      />
    </div>
  );
}
