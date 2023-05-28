import React from "react";

function AdminLoginPage() {
  return (
    <>
      <div>Log In</div>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="text" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" />
      </div>
    </>
  );
}

export default AdminLoginPage;
