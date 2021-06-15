import ApiService from '@services/api-service'

class selectService {

    fetch = url => {
        return ApiService.get(url)
    }

}

export default new selectService()