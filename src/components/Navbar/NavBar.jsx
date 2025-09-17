// components/NavBar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import Modal from "../Modal/Modal";

export default function NavBar({
  isAuthenticated,
  user,
  signin,
  signup,
  signout,
}) {
  // UI state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  // Track scroll position for styling
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Watch window scroll for sticky nav background
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    handleScroll(); // run immediately
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Form state for modal
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset form whenever switching between sign-in / sign-up
  useEffect(() => {
    setError("");
    setEmail("");
    setPassword("");
    setName("");
  }, [isSignupMode]);

  // Handle sign in / sign up form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Basic required field check
    if (!email || !password || (isSignupMode && !name)) {
      setError("Please fill required fields");
      return;
    }

    setLoading(true);
    try {
      if (isSignupMode) {
        await signup({ name, email, password });
      } else {
        await signin({ email, password });
      }

      // Reset modal + form after success
      setIsModalOpen(false);
      setEmail("");
      setPassword("");
      setName("");
      setShowMobileMenu(false); // close mobile menu after login
    } catch (err) {
      setError(err.message || "Auth failed");
    } finally {
      setLoading(false);
    }
  }

  // Dynamic nav styles depending on route
  const linkColorClass =
    location.pathname === "/" ? "linksWhite" : "linksBlack";
  const bgColorClass = location.pathname === "/" ? "bgTransparent" : "bgWhite";

  // Extra class when mobile menu is expanded
  const mobileOpenClass = showMobileMenu ? "mobileOpen" : "";

  // Helper to close mobile nav
  function handleCloseMenu() {
    setShowMobileMenu(false);
  }

  return (
    <nav
      className={`navBar ${bgColorClass} ${
        isScrolled ? "scrolled" : ""
      } ${mobileOpenClass}`}
    >
      <div className="navbar__inner">
        {/* Logo (left side) */}
        <div className={`navbar__left ${linkColorClass}`}>
          <Link to="/" className="navbar__logo" onClick={handleCloseMenu}>
            NewsExplorer
          </Link>
        </div>

        {/* Mobile hamburger menu button */}
        <button
          className={`navbar__burger ${linkColorClass}`}
          aria-label="Toggle menu"
          onClick={() => setShowMobileMenu((s) => !s)}
        >
          ☰
        </button>

        {/* Main nav links */}
        <div
          className={`navbar__links ${
            showMobileMenu ? "open" : ""
          } ${linkColorClass}`}
        >
          <Link to="/" className="navbar__link" onClick={handleCloseMenu}>
            Home
          </Link>

          {/* Show Saved Articles only if logged in */}
          {isAuthenticated && user ? (
            <Link
              to={`/favorites/${user.id}`}
              className="navbar__link"
              onClick={handleCloseMenu}
            >
              Saved articles
            </Link>
          ) : null}

          {/* Conditionally render Sign In or Logout */}
          {isAuthenticated ? (
            <button
              className="navbar__auth-button"
              onClick={() => {
                signout();
                handleCloseMenu();
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="navbar__auth-button"
              onClick={() => {
                setIsModalOpen(true);
                setIsSignupMode(false);
                handleCloseMenu();
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal (Sign In / Sign Up) */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="auth-form__title">
          {isSignupMode ? "Sign up" : "Sign in"}
        </h3>
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Only show Name field when signing up */}
          {isSignupMode && (
            <label>
              Name
              <input
                value={name}
                placeholder="Enter Username"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {/* Inline form error */}
          {error && <div className="formError">{error}</div>}

          <div className="authActions">
            {/* Submit button updates label depending on mode */}
            <button type="submit" className="submitButton" disabled={loading}>
              {loading
                ? "Please wait..."
                : isSignupMode
                ? "Create account"
                : "Sign in"}
            </button>

            {/* Toggle sign in / sign up */}
            <button
              type="button"
              className="linkLike"
              onClick={() => setIsSignupMode((s) => !s)}
            >
              {isSignupMode ? "Or Sign in" : "Or Sign up"}
            </button>
          </div>
        </form>
      </Modal>
    </nav>
  );
}
