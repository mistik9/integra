class Auth {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    authorize(login, passw) {
        return fetch(`${this._baseUrl}/getAuth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, passw })

        })
            .then(res => {
                if (res.ok) return res.json();
            })

    }
    hasAuth() {
        return fetch(`${this._baseUrl}/hasAuth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (res.ok) return res.json();
            })
    }

}

const auth = new Auth({
    baseUrl: 'https://autoparts-base.ru',

});
export default auth;