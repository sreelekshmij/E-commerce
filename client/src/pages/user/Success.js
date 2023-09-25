import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

const Success = () => {
  const {clearCart} = useContext(CartContext)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-green-500 mb-4">Success!</h1>
        <p className="text-gray-700">
          Your request has been successfully processed.
        </p>
        <Link to='/'>
          <button type='button' onClick={clearCart} className='bg-purple-400 hover:bg-purple-600 mt-4 py-2 px-4 text-white rounded-lg'>CONTINUE SHOPPING</button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
