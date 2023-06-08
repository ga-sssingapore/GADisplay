import React from "react";
import styles from "./css/CourseEntry.module.css";
import { Link } from "react-router-dom";
import { getTimeFrDate } from "../../helpers/common";

function CourseEntry(props) {
  function getDate(dateObj) {
    if (dateObj.toString() == "Invalid Date") {
      return "";
    }
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

  function getType(type) {
    switch (type) {
      case "FT":
        return "Full Time";
      case "PT":
        return "Part Time";
      default:
        return type;
    }
  }

  function getDays(combi) {
    if (combi == "SO") {
      return "Alt.S";
    } else if (combi == "SE") {
      return "Even.S";
    } else if (combi == "No") {
      return "None";
    } else if (combi == "MoTuWeThFrSASu") {
      return "Everyday";
    }
    const daysArr = combi.match(/../g);
    const acronymizedArr = daysArr.map((item) => {
      if (item.charAt(0) != "S" || item == "SA") {
        return item.charAt(0);
      } else {
        // Sunday displayed as Su
        return item;
      }
    });
    return acronymizedArr.reduce((res, item) => res + item, "");
  }

  function setMissing() {
    props.setDataComplete(false);
    return styles.missing;
  }

  return (
    <tbody>
      <tr className={props.idx % 2 == 1 ? styles.alt_row : ""}>
        <td
          className={
            props.course.name ? (props.noLink ? "" : styles.link) : setMissing()
          }
        >
          {props.noLink ? (
            props.course.name
          ) : (
            <Link
              to={`/admin/courses/edit/${props.course.name}`}
              state={{ course: props.course }}
            >
              {props.course.name}
            </Link>
          )}
        </td>
        <td className={props.course.course_type ? "" : setMissing()}>
          {getType(props.course.course_type)}
        </td>
        <td className={getDate(props.course.starts) ? "" : setMissing()}>
          {getDate(props.course.starts)}
        </td>
        <td className={getDate(props.course.ends) ? "" : setMissing()}>
          {getDate(props.course.ends)}
        </td>
        <td className={getTimeFrDate(props.course.starts) ? "" : setMissing()}>
          {getTimeFrDate(props.course.starts)}
        </td>
        <td className={getTimeFrDate(props.course.ends) ? "" : setMissing()}>
          {getTimeFrDate(props.course.ends)}
        </td>
        <td className={props.course.schedule ? "" : setMissing()}>
          {getDays(props.course.schedule)}
        </td>
        <td className={props.course.room ? "" : setMissing()}>
          {props.course.room}
        </td>
      </tr>
    </tbody>
  );
}

export default CourseEntry;
