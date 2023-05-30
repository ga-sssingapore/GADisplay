import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./pages/components/NavBar";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminCoursePage from "./pages/AdminCoursesPage";
import AdminAdhocPage from "./pages/AdminAdhocPage";
import AdminDisplayViewerPage from "./pages/AdminDisplayViewerPage";
import AdminEditPage from "./pages/AdminEditPage";
import AdminHelmPage from "./pages/AdminHelmPage";

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
        <Route path="/adhoc" element={<AdminAdhocPage />} />
        <Route path="/displays" element={<AdminDisplayViewerPage />} />
        <Route path="/edit" element={<AdminEditPage />} />
        <Route path="/helm" element={<AdminHelmPage />} />
      </Routes>
    </>
  );
}

export default AdminApp;
