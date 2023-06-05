import React from "react";
import CourseForm from "./components/CourseForm";
import CourseCSVImport from "./components/CourseCSVImport";

function AdminAddPage() {
  return (
    <>
      <CourseForm submission_method={"PUT"} />
      <hr />
      <CourseCSVImport />
    </>
  );
}

export default AdminAddPage;
