import { FETCH_DATA } from './spares-types'

const initialState = {
    filter: {
        week: '',
        object_id: '',
        type_id: ''
    },
    seekString: ''
}

const sparesReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                data: [
                    ...state.items.data,
                    ...action.payload
                ],
                loading: false
            }
        default: return state
    }

}

export default sparesReducer