import { combineReducers } from "redux";
import { modalReducer } from "porabote/modal";
import modalReducerTS from "@app/modal/redux-store/reducer";
import { confirmReducer } from "porabote/confirm";
import dialogReducer from "@app/dialog/redux-store/reducer";
import acceptListsReducer from "@components/accept-lists/redux-store/accept-lists-reducer";
import companiesReducer from "@components/companies/redux-store/reducer";
import reportsReducer from "@components/reports/redux-store/reports-reducer";
import authReducer from "@components/auth/redux-store/auth-reducer";
import dictsReducer from "@components/dicts/redux-store/dicts-reducer";
import filtersReducer from "@components/filters/redux-store/filters-reducer";
import mailsPatternsReducer from "@components/mails-patterns/redux-store/reducer";
import menusReducer from "@components/menus/redux-store/reducer";
import notificationReducer from "@app/notifications/redux-store/reducer.ts";
import sparesReducer from "@components/spares/redux-store/spares-reducer";
import equipmentsReducer from "@components/equipments/redux-store/equipments-reducer";
import platformsReducer from "@components/platforms/redux-store/platforms-reducer";
import shiftsReducer from "@components/shifts/redux-store/reducer";
import ticketsReducer from "@components/tickets/redux-store/tickets-reducer";
import usersReducer from "@components/users/redux-store/users-reducer";
import paymentsSetsReducer from "@components/payments-sets/redux-store/reducer.ts"

const staticReducers = {
  acceptLists: acceptListsReducer,
  auth: authReducer,
  companies: companiesReducer,
  modal: modalReducer,
  modal_ts: modalReducerTS,
  confirm: confirmReducer,
  dialog: dialogReducer,
  dicts: dictsReducer,
  filters: filtersReducer,
  mailsPatterns: mailsPatternsReducer,
  menus: menusReducer,
  notifications: notificationReducer,
  paymentsSets: paymentsSetsReducer,
  reports: reportsReducer,
  spares: sparesReducer,
  equipments: equipmentsReducer,
  platforms: platformsReducer,
  shifts: shiftsReducer,
  tickets: ticketsReducer,
  users: usersReducer,
};

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  })
}

export default createReducer;
