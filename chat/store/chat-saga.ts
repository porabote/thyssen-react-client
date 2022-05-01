import { put, call, select, takeEvery } from "redux-saga/effects";
import {
  fetchDialogs,
  getUsers,
  setDialog,
} from "../chat-service";
import {
  getUsersSuccess,
  getUsersError,
  setDialogSuссess,
  setDialogError,
  fetchDialogsError,
} from "./chat-actions";

export default function* chatWatcher() {
  yield takeEvery("FETCH_CHAT_USERS", fetchUsers);
  yield takeEvery("FETCH_CHAT_DIALOGS", fetchDialogsSaga);
  yield takeEvery("SET_CHAT_DIALOG", setChatDialog);
}

function* setChatDialog({ payload: { selfId, userId } }) {

  try {
    const data = yield call(() => {
      return setDialog(selfId, userId);
    });
    yield put(setDialogSuссess(data));
  } catch (error) {
    yield put(setDialogError(error));
  }
  console.log(selfId)
  console.log(userId)
}

function* fetchUsers() {
  try {
    const data = yield call(() => {
      return getUsers();
    });
    yield put(getUsersSuccess(data));
  } catch (error) {
    yield put(getUsersError(error));
  }
}

function* fetchDialogsSaga()
{
  try {
    const data = call(fetchDialogs());
    yield put(fetchDialogsSuccess(data));
  } catch (error) {
    yield put(fetchDialogsError(error));
  }
}
