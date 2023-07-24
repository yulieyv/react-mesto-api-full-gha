function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__close-button"
          type="button"
          title="Закрыть окно"
        />
        <div className="popup__form">
          <img
            src={props.path}
            alt={props.title}
            className="popup__tooltip-image"
          />
          <h2 className="popup__tooltip-title">{props.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
