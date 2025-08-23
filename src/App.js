import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Example pages
import LoginPage from "./components/auth/LoginPage";
import Register from "./components/auth/Register";
import UserHomepage from "./components/user/UserHomePage";
import AdminHomepage from "./components/admin/AdminHomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute requiredRole="USER">
                <UserHomepage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminHomepage />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route
            path="/"
            element={
              <Navigate
                to={(() => {
                  const user = localStorage.getItem("user");
                  if (user) {
                    try {
                      const userData = JSON.parse(user);
                      return userData.role === "ADMIN"
                        ? "/admin-dashboard"
                        : "/user-dashboard";
                    } catch {
                      return "/login";
                    }
                  }
                  return "/login";
                })()}
                replace
              />
            }
          />

          {/* Catch-all 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


