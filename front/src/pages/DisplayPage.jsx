import React from "react";
import { useParams } from "react-router-dom";
import styles from "./pages_css/DisplayPage.module.css";

function DisplayPage() {
  const { number } = useParams();
  return (
    <div className={styles.background}>
      <div>Classroom {number}</div>
      <div>UXDI44SGP</div>
      <div>9:30am - 5:30pm</div>
      <hr />
      <img
        src="/GA_banner_horizontal_white.png"
        alt="GA logo"
        className={styles.banner}
      />
    </div>
  );
}

export default DisplayPage;
