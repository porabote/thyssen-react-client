import { call, takeEvery, put } from 'redux-saga/effects'
import { fetchFeedDataSuccess, fetchFeedDataError } from "./users-actions"
import Api from '@services/api-service'

function* usersWatcher() {//console.log(select(spares))
  yield takeEvery("FETCH_FEED_USERS_DATA", fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {
    try {
      const data = yield call(() => {
        return Api.get(`/api/users/get/`, {
          query: {
          }
        }).then((res) => res);
      });
      yield put(fetchFeedDataSuccess(data));
    } catch (error) {
      yield put(fetchFeedDataError(error));
    }
}

export default usersWatcher;