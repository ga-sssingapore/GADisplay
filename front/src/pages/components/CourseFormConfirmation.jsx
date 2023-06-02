import React from "react";
import ReactDOM from "react-dom";

function Overlay(props) {
  return <div>Test</div>;
}

function CourseFormConfirmation(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay />,
        document.querySelector("#modal-root")
      )}
    </>
  );
}

export default CourseFormConfirmation;
