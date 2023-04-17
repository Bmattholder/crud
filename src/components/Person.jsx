import React, { useEffect, useState } from "react";
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

  const [token, setToken] = useState(localStorage.getItem("fakeToken"));

  const { praenomens, cognomen, number, street, city, state, zip } =
    editingPerson;

  useEffect(() => {
    const token = localStorage.getItem("fakeToken");
    setToken(token);
  }, []);

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

  const onSubmit = async (e, id) => {
    e.preventDefault();

    const res = await axios.patch(
      "http://localhost:8080/api/v1/people/" + id,
      editingPerson
    );
    console.log(res);
    refresh();
    setEditMode(!editMode);
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
            {id}: {praenomens} {cognomen}
          </h1>
          <p>
            {number} {street}
          </p>
          <p>
            {city} {state} {zip}
          </p>
          {token && (
            <>
              {" "}
              <button onClick={() => setEditMode(!editMode)}>Edit</button>
              <button onClick={(e) => onDelete(e, id)}>Delete</button>{" "}
            </>
          )}
        </>
      ) : (
        <form>
          <input
            type="text"
            name="praenomens"
            id="praenomens"
            value={praenomens}
            onChange={onChange}
            placeholder="praenomens"
            required
          />
          <input
            type="text"
            name="cognomen"
            id="cognomen"
            value={cognomen}
            onChange={onChange}
            placeholder="cognomen"
            required
          />
          <input
            type="text"
            name="number"
            id="number"
            value={number}
            onChange={onChange}
            placeholder="number"
            required
          />
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            onChange={onChange}
            placeholder="street"
            required
          />
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={onChange}
            placeholder="city"
            required
          />
          <input
            type="text"
            name="state"
            id="state"
            value={state}
            onChange={onChange}
            placeholder="state"
            required
          />
          <input
            type="text"
            name="zip"
            id="zip"
            value={zip}
            onChange={onChange}
            placeholder="zip"
            required
          />
          <button onClick={(e) => onSubmit(e, id)}>Submit</button>
          <button onClick={() => setEditMode(!editMode)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default Person;
