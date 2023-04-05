import React, { useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

function Home(props) {
  const [peopleList, setPeopleList] = useState([]);
  const [refreshList, setRefreshList] = useState(false);

  const refreshHelper = () => {
    setRefreshList(!refreshList);
  };

  useEffect(() => {
    const getPeople = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/people");
      const data = res.data;
      setPeopleList(data.content);
    };
    getPeople();
  }, [refreshList]);

  return (
    <>
      {peopleList.map((person) => {
        return (
          <Person
            key={person.id}
            id={person.id}
            firstName={person.personalName.givenNames[0].value}
            lastName={person.personalName.surname.value}
            address={person.address}
            refreshHelper={refreshHelper}
          />
        );
      })}
    </>
  );
}

export default Home;
