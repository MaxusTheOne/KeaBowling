import { useEffect, useState } from "react";
import FullTable from "../../Table/FullTable";
import { getReservations } from "../../../Services/apiFacade";
import "./ReservationsPage.css";
import { ReservationType } from "../../../Types";


export default function ReservationsPage() {

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
