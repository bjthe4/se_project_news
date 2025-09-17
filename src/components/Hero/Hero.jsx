// components/Hero/Hero.jsx
import React from "react";
import "./Hero.css";

/**
 * Hero Component
 * ----------------------
 * This component renders the main hero section of the page,
 * including a headline, description text, and a search form.
 *
 * Props:
 * @param {string} query - The current value of the search input.
 * @param {function} setQuery - Function to update the search input value.
 * @param {function} handleSubmit - Function to handle the form submission.
 *
 * Usage:
 * <Hero
 *   query={query}
 *   setQuery={setQuery}
 *   handleSubmit={handleSubmit}
 * />
 */
export default function Hero({ query, setQuery, handleSubmit }) {
  return (
    <section className="hero">
      <div className="hero__inner">
        {/* Text content (headline + description) */}
        <div className="hero__content-text">
          <h1 className="hero__headline">What's going on in the world?</h1>
          <p className="hero__description">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
        </div>

        {/* Search form for entering a topic */}
        <form className="hero__search-form" onSubmit={handleSubmit}>
          <input
            className="hero__search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // updates query state
            placeholder="Enter topic"
          />
          <button type="submit" className="hero__search-button">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
