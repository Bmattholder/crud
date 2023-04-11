import React, { useState, useEffect } from 'react';

import './PeopleList.css';

function PeopleList() {
  const [peopleList, setPeopleList] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/people')
      .then((response) => response.json())
      .then((data) => setPeopleList(data))
      .catch((error) => console.log(error));
  }, [peopleList]);

  return (
    <div>
      {peopleList &&
        peopleList.content.map((person) => (
          <div key={person.id} className='person'>
            <h2>
              {person.personalName.givenNames[0].value}{' '}
              {person.personalName.surname.value}
            </h2>
            <p>
              {person.address.number} {person.address.street}{' '}
            </p>
            <p>
              {person.address.city}, {person.address.state} {person.address.zip}
            </p>
          </div>
        ))}
    </div>
  );
}

export default PeopleList;
