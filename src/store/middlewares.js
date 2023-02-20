import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";
import { all } from 'redux-saga/effects';
import authWatcher from '@components/auth/redux-store/auth-saga';
import dictsWatcher from '@components/dicts/redux-store/dicts-saga';
import companiesWatcher from '@components/companies/redux-store/saga';
import mailsPatternsWatcher from '@components/mails-patterns/redux-store/saga';
import menusWatcher from '@components/menus/redux-store/saga';
import reportsWatcher from "@components/reports/redux-store/reports-saga";
import sparesWatcher from '@components/spares/redux-store/spares-saga';
import equipmentsWatcher from '@components/equipments/redux-store/equipments-saga';
import platformsWatcher from '@components/platforms/redux-store/platforms-saga';
import shiftsWatcher from '@components/shifts/redux-store/saga';
import ticketsWatcher from '@components/tickets/redux-store/tickets-saga';
import usersWatcher from '@components/users/redux-store/users-saga';
import paymentsSetsWatcher from '@components/payments-sets/redux-store/payments-sets-saga';

let staticSagas = [
  authWatcher(),
  dictsWatcher(),
  companiesWatcher(),
  mailsPatternsWatcher(),
  menusWatcher(),
  reportsWatcher(),
  sparesWatcher(),
  equipmentsWatcher(),
  platformsWatcher(),
  shiftsWatcher(),
  ticketsWatcher(),
  usersWatcher(),
  paymentsSetsWatcher(),
];


const createSaga = (asyncSaga = []) => {
  return function* () {
    return yield all([
      ...staticSagas,
      ...asyncSaga,
    ])
  }
}

const sagaMiddleware = createSagaMiddleware();


export {createSaga, sagaMiddleware, thunkMiddleware};
