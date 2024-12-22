import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../utils/AuthContext";

const RegisterGuard = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    // If the user is logged in, redirect to Profile
    return <Navigate to="/profile" replace />;
  }

  // If the user is not logged in, allow access to the Register page
  return children;
};

export default RegisterGuard;
