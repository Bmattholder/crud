import React, { useEffect, useState } from "react";
import axios from "axios";
import People from "./People";

function Home(props) {
  const [peopleList, setPeopleList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/people");
      const data = res.data;
      setPeopleList(data.content);
    };
    getData();
  }, [refresh]);

  const refreshHelper = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      {peopleList.map((p) => {
        return (
          <People
            key={p.id}
            id={p.id}
            firstName={p.personalName.givenNames[0].value}
            lastName={p.personalName.surname.value}
            address={p.address}
            refresh={refreshHelper}
          />
        );
      })}
    </>
  );
}

export default Home;
