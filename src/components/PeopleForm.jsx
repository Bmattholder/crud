import React, { useState } from 'react';

function PeopleForm() {
  const [formData, setFormData] = useState({
    praenomens: [''],
    cognomen: '',
    number: '123',
    street: 'Any St',
    city: 'Nashville',
    state: 'TN',
    zip: '37174',
  });

  const { praenomens, cognomen, number, street, city, state, zip } = formData;

  const inputChangeHandler = (e) => {
    if (e.target.id === 'praenomens') {
      const value = e.target.value.trim();
      if (value !== praenomens[0]) {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: value.split(),
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/people', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
    setFormData({
      praenomens: [''],
      cognomen: '',
      number: '123',
      street: 'Any St',
      city: 'Nashville',
      state: 'TN',
      zip: '37174',
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          type='text'
          name='praenomens'
          id='praenomens'
          value={praenomens[0]}
          onChange={inputChangeHandler}
          placeholder='Praenomens'
          minLength={1}
          required
        />
      </div>
      <div>
        <input
          type='text'
          name='cognomen'
          id='cognomen'
          value={cognomen}
          onChange={inputChangeHandler}
          placeholder='Cognomen'
          minLength={1}
          required
        />
      </div>
      <div>
        <input
          type='text'
          name='number'
          id='number'
          value={number}
          onChange={inputChangeHandler}
          placeholder='Number'
          minLength={1}
          required
        />
      </div>
      <div>
        <input
          type='text'
          name='street'
          id='street'
          value={street}
          onChange={inputChangeHandler}
          placeholder='Street'
          minLength={1}
          required
        />
      </div>
      <div>
        <input
          type='text'
          name='city'
          id='city'
          value={city}
          onChange={inputChangeHandler}
          placeholder='City'
          minLength={1}
          required
        />
      </div>
      <div>
        <input
          type='text'
          name='state'
          id='state'
          value={state}
          onChange={inputChangeHandler}
          placeholder='State'
          minLength={1}
          required
        />
      </div>
      <div>
        <input
          type='text'
          name='zip'
          id='zip'
          value={zip}
          onChange={inputChangeHandler}
          placeholder='Zip'
          minLength={1}
          required
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default PeopleForm;
