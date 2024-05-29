import { useState } from "react";
import "./UsersPageAdd.css";
import { useAuth } from "../../../Security/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function UsersPageAdd() {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    roles: [] as string[],
  });

  const auth = useAuth();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      setErr("Kodeordene er ikke ens");
      return;
    }

    console.log(user);

    auth.createWithRoles(user).then(() => {
      console.log(user);
      navigate("/users");
    });
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    setUser((prev) => {
      if (checked) {
        // If the checkbox is checked, add its value to the roles array
        return { ...prev, roles: [...prev.roles, value] };
      } else {
        // If the checkbox is unchecked, remove its value from the roles array
        return { ...prev, roles: prev.roles.filter((role) => role !== value) };
      }
    });
  };

  return (
    <div id="users-page-add-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Add a new user to the system</h1>
        <label className="label" htmlFor="username">
          Username:
        </label>
        <input
          className="form-field"
          type="text"
          id="username"
          name="username"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, username: e.target.value }))
          }
          required
        />
        <label className="label" htmlFor="email">
          Email:
        </label>
        <input
          className="form-field"
          type="email"
          id="email"
          name="email"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <label className="label" htmlFor="password">
          Password:
        </label>
        <input
          className="form-field"
          type="password"
          id="password"
          name="password"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <label className="label" htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          className="form-field"
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, confirmPassword: e.target.value }))
          }
          required
        />
        <label className="label">Roles:</label>
        <div className="choice-container">
          <label htmlFor="admin">Admin</label>
          <input
            type="checkbox"
            id="admin"
            name="roles"
            value="ADMIN"
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="choice-container">
          <label htmlFor="reservationStaff">Reservation Staff</label>
          <input
            type="checkbox"
            id="reservationStaff"
            name="roles"
            value="RESERVATION_STAFF"
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="choice-container">
          <label htmlFor="equipmentOperator">Equipment Operator</label>
          <input
            type="checkbox"
            id="equipmentOperator"
            name="roles"
            value="EQUIPMENT_OPERATOR"
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="choice-container">
          <label htmlFor="shiftManager">Regular Staff</label>
          <input
            type="checkbox"
            id="staff"
            name="roles"
            value="STAFF"
            onChange={handleCheckboxChange}
          />
        </div>

        <button className="form-button" type="submit">
          Add User
        </button>
        {err && <p className="form-error">{err}</p>}
      </form>
    </div>
  );
}
