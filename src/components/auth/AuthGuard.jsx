import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // ✅ If no user or token, block everything
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;
