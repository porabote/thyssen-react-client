import ApiService from '@services/api-service'

class authService {

    check = () => {
        return ApiService.post(`/users/check/`)
    }

    login = (login, psw, account_alias = 'porabote') => {

        const authData = {
            data: {
                username: login,
                password: psw,
                account_alias: account_alias
            }
        };

        return ApiService.post(`/users/login/`, authData);

    }

}

export default new authService()