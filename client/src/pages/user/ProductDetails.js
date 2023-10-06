import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { ProductContext } from "../../contexts/ProductContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  // console.log(id)
  const product = products.find((item) => {
    return item._id === id;
  });
  // console.log(product);
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading....
      </section>
    );
  }

  const { title, price, desc, img , inStock} = product;

  return (
    <>
      <Header />
      <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img className="max-w-[200px] lg:max-w-sm" src={img} alt="" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {title}
              </h1>
              <div className="text-xl text-red-500 font-medium mb-6">
                $ {price}
              </div>
              <p className="mb-8">{desc}</p>
              {inStock ? (
                <button
                  onClick={()=> addToCart(product,id)}
                  className="bg-primary py-4 px-8 text-white"
                >
                  Add To Cart
                </button>
              ) : (
                <div className="text-red-600 font-semibold">Out of Stock</div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
