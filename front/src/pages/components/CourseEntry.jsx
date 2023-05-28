import React from "react";
import styles from "./css/CourseEntry.module.css";

function CourseEntry(props) {
  function getDate(dateObj) {
    // [day, mth, dd, yyyy, timestr, GMT, (country, standard, time)]
    const strArray = dateObj.toString().split(" ");
    let day = Number(strArray[2]);
    switch (day) {
      case 1:
        day += "st";
        break;
      case 2:
        day += "nd";
        break;
      case 3:
        day += "rd";
        break;
      default:
        day += "th";
        break;
    }
    return `${strArray[0]}, ${day} ${strArray[1]} ${strArray[3]}`;
  }

  function getTime(dateObj) {
    // [hh,mm,ss]
    const timeArray = dateObj.toString().split(" ")[4].split(":");
    const hour = Number(timeArray[0]);
    // Returns AM if before 1200 and PM if 2359 and before. Shouldn't have 2400h
    return `${hour % 12 === 0 ? 12 : hour % 12}:${timeArray[1]} ${
      hour / 12 >= 1 ? "PM" : "AM"
    }`;
  }
  return (
    <tbody className={styles.table_header_row}>
      <tr>
        <td className={styles.cohort}>{props.cohort}</td>
        <td className={styles.type}>{props.type}</td>
        <td className={styles.start_date}>{getDate(props.start)}</td>
        <td className={styles.end_date}>{getDate(props.end)}</td>
        <td className={styles.start_time}>{getTime(props.start)}</td>
        <td className={styles.end_time}>{getTime(props.end)}</td>
        <td className={styles.classroom}>{props.classroom}</td>
      </tr>
    </tbody>
  );
}

export default CourseEntry;
