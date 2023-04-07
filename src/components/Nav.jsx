import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Nav.module.css";

function Nav() {
  return (
    <div className={classes.main}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/form"
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        Form
      </NavLink>
    </div>
  );
}

export default Nav;
