import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import auth from "./utils/auth.js";


function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [login, setlogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [infoMessage, setInfoMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);


    //проверка авторизации
    function handleAuthCheck() {

        auth.hasAuth()
        infoMessage
            .then((res) => {
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //авторизация
    function handleLogin({ login, passw }) {
        
        auth.authorize(login, passw)
            // setIsLoading(true)
            .then((res) => {
                if (res.response === "wrong pass"){
                    console.log(1)
                    setLoggedIn(false);
                    setInfoMessage("Неправильный логин или пароль");
                } else {
                console.log(res.response)

                setLoggedIn(true);
                setlogin(login);
                setInfoMessage("Активен");
                // setIsLoading(false)
                }

            })
            .catch((err) => {
                        setInfoMessage("Попробуйте позднее");
                setIsLoading(false);
                console.log(err);
            })
    }

    function handleLogout() {
        setLoggedIn(false);
        setInfoMessage("");
    }




    return (

        <Login login={login} infoMessage={infoMessage} loggedIn={loggedIn} onLogin={handleLogin} onLogout={handleLogout} />


    )
}
export default App;