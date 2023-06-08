import React, { useContext, useState, useEffect } from "react";
import styles from "./css/AdhocListEntry.module.css";
import { fetchData } from "../../helpers/common";
import UserContext from "../../context/user";

function AdhocListEntry(props) {
  const userCtx = useContext(UserContext);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
    } else {
      try {
        const { ok, data } = await fetchData(
          "/adhocs/delete",
          userCtx.accessToken,
          "DELETE",
          {
            num: props.num,
          }
        );
        if (ok) {
          alert("Adhoc deleted!");
          props.getAdhocs();
          setConfirmDelete(false);
        } else {
          throw new Error(data);
        }
      } catch (error) {
        console.log(error.message);
        alert("Error deleting adhoc");
      }
    }
  }

  // Hacky way(?) to access parent component's events
  useEffect(() => {
    setConfirmDelete(false);
  }, [props.clicked]);

  return (
    <div
      className={props.id % 2 === 0 ? styles.adhoc_row : styles.alt_adhoc_row}
    >
      <div className={styles.free_text}>{props.event}</div>
      <div className={styles.center_text}>{props.room}</div>
      <div className={styles.center_text}>{props.date}</div>
      <div className={styles.center_text}>{props.start}</div>
      <div className={styles.center_text}>{props.end}</div>
      <div className={styles.free_text}>{props.purpose}</div>
      <div className={styles.center_text}>{props.user}</div>
      <div
        className={`${styles.delete} ${styles.delete_button}`}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        {confirmDelete ? "Confirm?" : "Delete"}
      </div>
    </div>
  );
}

export default AdhocListEntry;
