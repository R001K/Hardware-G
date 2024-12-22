import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../utils/AuthContext";

const AuthGuard = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If the user is not logged in, redirect to Login
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the protected component
  return children;
};

export default AuthGuard;
