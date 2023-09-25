import React from "react";
import { FiX } from "react-icons/fi";

const OrderDetailsModal = ({ order, onClose }) => {
  const { _id, userId, products, address, total } = order;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 backdrop-blur-md backdrop-filter backdrop-opacity-75 z-40" />
      <div className="modal-container bg-white rounded-lg shadow-xl p-6 relative z-50">
        <div className="modal-content">
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          <div className="mb-4">
            <strong>Order ID:</strong> {_id}
          </div>
          <div className="mb-4">
            <strong>Customer:</strong>{" "}
            {userId.firstname + " " + userId.lastname}
          </div>
          <div className="mb-4">
            <strong>Shipping Address:</strong> {address}
          </div>
          <div className="mb-4">
            <strong>Order Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
          <div className="mb-4">
            <strong>Total Amount:</strong> ${total.toFixed(2)}
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <h3 className="text-xl font-semibold mb-2">Order Items</h3>
          <ul>
            {products.map((item) => (
              <li key={item.productId} className="mb-2">
                {item.productId.title} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <button
            onClick={onClose}
            className="modal-close-btn absolute top-0 right-0 p-2"
          >
            <FiX className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
