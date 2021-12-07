import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

function* rootWatcher() {
  yield console.log("Hello Sagas!");
}

export default sagaMiddleware;
export { rootWatcher };
