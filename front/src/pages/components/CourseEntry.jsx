import React from "react";
import styles from "./css/CourseEntry.module.css";
import tStyles from "./css/CoursesList.module.css";

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
    <tbody>
      <tr>
        <td className={tStyles.cohort}>{props.name}</td>
        <td className={tStyles.type}>{props.course_type}</td>
        <td className={tStyles.date}>{getDate(props.starts)}</td>
        <td className={tStyles.date}>{getDate(props.ends)}</td>
        <td className={tStyles.time}>{getTime(props.starts)}</td>
        <td className={tStyles.time}>{getTime(props.ends)}</td>
        <td className={tStyles.days}>{props.schedule}</td>
        <td className={tStyles.room}>{props.room}</td>
      </tr>
    </tbody>
  );
}

export default CourseEntry;
