import React from "react";
import "../index.css";
import headerLogo from "../images/header-logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  return (
    <div className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип с надписью Место"
      />
      {props.loggedIn ? (
        <>
          <div className="header__container">
            <p className="header__email">{props.email}</p>
            <Link
              className="header__link header__link_active"
              to={"/sign-in"}
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </div>
        </>
      ) : (
        <>
          {location.pathname === "/sign-in" && (
            <Link className="header__link" to={"/sign-up"}>
              Регистрация
            </Link>
          )}
          {location.pathname === "/sign-up" && (
            <Link className="header__link" to={"/sign-in"}>
              Войти
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default Header;
