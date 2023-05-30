import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import auth from "./utils/auth.js";
import { Spinner } from "./Spinner.js";

function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [userData, setUserData] = React.useState({});

    const navigate = useNavigate()

    //авторизация
    function handleLogin({ email, password }) {
        auth.authorize(email, password)
            .then((res) => {
                if (res.token) localStorage.setItem("token", res.token);
                setLoggedIn(true);
                navigate("/", { replace: true });
                setUserData(res.user);
                setEmail(email);
            })
            .catch((err) => {
                console.log("Ошибка авторизации")
            })
    }

    return (
        <Login />

    )
}
export default App;