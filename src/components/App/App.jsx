// App.jsx - wiring routes and provider
import { UserProvider } from '../../context/UserContext.jsx';
import NavBar from '../Navbar/NavBar.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Favorites from '../../pages/Favorites.jsx';
import ProtectedRoute from '../ProtectedRoute.jsx';
import Footer from '../Footer/Footer.jsx';
import '../../styles/global.css';

import authorImg from '../../assets/heroBg.jpg';
import getNews from '../../lib/Api.js';
import * as authApi from '../../lib/authApi.js';
import Hero from '../Hero/Hero.jsx';
import SearchResults from '../SearchResults/SearchResults.jsx';
import AuthorSection from '../AuthorSection/AuthorSection.jsx';
import { useState, useEffect } from 'react';

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On first mount, attempt to restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('newsExplorerCurrentUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        // If parsing fails, ignore corrupted storage
      }
    }
  }, []);

  // Keep localStorage in sync whenever auth state or user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('newsExplorerCurrentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('newsExplorerCurrentUser');
    }
  }, [isAuthenticated, user]);

  // Register a new user and mark them as authenticated
  async function signup({ name, email, password }) {
    const created = await authApi.signup({ name, email, password });
    setUser(created);
    setIsAuthenticated(true);
    return created;
  }

  // Authenticate existing user
  async function signin({ email, password }) {
    const signed = await authApi.signin({ email, password });
    setUser(signed);
    setIsAuthenticated(true);
    return signed;
  }

  // Clear user and reset authentication
  function signout() {
    setUser(null);
    setIsAuthenticated(false);
  }

  // Add/remove a news item from favorites
  function toggleFavorite(newsItem) {
    if (!isAuthenticated || !user) {
      throw new Error('Must be signed in to favorite items');
    }

    // Check if item already exists in favorites
    const exists = (user.favorites || []).find((f) => f.id === newsItem.id);
    let updatedUser = { ...user };

    if (exists) {
      // Remove if already favorited
      updatedUser.favorites = updatedUser.favorites.filter(
        (f) => f.id !== newsItem.id
      );
    } else {
      // Add new favorite
      updatedUser.favorites = [...(updatedUser.favorites || []), newsItem];
    }

    // Persist update to "database" (simulated via authApi)
    authApi.updateUser({ ...updatedUser, password: undefined });
    setUser(updatedUser);
  }

  // State for search query
  const [query, setQuery] = useState('');
  // State to store fetched news
  const [news, setNews] = useState([]);
  // Loading indicator during API calls
  const [loading, setLoading] = useState(false);
  // Stores error messages if API call fails
  const [error, setError] = useState('');
  // Controls how many news items are displayed at a time
  const [visibleCount, setVisibleCount] = useState(3);

  // Fetches news from API based on search query
  async function doSearch(q) {
    setLoading(true); // start loading
    setError(''); // clear previous errors
    try {
      const result = await getNews(q);
      setNews(result || []); // ensure news is always an array
      setVisibleCount(3); // reset visible items when new search runs
    } catch (e) {
      setError('Failed to load news');
      setNews([]); // fallback to empty list on failure
    } finally {
      setLoading(false); // stop loading in all cases
    }
  }

  // Run initial fetch when component mounts (default query is empty string)
  useEffect(() => {
    doSearch(query);
  }, []);

  // Handle search form submit
  function handleSubmit(e) {
    e.preventDefault(); // prevent page reload
    doSearch(query);
  }

  // Load 3 more news items until all are shown
  function handleShowMore() {
    setVisibleCount((v) => Math.min(news.length || 0, v + 3));
  }

  // Slice news list based on visibleCount
  const visibleNews = news.slice(0, visibleCount);

  return (
    <UserProvider>
      <Router>
        {/* Persistent navigation bar (visible on all routes) */}
        <NavBar
          isAuthenticated={isAuthenticated}
          user={user}
          signin={signin}
          signup={signup}
          signout={signout}
        />
        <Routes>
          {/* Public home route */}
          <Route
            path='/'
            element={
              <>
                <main className='homeRoot'>
                  {/* Hero section with search input */}
                  <Hero
                    query={query}
                    setQuery={setQuery}
                    handleSubmit={handleSubmit}
                  />

                  {/* Main search results with loading, error, and show more handling */}
                  <SearchResults
                    query={query}
                    loading={loading}
                    error={error}
                    news={news}
                    visibleNews={visibleNews}
                    visibleCount={visibleCount}
                    handleShowMore={handleShowMore}
                    toggleFavorite={toggleFavorite}
                    user={user}
                    isAuthenticated={isAuthenticated}
                  />

                  {/* Footer-like section to show author details */}
                  <AuthorSection imgSrc={authorImg} />
                </main>
              </>
            }
          />

          {/* Protected favorites route
              - `ProtectedRoute` ensures only authenticated users
                with correct permissions can access Favorites
              - `:userId` param ties favorites page to specific user */}
          <Route
            path='/favorites/:userId'
            element={
              <ProtectedRoute user={user} isAuthenticated={isAuthenticated}>
                <Favorites
                  user={user}
                  isAuthenticated={isAuthenticated}
                  toggleFavorite={toggleFavorite}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* Persistent footer (visible on all routes) */}
        <Footer />
      </Router>
    </UserProvider>
  );
}
