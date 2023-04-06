import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './CRUD.css';

function CRUD() {
  const [formData, setFormData] = useState({
    id: '',
    praenomens: [''],
    cognomen: '',
    number: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const [toggle, setToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  const [peopleList, setPeopleList] = useState(['']);

  const { praenomens, cognomen, number, street, city, state, zip } = formData;

  const inputChangeHandler = (e) => {
    if (e.target.id === 'praenomens') {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/v1/people', formData);
    setFormData({
      praenomens: [''],
      cognomen: '',
      number: '',
      street: '',
      city: '',
      state: '',
      zip: '',
    });
    setToggle(!toggle);
  };

  function passEditPerson(person) {
    setFormData({
      id: person.id,
      praenomens: person.personalName.givenNames[0].value,
      cognomen: person.personalName.surname.value,
      number: person.address.number,
      street: person.address.street,
      city: person.address.city,
      state: person.address.state,
      zip: person.address.zip,
    });
    setEditToggle(true);
  }

  const editHandler = async (id) => {
    const updateData = {
      praenomens: formData.praenomens,
      cognomen: formData.cognomen,
      number: formData.number,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
    };

    await axios.patch(`http://localhost:8080/api/v1/people/${id}`, updateData);

    setFormData({
      praenomens: [''],
      cognomen: '',
      number: '',
      street: '',
      city: '',
      state: '',
      zip: '',
    });
    setToggle(!toggle);
    setEditToggle(false);
  };

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/people/${id}`);
    setToggle(!toggle);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8080/api/v1/people');
      let data = response.data;
      setPeopleList(data);
    }
    fetchData();
  }, [toggle]);

  return (
    <>
      <form  className='form'>
        <div>
          <input
            type='text'
            id='praenomens'
            name='praenomens'
            value={praenomens}
            onChange={inputChangeHandler}
            placeholder='praenomens'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='cognomen'
            name='cognomen'
            value={cognomen}
            onChange={inputChangeHandler}
            placeholder='cognomen'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='number'
            name='number'
            value={number}
            onChange={inputChangeHandler}
            placeholder='number'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='street'
            name='street'
            value={street}
            onChange={inputChangeHandler}
            placeholder='street'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='city'
            name='city'
            value={city}
            onChange={inputChangeHandler}
            placeholder='city'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='state'
            name='state'
            value={state}
            onChange={inputChangeHandler}
            placeholder='state'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='zip'
            name='zip'
            value={zip}
            onChange={inputChangeHandler}
            placeholder='zip'
            required
          />
        </div> 
        {editToggle === false ? (
          <button type='submit' onClick={submitHandler}>Submit</button>
        ) : (
          <button onClick={() => editHandler(formData.id)}>Submit Edit</button>
        )}
      </form>
      {peopleList &&
        peopleList.content &&
        peopleList.content.map((person) => (
          <div className='content' key={person.id}>
            id: {person.id} | name:
            <b>{person.personalName.givenNames[0].value}</b>
            <button onClick={() => passEditPerson(person)}>Edit</button>
            <button
              style={{ color: 'red' }}
              onClick={() => deleteHandler(person.id)}
            >
              Delete
            </button>
          </div>
        ))}
    </>
  );
}

export default CRUD;
