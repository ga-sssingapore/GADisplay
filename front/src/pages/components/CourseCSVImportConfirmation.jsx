import React, { useState } from "react";
import ReactDOM from "react-dom";
import modal from "./css/ModalBackdrop.module.css";
import styles from "./css/CourseCSVImportConfirmation.module.css";
import CoursesList from "./CoursesList";

function Overlay(props) {
  const [dataComplete, setDataComplete] = useState(true);
  const viewRawData = false;

  // Can specify keys to query start/end date/time in case excel sheet needs to change
  function reclassifyData(
    csvData,
    startDate = "Start Date",
    startTime = "Start Time",
    endDate = "End Date",
    endTime = "End Time"
  ) {
    const timeReg = new RegExp(/:| |-|\./);
    for (const item of csvData) {
      const starts = new Date(item[startDate]);
      const startTimeArr = item[startTime]
        .split(timeReg, 2)
        .map((time) => Number(time));
      if (item[startTime].slice(-2) == "PM" && startTimeArr[0] !== 12) {
        startTimeArr[0] += 12;
      } else if (item[startTime].slice(-2) == "AM" && startTimeArr[0] == 12) {
        startTimeArr[0] = 0;
      }
      starts.setHours(startTimeArr[0]);
      starts.setMinutes(startTimeArr[1]);
      item.starts = starts;
      const ends = new Date(item[endDate]);
      const endTimeArr = item[endTime]
        .split(timeReg, 2)
        .map((time) => Number(time));
      if (item[endTime].slice(-2) == "PM" && endTimeArr[0] !== 12) {
        endTimeArr[0] += 12;
      } else if (item[endTime].slice(-2) == "AM" && endTimeArr[0] == 12) {
        endTimeArr[0] = 0;
      }
      ends.setHours(endTimeArr[0]);
      ends.setMinutes(endTimeArr[1]);
      item.ends = ends;
      if (item.name.match(/FX/)) {
        item.course_type = "Flex";
      } else if (item.name.match(/PT/)) {
        item.course_type = "PT";
      } else {
        item.course_type = "FT";
      }
    }
    return csvData;
  }
  return (
    <div className={modal.backdrop} onClick={props.closeModal}>
      <div
        className={`${modal.modal} ${styles.modal_size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <CoursesList
          courses={reclassifyData(props.csvData)}
          setDataComplete={setDataComplete}
        />
        {viewRawData && (
          <>
            <hr />
            {reclassifyData(props.csvData) && (
              <div>{JSON.stringify(props.csvData[0])}</div>
            )}
            <hr />
            {props.csvData.map((item, idx) => {
              return <div key={idx}>{JSON.stringify(item)}</div>;
            })}
          </>
        )}
      </div>
    </div>
  );
}

function CourseCSVImportConfirmation(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay closeModal={props.closeModal} csvData={props.csvData} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
}

export default CourseCSVImportConfirmation;
