import React from "react";
import './App.css';
import Help from "./Help";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password })
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  return (
    <>
      <form class="form" onSubmit={handleSubmit}>
        
        <label class="form__label">Номер телефона или e-mail</label>
        <input id="login" class="form__input " required value={email} onChange={handleChangeEmail} />
        <label class="form__label">Пароль</label>
        <input id="password" type="password" class="form__input " required value={password} onChange={handleChangePassword} />
        <div>
          <button class="form__button form__button_active">ПОДКЛЮЧИТЬ</button>
          <button class="form__button">ОТМЕНА</button>
        </div>
      </form>
      <Help/>
      </>
  );
}

export default Login;
