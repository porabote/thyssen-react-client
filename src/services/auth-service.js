class AuthService {

    post = async (uri, params) => {

        let url = (typeof params.url !== "undefined") ? params.url : API_URL

        const response = await fetch(`${url}${uri}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Access-Control-Allow-Credentials': false,
                'Authorization': 'Basic',
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Api-Version': 2
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(params.body)
        });

        let responseJSON = await response.json();
        return {...responseJSON, ...{response: {status: response.status}}};

    }

    get = async (url, data, params) => {

        const response = await fetch(this.getUrl(url), {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Access-Control-Allow-Credentials': false,
                'Authorization': 'JWT ' + this.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Api-Version': 2
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });

        let responseJSON = await response.json();
        return {...responseJSON, ...{response: {status: response.status}}};

    }

    getToken = () => {
        return localStorage.getItem('access_token');
    }

}

export default new AuthService()