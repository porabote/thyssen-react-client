import { combineReducers } from "redux";
import { modalReducer } from "porabote/modal";
import { confirmReducer } from "porabote/confirm";
import authReducer from "@components/auth/store/auth-reducer";
import dictsReducer from "@components/dicts/store/dicts-reducer";
import filtersReducer from "@components/filters/store/filters-reducer";
import sparesReducer from "@components/spares/store/spares-reducer";
import sampleComponentReducer from "@components/sample-component/store/sample-component-reducer";
import equipmentsReducer from "@components/equipments/store/equipments-reducer";
import platformsReducer from "@components/platforms/store/platforms-reducer";
import usersReducer from "@components/users/store/users-reducer";
import { chatReducer } from "@components/chat";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  dicts: dictsReducer,
  filters: filtersReducer,
  chat: chatReducer,
  spares: sparesReducer,
  sampleComponent: sampleComponentReducer,
  equipments: equipmentsReducer,
  platforms: platformsReducer,
  users: usersReducer,
  confirm: confirmReducer,
});

export default rootReducer;
