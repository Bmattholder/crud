import React, { useState } from "react";
import axios from "axios";

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
    setEditMode(!editMode);
    refresh();
  };

  const deletePerson = async (e, id) => {
    e.preventDefault();

    const res = await axios.delete("http://localhost:8080/api/v1/people/" + id);
    console.log(res);
    refresh();
  };

  return (
    <div>
      {!editMode ? (
        <>
          <h1>
            {id}: {firstName} {lastName}
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
            placeholder="Praenomens"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="cognomen"
            id="cognomen"
            value={cognomen}
            placeholder="Cognomen"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="number"
            id="number"
            value={number}
            placeholder="Number"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            placeholder="Street"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            placeholder="City"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="state"
            id="state"
            value={state}
            placeholder="State"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="zip"
            id="zip"
            value={zip}
            placeholder="Zip"
            onChange={onChange}
            required
          />
          <button onClick={(e) => submitEdit(e, id)}>Submit Edit</button>
          <button onClick={() => setEditMode(!editMode)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default Person;
