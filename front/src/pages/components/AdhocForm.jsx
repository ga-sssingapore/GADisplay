import React, { useState, useRef, useContext } from "react";
import styles from "./css/AdhocForm.module.css";
import AdhocFormConfirmation from "./AdhocFormConfirmation";
import { fetchData } from "../../helpers/common";
import UserContext from "../../context/user";

function AdhocForm(props) {
  const userCtx = useContext(UserContext);
  const [event, setEvent] = useState("");
  const [purpose, setPurpose] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [formComplete, setFormComplete] = useState(false);

  // UseRefs for validation
  const eventRef = useRef();
  const purposeRef = useRef();
  const roomRef = useRef();
  const dateRef = useRef();
  const startRef = useRef();
  const endRef = useRef();

  function handleChange(event, stateSetter) {
    stateSetter(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (eventRef.current.value == "") {
      alert("Please enter event name! ");
      return eventRef.current.focus();
    } else if (purposeRef.current.value == "") {
      alert("Please enter purpose!    ");
      return purposeRef.current.focus();
    } else if (dateRef.current.value == "") {
      alert("Please select a date!    ");
      return dateRef.current.focus();
    } else if (roomRef.current.value == "") {
      alert("Please select room!      ");
      return roomRef.current.focus();
    } else if (startRef.current.value == "") {
      alert("Please select start time!");
      return startRef.current.focus();
    } else if (endRef.current.value == "") {
      alert("Please select end time!  ");
      return endRef.current.focus();
    } else {
      // Check if start time and end time makes sense
      const startTimeChk = new Date(date + "T" + startTime);
      const endTimeChk = new Date(date + "T" + endTime);
      if (startTimeChk - endTimeChk > 0) {
        alert(
          "Event ends before start time, please create a separate event if this event should end the next day"
        );
        return startRef.current.focus();
      }
      setFormComplete(true);
    }
  }

  async function handleConfirm(e) {
    e.preventDefault();
    try {
      const { ok, data } = await fetchData(
        "/adhocs/add",
        userCtx.accessToken,
        "PUT",
        {
          name: event,
          starts: new Date(date + "T" + startTime),
          ends: new Date(date + "T" + endTime),
          room: room,
          purpose: purpose,
        }
      );
      if (ok) {
        alert("Ad-hoc added!");
        setEvent("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setPurpose("");
        setRoom("");
        props.getAdhocs();
        setFormComplete(false);
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
      alert("Error adding adhoc");
    }
  }

  return (
    <>
      <div className={styles.form_container}>
        <div className={styles.details_container}>
          <label htmlFor="event">Event: </label>
          <input
            type="text"
            id="event"
            placeholder="Event name"
            value={event}
            onChange={(e) => handleChange(e, setEvent)}
            ref={eventRef}
            maxLength="48"
          />
          <label htmlFor="purpose">Purpose: </label>
          <input
            type="text"
            id="purpose"
            placeholder="Purpose of event"
            value={purpose}
            onChange={(e) => handleChange(e, setPurpose)}
            ref={purposeRef}
            maxLength="30"
          />
        </div>
        <div className={styles.dateroom_container}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            className={styles.datetime_selector}
            min={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(e) => handleChange(e, setDate)}
            ref={dateRef}
          />
          <label htmlFor="room">Room: </label>
          <select
            id="room"
            value={room}
            onChange={(e) => handleChange(e, setRoom)}
            className={styles.room_selector}
            ref={roomRef}
          >
            <option value="" disabled hidden>
              --
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <label htmlFor="start">Start Time</label>
          <input
            type="time"
            id="start"
            className={styles.datetime_selector}
            value={startTime}
            onChange={(e) => handleChange(e, setStartTime)}
            ref={startRef}
          />
          <label htmlFor="end">End Time</label>
          <input
            type="time"
            id="end"
            className={styles.datetime_selector}
            value={endTime}
            onChange={(e) => handleChange(e, setEndTime)}
            ref={endRef}
          />
        </div>
        <div>
          <button className={styles.button} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      {formComplete && (
        <AdhocFormConfirmation
          event={event}
          purpose={purpose}
          room={room}
          date={date}
          startTime={startTime}
          endTime={endTime}
          setFormComplete={setFormComplete}
          handleConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default AdhocForm;
