import React from "react";
import CourseEntry from "./CourseEntry";
import styles from "./css/CoursesList.module.css";

function CoursesList(props) {
  return (
    <div>
      <div className={styles.course_table_border}>
        <table>
          <thead className={styles.table_header_row}>
            <tr>
              <td className={styles.cohort}>Cohort</td>
              <td className={styles.type}>Type</td>
              <td className={styles.date}>Start Date</td>
              <td className={styles.date}>End Date</td>
              <td className={styles.time}>Start Time</td>
              <td className={styles.time}>End Time</td>
              <td className={styles.days}>Campus Days</td>
              <td className={styles.room}>Room</td>
            </tr>
          </thead>
          {props.courses.map((item, idx) => {
            return (
              <CourseEntry
                key={idx}
                idx={idx}
                course={item}
                setDataComplete={props.setDataComplete}
              />
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default CoursesList;
