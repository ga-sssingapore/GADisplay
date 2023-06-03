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
