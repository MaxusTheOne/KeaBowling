import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReservationType } from "../../../Types";
import {
  deleteUserReservation,
  getReservationById,
  updateReservation,
} from "../../../Services/apiFacade";
import moment from "moment";

export default function ReservationsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [reservation, setReservation] = useState<ReservationType>({
    id: 0,
    userId: 0,
    userMail: "",
    bookingType: "",
    peopleAmount: 0,
    reservationDateTime: new Date(),
    reservationLengthMinutes: 0,
    childFriendly: false,
  });

  useEffect(() => {
    const fetchReservations = async () => {
      const res = await getReservationById(Number(id));
      setReservation({ ...res });
      setFormState({
        ...res,
        reservationDateTime: res.reservationDateTime.toString(),
      });
    };
    fetchReservations();
  }, []);

  const [formState, setFormState] = useState({
    ...reservation,
    reservationDateTime:
      reservation.reservationDateTime.toString() /* other default values */,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (!reservation) {
      return;
    }
    setFormState((prevState) => {
      const defaultState = prevState || {
        ...reservation,
        reservationDateTime: "0000-01-01T20:59" /* other default values */,
      };
      if (name === "reservationDateTime") {
        console.log("Date", value);
        // Check if the date is valid
        const timestamp = Date.parse(value);
        if (isNaN(timestamp)) {
          // If the date is invalid, return the previous state
          return defaultState;
        }

        return {
          ...defaultState,
          [name]: value,
        };
      } else {
        return {
          ...defaultState,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = () => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!formState) {
        return;
      }
      const reservationDateTime = moment(formState.reservationDateTime).format(
        "YYYY-MM-DDTHH:mm"
      );
      updateReservation({
        ...formState,
        reservationDateTime: reservationDateTime,
      });
      console.log("Form submitted", formState);
    };
  };
  const handleDelete = () => {
    return () => {
      if (!reservation) {
        return;
      }
      deleteUserReservation(reservation.id);
    };
  };
  return (
    <div>
      <h1>Reservation Detail Page</h1>

      {/* Form for a reservation with input */}
      <form onSubmit={handleSubmit()}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="userId"
            value={reservation?.userId}
            onChange={handleChange}
            readOnly
            required
          />
        </div>
        <div>
          <label>User Mail:</label>
          <input
            type="text"
            name="userMail"
            value={reservation?.userMail}
            onChange={handleChange}
            readOnly
            required
          />
        </div>
        <div>
          <label>Booking Type:</label>
          <input
            type="text"
            name="bookingType"
            value={formState?.bookingType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>People Amount:</label>
          <input
            type="text"
            name="peopleAmount"
            value={formState?.peopleAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reservation Date Time:</label>
          <input
            type="datetime-local"
            name="reservationDateTime"
            value={formState?.reservationDateTime.toString()}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reservation Length Minutes:</label>
          <input
            type="text"
            name="reservationLengthMinutes"
            value={formState?.reservationLengthMinutes}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Child Friendly:</label>
          <input
            type="checkbox"
            name="childFriendly"
            checked={formState?.childFriendly}
            onChange={handleChange}
            required
          />
        </div>
        <button onClick={handleDelete()}>Delete</button>
        <button>Save</button>
      </form>
    </div>
  );
}
