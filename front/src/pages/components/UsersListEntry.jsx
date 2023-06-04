import React, { useState, useContext } from "react";
import styles from "./css/UsersListEntry.module.css";
import UsersListModal from "./UsersListModal";
import UserContext from "../../context/user";

function UsersListEntry(props) {
  const [userModal, setUserModal] = useState(false);
  const userCtx = useContext(UserContext);
  return (
    <>
      <tr className={props.idx % 2 == 1 ? styles.odd_row : ""}>
        <td onClick={() => setUserModal(true)}>{props.name}</td>
        <td>{props.email}</td>
      </tr>
      {userModal && userCtx.claims.role == "Admin" && (
        <UsersListModal
          setUserModal={setUserModal}
          name={props.name}
          email={props.email}
          role={props.role}
        />
      )}
    </>
  );
}

export default UsersListEntry;
