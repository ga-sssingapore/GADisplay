import React from "react";
import AdhocForm from "./components/AdhocForm";

function AdminAdhocPage() {
  // Also record logged in user who is performing the booking
  return (
    <>
      <AdhocForm />
      <hr />
      <AdHocList />
    </>
  );
}

export default AdminAdhocPage;
