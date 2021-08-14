import { get, post } from '@services/auth-service'

const check = () => {
    return post(`/api/users/check/`)
}

const login = ({username, password, account_alias = 'porabote'} = {}) => {

    const authData = {
        body: {
            username: username,
            password: password,
            account_alias: account_alias
        }
    };

    return post(`/api/users/login`, authData);

}

export { check, login }