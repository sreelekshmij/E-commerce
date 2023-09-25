import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  
  const handleResetPassword = async () => {
    try {
      const token = queryParams.get('token');
      // console.log(token,'yo')
      if (password !== confirmPassword) {
        setMessage("New password and confirm password do not match.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/v1/auth/reset-password",
        {
          token,
          newPassword: password,
        }
      );
      // console.log(response, "mess");

      if (response.status === 200) {
        setMessage("Password reset successfully. You can now log in.");
        alert("Password Reset Success");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Reset Failed");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700">New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Reset Password
        </button>
        <p className="text-red-600 mt-2">{message}</p>
      </div>
    </div>
  );
}

export default ResetPassword;
