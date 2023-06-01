import React from "react";

function WeekalendarRow(props) {
  function extractNames(col) {
    if (col.length <= 1) {
      return col[0]?.name;
    } else {
      // Check if multiples events conflict
    }
  }
  return (
    <tr>
      <td>{props.id}</td>
      <td>{extractNames(props.columns[0])}</td>
      <td>{extractNames(props.columns[1])}</td>
      <td>{extractNames(props.columns[2])}</td>
      <td>{extractNames(props.columns[3])}</td>
      <td>{extractNames(props.columns[4])}</td>
      <td>{extractNames(props.columns[5])}</td>
      <td>{extractNames(props.columns[6])}</td>
    </tr>
  );
}

export default WeekalendarRow;
