import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    img: File,
    categories: "",
    size: "",
    color: "",
    price: "",
    stock: "",
  });

  // const [errors, setErrors] = useState({
  //   title: "",
  //   desc: "",
  //   img: "",
  //   categories: "",
  //   size: "",
  //   color: "",
  //   price: "",
  //   stock: "",
  // });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // const validateForm = () => {
  //   let isValid = true;
  //   const newErrors = { ...errors };

  //   if (!formData.title) {
  //     newErrors.title = "Title is required";
  //     isValid = false;
  //   } else {
  //     newErrors.title = "";
  //   }

  //   if (!formData.desc) {
  //     newErrors.desc = "Description is required";
  //     isValid = false;
  //   } else {
  //     newErrors.desc = "";
  //   }

  //   if (!formData.img) {
  //     newErrors.img = "Image is required";
  //     isValid = false;
  //   } else {
  //     newErrors.img = "";
  //   }

  //   // if (!formData.categories) {
  //   //   newErrors.categories = "Category is required";
  //   //   isValid = false;
  //   // } else {
  //   //   newErrors.categories = "";
  //   // }

  //   if (!formData.size) {
  //     newErrors.size = "Size is required";
  //     isValid = false;
  //   } else {
  //     newErrors.size = "";
  //   }

  //   if (!formData.color) {
  //     newErrors.color = "Color is required";
  //     isValid = false;
  //   } else {
  //     newErrors.color = "";
  //   }

  //   if (!formData.price) {
  //     newErrors.price = "Price is required";
  //     isValid = false;
  //   } else {
  //     newErrors.price = "";
  //   }

  //   if (!formData.stock || isNaN(formData.stock)) {
  //     newErrors.stock = "Valid stock amount is required";
  //     isValid = false;
  //   } else {
  //     newErrors.stock = "";
  //   }

  //   setErrors(newErrors);
  //   return isValid;
  // };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // if (validateForm()) {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "hsfgdfgadjgagj");
      const response = await axios.post(
        "http://localhost:8080/v1/products/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "res");
      // navigate.push("/admin/products");
    } catch (error) {
      console.error(error, "errrr");
    }
  };
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl text-center mb-6 font-semibold text-gray-800">
          Add Product
        </h1>

        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-gray-600">
              Title
            </label>
            <input
              className="w-full p-2 rounded border focus:outline-none focus:border-primary"
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleInputChange}
              required
            />
            {/* <div className="text-red-500">{errors.title}</div> */}
          </div>

          <div>
            <label htmlFor="desc" className="text-gray-600">
              Description
            </label>
            <textarea
              className="w-full p-2 rounded border focus:outline-none focus:border-primary resize-none"
              name="desc"
              rows="4"
              placeholder="Description"
              onChange={handleInputChange}
              required
            />
            {/* <div className="text-red-500">{errors.desc}</div> */}
          </div>

          <div>
            <label htmlFor="img" className="text-gray-600">
              Image Upload
            </label>
            <input
              type="file"
              className="w-full p-2 rounded border focus:outline-none focus:border-primary"
              name="img"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
            {/* <div className="text-red-500">{errors.img}</div> */}
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="category" className="text-gray-600">
                Category
              </label>
              <input
                className="w-full p-2 rounded border focus:outline-none focus:border-primary"
                type="text"
                name="categories"
                placeholder="Category"
                onChange={handleInputChange}
                required
              />
              {/* <div className="text-red-500">{errors.categories}</div> */}
            </div>
            <div className="w-1/2">
              <label htmlFor="size" className="text-gray-600">
                Size
              </label>
              <input
                className="w-full p-2 rounded border focus:outline-none focus:border-primary"
                type="text"
                name="size"
                placeholder="Size"
                onChange={handleInputChange}
                required
              />
              {/* <div className="text-red-500">{errors.size}</div> */}
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="color" className="text-gray-600">
                Color
              </label>
              <input
                className="w-full p-2 rounded border focus:outline-none focus:border-primary"
                type="text"
                name="color"
                placeholder="Color"
                onChange={handleInputChange}
                required
              />
              {/* <div className="text-red-500">{errors.color}</div> */}
            </div>
            <div className="w-1/2">
              <label htmlFor="price" className="text-gray-600">
                Price
              </label>
              <input
                className="w-full p-2 rounded border focus:outline-none focus:border-primary"
                type="text"
                name="price"
                placeholder="Price"
                onChange={handleInputChange}
                required
              />
              {/* <div className="text-red-500">{errors.price}</div> */}
            </div>
          </div>

          <div>
            <label htmlFor="stock" className="text-gray-600">
              Stock
            </label>
            <input
              className="w-full p-2 rounded border focus:outline-none focus:border-primary"
              type="text"
              name="stock"
              placeholder="Initial Stock"
              onChange={handleInputChange}
              required
            />
            {/* <div className="text-red-500">{errors.stock}</div> */}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 bg-pink-500 text-white hover:bg-pink-900 rounded transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
