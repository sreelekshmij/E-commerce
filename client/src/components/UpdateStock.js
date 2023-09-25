import React, { useState } from "react";

const UpdateStockModal = ({ product, onClose, onUpdateStock }) => {
  const [newStock, setNewStock] = useState(product.stock);

  const handleUpdateStock = () => {
    onUpdateStock(product._id, newStock);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="modal-bg absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-xl font-semibold mb-4">
          Update Stock for {product.title}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            New Stock Value:
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleUpdateStock}
          >
            Update
          </button>
          <button
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStockModal;
