import './check.css'
import React, { useState } from "react";
import axios from "axios";
import View from "./view"


export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [movieData, setMovieData] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    axios
      .get(`https://www.omdbapi.com/?t=${searchValue}&apikey=3d71d68e`)
      .then((response) => {
        setMovieData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="navbar">
          <div className="navbar-brand">
            <a href="#">Movie Info</a>
          </div>
          <div className="search-form">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleInputChange}
            />
            <button type="submit">
              <i className="fa fa-search">Search</i>
            </button>
          </div>
        </div>
      </form>
      {movieData && <View movie={movieData} />}
    </div>
  );
}
