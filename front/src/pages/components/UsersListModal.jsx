import React, { useState } from "react";
import ReactDOM from "react-dom";
import modal from "./css/ModalBackdrop.module.css";
import styles from "./css/UsersListModal.module.css";

function Overlay(props) {
  const [confirmAccept, setConfirmAccept] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  async function handlePromote(event) {
    event.preventDefault();
    if (!confirmAccept) {
      setConfirmAccept(true);
      setConfirmRemove(false);
    }
  }

  async function handleApprove(event) {
    event.preventDefault();
    if (!confirmAccept) {
      setConfirmAccept(true);
      setConfirmRemove(false);
    }
  }

  async function handleRemove(event) {
    event.preventDefault();
    if (!confirmRemove) {
      setConfirmRemove(true);
      setConfirmAccept(false);
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
          name={props.name}
          email={props.email}
          role={props.role}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
}

export default UsersListModal;
