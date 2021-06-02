import { combineReducers } from 'redux'
import { authReducer } from '../components/common/auth'
// import { docsReducer } from '../components/docs'
// import { reportsReducer } from '../components/reports'
// import { paymentsSetReducer } from '../components/payments-set'
import { modalReducer } from '../components/common/modal'

export const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    // docs: docsReducer,
    // reports: reportsReducer,
    // paymentsSet: paymentsSetReducer
})

export default rootReducer