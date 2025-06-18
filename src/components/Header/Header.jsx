import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">NewsExplorer</div>
      <nav className="header__nav">
        <Link to="/" className="header__link">
          Home
        </Link>
        <div className="nav-underline"></div>
        <button className="header__button">Sign in</button>
      </nav>
    </header>
  );
}

export default Header;
