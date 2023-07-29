import React from "react";
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
        question="Уже зарегистрированы?"
        answer="Войти"
      />
    </>
  );
}

export default Register;
