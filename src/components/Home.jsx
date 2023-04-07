import React, { useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

import "./Home.css";

function Home(props) {
  const [peopleList, setPeopleList] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [touched, setTouched] = useState(false);

  const url =
    searchTerm || touched
      ? `http://localhost:8080/api/v1/people`
      : `http://localhost:8080/api/v1/people?size=${size}&page=${page}`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url);
      const data = res.data;
      setPeopleList(data.content);
      setTotalPages(data.totalPages);
    };
    fetchData();
  }, [url, refreshList]);

  const refreshHelper = () => {
    setRefreshList(!refreshList);
  };

  const changeSizeHandler = (e) => {
    setSize(e.target.value);
    setPage(0);
  };

  const pageChangeHandler = (newPage) => {
    setPage(newPage);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  const searchInputChangeHandler = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const filteredPeopleList = peopleList.filter((person) => {
    const searchParams = `${person.personalName.givenNames[0].value} ${person.personalName.surname.value} ${person.address.number} ${person.address.street} ${person.address.city} ${person.address.state} ${person.address.zip}`;
    const searchTermMatch =
      searchTerm.trim() === "" ||
      searchParams.toLowerCase().includes(searchTerm.toLowerCase());

    return searchTermMatch;
  });

  const clearSearchInput = () => {
    setSearchTerm("");
  };

  const sortById = () => {
    setTouched(true);
    const sortedPeopleList = [...filteredPeopleList].sort((a, b) =>
      sortDirection === "asc" ? a.id - b.id : b.id - a.id
    );
    setPeopleList(sortedPeopleList);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <div className="filter-search">
        <div className="select-option">
          Select{" "}
          <select value={size} onChange={changeSizeHandler}>
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
            onChange={searchInputChangeHandler}
          />
          <button onClick={clearSearchInput}>Clear</button>
        </div>
        <div className="sort">
          Sort by ID{" "}
          <button onClick={sortById}>
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div className="flex">
        {filteredPeopleList.map((person) => {
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
      </div>
      <div className="page-numbers">
        <button
          disabled={page === 0}
          onClick={() => pageChangeHandler(page - 1)}
        >
          Prev
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={
              pageNumber !== page ? () => pageChangeHandler(pageNumber) : null
            }
            className={pageNumber === page ? "active" : "inactive"}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages - 1}
          onClick={() => pageChangeHandler(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Home;
