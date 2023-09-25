import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    // Validation logic for first name
    if (!formData.firstname.trim()) {
      errors.firstname = "First name is required";
    }

    // Validation logic for last name
    if (!formData.lastname.trim()) {
      errors.lastname = "Last name is required";
    }

    // Validation logic for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Validation logic for mobile
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobile)) {
      errors.mobile = "Invalid mobile number";
    }

    // Validation logic for password
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/v1/auth/register",
          formData
        );
        alert(response.data.message);
        // console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex h-screen justify-center bg-cover"
    style={{
      backgroundImage: `url("https://img.freepik.com/free-photo/image-tourist-checking-out-something-cool-takeoff-sunglasses-say-wow-looking-aside-impressed_1258-159739.jpg?w=826&t=st=1694162837~exp=1694163437~hmac=8528639161235c7f382fb2ba5392d890e7cba49b7b4f63966fac7801c390ca4a")`,
    }}>
      
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-lg border m-auto w-11/12 md:w-1/3 bg-slate-300/75"
      >
        <h1 className="text-4xl text-center">Register</h1>
        <div className="my-5 w-full">
          <label htmlFor="firstname">First Name</label>
          <input
            className="p-2 rounded w-full border"
            name="firstname"
            placeholder="First Name"
            onChange={handleInputChange}
          />
          <div className="text-red-500">{formErrors.firstname}</div>
        </div>
        <div className="my-5 w-full">
          <label htmlFor="lastname">Last Name</label>
          <input
            className="p-2 rounded w-full border"
            name="lastname"
            placeholder="Last Name"
            onChange={handleInputChange}
          />
          <div className="text-red-500">{formErrors.lastname}</div>
        </div>
        <div className="my-5 w-full">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 rounded w-full border"
            name="email"
            placeholder="Email Address"
            onChange={handleInputChange}
          />
          <div className="text-red-500">{formErrors.email}</div>
        </div>
        <div className="my-5 w-full">
          <label htmlFor="mobile">Mobile</label>
          <input
            className="p-2 rounded w-full border"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleInputChange}
          />
          <div className="text-red-500">{formErrors.mobile}</div>
        </div>
        <div className="my-5 w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="p-2 rounded w-full border"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <div className="text-red-500">{formErrors.password}</div>
        </div>
        <div className="my-5 w-full">
          <button
            type="submit"
            className="p-2 w-full bg-pink-500 text-white hover:bg-pink-900 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
