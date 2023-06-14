import React from "react";
import Login from "./Login.js";
import auth from "./utils/auth.js";

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [login, setlogin] = React.useState("");
    const [infoMessage, setInfoMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSms, setIsSms] = React.useState(false);
    const [beforeAuth, setBeforeAuth] = React.useState(true);

// проверка авторизации
    function handleAuthCheck(member_id) {
        auth.hasAuth(member_id)
            .then((res) => {
                if (res.auth === "N") {
                    setLoggedIn(false);
                } else {
                    setLoggedIn(true);
                    setlogin(login);
                    setInfoMessage("Активен");
                }
            })
            .catch((err) => {
                setInfoMessage("Ошибка приложения, попробуйте через некоторое время ");
                console.log(err)
            })
    }

    React.useEffect(() => {
        handleAuthCheck();
    }, [])

    //авторизация
    function handleLogin({ member_id, login, passw }) {
        setIsLoading(true);
        // setBeforeAuth(false);
        auth.authorize(member_id, login, passw)
            .then((res) => {

                if (res.response === "OK") {
                    setLoggedIn(true);
                    setlogin(login);
                    setInfoMessage("Активен");
                    setIsSms(false);

                } else if (res.response === "wrong pass") {
                    setIsLoading(false);
                    setInfoMessage("Неверный пароль");
                    setlogin(login);
                    setLoggedIn(false);

                } else if (res.response === "wrong user") {
                    setIsLoading(false)
                    setInfoMessage("Неверное имя пользователя");
                    setlogin(login);
                    setLoggedIn(false);

                } else if (res.response === "SMS") {
                    setLoggedIn(false);
                    setIsLoading(false);
                    setlogin(login);
                    setInfoMessage("Введите код из СМС");
                    setIsSms(true);
                    setBeforeAuth(false)
                }
            })
            .catch((err) => {
                setInfoMessage("Ошибка приложения, попробуйте через некоторое время ");
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);

            })
    }

    function sendSMS(code) {
        setIsLoading(true);
        setBeforeAuth(false);
        auth.sendSMS(code)
            .then((res) => {
                if (res.response === "OK") {
                    setLoggedIn(true)
                    setlogin(login);
                    setInfoMessage("Активен");
                    setIsSms(false);

                } else if (res.response === "wrong pass") {
                    setIsLoading(false)
                    setInfoMessage("Неверный пароль");
                    setlogin(login);
                    setLoggedIn(false);
                }
            })
            .catch((err) => {
                setInfoMessage("ошибка приложения, попробуйте через некоторое время ");
                console.log(err);
            })
            .finally(() => {
                setBeforeAuth(false);
                setIsLoading(false);
            })
    }

    function handleLogout() {
        auth.signout()
            .then((res) => {
                console.log(res)
                if (res.auth === "N") {
                    setLoggedIn(false);
                    setBeforeAuth(true);
                    setInfoMessage("");
                    setlogin("");
                }
            })
            .catch((err) => {
                setInfoMessage("ошибка приложения, попробуйте через некоторое время");
                console.log(err);
            })

    }

    return (
        <Login
            beforeAuth={beforeAuth}
            login={login}
            infoMessage={infoMessage}
            isLoading={isLoading}
            loggedIn={loggedIn}
            isSms={isSms}
            onSendSms={sendSMS}
            onLogin={handleLogin}
            onLogout={handleLogout} />
    )
}
export default App;