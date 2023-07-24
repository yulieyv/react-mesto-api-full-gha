import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          title="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <form
          className="popup__form"
          name={`form-${props.name}`}
          method="post"
          action="action"
          onSubmit={props.onSubmit}
        >
          <p className="popup__title">{props.title}</p>
          {props.children}
          <button
            className="popup__submit-button"
            type="submit"
            title="Сохранить изменения"
          >
          {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
