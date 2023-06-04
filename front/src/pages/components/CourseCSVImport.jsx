import React, { useState, useRef } from "react";
import Papa from "papaparse";
import CourseCSVImportConfirmation from "./CourseCSVImportConfirmation";
import styles from "./css/CourseCSVImport.module.css";

function CourseCSVImport() {
  const [formComplete, setFormComplete] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  // Can specify headers in case csv changes
  function renameHeader(
    header,
    course_type = "Type",
    name = "Cohort",
    schedule = "Days on Campus",
    room = "Classroom"
  ) {
    switch (header) {
      case name:
        return "name";
      case schedule:
        return "schedule";
      case room:
        return "room";
      case course_type:
        return "course_type";
      default:
        return header;
    }
  }

  function handleCSV(event) {
    setLoading(true);
    Papa.parse(event.target.files[0], {
      header: true,
      transformHeader: (header) => renameHeader(header),
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        setLoading(false);
        setFormComplete(true);
      },
    });
  }

  function handleCloseModal() {
    fileInputRef.current.value = null;
    setFormComplete(false);
  }

  return (
    <>
      <div className={styles.container}>
        <h4>Import CSV</h4>
        <input
          type="file"
          id="import_csv"
          onChange={handleCSV}
          ref={fileInputRef}
        />
        {loading && (
          <img
            src="/GALogo.png"
            alt="GA logo loading"
            className={styles.loading_spinner}
          />
        )}
      </div>
      <div className={styles.csv_specs}>
        <h4>CSV specifications:</h4>
        <ul>
          <li>First row of data will be used as headers.</li>
          <li>
            Required headers (case and spelling sensitive!): "Cohort", "Start
            Date", "End Date", "Start Time", "End Time", "Days on Campus",
            "Classroom".
          </li>
          <li>
            Course Type will be inferred from course code. FX in course code
            will be interpreted as a Flex course, PT in course code will be
            interpreted as a Part Time course. Lack of either will default to
            Full Time course.
          </li>
        </ul>
      </div>
      {formComplete && (
        <CourseCSVImportConfirmation
          closeModal={handleCloseModal}
          csvData={csvData}
        />
      )}
    </>
  );
}

export default CourseCSVImport;
