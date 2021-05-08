import { combineReducers } from 'redux'
import { authReducer } from '../components/app/auth'
// import { docsReducer } from '../components/docs'
// import { reportsReducer } from '../components/reports'
// import { paymentsSetReducer } from '../components/payments-set'
// import { modalReducer } from '../components/app/modal'

export const rootReducer = combineReducers({
    auth: authReducer,
    // modal: modalReducer,
    // docs: docsReducer,
    // reports: reportsReducer,
    // paymentsSet: paymentsSetReducer
})

export default rootReducer