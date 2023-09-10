import React from 'react';
import { Navigate } from "react-router-dom";

export const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/" replace />
  )
}

export const ProtectedRouteAuth = ({ element: Component, ...props }) => {
  return (
    !props.loggedIn ? <Component {...props} /> : <Navigate to="/movies" replace />
  )
}
