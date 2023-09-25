import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineShopping } from "react-icons/ai";

import CartItem from "../components/CartItem";

import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";


const Sidebar = () => {
  const navigate = useNavigate();
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  // const carts = cart.map((item) => {
  //   return item._id;
  // });
  // console.log(carts,"itemsss")

  const checkOut = async() => {
    if(isLoggedIn){
      const logged = window.confirm("Are U Sure?")
      if(logged){
        navigate('/checkout')
        handleClose()
      } else {
        return <CartItem />;
      }
    }
  }
  // console.log(cart,"cart")
  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      {cart.length < 1 && (
        <div className="text-center">
          <AiOutlineShopping className="mx-auto" size={150} />
          <h3 className="text-xl mt-4 font-semibold">
            Your Shopping bag is empty
          </h3>
          <Link to="/">
            <button
              type="button"
              className="bg-purple-400 hover:bg-purple-600 mt-4 py-2 px-4 text-white rounded-lg"
            >
              CONTINUE SHOPPING
            </button>
          </Link>
        </div>
      )}
      <div className="flex flex-col gap-y-2 h-[450px] overflow-y-auto overflow-x-auto border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item._id} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex w-full justify-between items-center">
          <div>
            <span>Total: </span> $ {parseFloat(total).toFixed(2)}
          </div>
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
          <div className="">
            <button
              onClick={checkOut}
              className="p-2 w-full bg-pink-500 text-white hover:bg-pink-900 rounded"
            >
              CheckOut
            </button>
          </div>
      </div>
    </div>
  );
};

export default Sidebar;
