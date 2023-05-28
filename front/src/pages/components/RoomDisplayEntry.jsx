import React from "react";
import { Link } from "react-router-dom";
import dark_styles from "./css/RoomDisplayDark.module.css";
import light_styles from "./css/RoomDisplayLight.module.css";

function RoomDisplayEntry(props) {
  return (
    <Link to={`/display/${props.number}`}>
      <div
        className={
          props.dark ? dark_styles.display_link : light_styles.display_link
        }
      >
        Clasroom {props.number}
      </div>
    </Link>
  );
}

export default RoomDisplayEntry;
