import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {

  if(!localStorage.getItem("role")){
    return <Navigate to={"/"}/>
  }
  return children;
}

export default PrivateRoute