import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [myToken, setMyToken] = useState(localStorage.getItem("fakeToken"));

  const addToken = () => {
    localStorage.setItem("fakeToken", "asdf");
    setMyToken("asdf");
  };

  const removeToken = () => {
    localStorage.removeItem("fakeToken");
    setMyToken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("fakeToken");
    setMyToken(token);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Link to="/">Home</Link>
      <Link to="/form">Form</Link>
      {myToken ? (
        <button onClick={removeToken}>Logout</button>
      ) : (
        <button onClick={addToken}>Login</button>
      )}
    </div>
  );
}

export default Nav;
