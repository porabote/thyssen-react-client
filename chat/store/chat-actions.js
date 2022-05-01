import {
  FETCH_CHAT_USERS,
  FETCH_CHAT_USERS_SUCCESS,
  FETCH_CHAT_USERS_ERROR,
  FETCH_CHAT_MESSAGES,
  FETCH_CHAT_MESSAGES_SUCCESS,
  FETCH_CHAT_MESSAGES_ERROR,
  SET_CHAT_DIALOG,
  SET_CHAT_DIALOG_SUССESS,
  SET_CHAT_DIALOG_ERROR,
  FETCH_CHAT_DIALOGS,
  FETCH_CHAT_DIALOGS_SUССESS,
  FETCH_CHAT_DIALOGS_ERROR,
} from "./chat-types";

export const getUsers = () => {
  return dispatch => {
    dispatch({type: FETCH_CHAT_USERS});
  }
}

export const getUsersSuccess = (data) => {
  return dispatch => {
    dispatch({type: FETCH_CHAT_USERS_SUCCESS, payload: data});
  }
}

export const getUsersError = (error) => {
  return dispatch => {
    dispatch({type: FETCH_CHAT_USERS_ERROR, payload: error});
  }
}

export const fetchDialogs = () => {
  return dispatch => {
    dispatch({type: FETCH_CHAT_DIALOGS});
  }
}

export const fetchDialogsSuссess = () => {
  return dispatch => {
    dispatch({type: FETCH_CHAT_DIALOGS_SUССESS, payload: error});
  }
}

export const fetchDialogsError = (error) => {
  return dispatch => {
    dispatch({type: FETCH_CHAT_DIALOGS_ERROR, payload: error});
  }
}

export const setDialog = (selfId, userId) => {
  return dispatch => {
    dispatch({type: SET_CHAT_DIALOG, payload: { selfId, userId }});
  }
}

export const setDialogSuссess = () => {
  return dispatch => {
    dispatch({type: SET_CHAT_DIALOG_SUССESS, payload: error});
  }
}

export const setDialogError = (error) => {
  return dispatch => {console.log(error)
    dispatch({type: SET_CHAT_DIALOG_ERROR, payload: error});
  }
}


export const getMessages = () => {
  return dispatch => {
    dispatch({type: FETCH_CHAT_MESSAGES});
  }
}

export const getMessagesSuccess = (data) => {
  return dispatch => {
    dispatch({type: FETCH_CHAT_MESSAGES_SUCCESS, payload: data});
  }
}

export const getMessagesError = (error) => {
  return dispatch => {
    dispatch({type: FETCH_CHAT_MESSAGES_ERROR, payload: error});
  }
}
