import { useState } from "react";
import "./EquipmentPageAdd.css";
import { postEquipment } from "../../../../Services/apiFacade";
import { useNavigate } from "react-router-dom";

export default function EquipmentPageAdd() {
  const [err, setErr] = useState("");
  const [equipment, setEquipment] = useState({
    name: "",
    description: "",
    brand: "",
    type: "",
    stockAmount: 0,
  });

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(equipment);

    try {
      await postEquipment(equipment);
      navigate("/equipment");
    } catch (err) {
      if (err instanceof Error) {
        setErr(err.message);
      } else {
        setErr("An unknown error occurred");
      }
    }
  }

  return (
    <div id="equipment-page-add-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Add new equipment to the system</h1>
        <label className="label" htmlFor="name">
          Name:
        </label>
        <input
          className="form-field"
          type="text"
          id="name"
          name="name"
          onChange={(e) =>
            setEquipment((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        <label className="label" htmlFor="description">
          Description:
        </label>
        <input
          className="form-field"
          type="text"
          id="description"
          name="description"
          onChange={(e) =>
            setEquipment((prev) => ({ ...prev, description: e.target.value }))
          }
          required
        />
        <label className="label" htmlFor="brand">
          Brand:
        </label>
        <input
          className="form-field"
          type="text"
          id="brand"
          name="brand"
          onChange={(e) =>
            setEquipment((prev) => ({ ...prev, brand: e.target.value }))
          }
          required
        />
        <label className="label" htmlFor="type">
          Type:
        </label>
        <input
          className="form-field"
          type="text"
          id="type"
          name="type"
          onChange={(e) =>
            setEquipment((prev) => ({ ...prev, type: e.target.value }))
          }
          required
        />

        <label className="label" htmlFor="stockAmount">
          Stock Amount:
        </label>
        <input
          className="form-field"
          type="number"
          id="stockAmount"
          name="stockAmount"
          onChange={(e) => {
            console.log(e.target.value); // Log the value of the input field
            console.log(Number(e.target.value)); // Log the result of the Number function
            setEquipment((prev) => ({
              ...prev,
              stockAmount: Number(e.target.value),
            }));
          }}
          required
        />

        <button className="form-button" type="submit">
          Add Equipment
        </button>
        {err && <p className="form-error">{err}</p>}
      </form>
    </div>
  );
}
