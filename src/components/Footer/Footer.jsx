import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import githubIcon from "../../assets/github.png";
import linkedinIcon from "../../assets/linkedin.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__columns">
        <p className="footer__copyright">
          &copy; 2024 Supersite, Powered by News API
        </p>
        <div className="footer__nav">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <Link to="/tripleten" className="footer__link">
            TripleTen
          </Link>
          <div className="footer__icons">
            <a href="https://github.com/bjthe4" className="footer__column-link">
              <img
                src={githubIcon}
                alt="gitHub logo"
                className="footer__social-icon"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/benedict-iroha-jr/"
              className="footer__column-link"
            >
              <img
                src={linkedinIcon}
                alt="linkedin logo"
                className="footer__social-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
