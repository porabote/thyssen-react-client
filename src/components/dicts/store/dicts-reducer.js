import { REQUEST_DICTS, REQUEST_DICTS_SUCCEEDED, REQUEST_DICTS_ERROR } from "./dicts-types";

const initialState = {
  data: {},
  requiredList: [],
  loaded: false,
};

const dictsReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case REQUEST_DICTS:
      return {
        ...state,
        requiredList: [...new Set([
          ...payload.requiredList,
          ...state.requiredList,
        ])],
        loaded: false,
      };
    case REQUEST_DICTS_SUCCEEDED:

      return {
        data: {
          ...state.data,
          ...payload,
        },
        loaded: true,
        error: false,
      };
    case REQUEST_DICTS_ERROR:
      return {
        loaded: false,
        error: true,
      };
    default:
      return state;
  }
};

export default dictsReducer;
