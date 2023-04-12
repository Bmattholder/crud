import React, { useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

import "./Home.css";

function Home() {
  const [peopleList, setPeopleList] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [firstNames, setFirstNames] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");

  const url =
    searchTerm || sortOrder
      ? `http://localhost:8080/api/v1/people`
      : `http://localhost:8080/api/v1/people?page=${page}&size=${size}`;

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
  }, [url, refreshList]);

  const refreshHelper = () => {
    setRefreshList(!refreshList);
  };

  const pageSizeChangeHandler = (e) => {
    setSize(parseInt(e.target.value, 10));
    setPage(0);
  };

  const pageChangeHandler = (e, newPage) => {
    setPage(newPage);
  };

  const handleSearchInputChange = (e) => {
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
    })
    .sort((a, b) => {
      const aFirstName = a.personalName.givenNames[0].value.toLowerCase();
      const bFirstName = b.personalName.givenNames[0].value.toLowerCase();
      if (sortOrder === "asc") {
        return aFirstName.localeCompare(bFirstName);
      } else {
        return bFirstName.localeCompare(aFirstName);
      }
    });

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  const clearSearchInput = () => {
    setSearchTerm("");
  };

  return (
    <>
      <div className="subheader">
        <div className="size">
          <select value={size} onChange={pageSizeChangeHandler}>
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
          </select>{" "}
          Total People{" "}
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
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
          </button>
          <button onClick={() => setSortOrder("")}>Reset</button>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button className="clear-button" onClick={clearSearchInput}>
            Clear
          </button>
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

      <div className="page-nav">
        <button
          disabled={page === 0}
          onClick={(e) => pageChangeHandler(e, page - 1)}
        >
          Prev
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={
              pageNumber !== page
                ? (e) => pageChangeHandler(e, pageNumber)
                : null
            }
            className={page === pageNumber ? "active-number" : null}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages - 1}
          onClick={(e) => pageChangeHandler(e, page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Home;
