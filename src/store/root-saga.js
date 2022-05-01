import createSagaMiddleware from "redux-saga";
import { all } from 'redux-saga/effects';
import authWatcher from '@components/auth/store/auth-saga';
import dictsWatcher from '@components/dicts/store/dicts-saga';
import reportsWatcher from "@components/reports/store/reports-saga.js"
import sparesWatcher from '@components/spares/store/spares-saga';
import sampleComponentWatcher from '@components/sample-component/store/sample-component-saga';
import equipmentsWatcher from '@components/equipments/store/equipments-saga';
import platformsWatcher from '@components/platforms/store/platforms-saga';
import usersWatcher from '@components/users/store/users-saga';
import paymentsSetsWatcher from '@components/payments-sets/store/payments-sets-saga.js';
//import chatWatcher from '@components/chat/store/chat-saga';

const sagaMiddleware = createSagaMiddleware();

function* rootWatcher() {
  yield all([
    authWatcher(),
    dictsWatcher(),
    //chatWatcher(),
    reportsWatcher(),
    sparesWatcher(),
    sampleComponentWatcher(),
    equipmentsWatcher(),
    platformsWatcher(),
    usersWatcher(),
    paymentsSetsWatcher(),
  ])
}

export default sagaMiddleware;
export { rootWatcher };
