import { useEffect, useState } from "react";
import { Product } from "../../../../Types";
import { getProducts } from "../../../../Services/apiFacade";
import FullTable from "../../../Table/FullTable";

export default function PurchaseAdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch Products from backend
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div id="purchase-admin-panel-container">
      <h1>Amenities</h1>
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
            header: "Price",
            accessorKey: "price",
            type: "number",
            searchByValue: false,
          },
          {
            header: "Stock Amount",
            accessorKey: "stock",
            type: "number",
            searchByValue: false,
          },
        ]}
        data={products.map((item: Product) => ({
          ...item,
          id: item.id,
        }))}
        createButton={true}
        clickableItems={true}
      />
    </div>
  );
}
