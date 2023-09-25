import React, { useContext, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import AdSidebar from "../../components/AdSidebar";
import { BsPlus, BsTrash2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import UpdateStockModal from "../../components/UpdateStock";

const ProductList = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateStock = async (productId, newStock) => {
    await axios.patch(
      `http://localhost:8080/v1/products/${productId}`,
      { stock: newStock },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, stock: newStock } : product
      )
    );
  };

  const openUpdateStockModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeUpdateStockModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 max-h-screen">
          <div className="flex items-center justify-between py-6 border-b">
            <div className="uppercase text-2xl font-semibold">Products </div>
            <div className="cursor-pointer w-8 h-8 flex justify-center items-center">
              <Link to="/admin/products/add">
                {" "}
                <BsPlus className="text-3xl" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <div className="w-1/3">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-2/3 ml-4">
                  <div className="flex items-center justify-between py-6 border-b">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.title}
                    </h2>
                    <button onClick={() => deleteProduct(product._id)}>
                      <BsTrash2 className="text-3xl" />
                    </button>
                  </div>
                  <div>
                    <p className="text-gray-600 font-bold">
                      Description:
                      <p className="text-gray-600 font-normal">
                        {product.desc}
                      </p>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-bold">
                      Category:
                      <span className="text-gray-600 font-normal px-2">
                        {product.categories}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-bold">
                      Size:
                      <span className="text-gray-600 font-normal px-2">
                        {product.size}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-bold">
                      Color:
                      <span className="text-gray-600 font-normal px-2">
                        {product.color}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-bold">
                      Price:
                      <span className="text-gray-600 font-normal px-2">
                        {product.price}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600 font-bold">
                      Stock: {product.stock}
                    </p>
                    {product.inStock === false && (
                      <div className="text-red-500 font-bold">Out of Stock</div>
                    )}
                    <button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => openUpdateStockModal(product)}
                    >
                      Update Stock
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {showModal && (
              <UpdateStockModal
                product={selectedProduct}
                onClose={closeUpdateStockModal}
                onUpdateStock={handleUpdateStock}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
