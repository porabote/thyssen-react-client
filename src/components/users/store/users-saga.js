import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataSuccess, fetchFeedDataError} from "./users-actions"
import Api from '@services/api-service'

function* usersWatcher() {//console.log(select(spares))
  yield takeEvery("FETCH_FEED_USERS_DATA", fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {
    const data = yield call(() => {
      return Api.get(`/api/api-users/get/`, {
        query: {
          where: state.users.filter.where,
          orWhereGrouped: state.users.filter.orWhereGrouped,
          include: state.users.relationships,
          page: state.users.meta.nextPage,
          limit: state.users.meta.limit,
          orderBy: {
            name: 'ASC'
          }
        }
      }).then((res) => res);
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    yield put(fetchFeedDataError(error));
  }
}

export default usersWatcher;