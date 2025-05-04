import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../lib/authService";

// Private route component for protected routes
const PrivateRoute: React.FC = () => {
  // Check if user is authenticated
  const auth = isAuthenticated();

  // If authenticated, render the child routes
  // If not, redirect to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
