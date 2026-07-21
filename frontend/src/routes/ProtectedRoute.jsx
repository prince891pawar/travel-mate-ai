import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Trips from "../pages/trips";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Trips /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;