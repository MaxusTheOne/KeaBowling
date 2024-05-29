import { useNavigate } from "react-router-dom";
import "./SchedulePageAdd.css";
import { useEffect, useState } from "react";
import { createSchedule, getAllStaff } from "../../../../Services/apiFacade";
import { ScheduleDTO, User } from "../../../../Types";

export default function SchedulePageAdd() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [staff, setStaff] = useState<User[]>([]);

  useEffect(() => {
    console.log(staff);
  }, [staff]);

  useEffect(() => {
    getAllStaff()
      .then((data) => {
        setStaff(data as User[]);
      })
      .catch((err) => setError(err.message));
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dateValue = (
      document.getElementsByName("date")[0] as HTMLInputElement
    ).value;
    const startValue = (
      document.getElementsByName("start")[0] as HTMLInputElement
    ).value;
    const endValue = (document.getElementsByName("end")[0] as HTMLInputElement)
      .value;

    const newSchedule: ScheduleDTO = {
      username: (
        document.getElementById("schedule-user-select") as HTMLSelectElement
      ).value,
      start: new Date(`${dateValue} ${startValue}`),
      end: new Date(`${dateValue} ${endValue}`),
    };

    console.log(newSchedule);

    // Add schedule to database
    createSchedule(newSchedule).then(() => {
      navigate("/schedule");
    });
  }

  return (
    <div id="schedule-add-container">
      <form id="schedule-form" onSubmit={handleSubmit}>
        <h1>Create a new work schedule.</h1>
        <label className="label" htmlFor="user">
          User:
        </label>
        <select
          name="user"
          className="schedule-form-field"
          id="schedule-user-select"
        >
          {staff.map((user) => (
            <option key={user.id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <label className="label" htmlFor="date">
          Date:
        </label>
        <input
          className="schedule-form-field"
          type="date"
          name="date"
          required
        />
        <label className="label" htmlFor="start">
          Start:
        </label>
        <input
          className="schedule-form-field"
          type="time"
          name="start"
          required
        />
        <label className="label" htmlFor="end">
          End:
        </label>
        <input
          className="schedule-form-field"
          type="time"
          name="end"
          required
        />

        <button className="form-button" type="submit">
          Add Work Schedule
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
}
