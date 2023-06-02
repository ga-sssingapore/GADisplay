import React, { useState } from "react";
import styles from "./css/CourseForm.module.css";

function CourseForm(props) {
  const [courseCode, setCourseCode] = useState(props.course?.name || "");
  const [courseType, setCourseType] = useState("");
  const [courseRoom, setCourseRoom] = useState("");
  const [mon, setMon] = useState(false);
  const [tue, setTue] = useState(false);
  const [wed, setWed] = useState(false);
  const [thu, setThu] = useState(false);
  const [fri, setFri] = useState(false);
  // Sat odd
  const [sao, setSao] = useState(false);
  // Sat eve
  const [sae, setSae] = useState(false);
  const [sun, setSun] = useState(false);

  function handleChange(event, cb) {
    cb(event.target.value);
  }

  function handleCheck(state, cb) {
    cb(!state);
  }

  return (
    <>
      <form className={styles.form}>
        <div>
          <label>
            Course Code
            <input
              type="text"
              value={courseCode}
              onChange={(e) => handleChange(e, setCourseCode)}
            />
          </label>
          <label>
            Course Type
            <select
              name="course_type"
              value={courseType}
              onChange={(e) => handleChange(e, setCourseType)}
            >
              <option value="" disabled hidden>
                ---
              </option>
              <option value="FT">Full Time</option>
              <option value="Flex">Flex</option>
              <option value="PT">Part Time</option>
            </select>
          </label>
          <label>
            Room
            <select
              name="room"
              value={courseRoom}
              onChange={(e) => handleChange(e, setCourseRoom)}
            >
              <option value="" disabled hidden>
                ---
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </label>
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
        </div>
      </form>
      <div className={styles.buttons_container}>
        <button className={styles.button}>Add</button>
        <button className={styles.button}>Clear</button>
      </div>
    </>
  );
}

export default CourseForm;
