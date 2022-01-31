import {call, put, select, takeEvery} from "redux-saga/effects";
import {fetchFeedDataError, fetchFeedDataSuccess} from "./equipments-actions"
import Api from '@services/api-service'

function* equipmentsWatcher() {//console.log(select(spares))
  yield takeEvery("FETCH_FEED_EQUIPMENTS_DATA", fetchFeedDataAsync);
}

function* fetchFeedDataAsync() {

  const state = yield select();

  try {

    const data = yield call(() => {

    return Api.get(`/api/equipments/get/`, {
      query: {
        where: state.filters.equipments.where,
        whereIn: state.filters.equipments.whereIn,
        include: state.equipments.relationships,
        //page: state.filters.storage.equipments
      }
    }).then((res) => res);
    });
    yield put(fetchFeedDataSuccess(data));
  } catch (error) {
    yield put(fetchFeedDataError(error));
  }
}

export default equipmentsWatcher;