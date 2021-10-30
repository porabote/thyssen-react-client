import { combineReducers } from 'redux'
import { modalReducer } from 'porabote/modal'

const rootReducer = combineReducers({
    modal: modalReducer
})

export { rootReducer }

export default rootReducer