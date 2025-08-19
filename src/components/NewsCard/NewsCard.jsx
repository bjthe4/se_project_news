import "./NewsCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function NewsCard({ news }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  console.log(news.title);

  return (
    <li className="card">
      <div className="card__container">
        <img className="card__image" src={news.imageUrl} alt={news.title} />
        <p className="card__date">{news.date}</p>
        <h2 className="card__title">{news.title}</h2>
        <p className="card__description">{news.description}</p>
        <footer className="card__source">{news.source}</footer>
      </div>
    </li>
  );
}

export default NewsCard;
