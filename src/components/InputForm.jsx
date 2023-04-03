import React, { useState, useEffect } from 'react';

function InputForm({ peopleHandler, editPerson }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  useEffect(() => {
    if (editPerson) {
      setFormData(editPerson);
    }
  }, [editPerson]);

  const { firstName, lastName, street, city, state, zip } = formData;

  const formChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (editPerson) {
      peopleHandler(formData, editPerson.index);
    } else {
      peopleHandler(formData);
			
    }
    setFormData({
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
    });
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <div>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={firstName}
            onChange={formChangeHandler}
            placeholder='First Name'
            minLength={1}
          />
        </div>
        <div>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={lastName}
            onChange={formChangeHandler}
            placeholder='Last Name'
            minLength={1}
          />
        </div>
        <div>
          <input
            type='text'
            id='street'
            name='street'
            value={street}
            onChange={formChangeHandler}
            placeholder='Street'
            minLength={1}
          />
        </div>
        <div>
          <input
            type='text'
            id='city'
            name='city'
            value={city}
            onChange={formChangeHandler}
            placeholder='City'
            minLength={1}
          />
        </div>
        <div>
          <input
            type='text'
            id='state'
            name='state'
            value={state}
            onChange={formChangeHandler}
            placeholder='State'
            minLength={2}
          />
        </div>
        <div>
          <input
            type='number'
            id='zip'
            name='zip'
            value={zip}
            onChange={formChangeHandler}
            placeholder='Zip'
            minLength={5}
          />
        </div>
        <button type='submit'>{editPerson ? 'Update' : 'Submit'}</button>
      </form>
    </>
  );
}

export default InputForm;
