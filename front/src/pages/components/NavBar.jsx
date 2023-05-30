import React from "react";
import styles from "./css/NavBar.module.css";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  return (
    <div className={styles.bar}>
      <img src="/GALogo.png" alt="GA logo" className={styles.home_logo} />
      {props.isLoggedIn && (
        <div className={styles.links_container}>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? styles.navbar_active : styles.navbar_link
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              isActive ? styles.navbar_active : styles.navbar_link
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/admin/adhoc"
            className={({ isActive }) =>
              isActive ? styles.navbar_active : styles.navbar_link
            }
          >
            Ad-Hoc
          </NavLink>
          <NavLink
            to="/admin/displays"
            className={({ isActive }) =>
              isActive ? styles.navbar_active : styles.navbar_link
            }
          >
            Displays
          </NavLink>
          <NavLink
            to="/admin/helm"
            className={({ isActive }) =>
              isActive ? styles.navbar_active : styles.navbar_link
            }
          >
            Helm
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default NavBar;
