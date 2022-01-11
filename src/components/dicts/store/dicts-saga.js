import { call, takeEvery, put, select } from 'redux-saga/effects'
import { requestDictsSuccess, requestDictsError } from "./dicts-actions"
import Api from '@services/api-service'

function* dictsWatcher() {
  yield takeEvery("REQUEST_DICTS", requestDictsAsync);
}

function* requestDictsAsync() {
    try {

      const store = yield select();

      const data = yield call(() => {
        return Api.get(`/api/dicts/get/`, {
          query: {
            whereIn: {
              assoc_table: store.dicts.requiredList
            }
          }
        })
          .then((res) => res);
      });

      const dicts = {};
      data.data.map((dict, index) => {
        dicts[dict["type"]] = dict["data"];
      })

      yield put(requestDictsSuccess(dicts));

    } catch (error) {console.log(error)
      yield put(requestDictsError(error));
    }
}

export default dictsWatcher;