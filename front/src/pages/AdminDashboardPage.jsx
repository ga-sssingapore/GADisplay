import React, { useState, useEffect, useContext } from "react";
import styles from "./pages_css/AdminDashboardPage.module.css";
import Weekalendar from "./components/Weekalendar";
import UserContext from "../context/user";
import { fetchData, getDaysNum } from "../helpers/common";

function AdminDashboardPage() {
  const userCtx = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  async function getEvents() {
    try {
      const { ok, data } = await fetchData("/display/", userCtx.accessToken);
      if (ok) {
        setEvents(data);
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error);
      alert("Error getting courses");
    }
  }

  function thisWeek(eventsArr) {
    // EventsArr contains both cohorts and adhocs, normalize the useful parts here
    // Need to normalize Start time, End time and day of event(s)
    // Cohorts will have multiple days to be deciphered from combi, use getDaysNum to do so
    return eventsArr
      .map((item) => {
        item.starts = new Date(item.starts);
        item.ends = new Date(item.ends);
        if (item.schedule) {
          // If event is a Cohort item, it will have a schedule
          item.days = getDaysNum(item.schedule);
        } else {
          // Else if event is an Adhoc item, it will not have schedule
          // Get day from start date and wrap in array to mimic getDaysNum return value
          item.days = [item.starts.getDay()];
        }
        return item;
      })
      .filter((item) => {
        if (!item.starts) {
          // To handle when this function is called before fetchData returns
          return false;
        }
        return item.starts - new Date(date) < 86400000 * 7;
      });
  }

  useEffect(() => {
    if (userCtx.accessToken != "") {
      getEvents();
    }
  }, [userCtx.accessToken]);

  return (
    <div className={styles.container}>
      <div className={styles.datepicker}>
        <label htmlFor="date_picker">What's happening this week from:</label>
        <input
          type="date"
          id="date_picker"
          value={date}
          onChange={handleDateChange}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <Weekalendar date={new Date(date)} events={thisWeek(events)} />
    </div>
  );
}

export default AdminDashboardPage;
