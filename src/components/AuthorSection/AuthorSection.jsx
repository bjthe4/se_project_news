// components/AuthorSection/AuthorSection.jsx
import React from 'react';
import './AuthorSection.css';

export default function AuthorSection({ imgSrc }) {
  return (
    <section className="authorSection" aria-labelledby="author-heading">
      <div className="authorInner">
        <img src={imgSrc} alt="author img" className="authorAvatar" />

        <div className="authorContent">
          <h2 id="author-heading">About the author</h2>
          <p className="authorBio">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
            <br />
            <br />
            You can also talk about your experience, what you learned there,
            and how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  );
}
