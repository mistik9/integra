import React from "react";
import './App.css';

function Help() {

    return (
        <div>
            <p class="text">Для получения помощи перейдите в мессенджер:</p>
            <a href ="#" class="form__button" aria-label="WhatsApp">WHATSAPP</a>
            <a href ="#"  class="form__button" aria-label="Telegram">TELEGRAM</a>
        </div>

    );
}

export default Help;
