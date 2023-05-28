import React, { useState, useEffect } from "react";
import CourseEntry from "./CourseEntry";
import styles from "./css/CoursesList.module.css";
import CourseCodeFilter from "./CourseCodeFilter";

function CoursesList() {
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
  const [courseCodeRegex, setCourseCodeRegex] = useState("");

  function applyPredicates(course) {
    let qualify = false;
    qualify = new RegExp(courseCodeRegex).test(course.cohort);
    return qualify;
  }

  return (
    <div>
      <div className={styles.filter_container}>
        <CourseCodeFilter
          courseCodeRegex={courseCodeRegex}
          setCourseCodeRegex={setCourseCodeRegex}
        />
      </div>
      <div className={styles.course_table_border}>
        <table>
          <thead className={styles.table_header_row}>
            <tr>
              <td className={styles.cohort}>Cohort</td>
              <td className={styles.type}>Type</td>
              <td className={styles.start_date}>Start Date</td>
              <td className={styles.end_date}>End Date</td>
              <td className={styles.start_time}>Start Time</td>
              <td className={styles.end_time}>End Time</td>
              <td className={styles.classroom}>Classroom</td>
            </tr>
          </thead>
          {courses.map((item, idx) => {
            return (
              applyPredicates(item) && (
                <CourseEntry
                  key={idx}
                  cohort={item.cohort}
                  type={item.type}
                  start={item.start}
                  end={item.end}
                  classroom={item.classroom}
                />
              )
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default CoursesList;
