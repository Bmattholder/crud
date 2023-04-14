import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PeopleForm() {
  const [newPersonInfo, setNewPersonInfo] = useState({
    praenomens: "",
    cognomen: "",
    number: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const { praenomens, cognomen, number, street, city, state, zip } =
    newPersonInfo;

  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setNewPersonInfo((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setNewPersonInfo((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:8080/api/v1/people",
      newPersonInfo
    );
    console.log(res);
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="praenomens"
        value={praenomens}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="cognomen"
        value={cognomen}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="number"
        value={number}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="street"
        value={street}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="city"
        value={city}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="state"
        value={state}
        onChange={onChange}
        required
      />
      <input type="text" name="zip" value={zip} onChange={onChange} required />
      <button>Submit</button>
    </form>
  );
}

export default PeopleForm;
