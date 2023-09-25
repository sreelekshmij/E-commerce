import axios from 'axios';
import React, { createContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const navigate = useNavigate();
    const [isLoggedIn , setIsLoggedIn] = useState(!!localStorage.getItem('token'))

    const login = () => {
        setIsLoggedIn(true);
      // console.log(token,'user')
    }

    const logout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if(confirmLogout){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            setIsLoggedIn(false)
            navigate('/login')
        }
    };
    
  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider