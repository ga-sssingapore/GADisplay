import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DisplayPage from "./pages/DisplayPage";
const AdminApp = React.lazy(() => import("./AdminApp"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/display/:number" element={<DisplayPage />} />
        <Route
          path="/admin/*"
          element={
            <Suspense>
              <AdminApp />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
