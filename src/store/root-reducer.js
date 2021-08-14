import { combineReducers } from 'redux'
import { modalReducer } from '@porabote/modal'

export const rootReducer = combineReducers({
    modal: modalReducer
})

export default rootReducer