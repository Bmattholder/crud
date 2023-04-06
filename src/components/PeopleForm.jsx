import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PeopleForm(props) {
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
      setFormData((z) => ({
        ...z,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setFormData((z) => ({
        ...z,
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
        placeholder="praenomens"
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="cognomen"
        id="cognomen"
        value={cognomen}
        placeholder="cognomen"
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="number"
        id="number"
        value={number}
        placeholder="number"
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="street"
        id="street"
        value={street}
        placeholder="street"
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="city"
        id="city"
        value={city}
        placeholder="city"
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="state"
        id="state"
        value={state}
        placeholder="state"
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="zip"
        id="zip"
        value={zip}
        placeholder="zip"
        onChange={onChange}
        required
      />
      <button>Submit</button>
    </form>
  );
}

export default PeopleForm;
