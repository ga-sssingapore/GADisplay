import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DisplayPage from "./pages/DisplayPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminCoursePage from "./pages/AdminCoursesPage";
import AdminDisplayViewerPage from "./pages/AdminDisplayViewerPage";
import AdminEditPage from "./pages/AdminEditPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/display/:number" element={<DisplayPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/courses" element={<AdminCoursePage />} />
        <Route path="/admin/displays" element={<AdminDisplayViewerPage />} />
        <Route path="/admin/edit" element={<AdminEditPage />} />
      </Routes>
    </>
  );
}

export default App;
