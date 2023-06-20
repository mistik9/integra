import React from "react";
import "./App.css";

function Login({ onLogin, beforeAuth, onSendSms, infoMessage, isLoading, loggedIn, isSms, onLogout, onCancel }) {
  const [login, setlogin] = React.useState("");
  const [passw, setPassw] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ login, passw })
  }
  const handleSubmitSms = (e) => {
    e.preventDefault();
    onSendSms(code)
    }

  function handleChangeLogin(e) {
    setlogin(e.target.value);
  }

  function handleChangePassword(e) {
    setPassw(e.target.value);
  }
  function handleChangeSms(e) {
    setCode(e.target.value);

  }

  return (
    <div class="page">
      <div class="user">
        <h2 class={`user__email ${beforeAuth ? "user__email_hidden" : ""}`}>{login}</h2>
        <div class={`block ${!isLoading ? "block_hidden" : ""}`}>
          <span class="spinner spinner_active"></span>
          <p class="text">Аутентификация</p>
        </div>
        <div class={`user__status ${infoMessage === "Активен" ? "user__status_active" :
          infoMessage === "" ? "" : "user__status_danger"}`}>{infoMessage}</div>
        <button class={`form__button ${!loggedIn ? "form__button_hidden" : "form__button_active"}`} onClick={onLogout}>Выйти</button>
      </div>
      <form class={`form ${loggedIn || isSms? "form_hidden" : ""}`} onSubmit={handleSubmit} >
        <label class="form__label">Номер телефона или e-mail</label>
        <input id="login" class="form__input " required value={login} onChange={handleChangeLogin} />
        <label class="form__label">Пароль</label>
        <input id="password" type="password" class="form__input " required value={passw} onChange={handleChangePassword} />
        <div>
          <button class="form__button form__button_active"  type="submit" onclick={setlogin}>ПОДКЛЮЧИТЬ</button>
          <button class="form__button" type="reset" onClick={onCancel} >ОТМЕНА</button>
        </div>
      </form>
      <form class={`form ${isSms? "" : "form_hidden"}`} onSubmit={handleSubmitSms} >
        <label class="form__label">Код из СМС</label>
        <input id="sms" type="password" class="form__input " required value={code} onChange={handleChangeSms} />
        <div>
        <button class="form__button form__button_active"  type="submit" onclick={setCode}>ПОДКЛЮЧИТЬ</button>
        <button class="form__button" type="reset" onClick={onCancel} >ОТМЕНА</button>
        </div>
      </form>
      <div>
        <p class="text">Для получения помощи перейдите в мессенджер:</p>
        <button class="form__button" aria-label="WhatsApp"><a class="form__link" href= "https://wa.me/79958454368?text=" target="_blank" rel="noreferrer" >WHATSAPP</a></button>
        <button class="form__button" aria-label="Telegram"><a class="form__link" href ="https://t.me/+79958454368" target="_blank" rel="noreferrer" >TELEGRAM</a></button>
      </div>
    </div >
  );
}

export default Login;
