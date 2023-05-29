import React, { useState } from "react";
import styles from "./pages_css/AdminCoursesPage.module.css";
import CoursesList from "./components/CoursesList";

function AdminCoursesPage() {
  return (
    <div>
      <div className={styles.filter_container}>
        <h5>*Completed courses have already been filtered out</h5>
      </div>
      <CoursesList />
    </div>
  );
}

export default AdminCoursesPage;
