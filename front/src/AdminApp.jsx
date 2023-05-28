import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminCoursePage from "./pages/AdminCoursesPage";
import AdminDisplayViewerPage from "./pages/AdminDisplayViewerPage";
import AdminEditPage from "./pages/AdminEditPage";
import NavBar from "./pages/components/NavBar";

function AdminApp() {
  return (
    <>
      <NavBar />
      {/* {accessToken && <NavBar />} */}
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/courses" element={<AdminCoursePage />} />
        <Route path="/displays" element={<AdminDisplayViewerPage />} />
        <Route path="/edit" element={<AdminEditPage />} />
      </Routes>
    </>
  );
}

export default AdminApp;
