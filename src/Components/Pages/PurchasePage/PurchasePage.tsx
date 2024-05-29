import { useState, useEffect } from "react";
import { getProducts } from "../../../Services/apiFacade";
import { Product } from "../../../Types";
import { useAuth } from "../../../Security/AuthProvider";
import "./PurchasePage.css";
import { useNavigate } from "react-router-dom";

export default function PurchasePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [receipt, setReceipt] = useState<ProductWithQuantity[]>([]);
  const navigate = useNavigate();
  // Define a new type that includes the quantity and total price of a product
  type ProductWithQuantity = Product & { quantity: number; totalPrice: number };

  // Fetch Products from backend
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addToReceipt = (product: Product) => {
    setReceipt((prevReceipt) => {
      // Try to find the product in the receipt
      const productInReceipt = prevReceipt.find(
        (item: ProductWithQuantity) => item.id === product.id
      );

      if (productInReceipt) {
        // If the product is already in the receipt, increment its quantity
        const updatedProduct = {
          ...productInReceipt,
          quantity: productInReceipt.quantity + 1,
          totalPrice: productInReceipt.totalPrice + product.price,
        };
        return prevReceipt.map((item) =>
          item.id === product.id ? updatedProduct : item
        );
      } else {
        // If the product is not in the receipt, add it
        return [
          ...prevReceipt,
          { ...product, quantity: 1, totalPrice: product.price },
        ];
      }
    });
  };

  const removeFromReceipt = (productId: number) => {
    setReceipt((prevReceipt) => {
      // Try to find the product in the receipt
      const productInReceipt = prevReceipt.find(
        (item: ProductWithQuantity) => item.id === productId
      );

      // Find the product in the product list
      const product = products.find((item: Product) => item.id === productId);

      if (productInReceipt && product) {
        // If the product is in the receipt and its quantity is more than 1, decrement its quantity
        if (productInReceipt.quantity > 1) {
          const updatedProduct = {
            ...productInReceipt,
            quantity: productInReceipt.quantity - 1,
            totalPrice: productInReceipt.totalPrice - product.price,
          };
          return prevReceipt.map((item) =>
            item.id === product.id ? updatedProduct : item
          );
        } else {
          // If the product is in the receipt and its quantity is 1, remove it from the receipt
          return prevReceipt.filter(
            (item: ProductWithQuantity) => item.id !== productId
          );
        }
      }

      // Return the updated receipt
      return [...prevReceipt];
    });
  };

  const renderProduct = (product: Product) => {
    return (
      <div
        className="grid-item"
        key={product.id}
        onClick={() => addToReceipt(product)}
      >
        <img src={product.image} alt={product.name} />
        <div className="product-name">{product.name}</div>
        <div className="product-price">
          {product.price.toString().replace(".", ",")}.- kr./stk
        </div>
      </div>
    );
  };

  const renderReceiptItem = (product: ProductWithQuantity) => (
    <div
      key={product.id + "-" + product.quantity}
      className="receipt-item"
      onClick={() => removeFromReceipt(product.id)}
    >
      <div className="receipt-item-name">
        {product.quantity} - {product.name}
      </div>
      <div className="receipt-item-price">
        {" "}
        {product.totalPrice.toFixed(2).replace(".", ",")} kr.
      </div>
    </div>
  );

  const handlePay = () => {
    const totalPrice = receipt.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const isConfirmed = window.confirm(
      `Total price is ${totalPrice
        .toFixed(2)
        .replace(
          ".",
          ","
        )} DKK. Press "OK" if the customer has paid. Cancel to abort.`
    );
    if (isConfirmed) {
      setReceipt([]);
    }
  };

  return (
    <div id="beverages-page-container">
      {useAuth().isLoggedInAs(["ADMIN"]) ? (
        <button
          id="admin-panel-button"
          onClick={() => navigate("/sell/admin-panel")}
        >
          Admin Panel
        </button>
      ) : null}
      <h1>Sell Amenities</h1>

      <div id="purchase-page-container">
        <div id="item-grid-container">
          {Array.isArray(products) ? products.map(renderProduct) : null}
        </div>
        <div id="receipt-container">
          <div id="receipt-items-container">
            <div className="receipt-item" id="receipt-header">
              <div className="receipt-item-name"># Product</div>
              <div className="receipt-item-price"> Price</div>
            </div>
            {receipt.map(renderReceiptItem)}
          </div>
          <div id="total-price">
            <div className="total-price-text">
              Total:{" "}
              {receipt
                .reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0
                )
                .toFixed(2)
                .replace(".", ",")}{" "}
              kr.
            </div>
            {receipt.length > 0 ? (
              <div className="buttons-container">
                <button onClick={handlePay}>Pay</button>
                <button onClick={() => setReceipt([])}>❌</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
