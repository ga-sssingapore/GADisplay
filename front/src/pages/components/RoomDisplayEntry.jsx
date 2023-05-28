import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/RoomDisplay.module.css";

function RoomDisplayEntry(props) {
  return (
    <Link to={`/display/${props.number}`}>
      <div className={styles.display_link}>Clasroom {props.number}</div>
    </Link>
  );
}

export default RoomDisplayEntry;
