import React from "react";
import ReactDOM from "react-dom";
import modal from "./css/ModalBackdrop.module.css";
import styles from "./css/AdhocFormConfirmation.module.css";

function Overlay(props) {
  return (
    <div className={modal.backdrop}>
      <div className={`${modal.modal} ${styles.modal_size}`}>
        <div className={styles.details_container}>
          <label htmlFor="event">Event: </label>
          <input type="text" id="event" value={props.event} disabled />
          <label htmlFor="purpose">Purpose: </label>
          <input type="text" id="purpose" value={props.purpose} disabled />
        </div>
        <div className={styles.dateroom_container}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={props.date}
            className={styles.datetime_selector}
            disabled
          />
          <label htmlFor="room">Room: </label>
          <input
            type="text"
            id="room"
            value={props.room}
            className={styles.room_selector}
            disabled
          />
          <label htmlFor="start">Start Time</label>
          <input
            type="time"
            id="start"
            value={props.startTime}
            className={styles.datetime_selector}
            disabled
          />
          <label htmlFor="end">End Time</label>
          <input
            type="time"
            id="end"
            value={props.endTime}
            className={styles.datetime_selector}
            disabled
          />
        </div>
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

function AdhocFormConfirmation(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          event={props.event}
          purpose={props.purpose}
          room={props.room}
          date={props.date}
          startTime={props.startTime}
          endTime={props.endTime}
          setFormComplete={props.setFormComplete}
          handleConfirm={props.handleConfirm}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
}

export default AdhocFormConfirmation;
