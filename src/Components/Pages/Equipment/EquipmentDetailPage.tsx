import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteEquipment, getEquipmentById, updateEquipment } from "../../../Services/apiFacade";
import type { Equipment } from "../../../Types";

export default function EquipmentDetailPage() {
     const { id } = useParams<{ id: string }>();
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
        }
}
  const handleDelete = () => {
    return () => {
      if (!equipment) {
        return;
      }
      deleteEquipment(equipment.id);
    };
  };
return (
    <div>
        <h1>Equipment Detail Page</h1>

        {/* Form for a Equipment with input */}
        <form onSubmit={handleSubmit()}>
            <div>
                <label>ID:</label>
                <input
                    type="text"
                    name="id"
                    value={equipment?.id}
                    onChange={handleChange}
                    readOnly
                    required
                />
            </div>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={equipment?.name}
                    onChange={handleChange}
                    readOnly
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formState?.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Brand:</label>
                <input
                    type="text"
                    name="brand"
                    value={formState?.brand}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Type:</label>
                <input
                    type="text"
                    name="type"
                    value={formState?.type}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Stock Amount:</label>
                <input
                    type="text"
                    name="stockAmount"
                    value={formState?.stockAmount}
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