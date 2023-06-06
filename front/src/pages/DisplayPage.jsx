import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./pages_css/DisplayPage.module.css";
import { fetchData } from "../helpers/common";

function DisplayPage() {
  const { number } = useParams();
  const location = useLocation();
  const { admin } = location.state;
  const navigate = useNavigate();
  const [cohorts, setCohorts] = useState([]);
  const [adhocs, setAdhocs] = useState([]);
  // Currently displayed class, update every 10mins?
  const [display, setDisplay] = useState({});
  let interval = "";

  async function getDisplay() {
    try {
      const { ok, data } = await fetchData("/display/", undefined, "POST", {
        now: new Date(),
        room: number,
      });
      if (ok) {
        if (interval === "") {
          // interval = setInterval(getDisplay, 1000 * 60 * import.meta.env.VITE_REFRESHTIMER);
        }
        setCohorts(data.cohort);
        setAdhocs(data.adhoc);
        changeDisplay();
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function changeDisplay() {
    if (adhocs.length > 0) {
    } else {
      setDisplay(cohorts[0]);
    }
  }

  function getTime(dateStr) {
    if (!dateStr) {
      return;
    }
    console.log(new Date(dateStr).toISOString());
    return new Date(dateStr).toISOString().split("T")[1].slice(0, 5);
  }

  useEffect(() => {
    getDisplay();
    return () => {
      clearInterval(interval);
      interval = "";
    };
  }, []);

  useEffect(() => {
    changeDisplay();
  }, [adhocs, cohorts]);

  return (
    <div className={styles.background}>
      <div>Classroom {number}</div>
      <div>{display?.name}</div>
      <div>
        {getTime(display?.starts)} - {getTime(display?.ends)}
      </div>
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
