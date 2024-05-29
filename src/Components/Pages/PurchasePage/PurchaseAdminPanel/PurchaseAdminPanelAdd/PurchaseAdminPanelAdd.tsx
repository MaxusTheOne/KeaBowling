import { useState } from "react";
import "./PurchaseAdminPanelAdd.css";
import { postProduct } from "../../../../../Services/apiFacade";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../../Types"; // replace with your actual path

export default function PurchaseAdminPanelAdd() {
  const [err, setErr] = useState("");
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    image: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(product);

    try {
      await postProduct(product);
      navigate("/sell/admin-panel");
    } catch (err) {
      if (err instanceof Error) {
        setErr(err.message);
      } else {
        setErr("An unknown error occurred");
      }
    }
  }

  return (
    <div id="product-page-add-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Add a new product to the system</h1>
        <label className="label" htmlFor="name">
          Name:
        </label>
        <input
          className="form-field"
          type="text"
          id="name"
          name="name"
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        <label className="label" htmlFor="price">
          Price:
        </label>
        <input
          className="form-field"
          type="number"
          id="price"
          name="price"
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, price: Number(e.target.value) }))
          }
          required
        />
        <label className="label" htmlFor="stock">
          Stock:
        </label>
        <input
          className="form-field"
          type="number"
          id="stock"
          name="stock"
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, stock: Number(e.target.value) }))
          }
          required
        />
        <label className="label" htmlFor="image">
          Image:
        </label>
        <input
          className="form-field"
          type="text"
          id="image"
          name="image"
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, image: e.target.value }))
          }
          required
        />
        <div className="double-button-holder">
          <button
            className="form-button"
            id="cancel-button"
            onClick={() => navigate("/sell/admin-panel")}
          >
            Cancel
          </button>
          <button className="form-button" type="submit">
            Add Product
          </button>
        </div>
        {err && <p className="form-error">{err}</p>}
      </form>
    </div>
  );
}
