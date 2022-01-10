import { combineReducers } from "redux";
import { modalReducer } from "porabote/modal";
import authReducer from "@components/auth/store/auth-reducer";
import dictsReducer from '@components/dicts/store/dicts-reducer'
import sparesReducer from "@components/spares/store/spares-reducer";
import sampleComponent from "@components/sample-component/store/sample-component-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  dicts: dictsReducer,
  spares: sparesReducer,
  sampleComponent: sampleComponent,
});

export default rootReducer;
