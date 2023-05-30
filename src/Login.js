import React from "react";
import './App.css';

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
    <div class="page">
      <div class="alert "></div>
      <form class="form" onSubmit={handleSubmit}>
        <label class="form__label">Номер телефона или e-mail</label>
        <input id="login" class="form__input " required  value={email} onChange={handleChangeEmail}/>
          <label class="form__label">Пароль</label>
          <input id="password" type="password" class="form__input " required  value={password} onChange={handleChangePassword}/>
            <div>
              <button class="form__button form__button_active">ПОДКЛЮЧИТЬ</button>
              <button class="form__button">ОТМЕНА</button>
            </div>
          </form>
          <div>
            <p class="text">Для получения помощи перейдите в мессенджер:</p>
            <button class="form__button">WHATSAPP</button>
            <button class="form__button">TELEGRAM</button>
          </div>
        </div>
        );
}

        export default Login;
