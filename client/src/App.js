import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './pages/user/Home'
import ProductDetails from './pages/user/ProductDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Success from './pages/user/Success';
import Admin from './pages/admin/Admin'

import Sidebar from './components/Sidebar'
import AuthProvider from './contexts/AuthContext';
import ProductList from './pages/admin/ProductList';
import UserList from './pages/admin/UserList';
import AddProduct from './pages/admin/AddProduct';
import Checkout from './pages/user/Checkout';
import OrderDetails from './pages/admin/OrderDetails';
import AdAuthGuard from './components/Guard/AdAuthGuard';
import Unauthorised from './pages/Unauthorised';
import ForgotPass from './pages/ForgotPass';
import ResetPass from './pages/ResetPass';
import Verification from './pages/Verification';
import LogAuthGuard from './components/Guard/LogAuthGuard';


const App = () => {
  return (
    <div className='overflow-hidden'>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path='*' element= {<Unauthorised />}/>
          <Route path='/login' element={<LogAuthGuard element={<Login />} />} />
          <Route path='/register' element={<LogAuthGuard element={<Register />} />} />
          <Route path='/forgotpassword' element = {<LogAuthGuard element={<ForgotPass />} />} />
          <Route path='/resetpassword' element = {<LogAuthGuard element={<ResetPass />} />} />
          <Route path='/verify' element = {<LogAuthGuard element={<Verification />} />} />
          
          <Route path='/' element={<Home />}  />
          <Route path='/product/:id' element= {<AdAuthGuard allowedRoles={['user']} element={<ProductDetails />} />}  />
          <Route path='/checkout' element={<AdAuthGuard allowedRoles={['user']} element={<Checkout />} />} />
          <Route path='/success' element = {<AdAuthGuard allowedRoles={['user']} element={<Success />} />} />

            <Route path='/admin'  element={<AdAuthGuard allowedRoles={['admin']} element={<Admin />} />} />
            <Route path='/admin/products' element={<AdAuthGuard allowedRoles={['admin']} element={<ProductList />} />}/>
            <Route path='/admin/users' element={<AdAuthGuard allowedRoles={['admin']} element={<UserList />} />} />
            <Route path='/admin/products/add' element={<AdAuthGuard allowedRoles={['admin']} element={<AddProduct />} />} />
            <Route path='/admin/orderdetails' element={<AdAuthGuard allowedRoles={['admin']} element={<OrderDetails />} />} />
        </Routes>
        <Sidebar />
      </AuthProvider>
      </Router>
    </div>
  )
};

export default App;
