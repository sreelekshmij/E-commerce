import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const AdSidebar = () => {
    const {logout} = useContext(AuthContext)
  return (

      <nav className="bg-gray-800 w-64 py-6">
      <div className="text-white text-2xl font-semibold px-4">Admin Panel</div>
      <ul className="mt-6">
      <li className="text-gray-400 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer">
      <Link to='/admin'>Dashboard </Link>
      </li>
      <li className="text-gray-400 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer">
      <Link to='/admin/users'>Users </Link>
      </li>
      <li className="text-gray-400 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer">
      <Link to='/admin/products'>Products</Link>
      </li>
      <li className="text-gray-400 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer">
      <Link to='/admin/orderdetails'>Orders</Link>
      </li>
      <li className="text-gray-400 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer">
      <button onClick={logout}>LogOut</button>
      </li>
      </ul>
      </nav>
      )
}

export default AdSidebar