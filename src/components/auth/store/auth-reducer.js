import {
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './auth-types';

const initialState = {
  isAuth: false,
  user: {
    account_alias: "",
    api_id: null,
    avatar: "",
    exp: 0,
    iat: 0,
    id: null,
    name: "",
    post_name: "",
    role_id: null,
    username: "",
  },
  dictsRequired: [
    "accounts",
  ],
};

const authReducer = (store = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...store, isAuth: true, user: {...store.user, ...action.payload}}
    case LOGIN_SUCCESS:
      return {...store, isAuth: true, user: {...action.payload}}
    case LOGIN_FAILURE:
      return {...store, isAuth: false, authError: action.payload}
    case LOGOUT:
      return {...store, isAuth: false}
    default: return store
  }
};

export default authReducer;