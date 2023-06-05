import React, { useState, useEffect, useContext } from "react";
import styles from "./pages_css/AdminDashboardPage.module.css";
import Weekalendar from "./components/Weekalendar";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";

function AdminDashboardPage() {
  const userCtx = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  async function getCohorts() {
    try {
      const { ok, data } = await fetchData("/cohorts/", userCtx.accessToken);
      if (ok) {
        data.map((item) => {
          item.starts = new Date(item.starts);
          item.ends = new Date(item.ends);
        });
        setCourses(data);
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error);
      alert("Error getting courses");
    }
  }

  function getDaysNum(combistr) {
    const strArr = combistr.match(/../g);
    return strArr.map((item) => {
      switch (item) {
        case "Mo":
          return 1;
        case "Tu":
          return 2;
        case "We":
          return 3;
        case "Th":
          return 4;
        case "Fr":
          return 5;
        case "SO":
          return 6;
        case "SE":
          return 7;
        case "SA":
          return 8;
        case "Su":
          return 0;
      }
    });
  }

  function thisWeek(courseArr) {
    return courseArr
      .map((item) => {
        item.starts = new Date(item.starts);
        item.ends = new Date(item.ends);
        item.days = getDaysNum(item.schedule);
        return item;
      })
      .filter((item) => {
        if (!item.starts) {
          return false;
        }
        return item.starts - new Date(date) < 86400000 * 7;
      });
  }

  useEffect(() => {
    if (userCtx.accessToken != "") {
      getCohorts();
    }
  }, [userCtx.accessToken]);

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
      <Weekalendar date={new Date(date)} courses={thisWeek(courses)} />
    </div>
  );
}

export default AdminDashboardPage;
