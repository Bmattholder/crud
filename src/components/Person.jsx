import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Person.css";

function Person({ id, firstName, lastName, address, refresh }) {
  const [editMode, setEditMode] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setEditingPerson((ww) => ({
        ...ww,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditingPerson((ww) => ({
        ...ww,
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

  const onDelete = async (e, id) => {
    e.preventDefault();

    const res = await axios.delete("http://localhost:8080/api/v1/people/" + id);
    console.log(res);
    refresh();
  };

  return (
    <div className="card">
      {!editMode ? (
        <>
          <h1>{id + ": " + firstName + " " + lastName}</h1>
          <p>
            {number} {street}
          </p>
          <p>
            {city} {state} {zip}
          </p>
          {isAuth && (
            <>
              <button onClick={() => setEditMode(!editMode)}>Edit</button>
              <button onClick={(e) => onDelete(e, id)}>Delete</button>{" "}
            </>
          )}
        </>
      ) : (
        <form>
          <input
            name="praenomens"
            id="praenomens"
            value={praenomens}
            placeholder="praenomens"
            onChange={onChange}
            required
          />
          <input
            name="cognomen"
            id="cognomen"
            value={cognomen}
            placeholder="cognomen"
            onChange={onChange}
            required
          />
          <input
            name="number"
            id="number"
            value={number}
            placeholder="number"
            onChange={onChange}
            required
          />
          <input
            name="street"
            id="street"
            value={street}
            placeholder="street"
            onChange={onChange}
            required
          />
          <input
            name="city"
            id="city"
            value={city}
            placeholder="city"
            onChange={onChange}
            required
          />
          <input
            name="state"
            id="state"
            value={state}
            placeholder="state"
            onChange={onChange}
            required
          />
          <input
            name="zip"
            id="zip"
            value={zip}
            placeholder="zip"
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
