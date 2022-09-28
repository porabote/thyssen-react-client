import { combineReducers } from "redux";
import { modalReducer } from "porabote/modal";
import { confirmReducer } from "porabote/confirm";
import acceptListsReducer from "@components/accept-lists/store/accept-lists-reducer";
import companiesReducer from "@components/companies/store/reducer";
import reportsReducer from "@components/reports/store/reports-reducer";
import authReducer from "@components/auth/store/auth-reducer";
import dictsReducer from "@components/dicts/store/dicts-reducer";
import filtersReducer from "@components/filters/store/filters-reducer";
import mailsPatternsReducer from "@components/mails-patterns/store/reducer";
import menusReducer from "@components/menus/store/reducer";
import sparesReducer from "@components/spares/store/spares-reducer";
import samplesReducer from "@components/samples/store/reducer";
import equipmentsReducer from "@components/equipments/store/equipments-reducer";
import platformsReducer from "@components/platforms/store/platforms-reducer";
import shiftsReducer from "@components/shifts/store/reducer";
import ticketsReducer from "@components/tickets/store/tickets-reducer";
import usersReducer from "@components/users/store/users-reducer";
import paymentsSetsReduser from "@components/payments-sets/store/reducer.js"
//import { chatReducer } from "@components/chat";

const rootReducer = combineReducers({
  acceptLists: acceptListsReducer,
  auth: authReducer,
  companies: companiesReducer,
  modal: modalReducer,
  dicts: dictsReducer,
  filters: filtersReducer,
  //chat: chatReducer,
  mailsPatterns: mailsPatternsReducer,
  menus: menusReducer,
  paymentsSets: paymentsSetsReduser,
  reports: reportsReducer,
  spares: sparesReducer,
  samples: samplesReducer,
  equipments: equipmentsReducer,
  platforms: platformsReducer,
  shifts: shiftsReducer,
  tickets: ticketsReducer,
  users: usersReducer,
  confirm: confirmReducer,
});

export default rootReducer;
