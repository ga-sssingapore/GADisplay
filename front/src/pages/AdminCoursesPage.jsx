import React, { useState, useEffect } from "react";
import styles from "./pages_css/AdminCoursesPage.module.css";
import CoursesList from "./components/CoursesList";
import { Link } from "react-router-dom";

function AdminCoursesPage() {
  const [courses, setCourses] = useState([
    {
      name: "DSIFX10SGP",
      starts: new Date("2023-02-05T09:00"),
      ends: new Date("2023-08-26T18:00"),
    },
  ]);
  return (
    <div>
      <div className={styles.container}>
        <h5>*Completed courses have already been filtered out</h5>
      </div>
      <CoursesList courses={courses} setDataComplete={() => ""} />
      <Link to="/admin/courses/add">
        <div className={styles.add_button}>Add Course(s)</div>
      </Link>
    </div>
  );
}

export default AdminCoursesPage;
