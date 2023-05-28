import React from "react";
import styles from "./css/CourseCodeFilter.module.css";

function CourseCodeFilter(props) {
  function handleCodeRegexChange(event) {
    props.setCourseCodeRegex(event.target.value);
  }

  return (
    <form className={styles.course_code_searchbar}>
      <input
        type="text"
        id="course_search"
        placeholder="Filter by course code"
        onChange={handleCodeRegexChange}
        value={props.courseCodeRegex}
        className={styles.course_code_input}
      />
      <input
        type="reset"
        value="X"
        onClick={() => props.setCourseCodeRegex("")}
        className={styles.course_code_reset}
      />
    </form>
  );
}

export default CourseCodeFilter;
