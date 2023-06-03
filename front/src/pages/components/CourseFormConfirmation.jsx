import React from "react";
import ReactDOM from "react-dom";
import modal from "./css/ModalBackdrop.module.css";
import styles from "./css/CourseFormConfirmation.module.css";

function Overlay(props) {
  function unacronymType(acronym) {
    switch (acronym) {
      case "FT":
        return "Full Time";
      case "PT":
        return "Part Time";
      default:
        return acronym;
    }
  }

  function printDays(daysArr) {
    // Check if everyday true or false
    if (daysArr.every((offline) => offline)) {
      return "Everyday";
    } else if (daysArr.every((offline) => !offline)) {
      return "No days on campus";
    }
    let output = "";
    // Handle alternating saturdays
    let satOdd = false;
    for (let i = 0; i < daysArr.length; i++) {
      if (daysArr[i]) {
        if (output !== "") {
          output += ", ";
        }
        switch (i) {
          case 0:
            output += "Monday";
            break;
          case 1:
            output += "Tuesday";
            break;
          case 2:
            output += "Wednesday";
            break;
          case 3:
            output += "Thursday";
            break;
          case 4:
            output += "Friday";
            break;
          case 5:
            satOdd = true;
            break;
          case 6:
            if (satOdd) {
              output += "All Saturdays";
            } else {
              output += "Even Saturdays";
            }
            break;
          case 7:
            output += "Sunday";
            break;
          default:
        }
      } else if (i === 6 && satOdd && !daysArr[i]) {
        if (output !== "") {
          output += ", ";
        }
        output += "Odd Saturdays";
      }
    }
    return output;
  }

  return (
    <div className={modal.backdrop}>
      <div className={`${modal.modal} ${styles.modal_size}`}>
        <h2>Confirm course details</h2>
        <div className={styles.subheader}>
          *Please check that course code has been input correctly, it will be
          saved as is and cannot be changed! <br />
          *Empty values are highlighted in red, please double-check that they
          had been intentionally left empty.
        </div>
        <hr />
        <div className={styles.course_container}>
          <label>
            Course Code: <input type="text" value={props.courseCode} disabled />
          </label>
          <label>
            Type:{" "}
            <input
              type="text"
              value={unacronymType(props.courseType)}
              disabled
            />
          </label>
          <label>
            Room: <input type="text" value={props.courseRoom} disabled />
          </label>
        </div>
        <div
          className={`${styles.days_container} ${
            props.days.every((offline) => !offline) ? styles.no_value : ""
          }`}
        >
          <span>Days on campus: </span>
          {printDays(props.days)}
        </div>
        <div className={styles.datetime_container}>
          <div className={styles.datetime_grid}>
            <label
              htmlFor="start_date"
              className={props.startDate === "" ? styles.no_value : ""}
            >
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              value={props.startDate}
              className={props.startDate === "" ? styles.no_value : ""}
              disabled
            />
            <label
              htmlFor="start_time"
              className={props.startTime === "" ? styles.no_value : ""}
            >
              Start Time
            </label>
            <input
              type="time"
              id="start_time"
              value={props.startTime}
              className={props.startTime === "" ? styles.no_value : ""}
              disabled
            />
          </div>

          <div className={styles.datetime_grid}>
            <label
              htmlFor="end_date"
              className={props.endDate === "" ? styles.no_value : ""}
            >
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              value={props.endDate}
              className={props.endDate === "" ? styles.no_value : ""}
              disabled
            />
            <label
              htmlFor="end_time"
              className={props.endTime === "" ? styles.no_value : ""}
            >
              End Time
            </label>
            <input
              type="time"
              id="end_time"
              value={props.endTime}
              className={props.endTime === "" ? styles.no_value : ""}
              disabled
            />
          </div>
        </div>
        <hr />
        <div className={styles.buttons_container}>
          <button
            className={styles.confirm_button}
            onClick={props.handleConfirm}
          >
            Confirm
          </button>
          <button
            className={styles.return_button}
            onClick={() => props.setFormComplete(false)}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseFormConfirmation(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          setFormComplete={props.setFormComplete}
          courseCode={props.courseCode}
          courseType={props.courseType}
          courseRoom={props.courseRoom}
          days={props.days}
          startDate={props.startDate}
          startTime={props.startTime}
          endDate={props.endDate}
          endTime={props.endTime}
          handleConfirm={props.handleConfirm}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
}

export default CourseFormConfirmation;
