import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPass = () => {
    const [formData, setFormData] = useState("");
    const navigate = useNavigate()
    
      const handleInputChange = (e) => {
        setFormData( e.target.value );
      };

      const handleSubmit = async(e) => {
        e.preventDefault()
        try{
           const response = await axios.post("http://localhost:8080/v1/auth/forgot-password",{formData})
           alert(response.data.message)
        } catch (error){
            alert(error.response.message)
        }
      }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-200 to-white">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-center mb-4">
          Forgot Password
        </h3>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            for='email'
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg py-2 font-semibold hover:bg-primary-dark focus:outline-none focus:bg-primary-dark"
          >
            Submit
          </button>
        </div>
        <p className="text-sm text-center">
          <Link to="/register" className="text-primary  hover:text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPass;
