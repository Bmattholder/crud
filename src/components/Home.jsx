import React, { useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

function Home() {
  const [peopleList, setPeopleList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  let url = "http://localhost:8080/api/v1/people";

  const refreshHelper = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(url);
      const data = res.data;
      setPeopleList(data.content);
    };
    getData();
  }, [url, refresh]);

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
            refresh={refreshHelper}
          />
        );
      })}
    </>
  );
}

export default Home;
