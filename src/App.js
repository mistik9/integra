import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import User from "./User.js";
import auth from "./utils/auth.js";


function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [infoMessage, setInfoMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);


    //проверка авторизации
    function handleAuthCheck() {
        console.log(1)
        auth.hasAuth()

            .then((res) => {
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //авторизация
    function handleLogin({ email, password }) {

        auth.authorize(email, password)
        setIsLoading(true)
            .then((res) => {
                if (res.ok) {
                    setLoggedIn(true);
                    setEmail(email);
                    setInfoMessage({ message: "Активен" });
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                setInfoMessage({ message: "Попробуйте позднее" });
                setIsLoading(false);
                console.log(err);
            })
    }

    function handleLogout() {
        setLoggedIn(false)
    }




    return (

<Login email={email} infoMessage={infoMessage} loggedIn={loggedIn} onLogin={handleLogin}/>
      

    )
}
export default App;