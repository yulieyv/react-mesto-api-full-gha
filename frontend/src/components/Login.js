import React from "react";
import AuthForm from "./AuthForm";
import useForm from "../hooks/useForm";

function Login(props) {
  const email = useForm("");
  const password = useForm("");

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(password.values, email.values);
  }

  return (
    <>
      <AuthForm
        onEmailChange={email.onChange}
        onPasswordChange={password.onChange}
        onSubmit={handleSubmit}
        title="Вход"
        action="Войти"
        email={email.values}
        password={password.values}
      />
    </>
  );
}

export default Login;
