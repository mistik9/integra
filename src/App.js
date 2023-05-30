import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import auth from "./utils/auth.js";
import { Spinner } from "./Spinner.js";

function App( {onLogin }) {
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [userData, setUserData] = React.useState({});
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

    //авторизация
    function handleLogin({ email, password }) {
        auth.authorize(email, password)
            .then((res) => {
                if (res.token) localStorage.setItem("token", res.token);
                setLoggedIn(true);

                setUserData(res.user);
                setEmail(email);
            })
            .catch((err) => {
                console.log("Ошибка авторизации")
            })
    }

    //проверка токена
    function handleAuthCheck() {
        auth.hasAuth()
            .then((res) => {
                if (res) {
                    setEmail(res.data.email)
                    setLoggedIn(true);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


return (
    <div class="page">
    <div class="alert ">{email}
    <p class =""></p>
    </div>
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

)
}
export default App;