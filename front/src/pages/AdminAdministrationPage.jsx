import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import styles from "./pages_css/AdminAdministrationPage.module.css";
import { fetchData } from "../helpers/common";
import UsersList from "./components/UsersList";

function AdminAdministrationPage() {
  const userCtx = useContext(UserContext);
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState([]);

  async function getAllUsers() {
    try {
      const { ok, data } = await fetchData("/users", userCtx.accessToken);
      if (ok) {
        setAdmins(data.filter((item) => item.role == "Admin"));
        setUsers(data.filter((item) => item.role == "User"));
        setPending(data.filter((item) => item.role == "Registered"));
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
      alert("Error getting users");
    }
  }

  useEffect(() => {
    if (userCtx.accessToken != "") {
      getAllUsers();
    }
  }, [userCtx.accessToken]);

  return (
    <div className={styles.container}>
      <div className={styles.account}>
        <div>Name: {userCtx.claims.name}</div>
        <div>Email: {userCtx.claims.email}</div>
      </div>
      <hr />
      {/* <div>change password</div> */}
      <div className={styles.users_lists}>
        <div>
          <UsersList users={users} role="User" getAllUsers={getAllUsers} />
        </div>
        <div>
          <UsersList users={admins} getAllUsers={getAllUsers} />
        </div>
      </div>
      <hr />
      <UsersList users={pending} role="Registered" getAllUsers={getAllUsers} />
    </div>
  );
}

export default AdminAdministrationPage;
