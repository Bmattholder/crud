import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function EditForm({ item, onSubmit, onCancel }) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      id: item.id,
      name,
      description,
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formItemName'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter name'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>
			<Form.Group controlId='formItemDescription'>
				<Form.Label>Description</Form.Label>
				<Form.Control as='textarea' placeholder='Enter description' value={description} onChange={(event) => setDescription(event.target.value)} />
			</Form.Group>
			<Button variant='primary' type='submit'>
				Save
			</Button>
			<Button variant='secondary' onClick={handleCancel}>
				Cancel
			</Button>
    </Form>
  );
}

export default EditForm;
