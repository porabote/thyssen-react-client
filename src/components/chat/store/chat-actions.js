import { ADD_MSG, SEND_MSG } from './chat-types'
//import wsService from './ws-services';

const addMsgThunk = () => {

  return dispatch => {

    // dispatch(fetchRecords())

    wsService.get()
      .then(
        response => {
          if ( response.response.status === 200 ) {

            if(response.data) {
              //dispatch(setRecordsPaymentsSet({data: response.data}))
            }

          } else {
            //dispatch(failure(response.data.error))
          }
        });
  }

  // function setRecordsPaymentsSet(payload) { return {type: SET_RECORDS, payload} }
  // function fetchRecords() { return {type: FETCH_RECORDS} }
  // function failure(error) {return { type: FETCH_FAILURE, payload : error } }
}

export { addMsgThunk }