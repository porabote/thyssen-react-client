import { API_URL } from '@configs'

const getToken = () => {
    return localStorage.getItem('access_token');
}

const post = async (uri, params = {}) => {

    let url = (typeof params.url !== "undefined") ? params.url : API_URL

    const response = await fetch(`${url}${uri}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            'Access-Control-Allow-Credentials': false,
            'Authorization': 'JWT ' + getToken(),
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

const get = async (uri, params = {}) => {

    let url = (typeof params.url !== "undefined") ? params.url : API_URL

    const response = await fetch(`${url}${uri}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            'Access-Control-Allow-Credentials': false,
            'Authorization': 'JWT ' + getToken(),
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

export { post, get }