import React from "react";
import CourseForm from "./components/CourseForm";
import CourseCSVImport from "./components/CourseCSVImport";

function AdminAddPage() {
  return (
    <>
      <CourseForm />
      <hr />
      <CourseCSVImport />
    </>
  );
}

export default AdminAddPage;
