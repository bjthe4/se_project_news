import React from "react";
import { Link } from "react-router-dom";
import gitHubIcon from "../../assets/github.svg";
import linkedInIcon from "../../assets/LinkedIn.svg";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="footer">
      <p className="footer__copyright">© 2024 Supersite, Powered by News API</p>
      <div className="footer__links-section">
        <div className="footer__links">
          <Link to={"/"}>Home</Link>
          <Link to={"#"}>TripleTen</Link>
        </div>
        <div className="footer__icons">
          <img src={gitHubIcon} alt="GitHub logo" />
          <img src={linkedInIcon} alt="LinkedIn logo" />
        </div>
      </div>
    </div>
  );
}
