import React from "react";

function CourseForm() {
  return (
    <form>
      <div>
        <label>
          Course Code
          <input type="text" />
        </label>
        <label>
          Course Type
          <select name="course_type" defaultValue="">
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
          <select name="room" defaultValue="">
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
      </div>

      {/* <div>Course Type</div>
      <div>Start Date</div>
      <div>End Date</div>
      <div>Days on campus</div>
      <div>Start Time</div>
      <div>End Time</div>
      <div>Room</div>
      <div>Import CSV</div> */}
    </form>
  );
}

export default CourseForm;
