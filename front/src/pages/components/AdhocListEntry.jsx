import React, { useContext, useState } from "react";
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
        } else {
          throw new Error(data);
        }
      } catch (error) {
        console.log(error.message);
        alert("Error deleting adhoc");
      }
    }
  }

  return (
    <div className={styles.adhoc_row} onClick={() => setConfirmDelete(false)}>
      <div>{props.event}</div>
      <div className={styles.center_text}>{props.room}</div>
      <div className={styles.center_text}>{props.date}</div>
      <div className={styles.center_text}>{props.start}</div>
      <div className={styles.center_text}>{props.end}</div>
      <div>{props.purpose}</div>
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
