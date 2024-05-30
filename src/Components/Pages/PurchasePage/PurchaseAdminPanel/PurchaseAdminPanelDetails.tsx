import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProductById, updateProduct } from "../../../../Services/apiFacade";
import type { Product } from "../../../../Types";

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product>({
        id: 0,
        name: "",
        price: 0,
        stock: 0,
        image: ""
    });

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getProductById(Number(id));
            setProduct({ ...res });
            setFormState({
                ...res,
            });
        };
        fetchProducts();
    }, [id]);

    const [formState, setFormState] = useState({
        ...product,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (!product) {
            return;
        }
        setFormState((prevState) => {
            const defaultState = prevState || {
                ...product,
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
            if (!product) {
                return;
            }
            updateProduct(formState);
            navigate("/sell");
        };
    };

    const handleDelete = () => {
        return () => {
            if (!product) {
                return;
            }
            deleteProduct(product.id);
            navigate("/sell");
        };
    };

    return (
        <div>
            {/* Form for a Product with input */}
            <form onSubmit={handleSubmit()} id="product-form-container" className="form-container">
                <h1>Product Detail Page</h1>
                <label className="form-label">ID: {product?.id}</label>


                <label className="form-label">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formState?.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                />

                <label className="form-label">Price:</label>
                <input
                    type="text"
                    name="price"
                    value={formState?.price}
                    onChange={handleChange}
                    required
                    className="form-input"
                />

                <label className="form-label">Stock:</label>
                <input
                    type="text"
                    name="stock"
                    value={formState?.stock}
                    onChange={handleChange}
                    required
                    className="form-input"
                />

                <label className="form-label">Image:</label>
                <input
                    type="text"
                    name="image"
                    value={formState?.image}
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
