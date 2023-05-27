import React from "react";
import { useParams } from "react-router-dom";

function DisplayPage() {
  const { number } = useParams();
  return (
    <div>
      <div>Classroom {number}</div>
      <div>$batch</div>
      <div>$time</div>
      <hr />
      <div>
        <img src="" alt="GA logo" />
        <div>GENERAL ASSEMBLY</div>
      </div>
    </div>
  );
}

export default DisplayPage;
