import React, { useState } from "react";
import styles from "./css/AdhocList.module.css";
import AdhocListEntry from "./AdhocListEntry";

function AdhocList() {
  const [adhocs, setAdhocs] = useState([
    {
      name: "Test",
      room: 2,
      date: new Date("2023-06-06"),
      starts: new Date("2023-06-06T09:30"),
      ends: new Date("2023-06-06T18:30"),
      purpose: "Testing table",
    },
  ]);
  return (
    <table className={styles.adhoc_table}>
      <thead>
        <tr className={styles.table_header}>
          <td className={styles.event}>Event</td>
          <td className={styles.room}>Room</td>
          <td className={styles.date}>Date</td>
          <td className={styles.start}>Start Time</td>
          <td className={styles.end}>End Time</td>
          <td className={styles.purpose}>Purpose</td>
        </tr>
      </thead>
      <tbody>
        {adhocs.map((item, idx) => {
          // [Day, Mmm, DD, YYYY, HH:MM:SS]
          const startDateArr = item.starts.toDateString().split(" ");
          return (
            <AdhocListEntry
              key={idx}
              event={item.name}
              room={item.room}
              date={`${startDateArr[2]} ${startDateArr[1]} ${startDateArr[3]}`}
              start={item.starts.getHours() + ":" + item.starts.getMinutes()}
              end={item.ends.getHours() + ":" + item.ends.getMinutes()}
              purpose={item.purpose}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default AdhocList;
