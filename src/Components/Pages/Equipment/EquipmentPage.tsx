import { useEffect, useState } from "react";
import FullTable from "../../Table/FullTable";
import { getEquipment } from "../../../Services/apiFacade";
import { Equipment } from "../../../Types";

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState([]);
  // Fetch equipment from backend
  useEffect(() => {
    getEquipment()
      .then((data) => {
        setEquipment(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div id="equipment-page-container">
      <h1>Equipment</h1>
      <FullTable
        schema={[
          {
            header: "ID",
            accessorKey: "id",
            type: "number",
            searchByValue: true,
          },
          {
            header: "Name",
            accessorKey: "name",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Description",
            accessorKey: "description",
            type: "string",
            searchByValue: false,
          },
          {
            header: "Brand",
            accessorKey: "brand",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Type",
            accessorKey: "type",
            type: "string",
            searchByValue: false,
          },
          {
            header: "Stock Amount",
            accessorKey: "stockAmount",
            type: "number",
            searchByValue: false,
          },
        ]}
        data={equipment.map((item: Equipment) => ({
          ...item,
          id: item.id,
        }))}
        createButton={true}
        clickableItems={true}
      />
    </div>
  );
}
