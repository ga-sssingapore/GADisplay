import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./pages/components/NavBar";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminCoursePage from "./pages/AdminCoursesPage";
import AdminAddPage from "./pages/AdminAddPage";
import AdminEditPage from "./pages/AdminEditPage";
import AdminAdhocPage from "./pages/AdminAdhocPage";
import AdminDisplayViewerPage from "./pages/AdminDisplayViewerPage";
import AdminAdministrationPage from "./pages/AdminAdministrationPage";
import UserContext from "./context/user";
import jwtDecode from "jwt-decode";
import { fetchData } from "./helpers/common";

function AdminApp() {
  const [accessToken, setAccessToken] = useState("");
  const [claims, setClaims] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <AdminLoginPage
              setAccessToken={setAccessToken}
              setClaims={setClaims}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/register" element={<AdminRegisterPage />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/courses" element={<AdminCoursePage />} />
        <Route path="/courses/add" element={<AdminAddPage />} />
        <Route path="/courses/edit/:course_id" element={<AdminEditPage />} />
        <Route path="/adhoc" element={<AdminAdhocPage />} />
        <Route path="/displays" element={<AdminDisplayViewerPage />} />
        <Route path="/helm" element={<AdminAdministrationPage />} />
      </Routes>
    </>
  );
}

export default AdminApp;
