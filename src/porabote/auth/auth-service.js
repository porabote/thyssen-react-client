import ApiService from '@services/api-service'
import { API_URL } from '@configs'

class authService {

    check = () => {
        return ApiService.post(`${API_URL}/api/users/check/`)
    }

    login = ({username, password, account_alias = 'porabote'} = {}) => {

        const authData = {
            data: {
                username: username,
                password: password,
                account_alias: account_alias
            }
        };
console.log(authData)
        return ApiService.post(`${API_URL}/api/users/login`, authData);

    }

}

export default new authService()