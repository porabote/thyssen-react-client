import {
  OPEN_CONFIRM,
  CLOSE_CONFIRM,
} from "./types";

const initialState = {
  isOpen: false,
  title : "",
  msg: "",
  callbackData: {},
  approveCallback: null,
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case OPEN_CONFIRM:
      return {
        ...state,
        isOpen: true,
        msg: action.payload.msg,
        callbackData: action.payload.callbackData,
        approveCallback: action.payload.approveCallback,
      }
    case CLOSE_CONFIRM:
      return {
        ...state,
        isOpen: false,
      }
    default: return state
  }

}

export default reducer
