import React, { useState } from "react";
import styles from "./pages_css/AdminDashboardPage.module.css";
import Weekalendar from "./components/Weekalendar";

function AdminDashboardPage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  function handleDateChange(event) {
    setDate(event.target.value);
  }
  return (
    <div className={styles.container}>
      <div className={styles.datepicker}>
        <label htmlFor="date_picker">Date:</label>
        <input
          type="date"
          id="date_picker"
          value={date}
          onChange={handleDateChange}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <Weekalendar date={new Date(date)} />
    </div>
  );
}

export default AdminDashboardPage;
