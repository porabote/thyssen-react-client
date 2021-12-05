import { combineReducers } from 'redux'
import { modalReducer } from 'porabote/modal'
import { sparesReducer } from './spares-reducer'

const rootReducer = combineReducers({
    modal: modalReducer,
    spares: sparesReducer
})

export { rootReducer }

export default rootReducer