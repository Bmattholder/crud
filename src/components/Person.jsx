import React, { useState } from "react";
import axios from "axios";

import "./Person.css";

function Person({ id, firstName, lastName, address, refresh }) {
  const [editMode, setEditMode] = useState(false);
  const [editingPerson, setEditingPerson] = useState({
    praenomens: firstName,
    cognomen: lastName,
    number: address.number,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  });

  const { praenomens, cognomen, number, street, city, state, zip } =
    editingPerson;

  const url = "http://localhost:8080/api/v1/people/";

  const submitEdit = async (e) => {
    e.preventDefault();

    const res = await axios.patch(url + id, editingPerson);
    console.log(res);
    refresh();
    setEditMode(!editMode);
  };

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setEditingPerson((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditingPerson((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const cancelEdit = () => {
    setEditingPerson({
      praenomens: firstName,
      cognomen: lastName,
      number: address.number,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
    setEditMode(!editMode);
  };

  const deletePerson = async (e, id) => {
    e.preventDefault();

    const res = await axios.delete(url + id);
    console.log(res);
    refresh();
  };

  return (
    <div className="card">
      {!editMode ? (
        <>
          <h1>
            {firstName} {lastName}
          </h1>
          <p>
            {number} {street}
          </p>
          <p>
            {city} {state} {zip}
          </p>
          <button onClick={() => setEditMode(!editMode)}>Edit</button>
          <button onClick={(e) => deletePerson(e, id)}>Delete</button>
        </>
      ) : (
        <form>
          <input
            type="text"
            name="praenomens"
            id="praenomens"
            value={praenomens}
            onChange={onChange}
            placeholder="Praenomens"
            required
          />
          <input
            type="text"
            name="cognomen"
            id="cognomen"
            value={cognomen}
            onChange={onChange}
            placeholder="Cognomen"
            required
          />
          <input
            type="text"
            name="number"
            id="number"
            value={number}
            onChange={onChange}
            placeholder="Number"
            required
          />
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            onChange={onChange}
            placeholder="Street"
            required
          />
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={onChange}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            id="state"
            value={state}
            onChange={onChange}
            placeholder="State"
            required
          />
          <input
            type="text"
            name="zip"
            id="zip"
            value={zip}
            onChange={onChange}
            placeholder="Zip"
            required
          />
          <button onClick={(e) => submitEdit(e, id)}>Update</button>
          <button onClick={cancelEdit}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default Person;
