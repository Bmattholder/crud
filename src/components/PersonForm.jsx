import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PersonForm(props) {
  const [personInfo, setPersonInfo] = useState({
    praenomens: [""],
    cognomen: "",
    number: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const { praenomens, cognomen, number, street, city, state, zip } = personInfo;

  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setPersonInfo((s) => ({
        ...s,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setPersonInfo((d) => ({
        ...d,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:8080/api/v1/people",
      personInfo
    );
    console.log(res);
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="praenomens"
        id="praenomens"
        placeholder="praenomens"
        value={praenomens}
        onChange={onChange}
      />
      <input
        type="text"
        name="cognomen"
        id="cognomen"
        placeholder="cognomen"
        value={cognomen}
        onChange={onChange}
      />
      <input
        type="text"
        name="number"
        id="number"
        placeholder="number"
        value={number}
        onChange={onChange}
      />
      <input
        type="text"
        name="street"
        id="street"
        placeholder="street"
        value={street}
        onChange={onChange}
      />
      <input
        type="text"
        name="city"
        id="city"
        placeholder="city"
        value={city}
        onChange={onChange}
      />
      <input
        type="text"
        name="state"
        id="state"
        placeholder="state"
        value={state}
        onChange={onChange}
      />
      <button>Submit</button>
    </form>
  );
}

export default PersonForm;
