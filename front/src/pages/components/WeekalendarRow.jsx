import React from "react";

function WeekalendarRow(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.columns[0].map((item) => item.cohort)}</td>
      <td>{props.columns[1].map((item) => item.cohort)}</td>
      <td>{props.columns[2].map((item) => item.cohort)}</td>
      <td>{props.columns[3].map((item) => item.cohort)}</td>
      <td>{props.columns[4].map((item) => item.cohort)}</td>
      <td>{props.columns[5].map((item) => item.cohort)}</td>
      <td>{props.columns[6].map((item) => item.cohort)}</td>
    </tr>
  );
}

export default WeekalendarRow;
