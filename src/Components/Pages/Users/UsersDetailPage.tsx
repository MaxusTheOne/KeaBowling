import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../../../Services/apiFacade";
import "./UserDetailPage.css";

interface UserToUpdate {
  id: number;
  email: string;
  roles: string[];
  username: string;
  created: Date;
}

export default function UsersDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserToUpdate>({
    id: 0,
    created: new Date(),
    email: "",
    roles: [],
    username: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserById(Number(id));
      setUser({ ...res });
      setFormState({
        ...res,
      });
      console.log(res);
    };
    fetchUser();
  }, [id]);

  const [formState, setFormState] = useState({
    ...user,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (!user) {
      return;
    }
    setFormState((prevState) => {
      const defaultState = prevState || {
        ...user,
      };
      return {
        ...defaultState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      return;
    }
    try {
      await updateUser({ ...formState });
      navigate("/users");
    } catch {
      console.error("Error updating user");
      navigate("/users");
    }
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    try {
      await deleteUser(user.id);
      navigate("/users");
    } catch {
      console.error("Error deleting user");
      navigate("/users");
    }
  };
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
    setFormState((prev) => {
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
    <div className="user-detail-page">
      {/* Form for a User with input */}
      <form
        id="user-form-container"
        className="form-container"
        onSubmit={handleSubmit}
      >
        <h1>User Detail Page</h1>
        <label className="form-label">ID: {user?.id}</label>

        <label className="form-label">Created:</label>
        <input
          className="form-input"
          type="dateTime-local"
          name="Date Created"
          value={formState?.created.toString()}
          readOnly
        />
        <label className="form-label">Email:</label>
        <input
          className="form-input"
          type="text"
          name="email"
          value={formState?.email}
          onChange={handleChange}
          required
        />

        <label className="form-label">Username:</label>
        <input
          className="form-input"
          type="text"
          name="username"
          value={formState?.username}
          onChange={handleChange}
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
            checked={user.roles.includes("ADMIN")}
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
            checked={user.roles.includes("RESERVATION_STAFF")}
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
            checked={user.roles.includes("EQUIPMENT_OPERATOR")}
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
            checked={user.roles.includes("STAFF")}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="choice-container">
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}
