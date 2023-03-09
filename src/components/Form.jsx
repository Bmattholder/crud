import React, { useState } from 'react';
import './Form.css';

function Form({ setItems }) {
  const [formData, setFormData] = useState({
    crud: '',
    again: '',
  });

  const { crud, again } = formData;

  const inputChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    setItems((prevItems) => [...prevItems, formData]);
    setFormData({
      crud: '',
      again: '',
    });
  };

  return (
    <div className='container'>
      <form onSubmit={submitFormHandler}>
        <input
          type='text'
          id='crud'
          name='crud'
          placeholder='Crud'
          value={crud}
          onChange={inputChangeHandler}
        />
        <input
          type='text'
          id='again'
          name='again'
          placeholder='Again'
          value={again}
          onChange={inputChangeHandler}
        />{' '}
        <br />
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
