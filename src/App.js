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

    //проверка авторизации
    // function handleAuthCheck() {
    //     auth.hasAuth()
    //         .then((res) => {
    //             setLoggedIn(true);
    //             setlogin(login);
    //             setInfoMessage("Активен");
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             setLoggedIn(false);
    //         })
    // }
    // React.useEffect(() => {
    //     handleAuthCheck();
    // }, [])

    //авторизация
    function handleLogin({ member_id, login, passw }) {
        console.log('before', beforeAuth);
        setBeforeAuth(false);
        setIsLoading(true);
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
                   
                    console.log('sms', beforeAuth);

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
        setBeforeAuth(false);
        console.log('sendsms', beforeAuth);
        auth.sendSMS(code)
            .then((res) => {
                if (res.response === "OK") {
                    setLoggedIn(false)
                    setlogin(login);
                    setInfoMessage("Активен");
                    setIsSms(false);
                    setBeforeAuth(false);

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
                setBeforeAuth(false)
            })
    }

    function handleLogout() {
        setBeforeAuth(true);
        setLoggedIn(false);
        setInfoMessage("");
        setlogin("");
        console.log('logout', beforeAuth)


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