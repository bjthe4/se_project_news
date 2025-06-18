import React from "react";
import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="search">
      <input className="search__input" type="text" placeholder="Enter topic" />
      <button className="search__button">Search</button>
    </div>
  );
}

export default SearchForm;
