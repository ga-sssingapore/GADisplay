import React, { useState, useEffect } from "react";
import RoomDisplayEntry from "./RoomDisplayEntry";

function RoomDisplayList() {
  const [rooms, setRooms] = useState([]);

  return (
    <div>
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
