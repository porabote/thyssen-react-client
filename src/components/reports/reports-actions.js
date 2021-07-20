import { SET_RECORDS, FETCH_RECORDS, FETCH_FAILURE } from './reports-types'
import reportsService from './reports-service';

const fetchRecordsThunk = () => {

    return dispatch => {

        dispatch(fetchRecords())

        reportsService.get()
            .then(
                response => {
                    if ( response.response.status === 200 ) {

                        if(response.data) {
                            dispatch(setRecordsReports({data: response.data}))
                        }

                    } else {
                        dispatch(failure(response.data.error))
                    }

                });
    }

    function setRecordsReports(payload) { return {type: SET_RECORDS, payload} }
    function fetchRecords() { return {type: FETCH_RECORDS} }
    function failure(error) {return { type: FETCH_FAILURE, payload : error } }
}

export { fetchRecordsThunk }