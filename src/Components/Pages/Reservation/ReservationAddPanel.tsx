import { useEffect, useState } from "react";
import { getUsers, postReservation } from "../../../Services/apiFacade";
import { useNavigate } from "react-router-dom";
import type { ReservationType, User } from "../../../Types"; // replace with your actual path

export default function ReservationAddPanel() {
  const [err, setErr] = useState("");
  const [users, setUsers] = useState<User[]>([]);
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

  const navigate = useNavigate();
  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data as User[]);
      })
      .catch((err) => setErr(err.message));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(reservation);

    try {
      await postReservation({ ...reservation });
      navigate("/reservation/admin-panel");
    } catch (err) {
      if (err instanceof Error) {
        setErr(err.message);
      } else {
        setErr("An unknown error occurred");
      }
    }
  }

  return (
    <div id="reservation-page-add-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Add a new reservation to the system</h1>
        <label className="label" htmlFor="user">
          User:
        </label>
        <select
          name="user"
          className="form-field"
          id="schedule-user-select"
          onChange={(e) =>
            setReservation((prev) => ({
              ...prev,
              userId: Number(e.target.value),
            }))
          }
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <label className="label" htmlFor="userMail">
          User Mail:
        </label>
        <input
          className="form-field"
          type="email"
          id="userMail"
          name="userMail"
          onChange={(e) =>
            setReservation((prev) => ({ ...prev, userMail: e.target.value }))
          }
          required
        />
        <label className="label" htmlFor="bookingType">
          Booking Type:
        </label>
        <input
          className="form-field"
          type="text"
          id="bookingType"
          name="bookingType"
          onChange={(e) =>
            setReservation((prev) => ({ ...prev, bookingType: e.target.value }))
          }
          required
        />
        <label className="label" htmlFor="peopleAmount">
          People Amount:
        </label>
        <input
          className="form-field"
          type="number"
          id="peopleAmount"
          name="peopleAmount"
          onChange={(e) =>
            setReservation((prev) => ({
              ...prev,
              peopleAmount: Number(e.target.value),
            }))
          }
          required
        />
        <label className="label" htmlFor="reservationDateTime">
          Reservation Date and Time:
        </label>
        <input
          className="form-field"
          type="datetime-local"
          id="reservationDateTime"
          name="reservationDateTime"
          onChange={(e) =>
            setReservation((prev) => ({
              ...prev,
              reservationDateTime: new Date(e.target.value),
            }))
          }
          required
        />
        <label className="label" htmlFor="reservationLengthMinutes">
          Reservation Length (in minutes):
        </label>
        <input
          className="form-field"
          type="number"
          id="reservationLengthMinutes"
          name="reservationLengthMinutes"
          onChange={(e) =>
            setReservation((prev) => ({
              ...prev,
              reservationLengthMinutes: Number(e.target.value),
            }))
          }
          required
        />
        <label className="label" htmlFor="childFriendly">
          Child Friendly:
        </label>
        <input
          className="form-field"
          type="checkbox"
          id="childFriendly"
          name="childFriendly"
          onChange={(e) =>
            setReservation((prev) => ({
              ...prev,
              childFriendly: e.target.checked,
            }))
          }
        />
        <div className="double-button-holder">
          <button
            className="form-button"
            id="cancel-button"
            onClick={() => navigate("/reservation/admin-panel")}
          >
            Cancel
          </button>
          <button className="form-button" type="submit">
            Add Reservation
          </button>
        </div>
        {err && <p className="form-error">{err}</p>}
      </form>
    </div>
  );
}
