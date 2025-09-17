// components/Loading.jsx
import React from "react";
import "./Loading.css";

/**
 * Loading component shows a centered spinner and skeleton cards
 * to match the news grid layout while data is loading.
 */
export default function Loading() {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      <p className="loader__message">Searching for results...</p>
    </div>
  );
}
