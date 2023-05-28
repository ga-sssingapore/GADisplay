import React from "react";
import RoomDisplayList from "./components/RoomDisplayList";
import { Link } from "react-router-dom";
import styles from "./pages_css/LandingPage.module.css";
import display_styles from "./components/css/RoomDisplayDark.module.css";

function LandingPage() {
  return (
    <div className={styles.container}>
      <RoomDisplayList styles={display_styles} />
      <hr />
      <Link to="/admin">
        <img
          src="/GA_banner_horizontal.png"
          alt="GA icon login"
          className={styles.banner}
        />
      </Link>
    </div>
  );
}

export default LandingPage;
