import React, { useState } from "react";
import styles from "./css/AdhocList.module.css";
import AdhocListEntry from "./AdhocListEntry";
import { getLocaleTime } from "../../helpers/common";

function AdhocList(props) {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      className={styles.adhoc_table}
      onClick={() => {
        setClicked(!clicked);
      }}
    >
      <div className={styles.header}>
        <div>Event</div>
        <div>Room</div>
        <div>Date</div>
        <div>Start Time</div>
        <div>End Time</div>
        <div>Purpose</div>
        <div>Created By</div>
        <div>Delete</div>
      </div>
      {props.adhocs.map((item, idx) => {
        // [Day, Mmm, DD, YYYY, HH:MM:SS]
        const startDateArr = item.starts.toDateString().split(" ");
        return (
          <AdhocListEntry
            key={idx}
            id={idx}
            num={item.num}
            event={item.name}
            room={item.room}
            date={`${startDateArr[2]} ${startDateArr[1]} ${startDateArr[3]}`}
            start={getLocaleTime(item.starts)}
            end={getLocaleTime(item.ends)}
            purpose={item.purpose}
            user={item.id.name}
            getAdhocs={props.getAdhocs}
            clicked={clicked}
          />
        );
      })}
    </div>
  );
}

export default AdhocList;
