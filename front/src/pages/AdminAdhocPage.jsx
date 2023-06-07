import React, { useContext, useState, useEffect } from "react";
import AdhocForm from "./components/AdhocForm";
import AdhocList from "./components/AdhocList";
import { fetchData } from "../helpers/common";
import UserContext from "../context/user";

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
      <h2 style={{ margin: "2vh 2%" }}>Ad-Hoc room reservation</h2>
      <AdhocForm getAdhocs={getAdhocs} />
      <hr />
      <div style={{ marginLeft: "2%" }}>
        Click delete twice to delete an entry. If deletion is not to be
        confirmed, click any white space in the same row to "un-confirm".
        <br />
        Entries are shown in order of start time.
      </div>
      <AdhocList adhocs={adhocs} getAdhocs={getAdhocs} />
    </>
  );
}

export default AdminAdhocPage;
