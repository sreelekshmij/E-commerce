import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {BsPlus, BsEyeFill} from 'react-icons/bs'
import { CartContext } from '../contexts/CartContext';

const Product = ({product}) => {
  const {addToCart} = useContext(CartContext)
  const {_id, img, category, title, price, inStock} = product;

  const handleAddToCart = async () => {
    // console.log(inStock,"hjfru")
    if (inStock) {
      await addToCart(product, _id);
    } else {
      // console.log("gvfjdgfjsdg")
      alert('This product is out of stock.');
    }
  };

  return (
    <div>
      <div className='border border-[#e4e4e4] h-[300px] mg-4 relative overflow-hidden group transition'>
        <div className='w-full h-full flex justify-center items-center'>
          {/* image */}
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            <img className='max-h-[160px] group-hover:scale-110 transition duration-300' src= {img} alt='' />
          </div>
          <div className='absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
            <button onClick={handleAddToCart}>
              <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
                <BsPlus className='text-3xl'/>
              </div>
            </button>
            <Link to={`/product/${_id}`} className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl'>
              <BsEyeFill />
            </Link>
          </div>
        </div>

      </div>
      <div>
        {category}
      </div>
      <Link to={`/product/${_id}`}>
        <h2 className='font-semibold mb-1'>{title}</h2>
      </Link>
      <div className='font-semibold text-green-600'>$ {price}</div>
    </div>
  )
};

export default Product;
