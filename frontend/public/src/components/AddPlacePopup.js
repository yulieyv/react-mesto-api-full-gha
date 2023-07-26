import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup(props) {
  const name = useForm("");
  const link = useForm("");

  React.useEffect(() => {
    if (props.isOpen) {
      name.setValues("");
      link.setValues("");
    }
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name.values,
      link: link.values,
    });
  }
  return (
    <PopupWithForm
      title={"Новое место"}
      name={"new-place"}
      buttonText={"Создать"}
      isOpen={props.isOpen}
      onCloseClick={props.onCloseClick}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_image_name"
        id="nameCard"
        type="text"
        name="nameCard"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name.values || ""}
        onChange={name.onChange}
      />
      <span className="nameCard-error popup__input-error"></span>
      <input
        className="popup__input popup__input_image_link"
        id="linkCard"
        type="url"
        name="linkCard"
        placeholder="Cсылка на картинку"
        required
        pattern="https://.+"
        value={link.values || ""}
        onChange={link.onChange}
      />
      <span className="linkCard-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
