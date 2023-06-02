import React, { useState } from "react";
import Papa from "papaparse";

function CourseCSVImport() {
  function handleCSV(event) {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => console.log(results.data),
    });
  }
  return (
    <div>
      <h4>Import CSV</h4>
      <input type="file" id="import_csv" onChange={handleCSV} />
    </div>
  );
}

export default CourseCSVImport;
