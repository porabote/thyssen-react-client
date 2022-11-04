import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";
import { all } from 'redux-saga/effects';
import authWatcher from '@components/auth/store/auth-saga';
import dictsWatcher from '@components/dicts/store/dicts-saga';
import companiesWatcher from '@components/companies/store/saga';
import mailsPatternsWatcher from '@components/mails-patterns/store/saga';
import menusWatcher from '@components/menus/store/saga';
import reportsWatcher from "@components/reports/store/reports-saga.js";
import sparesWatcher from '@components/spares/store/spares-saga';
import samplesWatcher from '@components/samples/store/saga';
import equipmentsWatcher from '@components/equipments/store/equipments-saga';
import platformsWatcher from '@components/platforms/store/platforms-saga';
import shiftsWatcher from '@components/shifts/store/saga';
import ticketsWatcher from '@components/tickets/store/tickets-saga';
import usersWatcher from '@components/users/store/users-saga';
import paymentsSetsWatcher from '@components/payments-sets/store/payments-sets-saga.js';

let staticSagas = [
  authWatcher(),
  dictsWatcher(),
  companiesWatcher(),
  mailsPatternsWatcher(),
  menusWatcher(),
  reportsWatcher(),
  sparesWatcher(),
  samplesWatcher(),
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

