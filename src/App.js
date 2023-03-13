import { useState } from 'react';
import Form from './components/Form';
import List from './components/List';

function App() {
  const [peopleArray, setPeopleArray] = useState([
    {
      id: 1,
      name: 'johnny',
    },
    {
      id: 2,
      name: 'sally',
    },
  ]);

  const addPerson = (formData) => {
    setPeopleArray((prevState) => [
      ...prevState,
      {
        id: formData.id,
        name: formData.name,
      },
    ]);
  };

  const updatePerson = (id, name) => {
    setPeopleArray((prevState) =>
      prevState.map((person) =>
        person.id === id ? { ...person, name: name } : person
      )
    );
  };

  const deletePerson = (id) => {
    setPeopleArray((prevState) => prevState.filter((person) => person.id !== id));
  };

  return (
    <>
      <Form functionToPass={addPerson} />
      <br />
      <List peopleArray={peopleArray} updatePerson={updatePerson} deletePerson={deletePerson} />
    </>
  );
}

export default App;
