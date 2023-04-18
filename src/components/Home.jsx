import React, { useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

import "./Home.css";

function Home(props) {
  const [peopleList, setPeopleList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [firstNames, setFirstNames] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");

  const refreshHelper = () => {
    setRefresh(!refresh);
  };

  const url = searchTerm
    ? "http://localhost:8080/api/v1/people"
    : `http://localhost:8080/api/v1/people?page=${page}&size=${size}&sort=id,${sortOrder}`;

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

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  const pageChangeHandler = (e, newPage) => {
    setPage(newPage);
  };

  const sizeChangeHandler = (e) => {
    setSize(e.target.value);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const sortOrderSwitch = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  return (
    <>
      <div className="subheader">
        <div className="size">
          Select{" "}
          <select value={size} onChange={sizeChangeHandler}>
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
          </select>{" "}
          People
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={clearSearch}>Clear</button>
        </div>
        <div className="sort">
          <button onClick={sortOrderSwitch}>
            ID {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>
        <div className="filter">
          <select
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          >
            <option value="">-- First Name --</option>
            {firstNames.map((firstName) => (
              <option key={firstName} value={firstName}>
                {firstName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="list">
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
      </div>
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        {pageNumbers.map((num) => {
          return (
            <button
              key={num}
              onClick={num !== page ? (e) => pageChangeHandler(e, num) : null}
            >
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
      </div>
    </>
  );
}

export default Home;
