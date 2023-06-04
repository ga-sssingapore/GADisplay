import React, { useContext } from "react";
import styles from "./css/UsersList.module.css";
import UsersListEntry from "./UsersListEntry";

function UsersList(props) {
  return (
    <table className={styles.users_table}>
      <thead className={styles.users_table_header}>
        <tr>
          <td>Name</td>
          <td>Email</td>
        </tr>
      </thead>
      <tbody>
        {props.users.map((item, idx) => {
          return (
            <UsersListEntry
              key={idx}
              idx={idx}
              id={item.id}
              name={item.name}
              email={item.email}
              role={item.role}
              getAllUsers={props.getAllUsers}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default UsersList;
