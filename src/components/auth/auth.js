class Auth {

    constructor() {

        this.state = {
            isAuth: false,
            user: {}
        }

        this.check()
    }

    check = () => {
        let data = JSON.parse(localStorage.getItem('porabote_user'));
        if (data !== null && typeof data.id !== "undefined") {
            this.state.isAuth = true;
            this.state.user = data;
        }
    }

    parseJwt = token => {
        var base64Url = token.split('.')[1];

        if(base64Url === undefined) return null;

        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

}

export default new Auth