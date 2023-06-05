class Auth {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._member_id = options.member_id
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                member_id: this._member_id,             
            })
        })
            .then(res => {
                if (res.body) return res.json();
            })
    }

}

const auth = new Auth({
    baseUrl: 'https://autoparts-base.ru',
    member_id:  "bcc2aa0d98a8c7155d417e06b8de7830",

});
export default auth;