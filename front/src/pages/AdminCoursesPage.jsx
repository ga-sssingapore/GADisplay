import React, { useState } from "react";
import styles from "./pages_css/AdminCoursesPage.module.css";
import CoursesList from "./components/CoursesList";
import CourseCodeFilter from "./components/CourseCodeFilter";

function AdminCoursesPage() {
  const [courseCodeRegex, setCourseCodeRegex] = useState("");

  function applyPredicates(course) {
    let qualify = false;
    qualify = new RegExp(courseCodeRegex, "i").test(course.cohort);
    return qualify;
  }

  return (
    <div>
      <div className={styles.filter_container}>
        <h5>
          Filter courses with the following options *Completed courses have
          already been filtered out
        </h5>
        <CourseCodeFilter
          courseCodeRegex={courseCodeRegex}
          setCourseCodeRegex={setCourseCodeRegex}
        />
      </div>
      <CoursesList applyPredicates={applyPredicates} />
    </div>
  );
}

export default AdminCoursesPage;
