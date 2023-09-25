import React, { useContext, useState } from "react";
import CartItem from "../../components/CartItem";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, total } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: localStorage.getItem("user"),
        products: cart.map((item) => ({
          productId: item._id,
          quantity: item.amount,
        })),
        total: total,
        address: address,
      };
      const response = await axios.post(
        "http://localhost:8080/v1/orders/add",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Order placed:", response.data);
      navigate("/success");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-medium mb-6">Checkout</h1>
        <div className="mb-4">
          <label htmlFor="address" className="block text-lg font-medium">
            Shipping Address
          </label>
          <textarea
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {!address && (
          <div className="text-red-500">Please enter a shipping address.</div>
        )}
        <div className="md:col-span-1">
          <h2 className="text-xl font-medium mb-4">Cart Summary</h2>
          <div className="bg-white rounded shadow-lg p-4">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}

            <div className="mt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-semibold text-green-600">
                  $ {parseFloat(total).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
