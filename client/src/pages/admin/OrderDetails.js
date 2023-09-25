import axios from "axios";
import React, { useEffect, useState } from "react";
import AdSidebar from "../../components/AdSidebar";
import { BsEyeFill, BsTrashFill } from "react-icons/bs";
import OrderDetailsModal from "../../components/OrderDetailModal";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v1/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.data;
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    try {
      axios.delete(`http://localhost:8080/v1/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== id)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const viewOrder = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/v1/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSelectedOrder(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log("error in fetching the order:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdSidebar />
      <div className="w-full p-10">
        <h2 className="text-3xl font-semibold mb-4 uppercase">Orders</h2>
        <div className="shadow-lg rounded overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="bg-white hover:bg-gray-100">
                  <td className="border px-6 py-4">{order._id}</td>
                  <td className="border px-6 py-4">
                    {order.userId.firstname + " " + order.userId.lastname}
                  </td>
                  <td className="border px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-6 py-4">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="border px-6 py-4">
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-600 hover:text-red-800 px-2"
                    >
                      <BsTrashFill className="text-2xl" />
                    </button>
                    <button
                      onClick={() => viewOrder(order._id)}
                      className="text-blue-800 hover:text-black px-2"
                    >
                      <BsEyeFill className="text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <OrderDetailsModal order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
};

export default OrderDetails;
