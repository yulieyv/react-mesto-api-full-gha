import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCardConfirm(props.cardId);
  }
  return(
    <PopupWithForm
    isOpen={props.isOpen}
    title={"Вы уверены?"}
    name={"delete"}
    buttonText={"Да"}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  ></PopupWithForm>
  )
}

export default DeleteCardPopup;