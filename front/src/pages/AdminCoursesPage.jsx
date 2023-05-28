import React from "react";
import styles from "./pages_css/AdminCoursesPage.module.css";
import CoursesList from "./components/CoursesList";

function AdminCoursesPage() {
  return (
    <div>
      <div className={styles.notes}>*Completed courses are filtered out</div>
      <CoursesList />
    </div>
  );
}

export default AdminCoursesPage;
