import React from "react";
import styles from "./css/Weekalendar.module.css";

function Weekalendar(props) {
  const today = props.date.getTime();
  const week_dates = [
    today,
    today + 86400000,
    today + 86400000 * 2,
    today + 86400000 * 3,
    today + 86400000 * 4,
    today + 86400000 * 5,
    today + 86400000 * 6,
  ].map((item) => {
    const dateArr = new Date(item).toDateString().split(" ");
    return [dateArr[0], `${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`];
  });

  return (
    <div className={styles.weekalendar_container}>
      <h3>Weekalendar</h3>
      <div className={styles.weekalendar_headers}>
        <div className={styles.classroom_title}>Classroom</div>
        {week_dates.map((arr, idx) => {
          return (
            <div key={idx} className={styles.date_col}>
              <div>{arr[1]}</div>
              <div>{arr[0]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Weekalendar;
