import { API_URL, API_VERSION } from './constants'

class Api {

    getToken = () => {
        return localStorage.getItem('access_token');
    }

    post = async (uri, params, exclude = {}) => {

        let url = (typeof params.url !== "undefined") ? params.url : API_URL

        let headersDefault = {
            'Access-Control-Allow-Credentials': false,
            'Authorization': `bearer ${this.getToken()}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Api-Version': API_VERSION
        }


        let body = params.body;
        
        // Excluding Content type for correctly binding of data
        if (body instanceof FormData) {
            delete headersDefault['Content-Type'];
        } else {
            body = JSON.stringify(body);
        }

        let headers = Object.assign(headersDefault, params.headers)

        const response = await fetch(`${url}${uri}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: headers,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: body
        });

        let responseJSON = await response.json();
        return {...responseJSON, ...{response: {status: response.status}}};

    }

    get = async (uri, params = {}) => {

        let url = (typeof params.url !== "undefined") ? params.url : API_URL

        if (typeof params.query !== "undefined") {
            let query = this.objectToQuerystring(params.query);
            uri = `${uri}?${query}`
        }

        const response = await fetch(`${url}${uri}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Access-Control-Allow-Credentials': false,
                'Authorization': `bearer ${this.getToken()}`,
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

    /**
     * Parsing Object to URI
     */
    objectToQuerystring = (obj, prefix) => {
        var str = [],
            p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                    this.objectToQuerystring(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }

    /**
     * Parsing URI to Object
     */
    queryStringToObject = (uri) => {
        let uriArray = uri.replace(/^\?*/, '');
        if(uriArray.length == 0) return {};

        uriArray = uriArray.split("&");

        let uriObj = {};
        for(var i = 0; i < uriArray.length; i++) {
            let chainArray = uriArray[i].split('=');
            uriObj[chainArray[0]] = chainArray[1];
        }

        return uriObj;
    }

}

export default new Api