import ApiService from '../../services/ApiService'

class test-sampleService {

    #access_token = null;


    get = () => {
        return ApiService.get(`/test-sample/get/`)
    }


}

export default new test-sampleService()