import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  },[cart]);
  
  console.log(cart, "check cart");
  
  const getCart = async () => {
    const uid = localStorage.getItem("user");
    const response = await axios.get(`http://localhost:8080/v1/cart/${uid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const sum = response.data.products.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
      );
      console.log(response.data,"userCart")
      let products = []
      products = response.data.products.map((x) => {
        if (!products.includes(x)) {
          x.productId.amount = x.quantity;
          return x.productId; 
        }
      });
      console.log(products, "check products");
      setCart(products);
      setItemAmount(sum);
    };
    
    const addToCart = async (product, _id) => {
      try {
        console.log("hellooo");
        const response = await axios.post(
          "http://localhost:8080/v1/cart/add",
          {
            userId: localStorage.getItem("user"),
            productId: _id,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        await getCart();
        console.log(response.data, "cart");
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    };
    

  const removeFromCart = async (product,_id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== _id));
    const uid = localStorage.getItem("user");
    const response = await axios.patch(
      `http://localhost:8080/v1/cart/${uid}`,
      {
        productId: _id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response, "newcart");
    await getCart();
  };

  const clearCart = async () => {
    const uid = localStorage.getItem("user");
    await axios.delete(
      `http://localhost:8080/v1/cart/${uid}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    getCart()
    // console.log(cart,"caaaaaaart")
  };

  const increaseAmount = (_id) => {
    const cartItem = cart.find((item) => item._id === _id);
    addToCart(cartItem, _id);
  };

  const decreaseAmount = (_id) => {
    const cartItem = cart.find((item) => {
      return item._id === _id;
    });
    removeFromCart(cartItem,_id)
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
