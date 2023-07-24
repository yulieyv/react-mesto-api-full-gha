import React from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeleteCardPopup from "./DeleteCardPopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api.js";
import * as auth from "../utils/Auth.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import doneImage from "../images/done.png";
import errorImage from "../images/error.png";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [cardWithConfirm, setCardWithConfirm] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [status, setStatus] = React.useState({ path: "", text: "" });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    }
  }, [loggedIn]);

  function checkToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/", { replace: true });
          } else {
            setLoggedIn(false);
          }
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleRegisterSubmit(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        setIsInfoTooltipPopupOpen(true);
        setStatus({
          path: doneImage,
          text: "Вы успешно зарегистрировались!",
        });
        console.log(res);
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        setIsInfoTooltipPopupOpen(true);
        setStatus({
          path: errorImage,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log("400 - некорректно заполнено одно из полей");
      });
  }

  function handleLoginSubmit(password, email) {
    auth
      .login(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/*", { replace: true });
      })

      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setStatus({
          path: errorImage,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        console.log("401 - пользователь с email не найден", `Ошибка: ${err}`);
      });
  }

  function handleSignOutSubmit() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in");
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardDeleteConfirm(card) {
    setIsDeleteCardPopupOpen(true);
    setCardWithConfirm(card);
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard();
  }

  function handleUpdateUser(user) {
    api
      .patchUserInfo(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAvatarUpdate(avatar) {
    api
      .patchUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={email}
          onSignOut={handleSignOutSubmit}
          loggedIn={loggedIn}
        />
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteConfirm}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={handleRegisterSubmit}
                onSignOut={setIsInfoTooltipPopupOpen}
              />
            }
          ></Route>
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLoginSubmit} />}
          ></Route>
        </Routes>
        {loggedIn && <Footer />}

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          title={status.text}
          path={status.path}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCardConfirm={handleCardDelete}
          cardId={cardWithConfirm}
        ></DeleteCardPopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
