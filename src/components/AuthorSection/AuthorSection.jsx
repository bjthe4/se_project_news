// components/AuthorSection/AuthorSection.jsx
import React from "react";
import "./AuthorSection.css";
import authorImage from "../../assets/author.jpg";

export default function AuthorSection() {
  return (
    <section className="author__section" aria-labelledby="author-heading">
      <div className="author__inner">
        <img src={authorImage} alt="author img" className="author__avatar" />

        <div className="author__content">
          <h2 id="author-heading">About the author</h2>
          <p className="author__bio">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
            <br />
            <br />
            You can also talk about your experience, what you learned there, and
            how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  );
}
