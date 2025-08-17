import "./NewsCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function NewsCard({ news }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  return (
    <li className="card">
      <div className="card__container">
        <img className="card__image" src={news.imageUrl} alt={news.title} />
        <h2 className="card__title">{news.title}</h2>
      </div>
    </li>
  );
}

export default NewsCard;
