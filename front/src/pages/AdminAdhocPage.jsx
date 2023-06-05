import React from "react";
import AdhocForm from "./components/AdhocForm";
import AdhocList from "./components/AdhocList";

function AdminAdhocPage() {
  // Also record logged in user who is performing the booking
  return (
    <>
      <AdhocForm />
      <hr />
      <div style={{ marginLeft: "2%" }}>
        Click delete twice to delete an entry. If deletion is not to be
        confirmed, click any white space in the same row to "un-confirm".
      </div>
      <AdhocList />
    </>
  );
}

export default AdminAdhocPage;
