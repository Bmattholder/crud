import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Nav.css";

function Nav() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("token"));

  function handleLoginClick() {
    if (isLogged) {
      localStorage.removeItem("token");
      setIsLogged(false);
    } else {
      localStorage.setItem("token", "fake token");
      setIsLogged(true);
    }
  }

  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/form">Form</Link>
      <button onClick={handleLoginClick}>
        {isLogged ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default Nav;
