import React, { useState, useEffect } from "react";
import RoomDisplayEntry from "./RoomDisplayEntry";
import styles from "./css/RoomDisplay.module.css";

function RoomDisplayList() {
  const [rooms, setRooms] = useState([]);

  return (
    <div className={styles.room_list}>
      <RoomDisplayEntry number="1" />
      <RoomDisplayEntry number="2" />
      <RoomDisplayEntry number="3" />
      <RoomDisplayEntry number="4" />
      <RoomDisplayEntry number="5" />
      <RoomDisplayEntry number="6" />
    </div>
  );
}

export default RoomDisplayList;
