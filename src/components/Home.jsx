import React, { useEffect, useState } from "react";
import axios from "axios";
import People from "./People";

function Home(props) {
  const [toggle, setToggle] = useState(false);
  const [peopleList, setPeopleList] = useState([]);

  const toggleHelper = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const getPeople = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/people");
      const data = res.data;
      setPeopleList(data.content);
    };
    getPeople();
  }, [toggle]);

  return (
    <>
      {peopleList.map((person) => {
        return (
          <People
            key={person.id}
            id={person.id}
            firstName={person.personalName.givenNames[0].value}
            lastName={person.personalName.surname.value}
            address={person.address}
            toggleHelper={toggleHelper}
          />
        );
      })}
    </>
  );
}

export default Home;
