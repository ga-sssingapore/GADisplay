import React from "react";
import ReactDOM from "react-dom";
import modal from "./css/ModalBackdrop.module.css";

function Overlay(props) {
  return (
    <div className={modal.backdrop} onClick={props.closeModal}>
      <div className={modal.modal} onClick={(e) => e.stopPropagation()}>
        {props.csvData.map((item, idx) => {
          return <div key={idx}>{JSON.stringify(item)}</div>;
        })}
      </div>
    </div>
  );
}

function CourseCSVImportConfirmation(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay closeModal={props.closeModal} csvData={props.csvData} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
}

export default CourseCSVImportConfirmation;
