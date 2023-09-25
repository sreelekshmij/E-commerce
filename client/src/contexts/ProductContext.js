import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

const ProductProvider = ({children}) => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8080/v1/products');
      const data = await response.json();
      setProducts(data)
    }
    fetchProducts()
  },[]);
  return <ProductContext.Provider value={{products, setProducts}}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
