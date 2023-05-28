import React from "react";
import RoomDisplayList from "./components/RoomDisplayList";
import styles from "./pages_css/AdminDisplayViewerPage.module.css";
import display_styles from "./components/css/RoomDisplayLight.module.css";

function AdminDisplayViewerPage() {
  return (
    <>
      <h3 className={styles.header}>Select display to preview</h3>
      <div className={styles.container}>
        <RoomDisplayList styles={display_styles} />
      </div>
    </>
  );
}

export default AdminDisplayViewerPage;
