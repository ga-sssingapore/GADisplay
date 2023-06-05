import React, { useState, useEffect, useContext } from "react";
import styles from "./pages_css/AdminCoursesPage.module.css";
import CoursesList from "./components/CoursesList";
import { Link } from "react-router-dom";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";

function AdminCoursesPage() {
  const userCtx = useContext(UserContext);
  const [courses, setCourses] = useState([]);

  async function getCohorts() {
    try {
      const { ok, data } = await fetchData("/cohorts/", userCtx.accessToken);
      if (ok) {
        data.map((item) => {
          item.starts = new Date(item.starts);
          item.ends = new Date(item.ends);
        });
        setCourses(data);
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error);
      alert("Error getting courses");
    }
  }

  useEffect(() => {
    if (userCtx.accessToken != "") {
      getCohorts();
    }
  }, [userCtx.accessToken]);

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
