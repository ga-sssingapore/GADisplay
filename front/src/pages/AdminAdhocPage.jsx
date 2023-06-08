import React, { useContext, useState, useEffect } from "react";
import AdhocForm from "./components/AdhocForm";
import AdhocList from "./components/AdhocList";
import { fetchData } from "../helpers/common";
import UserContext from "../context/user";
import styles from "./pages_css/AdminAdhocPage.module.css";

function AdminAdhocPage() {
  const userCtx = useContext(UserContext);
  const [adhocs, setAdhocs] = useState([]);
  // Also record logged in user who is performing the booking

  async function getAdhocs() {
    try {
      const { ok, data } = await fetchData("/adhocs/full", userCtx.accessToken);
      if (ok) {
        data.map((item) => {
          item.starts = new Date(item.starts);
          item.ends = new Date(item.ends);
          return item;
        });
        setAdhocs(data);
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
      alert("Error getting ad-hocs");
    }
  }

  useEffect(() => {
    if (userCtx.accessToken != "") {
      getAdhocs();
    }
  }, [userCtx.accessToken]);

  return (
    <>
      <h2 className={styles.header}>Ad-Hoc room reservation</h2>
      <AdhocForm getAdhocs={getAdhocs} />
      <hr />
      <ul className={styles.info_text}>
        <h4>Scheduled ad-hocs</h4>
        <li>
          Click delete twice to delete an entry. To "un-confirm" delete, click
          anywhere in the table (other than the delete buttons).
        </li>
        <li>Entries are shown in order of start time.</li>
        <li>
          Events are displayed on tablet screen, purposes are displayed on admin
          dashboard
        </li>
      </ul>
      <AdhocList adhocs={adhocs} getAdhocs={getAdhocs} />
    </>
  );
}

export default AdminAdhocPage;
