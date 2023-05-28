import React, { useState, useEffect } from "react";
import RoomDisplayEntry from "./RoomDisplayEntry";
import dark_styles from "./css/RoomDisplayDark.module.css";
import light_styles from "./css/RoomDisplayLight.module.css";

function RoomDisplayList(props) {
  const [rooms, setRooms] = useState([]);

  return (
    <div
      className={props.dark ? dark_styles.room_list : light_styles.room_list}
    >
      <RoomDisplayEntry dark={props.dark} number="1" />
      <RoomDisplayEntry dark={props.dark} number="2" />
      <RoomDisplayEntry dark={props.dark} number="3" />
      <RoomDisplayEntry dark={props.dark} number="4" />
      <RoomDisplayEntry dark={props.dark} number="5" />
      <RoomDisplayEntry dark={props.dark} number="6" />
    </div>
  );
}

export default RoomDisplayList;
