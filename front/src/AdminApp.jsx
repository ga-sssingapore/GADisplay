import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminCoursePage from "./pages/AdminCoursesPage";
import AdminDisplayViewerPage from "./pages/AdminDisplayViewerPage";
import AdminEditPage from "./pages/AdminEditPage";
import NavBar from "./pages/components/NavBar";
import AdminRegisterPage from "./pages/AdminRegisterPage";

function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/register" element={<AdminRegisterPage />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/courses" element={<AdminCoursePage />} />
        <Route path="/displays" element={<AdminDisplayViewerPage />} />
        <Route path="/edit" element={<AdminEditPage />} />
      </Routes>
    </>
  );
}

export default AdminApp;
