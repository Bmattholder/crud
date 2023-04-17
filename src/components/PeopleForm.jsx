import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PeopleForm() {
  const [formData, setFormData] = useState({
    praenomens: "",
    cognomen: "",
    number: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const { praenomens, cognomen, number, street, city, state, zip } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:8080/api/v1/people",
      formData
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
        value={praenomens}
        onChange={onChange}
        placeholder="praenomens"
        required
      />
      <input
        type="text"
        name="cognomen"
        id="cognomen"
        value={cognomen}
        onChange={onChange}
        placeholder="cognomen"
        required
      />
      <input
        type="text"
        name="number"
        id="number"
        value={number}
        onChange={onChange}
        placeholder="number"
        required
      />
      <input
        type="text"
        name="street"
        id="street"
        value={street}
        onChange={onChange}
        placeholder="street"
        required
      />
      <input
        type="text"
        name="city"
        id="city"
        value={city}
        onChange={onChange}
        placeholder="city"
        required
      />
      <input
        type="text"
        name="state"
        id="state"
        value={state}
        onChange={onChange}
        placeholder="state"
        required
      />
      <input
        type="text"
        name="zip"
        id="zip"
        value={zip}
        onChange={onChange}
        placeholder="zip"
        required
      />
      <button>Submit</button>
    </form>
  );
}

export default PeopleForm;
