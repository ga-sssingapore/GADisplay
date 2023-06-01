import React, { useState } from "react";
import styles from "./pages_css/AdminCoursesPage.module.css";
import CoursesList from "./components/CoursesList";
import { Link } from "react-router-dom";

function AdminCoursesPage() {
  return (
    <div>
      <div className={styles.container}>
        <h5>*Completed courses have already been filtered out</h5>
      </div>
      <CoursesList />
      <Link to="/admin/courses/add">
        <div className={styles.add_button}>Add Course(s)</div>
      </Link>
    </div>
  );
}

export default AdminCoursesPage;
