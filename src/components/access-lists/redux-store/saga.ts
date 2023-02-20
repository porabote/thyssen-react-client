import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import AccessLists from "../models/AccessLists";
//import Api from '@services/api-service';

// export type PromiseFn = (...args: any) => Promise<any>;
// export type GetT<T> = T extends Promise<infer N> ? N : any;
// export type GetFnResult<T extends PromiseFn> = GetT<ReturnType<T>>;

function* sagaWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  //const store = yield select();

  try {
    const data = yield call(() => {
      return new AccessLists()
        .setWith(['component']) //state.accessLists.filter
        .get();
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    console.log(error);
    //yield put(fetchFeedDataError(error));
  }
}

export default sagaWatcher;
