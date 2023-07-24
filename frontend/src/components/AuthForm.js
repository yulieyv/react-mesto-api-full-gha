import React from "react";

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
        </form>
      </section>
    </>
  );
}

export default AuthForm;
