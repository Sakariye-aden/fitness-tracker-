import React from 'react'
import {useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router'

const UnAuthenticated = (children , RedirecTo="/") => {
    
    const { isLoggedIn } = useAuth()
  
    if(isLoggedIn){
        return Navigate(RedirecTo)
    }
   
    return children
}

export default UnAuthenticated