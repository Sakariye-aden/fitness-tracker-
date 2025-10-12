import React from 'react'
import {useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router'

const ProtectedRoute = ({children} , RedirecTo="/signin") => {
    
    const { isLoggedIn } = useAuth()
  
    if(!isLoggedIn){
        return <Navigate to={RedirecTo} replace/>
    }
   
    return children
}

export default ProtectedRoute