import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./pages_css/DisplayPage.module.css";
import { fetchData, getLocaleTime } from "../helpers/common";
import { useInterval } from "../hooks/useInterval";

function DisplayPage() {
  const { number } = useParams();
  const location = useLocation();
  const { admin } = location.state;
  const navigate = useNavigate();
  // Ordered by start date, only first cohort displayed
  const [cohorts, setCohorts] = useState([]);
  // Ordered by creation order (whichever the database receives first, in lieu of creation date)
  // If reordering required, delete adhocs and re-create in order?
  const [adhocs, setAdhocs] = useState([]);
  // Currently displayed class, update every 10mins?
  const [display, setDisplay] = useState({});
  // Env variables
  const refreshMinutes = 60000 * import.meta.env.VITE_SERVERREFRESHTIMER;
  const updateMinutes = 60000 * import.meta.env.VITE_CLIENTREFRESHTIMER;
  const [delay, setDelay] = useState(
    updateMinutes - (new Date() % updateMinutes)
  );

  /* --- Timer --- */
  // let timeout = "";
  // // Interval primer
  // function startInterval() {
  //   // Reset timeout
  //   if (timeout != "") {
  //     clearTimeout(timeout);
  //     timeout = "";
  //   }
  //   // 1s allowance to account for possible system lag
  //   const msToUpdate = updateMinutes - (new Date() % updateMinutes);
  //   timeout = setTimeout(() => {
  //     // Update display client-side every 15 minutes
  //     updateDisplay();
  //     nextInterval();
  //   }, msToUpdate);
  // }

  // // Interval loop
  // function nextInterval() {
  //   timeout = setTimeout(() => {
  //     updateDisplay();
  //     nextInterval();
  //   }, updateMinutes);
  // }

  useInterval(() => {
    updateDisplay();
  }, delay);

  /* --- Display controls --- */
  function changeDisplay() {
    const now = new Date();
    if (adhocs.length > 0) {
      /* To account for multiple adhocs happening between data refreshes,
      check which adhoc is happening within this update and display. */
      const currentAdhoc = adhocs[0];
      if (new Date(currentAdhoc.ends) - now > 1000) {
        // If currentAdhoc yet to end, check if it has started OR is about to start in the next client refresh.
        if (
          new Date(currentAdhoc.starts) - now <=
          60000 * import.meta.env.VITE_CLIENTREFRESHTIMER
        ) {
          return setDisplay(currentAdhoc);
        }
      } else {
        // If currentAdhoc has expired, truncate adhocs and recurse via useEffect
        return setAdhocs((adhoc) => adhoc.toSpliced(0, 1));
      }
    }
    if (cohorts.length > 0) {
      // If no adhocs returned, set first available cohort.
      return setDisplay(cohorts[0]);
    }
    // If no adhocs/cohorts, clear display
    return setDisplay({});
  }

  function updateDisplay() {
    if (delay != updateMinutes) setDelay(updateMinutes);
    if (new Date() % refreshMinutes <= 60000) {
      // If about time to refresh, fetch data before changing
      getDisplay();
    } else {
      changeDisplay();
    }
  }

  async function getDisplay() {
    try {
      const { ok, data } = await fetchData("/display/", undefined, "POST", {
        now: new Date(),
        room: number,
      });
      if (ok) {
        // Retrieve cohorts that have classes today
        setCohorts(data.cohort);
        // Retrieve all cohorts that have yet to end at this time
        setAdhocs(data.adhoc);
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
      // If cannot fetch, just change with whatever's available
      changeDisplay();
    }
  }

  // Call changeDisplay everytime adhocs/cohorts change (i.e. when they get fetched)
  useEffect(() => {
    changeDisplay();
  }, [adhocs, cohorts]);

  useEffect(() => {
    getDisplay();
    // Clean up rubbish before you leave the theater!
    return () => {
      // clearTimeout(timeout);
      // timeout = "";
    };
  }, []);

  function checkEventSize(string = "") {
    const len = string.length;
    if (len <= 36) {
      return "";
    } else if (len <= 48) {
      return styles.big_text;
    } else if (len <= 96) {
      return styles.larger_text;
    } else {
      return styles.largest_feasible;
    }
  }

  return (
    <div className={styles.background}>
      <div>Classroom {number}</div>
      <>
        <div className={`${styles.name} ${checkEventSize(display.name)}`}>
          {display.name}
        </div>
        <div>
          {display.starts &&
            display.ends &&
            `${getLocaleTime(new Date(display.starts))} - ${getLocaleTime(
              new Date(display.ends)
            )}`}
        </div>
      </>
      <hr />
      <img
        src="/GA_banner_horizontal_white.png"
        alt="GA logo"
        className={styles.banner}
        onClick={() => {
          if (admin) {
            navigate("/admin/displays");
          }
        }}
      />
    </div>
  );
}

export default DisplayPage;
