import React from "react";

const Recommented = ({ handleClick }) => {
  return (
    <div className="my-5">
      <h2 className="text-2xl font-semibold">Recommended Products</h2>
      <div className="mt-1 flex space-x-4">
        <button
          onClick={handleClick}
          value="All"
          className="border px-4 py-0 bg-white text-black rounded hover:bg-pink-100 focus:outline-none focus:ring focus:ring-gray-300"
        >
          All Products
        </button>
        <button
          onClick={handleClick}
          value="men"
          className="border px-4 py-0 bg-white text-black rounded hover:bg-pink-100 focus:outline-none focus:ring focus:ring-gray-300"
        >
          Men
        </button>
        <button
          onClick={handleClick}
          value="women"
          className="border px-4 py-0 bg-white text-black rounded hover:bg-pink-100 focus:outline-none focus:ring focus:ring-gray-300"
        >
          Women
        </button>
      </div>
    </div>
  );
};

export default Recommented;
