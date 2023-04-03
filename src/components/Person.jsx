import React, { useState } from "react";
import axios from "axios";

function Person({ id, firstName, lastName, address, toggleHelper }) {
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    praenomens: firstName,
    cognomen: lastName,
    number: address.number,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  });

  const { praenomens, cognomen, number, street, city, state, zip } = editForm;

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setEditForm((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditForm((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const resetState = () => {
    setEditForm({
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

  const submitEditHandler = async (e, id) => {
    e.preventDefault();
    const res = await axios.patch(
      `http://localhost:8080/api/v1/people/${id}`,
      editForm
    );
    console.log(res);
    toggleHelper();
    setEditMode(!editMode);
  };

  const deleteHandler = async (id) => {
    const res = await axios.delete(`http://localhost:8080/api/v1/people/${id}`);
    console.log(res);
    toggleHelper();
  };

  return (
    <div>
      {!editMode ? (
        <>
          <h1>
            {id}: {firstName} {lastName}
          </h1>
          <p>
            {address.number} {address.street}
          </p>
          <p>
            {address.city} {address.state} {address.zip}{" "}
          </p>
          <button onClick={() => setEditMode(!editMode)}>Edit</button>
          <button onClick={() => deleteHandler(id)}>Delete</button>
        </>
      ) : (
        <>
          <form>
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
            <input
              type="text"
              name="zip"
              id="zip"
              placeholder="zip"
              value={zip}
              onChange={onChange}
            />
            <button onClick={(e) => submitEditHandler(e, id)}>
              Submit Edit
            </button>
            <button onClick={resetState}>Cancel</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Person;
