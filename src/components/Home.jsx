import React, { useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

function Home() {
  const [peopleList, setPeopleList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortStyle, setSortStyle] = useState("asc");
  const [filterTerm, setFilterTerm] = useState("");
  const [firstNames, setFirstNames] = useState([]);

  const url =
    searchTerm || filterTerm
      ? "http://localhost:8080/api/v1/people"
      : `http://localhost:8080/api/v1/people?page=${page}&size=${size}&sort=id,${sortStyle}`;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(url);
      const data = res.data;
      setPeopleList(data.content);
      setTotalPages(data.totalPages);
      const allFirstNames = data.content.map(
        (person) => person.personalName.givenNames[0].value
      );
      setFirstNames(Array.from(new Set(allFirstNames)));
    };
    getData();
  }, [url, refresh]);

  const refreshHelper = () => {
    setRefresh(!refresh);
  };

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i);

  const sizeHelper = (v) => {
    setSize(parseInt(v.target.value));
    setPage(0);
  };

  const searchHelper = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const filteredPeopleList = peopleList
    .filter((person) => {
      const params = `${person.personalName.givenNames[0].value} ${person.personalName.surname.value} ${person.address.number} ${person.address.street} ${person.address.city} ${person.address.state} ${person.address.zip}`;
      return params.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((person) => {
      if (!filterTerm) {
        return true;
      }
      return (
        person.personalName.givenNames[0].value.toLowerCase() ===
        filterTerm.toLowerCase()
      );
    });

  const sortStyleHelper = () => {
    if (sortStyle === "asc") {
      setSortStyle("desc");
    } else {
      setSortStyle("asc");
    }
  };

  return (
    <>
      <div className="subheader">
        <select value={size} onChange={sizeHelper}>
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={9}>9</option>
        </select>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={searchHelper}
          />
          <button onClick={() => setSearchTerm("")}>Clear</button>
        </div>
        <div className="filter">
          <select
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          >
            <option value="">First Name</option>
            {firstNames.map((firstName) => (
              <option key={firstName} value={firstName}>
                {firstName}
              </option>
            ))}
          </select>
        </div>
        <div className="sort">
          <button onClick={sortStyleHelper}>ID</button>
        </div>
      </div>
      {filteredPeopleList.map((p) => {
        return (
          <Person
            key={p.id}
            id={p.id}
            firstName={p.personalName.givenNames[0].value}
            lastName={p.personalName.surname.value}
            address={p.address}
            refresh={refreshHelper}
          />
        );
      })}
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      {pageButtons.map((num) => {
        return (
          <button key={num} onClick={() => setPage(num)}>
            {num + 1}
          </button>
        );
      })}
      <button
        disabled={page === totalPages - 1}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
}

export default Home;
