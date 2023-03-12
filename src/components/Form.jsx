import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [formData, setFormData] = useState({
    // id: '1',
    praenomens: ['Monogram'],
    cognomen: 'Docker',
    number: '123',
    street: 'Any St',
    city: 'Franklin',
    state: 'TN',
    zip: '37174',
  });

  const { id, praenomens, cognomen, number, street, city, state, zip } =
    formData;

  const inputChangeHandler = (e) => {
    if (e.target.id === 'praenomens') {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      console.log(e);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitFormHanlder = async (e) => {
    e.preventDefault();
    console.log('Form Data: ', formData);
    await axios
      .post('http://localhost:8080/api/v1/people', formData)
      .then(console.log(Response.data));
  };

  return (
    <form onSubmit={submitFormHanlder}>
      {/* <div>
        <input
          type='text'
          id='id'
          name='id'
          value={id}
          onChange={inputChangeHandler}
          placeholder='id'
        />
      </div> */}
      <div>
        <input
          type='textarea'
          id='praenomens'
          name='praenomens'
          value={praenomens}
          onChange={inputChangeHandler}
          placeholder='Praenomens'
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
        />
      </div>
      <button>Submit</button>
    </form>
  );
}

export default Form;
