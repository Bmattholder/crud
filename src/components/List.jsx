import React, { useState } from 'react';
import './List.css';

function List({ peopleArray, updatePerson, deletePerson }) {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  const editPerson = (person) => {
    setEditId(person.id);
    setEditName(person.name);
  };

  const savePerson = (e) => {
    e.preventDefault();
    updatePerson(editId, editName);
    setEditId(null);
    setEditName('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
  };

  const handleDelete = (person) => {
    deletePerson(person.id);
  };

  return (
    <>
      {peopleArray &&
        peopleArray.map((person) => (
          <div className='container' key={person.id}>
            {editId === person.id ? (
              <>
                <input
                  type='text'
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={savePerson}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h2>{person.name}</h2>
                <p>{person.id}</p>
                <button onClick={() => editPerson(person)}>Edit</button>
                <button onClick={() => handleDelete(person)}>Delete</button>
              </>
            )}
          </div>
        ))}
    </>
  );
}

export default List;
