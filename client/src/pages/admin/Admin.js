import React, { useEffect, useState } from "react";
import AdSidebar from "../../components/AdSidebar";
import axios from "axios";

const Admin = () => {
  const [userCount, setUserCount] = useState(0);
  const [proCount, setProCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/users/count/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const count = response.data;
        setUserCount(count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/products/count/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const count = response.data;
        setProCount(count);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/orders/count/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const count = response.data;
        setOrderCount(count);
      } catch (error) {
        console.error("Error fetching order count:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTotalOrderAmount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/orders/total/totalAmount`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTotalOrderAmount(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching total order amount:", error);
      }
    };

    const fetchTotalStock = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/products/stock/totalStock`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTotalStock(response.data);
      } catch (error) {
        console.error("Error fetching total stock:", error);
      }
    };

    fetchTotalOrderAmount();
    fetchTotalStock();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdSidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h6 className="text-xs text-purple-700 uppercase mb-2">Users</h6>
            <h4 className="text-2xl font-bold dark:text-white">
              <span id="state1" countTo={userCount}>
                {userCount}
              </span>
            </h4>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h6 className="text-xs text-purple-700 uppercase mb-2">Products</h6>
            <h4 className="text-2xl font-bold dark:text-white">
              <span id="state2" countTo={proCount}>
                {proCount}
              </span>
            </h4>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h6 className="text-xs text-purple-700 uppercase mb-2">Orders</h6>
            <h4 className="text-2xl font-bold dark:text-white">
              <span id="state2" countTo={orderCount}>
                {orderCount}
              </span>
            </h4>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h6 className="text-xs text-purple-700 uppercase mb-2">
              Total Order Amount
            </h6>
            <h4 className="text-2xl font-bold dark:text-white">
              $<span id="totalOrderAmount">{totalOrderAmount}</span>
            </h4>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h6 className="text-xs text-purple-700 uppercase mb-2">
              Total Stock
            </h6>
            <h4 className="text-2xl font-bold dark:text-white">
              <span id="totalStock">{totalStock}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
