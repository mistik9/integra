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

    


    // // проверка авторизации
    //     function handleAuthCheck(member_id) {
    //         auth.hasAuth(member_id)
    //             .then((res) => {
    //                 if (res.auth === "N") {
    //                     setLoggedIn(false);
    //                 } else {
    //                     setLoggedIn(true);
    //                     setlogin(login);
    //                     setInfoMessage("Активен");
    //                 }
    //             })
    //             .catch((err) => {
    //                 setInfoMessage("Ошибка приложения, попробуйте через некоторое время ");
    //                 console.log(err)
    //             })
    //     }

    //     React.useEffect(() => {
    //         handleAuthCheck();
    //     }, [])


    console.log("before", beforeAuth)
    //авторизация
    function handleLogin({ member_id, login, passw }) {
        setIsLoading(true);
        setBeforeAuth(false);
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

   
    React.useEffect(() => {
        const controller = new AbortController();
        handleLogin(controller);
        return () => controller.abort()
}, [handleLogin])

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
                setIsLoading(false);
            })
    }

function handleCancel() {
    setBeforeAuth(true);
    setLoggedIn(false);
    setIsLoading(false)
    setInfoMessage("");
    setlogin("");
    setIsSms(false);
}

    function handleLogout() {
        setBeforeAuth(true);
        auth.signout()
            .then((res) => {
                if (res.auth === "N") {
                    setBeforeAuth(true);
                    setLoggedIn(false);
                    setIsLoading(false)
                    setInfoMessage("");
                    setlogin("");
                    setIsSms(false);
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
            onLogout={handleLogout}
            onCancel={handleCancel} />
    )
}
export default App;