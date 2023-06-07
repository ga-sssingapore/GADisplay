import React, { useState, useRef, useContext } from "react";
import styles from "./css/CourseForm.module.css";
import CourseFormConfirmation from "./CourseFormConfirmation";
import { fetchData } from "../../helpers/common";
import UserContext from "../../context/user";

function CourseForm(props) {
  const userCtx = useContext(UserContext);

  // Course specifics
  const [courseCode, setCourseCode] = useState(props.course?.name || "");
  const [courseType, setCourseType] = useState(props.course?.course_type || "");
  const [courseRoom, setCourseRoom] = useState(props.course?.room || "");
  const courseCodeRef = useRef();
  const courseTypeRef = useRef();
  const courseRoomRef = useRef();

  // Days picker
  const [mon, setMon] = useState(props.days?.includes(1) || false);
  const [tue, setTue] = useState(props.days?.includes(2) || false);
  const [wed, setWed] = useState(props.days?.includes(3) || false);
  const [thu, setThu] = useState(props.days?.includes(4) || false);
  const [fri, setFri] = useState(props.days?.includes(5) || false);
  // Sat odd
  const [sao, setSao] = useState(
    props.days?.includes(6) || props.days?.includes(8) || false
  );
  // Sat eve
  const [sae, setSae] = useState(
    props.days?.includes(7) || props.days?.includes(8) || false
  );
  const [sun, setSun] = useState(props.days?.includes(0) || false);

  // Date-time pickers
  const [startDate, setStartDate] = useState(
    props.course?.starts.toISOString().split("T")[0] || ""
  );
  const [startTime, setStartTime] = useState(
    props.course?.starts.toISOString().split("T")[1].slice(0, 5) || ""
  );
  const [endDate, setEndDate] = useState(
    props.course?.ends.toISOString().split("T")[0] || ""
  );
  const [endTime, setEndTime] = useState(
    props.course?.ends.toISOString().split("T")[1].slice(0, 5) || ""
  );
  const startDateRef = useRef();
  const endDateRef = useRef();
  const startTimeRef = useRef();

  // Control opening of confirmation modal
  const [formComplete, setFormComplete] = useState(false);

  function handleChange(event, stateSetter) {
    stateSetter(event.target.value);
  }

  function handleCheck(state, stateSetter) {
    stateSetter(!state);
  }

  function consolidateDays() {
    return [mon, tue, wed, thu, fri, sao, sae, sun];
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (courseCodeRef.current.value === "") {
      alert("Please specify course code!");
      return courseCodeRef.current.focus();
    } else if (courseTypeRef.current.value === "") {
      alert("Please specify course type!");
      return courseTypeRef.current.focus();
    } else if (courseRoomRef.current.value === "") {
      // Whitespace added to make alert box size more consistent?
      alert("Please select room!        ");
      return courseRoomRef.current.focus();
    } else if (startDateRef.current.value === "") {
      alert("Please enter start date!");
      return startDateRef.current.focus();
    } else if (endDateRef.current.value === "") {
      alert("Please enter end date!");
    } else if (startTime === "" || endTime === "") {
      alert("Please enter start and end times!");
      return startTimeRef.current.focus();
    } else {
      // Check if start time and end time makes sense
      const startTimeChk = new Date(startDate + "T" + startTime);
      const endTimeChk = new Date(startDate + "T" + endTime);
      if (startTimeChk - endTimeChk > 0) {
        alert("Classes end before start time, please rectify!");
        return startTimeRef.current.focus();
      }
    }
    setFormComplete(true);
  }

  async function handleConfirm(event) {
    event.preventDefault();
    try {
      const { ok, data } = await fetchData(
        "/cohorts/add",
        userCtx.accessToken,
        props.submission_method,
        {
          name: courseCode,
          starts: new Date(startDate + "T" + startTime),
          ends: new Date(endDate + "T" + endTime),
          course_type: courseType,
          room: courseRoom,
          schedule: consolidateDays(),
        }
      );
      if (ok) {
        alert("Cohorts updated!");
        setFormComplete(false);
        if (props.course) {
          return;
        }
        setCourseCode("");
        setCourseRoom("");
        setCourseType("");
        setMon(false);
        setTue(false);
        setWed(false);
        setThu(false);
        setFri(false);
        setSao(false);
        setSae(false);
        setSun(false);
        setStartDate("");
        setEndDate("");
        setStartTime("");
        setEndTime("");
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
      alert("Error adding cohort");
    }
  }

  return (
    <>
      <form className={styles.form}>
        <div>
          <label className={styles.course_label}>
            Course Code:{" "}
            <input
              type="text"
              value={courseCode}
              placeholder="Code"
              onChange={(e) => handleChange(e, setCourseCode)}
              ref={courseCodeRef}
              disabled={props.course ? true : false}
            />
          </label>
          <label className={styles.course_label}>
            Course Type:{" "}
            <select
              name="course_type"
              value={courseType}
              onChange={(e) => handleChange(e, setCourseType)}
              ref={courseTypeRef}
            >
              <option value="" disabled hidden>
                --
              </option>
              <option value="FT">Full Time</option>
              <option value="Flex">Flex</option>
              <option value="PT">Part Time</option>
            </select>
          </label>
          <label className={styles.course_label}>
            Room:{" "}
            <select
              name="room"
              value={courseRoom}
              onChange={(e) => handleChange(e, setCourseRoom)}
              ref={courseRoomRef}
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
          </label>
          <hr />
          <div className={styles.checkbox_container}>
            <div className={styles.checkbox_main_label}>Days on campus:</div>
            <div className={styles.checkbox}>
              <label>
                <input
                  type="checkbox"
                  checked={mon}
                  onChange={() => handleCheck(mon, setMon)}
                />
                Monday
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={tue}
                  onChange={() => handleCheck(tue, setTue)}
                />
                Tuesday
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={wed}
                  onChange={() => handleCheck(wed, setWed)}
                />
                Wednesday
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={thu}
                  onChange={() => handleCheck(thu, setThu)}
                />
                Thursday
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={fri}
                  onChange={() => handleCheck(fri, setFri)}
                />
                Friday
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={sao}
                  onChange={() => handleCheck(sao, setSao)}
                />
                Saturday (Odd)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={sae}
                  onChange={() => handleCheck(sae, setSae)}
                />
                Saturday (Even)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={sun}
                  onChange={() => handleCheck(sun, setSun)}
                />
                Sunday
              </label>
            </div>
          </div>
          <hr />
          <div className={styles.datetime_container}>
            <div className={styles.datetime_grid}>
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                id="start_date"
                value={startDate}
                onChange={(e) => handleChange(e, setStartDate)}
                max={endDate}
                ref={startDateRef}
              />
              <label htmlFor="start_time">Start Time</label>
              <input
                type="time"
                id="start_time"
                value={startTime}
                onChange={(e) => handleChange(e, setStartTime)}
                ref={startTimeRef}
              />
            </div>

            <div className={styles.datetime_grid}>
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                id="end_date"
                value={endDate}
                onChange={(e) => handleChange(e, setEndDate)}
                min={startDate}
                ref={endDateRef}
              />
              <label htmlFor="end_time">End Time</label>
              <input
                type="time"
                id="end_time"
                value={endTime}
                onChange={(e) => {
                  handleChange(e, setEndTime);
                }}
              />
            </div>
          </div>
        </div>
      </form>
      <div className={styles.buttons_container}>
        <button className={styles.button} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {formComplete && (
        <CourseFormConfirmation
          setFormComplete={setFormComplete}
          courseCode={courseCode}
          courseType={courseType}
          courseRoom={courseRoom}
          days={consolidateDays()}
          startDate={startDate}
          startTime={startTime}
          endDate={endDate}
          endTime={endTime}
          handleConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default CourseForm;
