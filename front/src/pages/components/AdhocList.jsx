import React from "react";
import styles from "./css/AdhocList.module.css";
import AdhocListEntry from "./AdhocListEntry";

function AdhocList(props) {
  function getTime(dateObj) {
    const timeArr = dateObj.toLocaleTimeString().split(" ");
    let timeFirstHalf = timeArr[0].slice(0, 5);
    if (timeFirstHalf.charAt(4) == ":") {
      timeFirstHalf = timeFirstHalf.slice(0, 4);
    }
    return timeFirstHalf + timeArr[1];
  }
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
          <td className={styles.delete}>Delete</td>
        </tr>
      </thead>
      <tbody>
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
              start={getTime(item.starts)}
              end={getTime(item.ends)}
              purpose={item.purpose}
              getAdhocs={props.getAdhocs}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default AdhocList;
