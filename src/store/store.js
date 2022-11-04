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

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};
  store.asyncSagas = [];
  store.asyncSagasReg = {};


  const sagaTaskRegistry = new SagaTaskRegistry();
  let sagaTask = sagaMiddleware.run(createSaga(store.asyncSagas));
 // sagaTaskRegistry.addTask(sagaTask);
console.log(sagaTask);
  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
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

  // Return the modified store
  return store;
}


export default configureStore();
