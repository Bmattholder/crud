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

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setEditingPerson((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditingPerson((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitEdit = async (e, id) => {
    e.preventDefault();

    const res = await axios.patch(
      "http://localhost:8080/api/v1/people/" + id,
      editingPerson
    );
    console.log(res);
    refresh();
    setEditMode(!editMode);
  };

  const cancelHelper = () => {
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

    const res = await axios.delete("http://localhost:8080/api/v1/people/" + id);
    console.log(res);
    refresh();
  };

  return (
    <div className="card">
      {!editMode ? (
        <>
          <h1>
            {id}: {firstName} {lastName}{" "}
          </h1>
          <p>
            {address.number} {address.street}
          </p>
          <p>
            {address.city}, {address.state} {address.zip}
          </p>
          <button onClick={() => setEditMode(!editMode)}>Edit</button>
          <button onClick={(e) => deletePerson(e, id)}>Delete</button>
        </>
      ) : (
        <form>
          <input
            name="praenomens"
            id="praenomens"
            placeholder="praenomens"
            value={praenomens}
            onChange={onChange}
            required
          />
          <input
            name="cognomen"
            id="cognomen"
            placeholder="cognomen"
            value={cognomen}
            onChange={onChange}
            required
          />
          <input
            name="number"
            id="number"
            placeholder="number"
            value={number}
            onChange={onChange}
            required
          />
          <input
            name="street"
            id="street"
            placeholder="street"
            value={street}
            onChange={onChange}
            required
          />
          <input
            name="city"
            id="city"
            placeholder="city"
            value={city}
            onChange={onChange}
            required
          />
          <input
            name="state"
            id="state"
            placeholder="state"
            value={state}
            onChange={onChange}
            required
          />
          <input
            name="zip"
            id="zip"
            placeholder="zip"
            value={zip}
            onChange={onChange}
            required
          />
          <button onClick={(e) => submitEdit(e, id)}>Submit Edit</button>
          <button onClick={cancelHelper}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default Person;
