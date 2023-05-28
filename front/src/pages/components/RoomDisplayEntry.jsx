import React from "react";
import { Link } from "react-router-dom";

function RoomDisplayEntry(props) {
  return (
    <Link to={`/display/${props.number}`}>
      <div>Clasroom {props.number}</div>
    </Link>
  );
}

export default RoomDisplayEntry;
