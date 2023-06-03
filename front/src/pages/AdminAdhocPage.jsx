import React from "react";
import AdhocForm from "./components/AdhocForm";
import AdhocList from "./components/AdhocList";

function AdminAdhocPage() {
  // Also record logged in user who is performing the booking
  return (
    <>
      <AdhocForm />
      <hr />
      <AdhocList />
    </>
  );
}

export default AdminAdhocPage;
