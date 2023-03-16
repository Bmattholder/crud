import React, { useState } from 'react';

function Form({ functionToPass }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
  });

  const { id, name } = formData;

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    functionToPass(formData);
    setFormData({ id: '', name: '' });
  };

  return (
    <form
      style={{ marginLeft: '10px', marginTop: '10px' }}
      onSubmit={submitHandler}
    >
      <div>
        <input
          type='text'
          name='id'
          id='id'
          placeholder='id'
          value={id}
          onChange={changeHandler}
          required
        />
      </div>
      <div>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='name'
          value={name}
          onChange={changeHandler}
          required
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default Form;
