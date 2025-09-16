// components/Loading.jsx
import React from 'react';
import './Loading.css';

/**
 * Loading component shows a centered spinner and skeleton cards
 * to match the news grid layout while data is loading.
 */
export default function Loading() {
  return (
    <div className='loader'>
      <div className='circle-preloader'></div>
      <p>Searching for results...</p>
    </div>
  );
}
