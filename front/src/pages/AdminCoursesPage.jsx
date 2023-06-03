import React, { useState, useEffect } from "react";
import styles from "./pages_css/AdminCoursesPage.module.css";
import CoursesList from "./components/CoursesList";
import { Link } from "react-router-dom";

function AdminCoursesPage() {
  const [courses, setCourses] = useState([
    {
      cohort: "UXDI44SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-02T17:30"),
      classroom: 6,
    },
    {
      cohort: "DSI36SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-09T17:30"),
      classroom: 5,
    },
    {
      cohort: "SEI43SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-09T17:30"),
      classroom: 3,
    },
    {
      cohort: "UXDI45SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-07-21T17:30"),
      classroom: 1,
    },
    {
      cohort: "SEI44SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-07-28T17:30"),
      classroom: 2,
    },
    {
      cohort: "UXDI44SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-02T17:30"),
      classroom: 6,
    },
    {
      cohort: "DSI36SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-09T17:30"),
      classroom: 5,
    },
    {
      cohort: "SEI43SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-09T17:30"),
      classroom: 3,
    },
    {
      cohort: "UXDI45SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-07-21T17:30"),
      classroom: 1,
    },
    {
      cohort: "SEI44SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-07-28T17:30"),
      classroom: 2,
    },
    {
      cohort: "UXDI44SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-02T17:30"),
      classroom: 6,
    },
    {
      cohort: "DSI36SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-09T17:30"),
      classroom: 5,
    },
    {
      cohort: "SEI43SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-09T17:30"),
      classroom: 3,
    },
    {
      cohort: "UXDI45SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-07-21T17:30"),
      classroom: 1,
    },
    {
      cohort: "SEI44SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-07-28T17:30"),
      classroom: 2,
    },
    {
      cohort: "UXDI44SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-02T17:30"),
      classroom: 6,
    },
    {
      cohort: "DSI36SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-09T17:30"),
      classroom: 5,
    },
    {
      cohort: "SEI43SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-09T17:30"),
      classroom: 3,
    },
    {
      cohort: "UXDI45SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-07-21T17:30"),
      classroom: 1,
    },
    {
      cohort: "SEI44SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-07-28T17:30"),
      classroom: 2,
    },
    {
      cohort: "UXDI44SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-02T17:30"),
      classroom: 6,
    },
    {
      cohort: "DSI36SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-09T17:30"),
      classroom: 5,
    },
    {
      cohort: "SEI43SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-06-09T17:30"),
      classroom: 3,
    },
    {
      cohort: "UXDI45SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-07-21T17:30"),
      classroom: 1,
    },
    {
      cohort: "SEI44SGP",
      type: "Fulltime",
      start: new Date("2023-05-17T09:30"),
      end: new Date("2023-07-28T17:30"),
      classroom: 2,
    },
  ]);
  return (
    <div>
      <div className={styles.container}>
        <h5>*Completed courses have already been filtered out</h5>
      </div>
      <CoursesList courses={courses} />
      <Link to="/admin/courses/add">
        <div className={styles.add_button}>Add Course(s)</div>
      </Link>
    </div>
  );
}

export default AdminCoursesPage;
