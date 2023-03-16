import React, { useState } from 'react';
import axios from 'axios';

function PersonForm({ triggeredHandler, editPerson }) {
  const [randomName, setRandomName] = useState({
    praenomens: ['Sally'],
    cognomen: 'Sells',
    number: '17',
    street: 'Seashells',
    city: 'By The Sea',
    state: 'Shore',
    zip: '99283',
  });

  const { praenomens, cognomen, number, street, city, state, zip } = randomName;


  const inputChangeHandler = (e) => {
    if (e.target.name === 'praenomens') {
      setRandomName((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setRandomName((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/people', randomName);
      setRandomName({
        praenomens: ['Sally'],
        cognomen: 'Sells',
        number: '17',
        street: 'Seashells',
        city: 'By The Sea',
        state: 'Shore',
        zip: '99283',
      });
      triggeredHandler();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(editPerson);

  const editFormSubmitHandler = async (id) => {
    await axios.patch(`http://localhost:8080/api/v1/people/${id}`, randomName);
    triggeredHandler();
  };

  if (editPerson) {
	
    return (
      <form onSubmit={() => editFormSubmitHandler(editPerson.id)}>
        <div>
          <input
            type='text'
            id='editPraenomens'
            name='editPraenomens'
            value={editPerson.praenomens}
            onChange={inputChangeHandler}
            placeholder='editPraenomens'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='editCognomen'
            name='editCognomen'
            value={editPerson.cognomen}
            onChange={inputChangeHandler}
            placeholder='editCognomen'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='editNumber'
            name='editNumber'
            value={editPerson.number}
            onChange={inputChangeHandler}
            placeholder='editNumber'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='editStreet'
            name='editStreet'
            value={editPerson.street}
            onChange={inputChangeHandler}
            placeholder='editStreet'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='editCity'
            name='editCity'
            value={editPerson.city}
            onChange={inputChangeHandler}
            placeholder='editCity'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='editState'
            name='editState'
            value={editPerson.state}
            onChange={inputChangeHandler}
            placeholder='editState'
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='editZip'
            name='editZip'
            value={editPerson.zip}
            onChange={inputChangeHandler}
            placeholder='editZip'
            required
          />
        </div>
        <button type='submit'>Edit</button>
      </form>
    );
  } else {
    return (
      <form onSubmit={formSubmitHandler}>
        <div>
          <input
            type='text'
            id='praenomens'
            name='praenomens'
            value={praenomens}
            onChange={inputChangeHandler}
            placeholder='Praenomens'
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
            placeholder='Cognomen'
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
            placeholder='Number'
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
            placeholder='Street'
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
            placeholder='City'
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
            placeholder='State'
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
            placeholder='Zip'
            required
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

export default PersonForm;
