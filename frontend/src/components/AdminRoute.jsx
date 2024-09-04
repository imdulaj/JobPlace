import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export const AdminRoute = ({children}) => {
  const {userInfo} = useSelector((state) => state.signIn);
  return userInfo && userInfo.role === 1 ? children : <Navigate to="/" />
}
