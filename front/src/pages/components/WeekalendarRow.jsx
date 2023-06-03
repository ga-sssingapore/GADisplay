import React from "react";
import styles from "./css/Weekalendar.module.css";

function WeekalendarRow(props) {
  function extractNames(col) {
    if (col.length <= 1) {
      return col[0]?.name;
    } else {
      // Check if multiples events conflict
    }
  }
  return (
    <tr className={props.id % 2 == 0 ? styles.alt_row : styles.row}>
      <td className={styles.room}>{props.id}</td>
      <td className={props.sunday === 0 ? styles.sunday : ""}>
        {extractNames(props.columns[0])}
      </td>
      <td className={props.sunday === 1 ? styles.sunday : ""}>
        {extractNames(props.columns[1])}
      </td>
      <td className={props.sunday === 2 ? styles.sunday : ""}>
        {extractNames(props.columns[2])}
      </td>
      <td className={props.sunday === 3 ? styles.sunday : ""}>
        {extractNames(props.columns[3])}
      </td>
      <td className={props.sunday === 4 ? styles.sunday : ""}>
        {extractNames(props.columns[4])}
      </td>
      <td className={props.sunday === 5 ? styles.sunday : ""}>
        {extractNames(props.columns[5])}
      </td>
      <td className={props.sunday === 6 ? styles.sunday : ""}>
        {extractNames(props.columns[6])}
      </td>
    </tr>
  );
}

export default WeekalendarRow;
