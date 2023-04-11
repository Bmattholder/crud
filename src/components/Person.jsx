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
      setEditingPerson((z) => ({
        ...z,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditingPerson((z) => ({
        ...z,
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

  const cancelEditHelper = () => {
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
    <div>
      {!editMode ? (
        <>
          <h1>
            {id} {firstName} {lastName}
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
            placeholder="praenomens"
            value={praenomens}
            onChange={onChange}
          />{" "}
          <input
            type="text"
            name="cognomen"
            id="cognomen"
            placeholder="cognomen"
            value={cognomen}
            onChange={onChange}
          />{" "}
          <input
            type="text"
            name="number"
            id="number"
            placeholder="number"
            value={number}
            onChange={onChange}
          />{" "}
          <input
            type="text"
            name="street"
            id="street"
            placeholder="street"
            value={street}
            onChange={onChange}
          />{" "}
          <input
            type="text"
            name="city"
            id="city"
            placeholder="city"
            value={city}
            onChange={onChange}
          />{" "}
          <input
            type="text"
            name="state"
            id="state"
            placeholder="state"
            value={state}
            onChange={onChange}
          />{" "}
          <input
            type="text"
            name="zip"
            id="zip"
            placeholder="zip"
            value={zip}
            onChange={onChange}
          />
          <button onClick={(e) => submitEdit(e, id)}>Submit Edit</button>
          <button onClick={cancelEditHelper}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default Person;
