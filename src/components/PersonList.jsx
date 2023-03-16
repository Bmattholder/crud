import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

function PersonList() {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    async function updatePeople() {
      let data = await fetch('http://localhost:8080/api/v1/people');
      data = await data.json();
      if (!people || JSON.stringify(data) !== JSON.stringify(people)) {
        console.log('exists');
        setPeople(data);
      }
    }
    updatePeople();
  }, [people]);

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:8080/api/v1/people/${id}`);
  };

  const editHandler = () => {
    // pass info up to app then into form
    // change form state to passed info
  };

  return (
    <Fragment>
      {people &&
        people.content.map((person) => (
          <div key={person.id}>
            <h2>{person.personalName.surname.value}</h2>
            <button onClick={editHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        ))}
    </Fragment>
  );
}

export default PersonList;
