import {
  FETCH_CHAT_USERS,
  FETCH_CHAT_USERS_SUCCESS,
  FETCH_CHAT_USERS_ERROR,
  FETCH_CHAT_DIALOGS,
  FETCH_CHAT_DIALOGS_SUCCESS,
  FETCH_CHAT_DIALOGS_ERROR,
} from "./chat-types";

const initialState = {
  count: [],
  users: [],
  messages: [],
  activeRoomId: 0,
  dialogs: [],
  bottomAxisX: 0
}

const chatReducer = (store = initialState, action) => {
  switch (action.type) {
    case FETCH_CHAT_DIALOGS:
      return {
        ...store,
      }
    case FETCH_CHAT_DIALOGS_SUCCESS:
      console.log(action)
      return {
        ...store,
        users: action.payload,
      }
    case FETCH_CHAT_DIALOGS_ERROR:
      return {
        ...store,
      }
    case FETCH_CHAT_USERS:
      return {
        ...store,
      }
    case FETCH_CHAT_USERS_SUCCESS:
      return {
        ...store,
        users: action.payload,
      }
    case FETCH_CHAT_USERS_ERROR:
      return {
        ...store,
      }
    default: return store
  }
}

export default chatReducer