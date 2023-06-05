import React, { useContext, useState } from "react";
import styles from "./css/AdhocList.module.css";
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
    <tr className={styles.adhoc_row} onClick={() => setConfirmDelete(false)}>
      <td className={styles.event}>{props.event}</td>
      <td className={styles.room}>{props.room}</td>
      <td className={styles.date}>{props.date}</td>
      <td className={styles.start}>{props.start}</td>
      <td className={styles.end}>{props.end}</td>
      <td className={styles.purpose}>{props.purpose}</td>
      <td
        className={`${styles.delete} ${styles.delete_button}`}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        {confirmDelete ? "Confirm?" : "Delete"}
      </td>
    </tr>
  );
}

export default AdhocListEntry;
