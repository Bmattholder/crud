import React, { useState } from "react";
import axios from "axios";

function People({ id, firstName, lastName, address, refresh }) {
  const [editMode, setEditMode] = useState(false);
  const [person, setPerson] = useState({
    praenomens: firstName,
    cognomen: lastName,
    number: address.number,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  });

  const { praenomens, cognomen, number, street, city, state, zip } = person;

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setPerson((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setPerson((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e, id) => {
    e.preventDefault();

    const res = await axios.patch(
      "http://localhost:8080/api/v1/people/" + id,
      person
    );
    console.log(res);
    setEditMode(!editMode);
    refresh();
  };

  const onDelete = async (e, id) => {
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
          </h1>{" "}
          <p>
            {number} {street}
          </p>{" "}
          <p>
            {city} {state} {zip}
          </p>{" "}
          <button onClick={() => setEditMode(!editMode)}>Edit</button>
          <button onClick={(e) => onDelete(e, id)}>Delete</button>
        </>
      ) : (
        <form>
          <input
            type="text"
            name="praenomens"
            value={praenomens}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="cognomen"
            value={cognomen}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="number"
            value={number}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="street"
            value={street}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="city"
            value={city}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="state"
            value={state}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="zip"
            value={zip}
            onChange={onChange}
            required
          />
          <button onClick={(e) => onSubmit(e, id)}>Submit Edit</button>
          <button onClick={() => setEditMode(!editMode)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default People;
