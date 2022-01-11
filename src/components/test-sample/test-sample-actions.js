import { SET_RECORDS, FETCH_RECORDS, FETCH_FAILURE } from './test-sample-types'
import test-sampleService from './test-sample-service';

const fetchRecordsThunk = () => {

    return dispatch => {

        dispatch(fetchRecords())

        test-sampleService.get()
            .then(
                response => {
                    if ( response.response.status === 200 ) {

                        if(response.data) {
                            dispatch(setRecordsTestSample({data: response.data}))
                        }

                    } else {
                        dispatch(failure(response.data.error))
                    }

                });
    }

    function setRecordsTestSample(payload) { return {type: SET_RECORDS, payload} }
    function fetchRecords() { return {type: FETCH_RECORDS} }
    function failure(error) {return { type: FETCH_FAILURE, payload : error } }
}

export { fetchRecordsThunk }