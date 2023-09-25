import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()
    const [error,setError] = useState(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/v1/auth/login", formData);
      // console.log(response)
      const user = response.data.user
      const token = response.data.token
      localStorage.setItem('token',token);
      localStorage.setItem('user',user._id);
      login()
      if(user.isAdmin){
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      if(error.response){
        setError(error.response.data.message)
      }   
    }
  };
  return (
    <div className='flex h-screen justify-center bg-cover' style={{backgroundImage:`url("https://img.freepik.com/free-photo/modern-pretty-girl-beige-coat-standing-near-building-outdoor-glamorous-sunglasses-her-face-makeup-stylish-tail-hairstyle-hand-near-face-lot-summer-light-last-warm-days_343629-69.jpg?t=st=1694162778~exp=1694163378~hmac=ed6af445243633b73501649fb82ca2bb365676e38f88dc65134d0e53c14199d1")`}}>
        <form onSubmit={handleLogin} className='p-4 rounded-lg border m-auto w-1/3 bg-slate-300/75'>
            <h1 className='text-4xl text-center'>Login</h1>
            { error && <div className="text-red-600 text-center text-sm mt-2">{error}</div>}
            <div className='my-5 w-full'>
                <label for='email'>Email</label>
                <input className='p-2 rounded w-full border' name='email'
                placeholder='Email Address' onChange={handleInputChange} required/>
            </div>
            <div className='my-4 w-full'>
                <label for='password'>Password</label>
                <input type='password' className='p-2 rounded w-full border' name='password'
                placeholder='Password' onChange={handleInputChange} required/>
            <Link className='text-xs uppercase text-blue-800 font-medium max-w-[240px] hover:underline' to='/forgotpassword'>Forgot Password</Link>
            </div>
            <div className='my-3 w-full'>
                <button type='submit' className='p-2 w-full bg-pink-500 text-white hover:bg-pink-900 rounded'>Submit</button>
            </div>
            <p className='text-xs'>Still not a Customer?
            <Link className='text-xs uppercase text-blue-800 font-medium max-w-[240px] hover:underline' to='/register'>Create A New Account</Link>
            </p>
        </form>
    </div>
  )
}

export default Login;