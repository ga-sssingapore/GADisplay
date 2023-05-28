import React from "react";
import RoomDisplayList from "./components/RoomDisplayList";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <RoomDisplayList />
      <hr />
      <Link to="/admin">
        <img src="/ga.ico" alt="GA icon login" />
      </Link>
    </div>
  );
}

export default LandingPage;
