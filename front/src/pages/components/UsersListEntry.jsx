import React, { useState, useContext } from "react";
import styles from "./css/UsersListEntry.module.css";
import UsersListModal from "./UsersListModal";
import UserContext from "../../context/user";

function UsersListEntry(props) {
  const [userModal, setUserModal] = useState(false);
  const userCtx = useContext(UserContext);
  function handleClick() {
    if (
      userCtx.claims.email === props.email ||
      props.email === "former.staff@generalassemb.ly"
    ) {
      return;
    } else {
      setUserModal(true);
    }
  }
  return (
    <>
      <tr className={props.idx % 2 == 1 ? styles.odd_row : ""}>
        <td
          onClick={handleClick}
          className={
            userCtx.claims.email === props.email ||
            props.email === "former.staff@generalassemb.ly" ||
            userCtx.claims.role === "User"
              ? ""
              : styles.name
          }
        >
          {props.name}
        </td>
        <td>{props.email}</td>
      </tr>
      {userModal && userCtx.claims.role == "Admin" && (
        <UsersListModal
          setUserModal={setUserModal}
          id={props.id}
          name={props.name}
          email={props.email}
          role={props.role}
          getAllUsers={props.getAllUsers}
        />
      )}
    </>
  );
}

export default UsersListEntry;
