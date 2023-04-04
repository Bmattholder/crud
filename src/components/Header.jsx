import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div
      style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}
    >
      <Link to="/">Home</Link>
      <Link to="/list">List</Link>
    </div>
  );
}

export default Header;
