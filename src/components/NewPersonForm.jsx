import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Person.css";

function NewPersonForm(props) {
  const [newPerson, setNewPerson] = useState({
    praenomens: [""],
    cognomen: "",
    number: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const { praenomens, cognomen, number, street, city, state, zip } = newPerson;

  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setNewPerson((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setNewPerson((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:8080/api/v1/people",
      newPerson
    );
    console.log(res);

    navigate("/");
  };

  return (
    <form onSubmit={onSubmit} className="card card-form">
      <input
        type="text"
        name="praenomens"
        id="praenomens"
        placeholder="praenomens"
        value={praenomens}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="cognomen"
        id="cognomen"
        placeholder="cognomen"
        value={cognomen}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="number"
        id="number"
        placeholder="number"
        value={number}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="street"
        id="street"
        placeholder="street"
        value={street}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="city"
        id="city"
        placeholder="city"
        value={city}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="state"
        id="state"
        placeholder="state"
        value={state}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="zip"
        id="zip"
        placeholder="zip"
        value={zip}
        onChange={onChange}
        required
      />
      <button>Submit</button>
    </form>
  );
}

export default NewPersonForm;
