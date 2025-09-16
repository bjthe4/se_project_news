// pages/Favorites.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard/NewsCard';
import './Favorites.css';

export default function Favorites({ user, isAuthenticated, toggleFavorite }) {
  const { userId } = useParams(); // extract userId from route params
console.log('q',isAuthenticated)
  // Guard clause:
  // - If user is not authenticated
  // - OR user object missing
  // - OR route param userId doesn't match logged-in user
  // Then show a message instead of favorites
  if (!isAuthenticated || !user || user.id !== userId) {
    return (
      <main className='favoritesRoot'>
        <h3>Favorites</h3>
        <p>Please sign in to view your favorites.</p>
      </main>
    );
  }

  // Extract favorites safely, defaulting to empty array
  const favorites = user.favorites || [];

  return (
    <main className='favoritesRoot'>
      <div className='textContent'>
        <h3>Saved articles</h3>
        {/* Hardcoded user name and count (could be dynamic in the future) */}
        <h4>
          Elise, you have {favorites.length > 0 ? favorites.length : 'no'} saved
          articles
        </h4>
      </div>
      <div className='newsContent'>
        {/* If no favorites exist, show placeholder message */}
        {favorites.length === 0 ? (
          <p>You have no favorites yet. Add some from the Home page.</p>
        ) : (
          // Otherwise render favorites grid
          <div className='favGrid'>
            {favorites.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                toggleFavorite={toggleFavorite}
                user={user}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
