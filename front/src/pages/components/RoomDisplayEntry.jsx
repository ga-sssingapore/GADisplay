import React from "react";
import { Link } from "react-router-dom";

function RoomDisplayEntry(props) {
  return (
    <Link
      to={
        props.admin
          ? `/admin/display/${props.number}`
          : `/display/${props.number}`
      }
      state={{ admin: props.admin }}
    >
      <div className={props.styles.display_link}>ROOM {props.number}</div>
    </Link>
  );
}

export default RoomDisplayEntry;
