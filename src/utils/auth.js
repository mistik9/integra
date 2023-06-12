
class Auth {
    constructor(options) {
        this._baseUrl = options.baseUrl;
       
    }

    authorize(member_id, login, passw ) {
        return fetch(`${this._baseUrl}/getAuth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                member_id,
                login, 
                passw })
        })
            .then(res => {
                if (res.ok) return res.json();
                console.log(res)
            })

    }
    hasAuth(member_id) {
        return fetch(`${this._baseUrl}/hasAuth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                member_id,
            })
        })
            .then(res => {
                return res.json();

            })
            .then((data) => {
                if (data.auth === "N") {
                    throw new Error('Ошибка member_id')
                }
            })
    }

    sendSMS(member_id, code) {
        return fetch(`${this._baseUrl}/sendSMS`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                member_id,
                code,
            })
        })
            .then(res =>  {
                return res.json();

            })
    }
}

const auth = new Auth({
    baseUrl: "https://autoparts-base.ru/dev",
});
export default auth;