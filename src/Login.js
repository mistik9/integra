import React from "react";
import './App.css';


function Login({ onLogin, infoMessage, isLoading, loggedIn }) {
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
<div >
    <h2 class={`user__email ${!loggedIn ? 'user__email_hidden' : ''}`}>{email}</h2>
    <div class="user__status">{infoMessage}
    <div className={`spinner ${isLoading ? 'spinner_active' : ''}`}></div>
    <button class={`form__button ${!loggedIn ? 'form__button_hidden' : ''}`}>Выйти</button>
    </div>
    </div>
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
      <div>
        <p class="text">Для получения помощи перейдите в мессенджер:</p>
        <button class="form__button" aria-label="WhatsApp">WHATSAPP</button>
        <button class="form__button" aria-label="Telegram">TELEGRAM</button>
      </div>
    
    </>
  );
}

export default Login;
