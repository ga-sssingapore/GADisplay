import React from "react";
import styles from "./css/AdhocList.module.css";

function AdhocListEntry(props) {
  return (
    <tr>
      <td className={styles.event}>{props.event}</td>
      <td className={styles.room}>{props.room}</td>
      <td className={styles.date}>{props.date}</td>
      <td className={styles.start}>{props.start}</td>
      <td className={styles.end}>{props.end}</td>
      <td className={styles.purpose}>{props.purpose}</td>
    </tr>
  );
}

export default AdhocListEntry;
