import React from "react";
import { Link } from "react-router-dom";

function RoomDisplayEntry(props) {
  return (
    <Link to={`/display/${props.number}`}>
      <div className={props.styles.display_link}>CLASSROOM {props.number}</div>
    </Link>
  );
}

export default RoomDisplayEntry;
