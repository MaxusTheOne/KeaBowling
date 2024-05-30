import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEquipment, getEquipmentById, updateEquipment } from "../../../Services/apiFacade";
import type { Equipment } from "../../../Types";

export default function EquipmentDetailPage() {
     const { id } = useParams<{ id: string }>();
     const navigate = useNavigate();
  const [equipment, setEquipment] = useState<Equipment>({
    id: 0,
    name: "",
    description: "",
    brand: "",
    type: "",
    stockAmount: 0
  });

  useEffect(() => {
    const fetchEquipments = async () => {
      const res = await getEquipmentById(Number(id));
      setEquipment({ ...res });
      setFormState({
        ...res,
      });
    };
    fetchEquipments();
  }, [id]);

  const [formState, setFormState] = useState({
    ...equipment,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (!equipment) {
      return;
    }
    setFormState((prevState) => {
      const defaultState = prevState || {
        ...equipment,
      };
        return {
          ...defaultState,
          [name]: value,
        };
      
    });
  };

    const handleSubmit = () => {
        return (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!equipment) {
                return;
            }
            updateEquipment(formState);
            navigate("/equipment");
          }
        }
        const handleDelete = () => {
          return () => {
            if (!equipment) {
              return;
            }
            deleteEquipment(equipment.id);
            navigate("/equipment");
          };
  };
return (
  <div>

    {/* Form for a Equipment with input */}
    <form onSubmit={handleSubmit()} id="equipment-form-container" className="form-container">
    <h1>Equipment Detail Page</h1>
      <label className="form-label">ID:</label>
      <input
        type="text"
        name="id"
        value={equipment?.id}
        onChange={handleChange}
        readOnly
        required
        className="form-input"
      />

      <label className="form-label">Name:</label>
      <input
        type="text"
        name="name"
        value={equipment?.name}
        onChange={handleChange}
        readOnly
        required
        className="form-input"
      />

      <label className="form-label">Description:</label>
      <input
        type="text"
        name="description"
        value={formState?.description}
        onChange={handleChange}
        required
        className="form-input"
      />

      <label className="form-label">Brand:</label>
      <input
        type="text"
        name="brand"
        value={formState?.brand}
        onChange={handleChange}
        required
        className="form-input"
      />

      <label className="form-label">Type:</label>
      <input
        type="text"
        name="type"
        value={formState?.type}
        onChange={handleChange}
        required
        className="form-input"
      />

      <label className="form-label">Stock Amount:</label>
      <input
        type="text"
        name="stockAmount"
        value={formState?.stockAmount}
        onChange={handleChange}
        required
        className="form-input"
      />

      <div className="choice-container">
        <button onClick={handleDelete()} className="delete-button">Delete</button>
        <button className="save-button">Save</button>
      </div>
    </form>
  </div>
);
}