import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  let userRole;
  try {
    userRole = JSON.parse(userStr).role;
  } catch {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <Navigate
        to={userRole === "ADMIN" ? "/admin-dashboard" : "/user-dashboard"}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
