import React, { useState } from "react";
import axios from "axios";

function People({ id, firstName, lastName, address, toggleHelper }) {
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
    if (e.target.id === "praenomens") {
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

  const onEditSubmit = async (e, id) => {
    e.preventDefault();

    const res = await axios.patch(
      "http://localhost:8080/api/v1/people/" + id,
      editPerson
    );
    console.log(res);
    toggleHelper();
    setEditMode(!editMode);
  };

  const cancelHelper = () => {
    setEditMode(!editMode);
    setEditPerson({
      praenomens: firstName,
      cognomen: lastName,
      number: address.number,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
  };

  const deleteHelper = async (id) => {
    const res = await axios.delete("http://localhost:8080/api/v1/people/" + id);
    console.log(res);
    toggleHelper();
  };

  return (
    <div>
      {!editMode ? (
        <>
          <h2>
            {id}: {firstName} {lastName}
          </h2>
          <p>
            {address.number} {address.street} {address.city} {address.state}{" "}
            {address.zip}{" "}
          </p>
          <button onClick={() => setEditMode(!editMode)}>Edit</button>
          <button onClick={() => deleteHelper(id)}>Delete</button>
        </>
      ) : (
        <>
          <form>
            <input
              name="praenomens"
              id="praenomens"
              value={praenomens}
              onChange={onChange}
              placeholder="praenomens"
              required
            />
            <input
              name="cognomen"
              id="cognomen"
              value={cognomen}
              onChange={onChange}
              placeholder="cognomen"
              required
            />
            <input
              name="number"
              id="number"
              value={number}
              onChange={onChange}
              placeholder="number"
              required
            />
            <input
              name="street"
              id="street"
              value={street}
              onChange={onChange}
              placeholder="street"
              required
            />
            <input
              name="city"
              id="city"
              value={city}
              onChange={onChange}
              placeholder="city"
              required
            />
            <input
              name="state"
              id="state"
              value={state}
              onChange={onChange}
              placeholder="state"
              required
            />
            <input
              name="zip"
              id="zip"
              value={zip}
              onChange={onChange}
              placeholder="zip"
              required
            />
            <button onClick={(e) => onEditSubmit(e, id)}>Submit</button>
            <button onClick={cancelHelper}>Cancel</button>
          </form>
        </>
      )}
    </div>
  );
}

export default People;
