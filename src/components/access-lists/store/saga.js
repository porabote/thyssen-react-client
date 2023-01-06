import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./actions";
import {FETCH_FEED_DATA} from "./types";
import Api from '@services/api-service';

function* sagaWatcher() {
  yield takeEvery(FETCH_FEED_DATA, fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {

      //let where = {...state.mails.filter.where};

      return Api.get(`/api/access-lists/get/`, {
        query: {
          // where: where,
          // whereIn: state.mails.filter.whereIn,
          orWhereGrouped: state.accessLists.filter.orWhereGrouped,
          include: state.accessLists.relationships,
          page: state.accessLists.meta.nextPage,
          limit: 50,
          orderBy: {
            id: 'DESC'
          }
        }
      }).then((res) => res);
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(fetchFeedDataError(error));
  }
}

export default sagaWatcher;