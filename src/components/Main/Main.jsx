import { useState, useEffect } from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import NewsCard from "../NewsCard/NewsCard";
import SearchResults from "../SearchResults/SearchResults";

function Main() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/news")
      .then((res) => res.json())
      .then((data) => {
        setNewsList(data);
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <main className="main">
      <div className="main__content">
        <h1 className="main__title"> Whats going on in the world?</h1>
        <p className="main__subtitle">
          find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm />
      </div>

      <SearchResults newsList={newsList} />
    </main>
  );
}

export default Main;
