import React, { useState } from "react";
import axios from "axios";

function Person({ id, firstName, lastName, address, refreshHelper }) {
  const [editMode, setEditMode] = useState(false);
  const [editPerson, setEditPerson] = useState({
    praenomens: firstName,
    cognomen: lastName,
    number: address.number,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  });

  const { praenomens, cognomen, number, street, city, state, zip } = editPerson;

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setEditPerson((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditPerson((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitEdit = async (e, id) => {
    e.preventDefault();

    const res = await axios.patch(
      "http://localhost:8080/api/v1/people/" + id,
      editPerson
    );
    console.log(res);
    setEditMode(!editMode);
    refreshHelper();
  };

  const deleteHandler = async (e, id) => {
    e.preventDefault();

    const res = await axios.delete("http://localhost:8080/api/v1/people/" + id);
    console.log(res);
    refreshHelper();
  };

  const cancelEdit = () => {
    setEditPerson({
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

  return (
    <div>
      {!editMode ? (
        <>
          <h1>
            {id}: {firstName} {lastName}
          </h1>
          <p>
            {address.number} {address.street} {address.city} {address.state}{" "}
            {address.zip}
          </p>
          <button onClick={() => setEditMode(!editMode)}>Edit</button>
          <button onClick={(e) => deleteHandler(e, id)}>Delete</button>
        </>
      ) : (
        <>
          <form>
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
            <button onClick={(e) => submitEdit(e, id)}>Submit Edit</button>
            <button onClick={cancelEdit}>Cancel</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Person;
