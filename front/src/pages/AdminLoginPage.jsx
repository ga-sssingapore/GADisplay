import React from "react";
import styles from "./pages_css/AdminLoginPage.module.css";
import { Link } from "react-router-dom";

function AdminLoginPage() {
  return (
    <>
      <img
        src="/GA_banner_horizontal_black.png"
        alt="GA banner"
        className={styles.banner}
      />
      <div>
        <label htmlFor="email">Email: </label>
        <input type="text" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" />
      </div>
      <button>Log In</button>
      <hr />
      <div className={styles.register_prompt}>
        Require access? Please <Link to="/admin/register">register</Link> and
        inform an admin
      </div>
    </>
  );
}

export default AdminLoginPage;
