import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import UserContext from "../../context/user";
import modal from "./css/ModalBackdrop.module.css";
import styles from "./css/CourseCSVImportConfirmation.module.css";
import CoursesList from "./CoursesList";
import { fetchData } from "../../helpers/common";

function Overlay(props) {
  const userCtx = useContext(UserContext);
  const [dataComplete, setDataComplete] = useState(true);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
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
    }
    return csvData;
  }

  async function handleConfirm(event) {
    event.preventDefault();
    if (!confirmSubmit) {
      setConfirmSubmit(true);
    } else {
      if (!dataComplete) {
        return alert(
          "Data incomplete, cannot submit! Please rectify CSV and re-upload!"
        );
      } else {
        try {
          const { ok, data } = await fetchData(
            "/cohorts/csv",
            userCtx.accessToken,
            "PUT",
            reclassifyData(props.csvData)
          );
          if (ok) {
            alert("CSV added!");
            props.closeModal();
          } else {
            throw new Error(data);
          }
        } catch (error) {
          console.log(error.message);
          alert("Error adding bulk data");
        }
      }
    }
  }

  function confirmMessage() {
    if (confirmSubmit) {
      if (dataComplete) {
        return (
          <div className={styles.accept_text}>
            Click confirm again to confirm submission.
          </div>
        );
      } else {
        return (
          <div className={styles.cannot_accept_text}>
            Data incomplete, please rectify CSV and re-upload!
          </div>
        );
      }
    }
  }

  return (
    <div className={modal.backdrop}>
      <div className={`${modal.modal} ${styles.modal_size}`}>
        <div className={styles.description_container}>
          <h4>Confirm courses' details</h4>
          <div>
            Any discrepancies should be fixed in CSV before re-uploading
          </div>
        </div>
        <CoursesList
          courses={reclassifyData(props.csvData)}
          setDataComplete={setDataComplete}
        />
        <div className={styles.buttons_container}>
          <button className={styles.confirm_button} onClick={handleConfirm}>
            Confirm
          </button>
          <button className={styles.return_button} onClick={props.closeModal}>
            Return
          </button>
          {confirmMessage()}
        </div>
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
