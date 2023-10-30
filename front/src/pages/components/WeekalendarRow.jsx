import React from "react";
import styles from "./css/WeekalendarRow.module.css";

function WeekalendarRow(props) {
  function extractNames(col) {
    // Check if multiples events conflict
    const output = col.map((item, idx) => {
      const startArr = item.starts.toLocaleTimeString();
      const endArr = item.ends.toLocaleTimeString();
      // If adhoc, show purpose in dashboard instead of event name
      // Different from display
      return (
        <div key={idx}>
          {item.schedule ? item.name : item.purpose}
          <br />
          <div>{startArr[1]}</div>
          <div>{endArr[1]}</div>
          {`(${startArr[0].slice(0, -3)}-${endArr[0].slice(0, -3)})`}
        </div>
      );
    });
    return output;
    // }
  }

  return (
    <div className={props.id % 2 == 0 ? styles.alt_row : styles.row}>
      <div className={styles.room}>{props.id}</div>
      <div
        className={`${props.sunday === 0 ? styles.sunday : ""} ${
          props.columns[0].length > 1 ? styles.overload_text : ""
        }`}
      >
        {extractNames(props.columns[0])}
      </div>
      <div
        className={`${props.sunday === 1 ? styles.sunday : ""} ${
          props.columns[1].length > 1 ? styles.overload_text : ""
        }`}
      >
        {extractNames(props.columns[1])}
      </div>
      <div
        className={`${props.sunday === 2 ? styles.sunday : ""} ${
          props.columns[2].length > 1 ? styles.overload_text : ""
        }`}
      >
        {extractNames(props.columns[2])}
      </div>
      <div
        className={`${props.sunday === 3 ? styles.sunday : ""} ${
          props.columns[3].length > 1 ? styles.overload_text : ""
        }`}
      >
        {extractNames(props.columns[3])}
      </div>
      <div
        className={`${props.sunday === 4 ? styles.sunday : ""} ${
          props.columns[4].length > 1 ? styles.overload_text : ""
        }`}
      >
        {extractNames(props.columns[4])}
      </div>
      <div
        className={`${props.sunday === 5 ? styles.sunday : ""} ${
          props.columns[5].length > 1 ? styles.overload_text : ""
        }`}
      >
        {extractNames(props.columns[5])}
      </div>
      <div
        className={`${props.sunday === 6 ? styles.sunday : ""} ${
          props.columns[6].length > 1 ? styles.overload_text : ""
        }`}
      >
        {extractNames(props.columns[6])}
      </div>
    </div>
  );
}

export default WeekalendarRow;
