import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

function PersonList({ triggered, editPersonHandler }) {
  const [people, setPeople] = useState(null);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    async function updatePeople() {
      let data = await fetch('http://localhost:8080/api/v1/people');
      data = await data.json();
      if (!people || JSON.stringify(data) !== JSON.stringify(people)) {
        setPeople(data);
      }
    }
    updatePeople();
  }, [people, triggered, deleted]);

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/people/${id}`);
    setDeleted(!deleted);
  };

  const editHandler = (person) => {
    // pass info up to app then into form
    // change form state to passed info
    editPersonHandler({
			id: person.id,
      praenomens: person.personalName.givenNames[0].value,
			cognomen: person.personalName.surname.value,
			number: person.address.number,
			street: person.address.street,
      city: person.address.city,
			state: person.address.state,
			zip: person.address.zip,
    });
  };

  return (
    <Fragment>
      {people &&
        people.content.map((person) => (
          <div key={person.id}>
            <h1>{person.personalName.givenNames[0].value}</h1>
            <p>{person.id}</p>
            <button onClick={() => editHandler(person)}>Edit</button>
            <button onClick={() => deleteHandler(person.id)}>Delete</button>
          </div>
        ))}
    </Fragment>
  );
}

export default PersonList;
