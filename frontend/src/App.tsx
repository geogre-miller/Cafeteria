import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import OAuthSuccess from "./pages/auth/OAuthSuccess";
import PrivateRoute from "../src/routes/PrivateRoute";
import AdminRoute from "../src//routes/AdminRoute";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<OAuthSuccess />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Home />} />

          {/* Admin Only Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
