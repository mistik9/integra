import React from "react";
import './App.css';

function User({ email, isLoading, infoMessage }) {


  return (
    <div class="user">
    <h2 class="user__email">{email}</h2>
    <div class="user__status">{infoMessage}
    <div className={`spinner ${isLoading ? 'spinner_active' : ''}`}></div>
    <button class="form__button">Выйти</button>
    </div>
  </div>
  );
}

export default User;
