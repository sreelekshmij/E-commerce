import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { BsBag, BsPersonCircle } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ProductContext } from "../contexts/ProductContext";
import UserProfile from "./UserProfile";
import axios from "axios";

const Header = () => {
  const { products } = useContext(ProductContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const uid = localStorage.getItem('user')

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredItems = products.filter((product) =>
    product.title.trim().toLowerCase().includes(query.trim().toLowerCase())
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  const viewUser = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSelectedUser(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log("error in fetching the user:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 h-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link className="text-2xl" to={"/"}>
          E-COMMERCE
        </Link>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-sm w-full md:w-auto relative">
          <div className="relative group flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-full pl-4 pr-8 py-2 outline-none border border-gray-300 focus:border-black transition-all"
              value={query}
              onChange={handleInputChange}
              onFocus={() => setIsFocus(true)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 group-hover:opacity-100 opacity-0 transition-opacity">
              Search
            </button>
          </div>
          {isFocus && filteredItems.length > 0 && (
            <div className="md:absolute bg-white border rounded-lg mt-2 md:top-10 md:w-64 shadow-lg max-h-48 overflow-y-auto">
              {filteredItems.map((product) => (
                <Link
                  className="block px-4 py-2 hover:bg-gray-100"
                  to={`/product/${product._id}`}
                >
                  {product.title}
                </Link>
              ))}
            </div>
          )}

          {isLoggedIn ? (
            <>
              <button onClick={logout}>Logout</button>
              <button onClick={() => viewUser(uid)}>
                <BsPersonCircle className="text-2xl" />
              </button>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex relative items-center"
              >
                <BsBag className="text-2xl" />
                <div className="absolute bg-red-600 -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                  {itemAmount}
                </div>
              </div>
              {isModalOpen && (
                <UserProfile user={selectedUser} onClose={closeModal} />
              )}
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">SignIn</Link>
              <div
                onClick={() => {
                  const logged = window.confirm("You need to Login");
                  if (logged) {
                    navigate("/login");
                  }
                }}
                className="cursor-pointer flex relative items-center"
              >
                <BsBag className="text-2xl" />
                <div className="absolute bg-red-600 -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                  {itemAmount}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
