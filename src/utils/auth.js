class Auth {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                if (res.ok) return res.json();
            })

    }
}

const auth = new Auth({
    baseUrl: 'https://autoparts-base.ru/dev/getAuth',

});
export default auth;