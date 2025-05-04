import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAdmin } from "../lib/authService";

const AdminRoute = () => {
  const admin = isAdmin();

  // If admin, render the child routes
  // If not, redirect to home page
  return admin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
