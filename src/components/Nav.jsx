import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav(props) {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/form">Form</Link>
    </div>
  );
}

export default Nav;
