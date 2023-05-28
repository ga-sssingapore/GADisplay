import React, { useState, useEffect } from "react";
import RoomDisplayEntry from "./RoomDisplayEntry";

function RoomDisplayList(props) {
  const [rooms, setRooms] = useState([1, 2, 3, 4, 5, 6]);

  return (
    <div className={props.styles.room_list}>
      {rooms.map((item, idx) => {
        return (
          <RoomDisplayEntry key={idx} styles={props.styles} number={item} />
        );
      })}
    </div>
  );
}

export default RoomDisplayList;
