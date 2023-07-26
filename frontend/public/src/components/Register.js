import React from "react";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import AuthForm from "./AuthForm";

function Register(props) {
  const email = useForm("");
  const password = useForm("");

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(password.values, email.values);
  }

  return (
    <>
      <AuthForm
        onEmailChange={email.onChange}
        onPasswordChange={password.onChange}
        onSubmit={handleSubmit}
        title="Регистрация"
        action="Зарегистрироваться"
        email={email.values}
        password={password.values}
      />
      <div className="auth__sign-up">
        <p className="auth__sign-up_title">
          Уже зарегистрировались?
          <Link className="auth__sign-up_link" to="/sign-in">
            &nbsp; Войти
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
