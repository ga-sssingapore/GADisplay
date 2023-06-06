import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./pages_css/DisplayPage.module.css";
import { fetchData } from "../helpers/common";

function DisplayPage() {
  const { number } = useParams();
  const location = useLocation();
  const { admin } = location.state;
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState({});
  let interval = "";

  async function getDisplay() {
    try {
      const { ok, data } = await fetchData("/display/", undefined, "POST", {
        now: new Date(),
        room: number,
      });
      if (ok) {
        if (interval === "") {
          // interval = setInterval(getDisplay, 1000 * 10);
        }
        console.log(data);
        setClassroom(data);
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getDisplay();
    return () => {
      clearInterval(interval);
      interval = "";
    };
  }, []);

  return (
    <div className={styles.background}>
      <div>Classroom {number}</div>
      <div>SEIFX44SGP</div>
      <div>9:30am - 5:30pm</div>
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
