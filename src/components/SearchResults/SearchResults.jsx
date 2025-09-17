// components/SearchResults/SearchResults.jsx
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./SearchResults.css";
import Loading from "../Loading/Loading";

/**
 * SearchResults Component
 * -----------------------
 * Renders search results based on the query entered by the user.
 *
 * Props:
 * @param {string} query - The current search query.
 * @param {boolean} loading - Indicates if data is being fetched.
 * @param {string|null} error - Error message if fetching fails.
 * @param {Array} news - Full list of news articles fetched.
 * @param {Array} visibleNews - Currently visible news articles (based on pagination).
 * @param {function} handleShowMore - Callback to load more articles.
 * @param {number} visibleCount - Number of currently visible news articles.
 *
 * Behavior:
 * - If query is empty or there are no visible results, renders nothing.
 * - Displays a loading spinner when fetching data.
 * - Shows an error message if something goes wrong.
 * - Displays a grid of `NewsCard` components for the visible results.
 * - If more news items are available, shows a "Show more" button to fetch additional results.
 */
export default function SearchResults({
  query,
  loading,
  error,
  news,
  visibleNews,
  handleShowMore,
  visibleCount,
  toggleFavorite,
  user,
  isAuthenticated,
}) {
  // If no query or no results, return nothing
  if (query === "" || visibleNews.length === 0) return null;

  return (
    <section className="search-results">
      <h3 className="search-results__title">Search results</h3>

      {loading ? (
        // Show loading indicator
        <Loading />
      ) : error ? (
        // Show error message
        <div className="search-results__error">{error}</div>
      ) : (
        <>
          {/* News cards grid */}
          <div className="search-results__grid">
            {visibleNews.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                toggleFavorite={toggleFavorite}
                user={user}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>

          {/* Show more button if there are hidden results */}
          {news.length > visibleCount && (
            <div className="search-results__show-more">
              <button
                className="search-results__show-more-button"
                onClick={handleShowMore}
              >
                Show more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
