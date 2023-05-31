import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import auth from "./utils/auth.js";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [infoMessage, setInfoMessage] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);

  //авторизация
  function handleLogin({ email, password }) {
    auth.authorize(email, password)
    setIsLoading(true)
      .then((res) => {
        setLoggedIn(true);
        setEmail(email);
        setInfoMessage({ message: "Активен" });
        setIsLoading(false) 
      })
      .catch((err) => {
        console.log("Ошибка авторизации")
        setIsLoading(false) 
      })
  }

  //проверка авторизации

  function handleAuthCheck() {
    auth.hasAuth()
      .then((res) => {
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div class="page">
      <div class="user">
        <p class="user__email">{email}</p>
        <p class="user__status">{infoMessage}</p>
        <div className={`spinner ${isLoading ? 'spinner_active' : ''}`}></div>
      </div>
      <Login onLogin={handleLogin} />
      <div>
        <p class="text">Для получения помощи перейдите в мессенджер:</p>
        <button class="form__button" aria-label="WhatsApp">WHATSAPP</button>
        <button class="form__button" aria-label="Telegram">TELEGRAM</button>
      </div>
    </div>

  )
}
export default App;