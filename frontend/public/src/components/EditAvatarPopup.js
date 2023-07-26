import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const refAvatar = React.useRef();
  
  React.useEffect(() => {
    refAvatar.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: refAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      title={"Обновить аватар"}
      id={"avatar"}
      name={"avatar"}
      buttonText={"Сохранить"}
      onCloseClick={props.onCloseClick}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
        <input
          className="popup__input popup__input_avatar"
          id="avatar"
          type="url"
          name="url"
          placeholder="Ссылка на аватар"
          required
          ref={refAvatar}
        />
        <span className="popup__input-error avatar-error"></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;