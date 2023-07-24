import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_hidden' : ''}`
  );

  const cardLikeButtonClassName = ( 
    `element__like-button ${isLiked && 'element__like-button_active'}` 
  );; 

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div id="card" className="card">
      <li className="element">
        <img
          src={props.link}
          alt={props.name}
          onClick={handleClick}
          className="element__image"
        />
        <div className="element__sign">
          <h2 className="element__title">{props.name}</h2>
          <button
            className={cardDeleteButtonClassName}
            type="button"
            aria-label="Удалить карточку"
            onClick={handleDeleteClick}
          ></button>
          <div className="element__like-list">
            <button
              className={cardLikeButtonClassName}              
              type="button"
              title="Поставить лайк"
              onClick={handleLikeClick}
            ></button>
            <span className="element__like-count">{props.likes}</span>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;
