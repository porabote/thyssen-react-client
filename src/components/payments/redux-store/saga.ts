import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA, UPDATE_FILTERS} from "./types";
import Payments from "../models/Payments";
//import Api from '@services/api-service';

// export type PromiseFn = (...args: any) => Promise<any>;
// export type GetT<T> = T extends Promise<infer N> ? N : any;
// export type GetFnResult<T extends PromiseFn> = GetT<ReturnType<T>>;

function* sagaWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
  yield takeEvery(UPDATE_FILTERS, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const store = yield select();
  const state = store.payments;

  try {
    const data = yield call(() => {
      return new Payments()
        .setWith(state.relationships) //state.filter
        //.setWhereBetween(state.filter.whereBetween)
        .setWhere(state.filter.where)
        .setLimit(state.meta.limit)
        .setPage(state.meta.nextPage)
        .get();
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    console.log(error);
    //yield put(fetchFeedDataError(error));
  }
}

export default sagaWatcher;
