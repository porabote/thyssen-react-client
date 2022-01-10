import createSagaMiddleware from "redux-saga";
import { all } from 'redux-saga/effects';
import authWatcher from '@components/auth/store/auth-saga';
import dictsWatcher from '@components/dicts/store/dicts-saga';
import sparesWatcher from '@components/spares/store/spares-saga';
import sampleComponentWatcher from '@components/sample-component/store/sample-component-saga';

const sagaMiddleware = createSagaMiddleware();

function* rootWatcher() {
  yield all([
    authWatcher(),
    dictsWatcher(),
    sparesWatcher(),
    sampleComponentWatcher(),
  ])
}

export default sagaMiddleware;
export { rootWatcher };
