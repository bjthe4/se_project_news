import React from "react";
import "./SearchResults.css";
import NewsCard from "../NewsCard/NewsCard";

function SearchResults({ newsList }) {
  return (
    <div className="news-container">
      <h2 className="search-title">Search results</h2>
      <ul className="news-list">
        {newsList.map((newsItem) => (
          <NewsCard key={newsItem._id} news={newsItem} />
        ))}
      </ul>
      <button className="Search__results-button"> Show more </button>
    </div>
  );
}

export default SearchResults;
