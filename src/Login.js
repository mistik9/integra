import React from "react";
import './App.css';


function Login({ onLogin, infoMessage, isLoading, loggedIn, onLogout }) {
  const [login, setlogin] = React.useState("");
  const [passw, setPassw] = React.useState("");

  const handleSubmit = (e) => {

    e.preventDefault();
    onLogin({ login, passw })

  }

  function handleChangeLogin(e) {
    setlogin(e.target.value);
  }
  function handleChangePassword(e) {
    setPassw(e.target.value);
  }

  return (

    <div class="page">
      {/* <div class={`user ${!isLoading ? 'user_hidden' : ''}`}>
        <h2 class="use__email">{login}</h2>
         <span class={`spinner ${isLoading ? 'spinner_active' : ''}`}>
        </span>
        <p class="text">Аутентификация</p>
       </div> */}
      <div class={`user ${!isLoading ? 'user_hidden' : ''}`}>
        <h2 class='user__email'>{login}</h2>
        <div class="block">
          <span class='spinner spinner_active'></span>
          <p class='text'>Аутентификация</p>
        </div>
      </div>
      <div class={`user ${loggedIn ? 'user_hidden' : ''}`}>
        <h2 class={`user__email ${loggedIn ? 'user__email_hidden' : ''}`}>{login}</h2>
        <div class={`user__status ${infoMessage === "Активен" ? 'user__status_active' :
          infoMessage === "Неправильный логин или пароль" ? 'user__status_danger' : ''}`}>{infoMessage}</div>
        <button class={`form__button ${!loggedIn ? 'form__button_hidden' : 'form__button_active'}`} onClick={onLogout}>Выйти</button>
      </div>
      <form class={`form ${loggedIn ? 'form_hidden' : ''}`} onSubmit={handleSubmit} >
        <label class="form__label">Номер телефона или e-mail</label>
        <input id="login" class="form__input " required value={login} onChange={handleChangeLogin} />
        <label class="form__label">Пароль</label>
        <input id="password" type="password" class="form__input " required value={passw} onChange={handleChangePassword} />
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
    </div >

  );
}

export default Login;
