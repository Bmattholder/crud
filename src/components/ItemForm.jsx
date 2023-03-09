import { useState } from 'react';

function ItemForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addItem({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button type='submit'>Add Item</button>
    </form>
  );
}

export default ItemForm;
