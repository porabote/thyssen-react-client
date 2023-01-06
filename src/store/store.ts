import { createStore, compose, applyMiddleware } from "redux";
import {createSaga, sagaMiddleware, thunkMiddleware} from "./middlewares";
import createReducer from "./root-reducer";
import SagaTaskRegistry from "./SagaTaskRegistry";

function configureStore() {

  const store = createStore(
    createReducer(),
    compose(
      applyMiddleware(
        thunkMiddleware,
        sagaMiddleware,
      )
    ),
  );

  store.asyncReducers = {};
  store.asyncSagas = [];
  store.asyncSagasReg = {};

  const sagaTaskRegistry = new SagaTaskRegistry();
  let sagaTask = sagaMiddleware.run(createSaga(store.asyncSagas));

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  store.injectSaga = (key, asyncSaga) => {
    store.asyncSagas.push(asyncSaga());
    if (!store.asyncSagasReg[key]) {
      sagaTask = sagaMiddleware.run(createSaga(store.asyncSagas));
      store.asyncSagasReg[key] = key;
    }
  }

  return store;
}


export default configureStore();
