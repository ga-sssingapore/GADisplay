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
import AdminErrorPage from "./pages/AdminErrorPage";

function AdminApp() {
  const [accessToken, setAccessToken] = useState("");
  const [claims, setClaims] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          claims,
        }}
      >
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
          <Route
            path="/dashboard"
            element={isLoggedIn ? <AdminDashboardPage /> : <AdminErrorPage />}
          />
          <Route
            path="/courses"
            element={isLoggedIn ? <AdminCoursePage /> : <AdminErrorPage />}
          />
          <Route
            path="/courses/add"
            element={isLoggedIn ? <AdminAddPage /> : <AdminErrorPage />}
          />
          <Route
            path="/courses/edit/:course_id"
            element={isLoggedIn ? <AdminEditPage /> : <AdminErrorPage />}
          />
          <Route
            path="/adhoc"
            element={isLoggedIn ? <AdminAdhocPage /> : <AdminErrorPage />}
          />
          <Route
            path="/displays"
            element={
              isLoggedIn ? <AdminDisplayViewerPage /> : <AdminErrorPage />
            }
          />
          <Route
            path="/administration"
            element={
              isLoggedIn ? <AdminAdministrationPage /> : <AdminErrorPage />
            }
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default AdminApp;
