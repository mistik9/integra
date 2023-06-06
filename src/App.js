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
            .then((res) => {
                setLoggedIn(true);
                setlogin(login);
                setInfoMessage("Активен");
            })
            .catch((err) => {
                console.log(err)
                setLoggedIn(false);
            })
    }
    React.useEffect(() => {
        handleAuthCheck();
      }, [])

    //авторизация
    function handleLogin({ login, passw }) {
        setlogin("");
        setIsLoading(true)
        auth.authorize(login, passw)
                .then((res) => {
 
                if (res.response === "wrong pass") {
                    setIsLoading(false)
                    setInfoMessage("Неправильный логин или пароль");
                    setlogin(login);
                    setLoggedIn(false)
                } else {
                    setLoggedIn(true);
                    setlogin(login);
                    setInfoMessage("Активен");
                }
            })
            .catch((err) => {
                setInfoMessage("Попробуйте позднее");
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleLogout() {
                setLoggedIn(false);
        setInfoMessage("");
        setlogin("")
    }

    return (
        <Login login={login} infoMessage={infoMessage} isLoading={isLoading} loggedIn={loggedIn} onLogin={handleLogin} onLogout={handleLogout} />
    )
}
export default App;