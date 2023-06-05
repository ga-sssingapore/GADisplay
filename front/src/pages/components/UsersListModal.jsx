import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import UserContext from "../../context/user";
import modal from "./css/ModalBackdrop.module.css";
import styles from "./css/UsersListModal.module.css";
import { fetchData } from "../../helpers/common";

function Overlay(props) {
  const userCtx = useContext(UserContext);
  const [confirmAccept, setConfirmAccept] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  async function handlePromote(event) {
    event.preventDefault();
    if (!confirmAccept) {
      setConfirmAccept(true);
      setConfirmRemove(false);
    } else {
      try {
        const { ok, data } = await fetchData(
          "/users/promote",
          userCtx.accessToken,
          "PATCH",
          {
            id: props.id,
          }
        );
        if (ok) {
          setConfirmAccept(false);
          setConfirmRemove(false);
          props.setUserModal(false);
          props.getAllUsers();
          alert(`User ${props.name} promoted!`);
        } else {
          throw new Error(data);
        }
      } catch (error) {
        console.log(error.message);
        alert("Error promoting user");
      }
    }
  }

  async function handleApprove(event) {
    event.preventDefault();
    if (!confirmAccept) {
      setConfirmAccept(true);
      setConfirmRemove(false);
    } else {
      try {
        const { ok, data } = await fetchData(
          "/users/promote",
          userCtx.accessToken,
          "POST",
          {
            id: props.id,
          }
        );
        if (ok) {
          setConfirmAccept(false);
          setConfirmRemove(false);
          props.setUserModal(false);
          props.getAllUsers();
          alert(`User ${props.name} approved!`);
        } else {
          throw new Error(data);
        }
      } catch (error) {
        console.log(error.message);
        alert("Error approving user");
      }
    }
  }

  async function handleRemove(event) {
    event.preventDefault();
    if (!confirmRemove) {
      setConfirmRemove(true);
      setConfirmAccept(false);
    } else {
      try {
        const { ok, data } = await fetchData(
          "/users/delete",
          userCtx.accessToken,
          "DELETE",
          {
            id: props.id,
          }
        );
        if (ok) {
          setConfirmAccept(false);
          setConfirmRemove(false);
          props.setUserModal(false);
          props.getAllUsers();
          alert(`User ${props.name} deleted.`);
        } else {
          throw new Error(data);
        }
      } catch (error) {
        console.log(error.message);
        alert("Error deleting user");
      }
    }
  }

  return (
    <div className={modal.backdrop} onClick={() => props.setUserModal(false)}>
      <div
        className={`${modal.modal} ${styles.modal_size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.details}>
          <div>Name: {props.name}</div>
          <div>Email: {props.email}</div>
          <div>Role: {props.role}</div>
        </div>
        <hr />
        <div className={styles.buttons_container}>
          {props.role == "User" && (
            <button className={styles.confirm_button} onClick={handlePromote}>
              Promote
            </button>
          )}
          {props.role == "Registered" && (
            <button className={styles.confirm_button} onClick={handleApprove}>
              Approve
            </button>
          )}
          <button className={styles.remove_button} onClick={handleRemove}>
            Remove
          </button>
          <button
            className={styles.return_button}
            onClick={() => props.setUserModal(false)}
          >
            Return
          </button>
        </div>
        {confirmAccept && (
          <div className={styles.accept_text}>
            Click confirm again to confirm{" "}
            {props.role == "User" ? "promote" : "approve"}
          </div>
        )}
        {confirmRemove && (
          <div className={styles.remove_text}>
            Click remove again to remove user
          </div>
        )}
      </div>
    </div>
  );
}

function UsersListModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          setUserModal={props.setUserModal}
          id={props.id}
          name={props.name}
          email={props.email}
          role={props.role}
          getAllUsers={props.getAllUsers}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
}

export default UsersListModal;
