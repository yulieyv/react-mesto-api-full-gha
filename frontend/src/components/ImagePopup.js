import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    card && (
      <div className={`popup popup_type_image ${card ? "popup_opened" : ""}`}>
        <figure className="popup__container">
          <button
            className="popup__close-button"
            type="button"
            aria-label="Закрыть окно"
            onClick={onClose}
          ></button>
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
      </div>
    )
  );
}

export default ImagePopup;
