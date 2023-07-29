import React from "react";
import { Link } from "react-router-dom";

function AuthForm(props) {
  return (
    <>
      <section className="auth">
        <form className="auth__form" onSubmit={props.onSubmit}>
          <h2 className="auth__title">{props.title}</h2>
          <input
            className="auth__input"
            onChange={props.onEmailChange}
            placeholder="Email"
            name="email"
            type="email"
            value={props.email || ""}
            required
            autoComplete="off"
          ></input>
          <input
            className="auth__input"
            onChange={props.onPasswordChange}
            placeholder="Пароль"
            name="password"
            type="password"
            value={props.password || ""}
            required
            autoComplete="off"
          ></input>
          <button className="auth__submit-button" type="submit">
            {props.action}
          </button>
          <div className="auth__sign-up">
            <p className="auth__sign-up_title">
              {props.question}
              <Link className="auth__sign-up_link" to="/sign-in">
                &nbsp; {props.answer}
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

export default AuthForm;
