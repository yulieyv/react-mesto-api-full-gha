import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

function EditProfilePopup(props) {
  const name = useForm("");
  const description = useForm("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    name.setValues(currentUser.name);
    description.setValues(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name.values,
      about: description.values,
    });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"profile"}
      buttonText={"Сохранить"}
      isOpen={props.isOpen}
      onCloseClick={props.onCloseClick}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_name"
        id="name"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={name.onChange}
        value={name.values || ""}
      />
      <span className="name-error popup__input-error"></span>
      <input
        className="popup__input popup__input_job"
        id="about"
        type="text"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        onChange={description.onChange}
        value={description.values || ""}
      />
      <span className="job-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
