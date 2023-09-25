import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios';

const LogAuthGuard = ({element}) => {
    const [user, setUser] = useState([]);
    const {isLoggedIn} = useContext(AuthContext)
  
    useEffect(() => {
      const fetchUser = async () => {
        const uid = localStorage.getItem('user');
        try {
        const response = await axios.get(`http://localhost:8080/v1/users/${uid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = response.data;
        setUser(data);
      } catch (error) {
        return <Navigate to='/unauthorised' />
      }
    };
    fetchUser();
  })

    if(isLoggedIn){
        if(user.isAdmin){
            return <Navigate to='/admin' />
        }
        else{
            return <Navigate to='/' />
        }
    } 
   return element;
}

export default LogAuthGuard