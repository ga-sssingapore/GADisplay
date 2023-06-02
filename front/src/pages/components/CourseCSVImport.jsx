import React, { useState, useRef } from "react";
import Papa from "papaparse";
import CourseCSVImportConfirmation from "./CourseCSVImportConfirmation";

function CourseCSVImport() {
  const [formComplete, setFormComplete] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const fileInputRef = useRef();
  function handleCSV(event) {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        setFormComplete(true);
      },
    });
  }

  function handleCloseModal() {
    fileInputRef.current.value = null;
    setFormComplete(false);
  }

  return (
    <div>
      <h4>Import CSV</h4>
      <input
        type="file"
        id="import_csv"
        onChange={handleCSV}
        ref={fileInputRef}
      />
      {formComplete && (
        <CourseCSVImportConfirmation
          closeModal={handleCloseModal}
          csvData={csvData}
        />
      )}
    </div>
  );
}

export default CourseCSVImport;
