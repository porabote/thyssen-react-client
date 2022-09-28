import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import Api from '@services/api-service';

function* Watcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      return Api.get(`/api/companies/get/`, {
        query: {
          // where: where,
          // whereIn: state.mails.filter.whereIn,
      //    orWhereGrouped: state.mailsPatterns.filter.orWhereGrouped,
       //   include: state.mails.relationships,
          page: state.companies.meta.nextPage,
          limit: state.companies.meta.limit,
          orderBy: {
            id: 'DESC'
          }
        }
      }).then((res) => res)
        .catch(error => {
          console.log(error);
        });
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(fetchFeedDataError(error));
  }
}

export default Watcher;