import initialState from "./initial-state";
import {
  FETCH_FEED_DATA,
  FETCH_FEED_DATA_SUCCEEDED,
  FETCH_FEED_DATA_ERROR,
  UPDATE_FILTERS,
} from "./types";

const Reducer = (state = initialState, {type, payload}: {type: string, payload: any}) => {
  switch (type) {
    case FETCH_FEED_DATA:
      return {
        ...state,
        meta: {
          ...state.meta,
        },
        loading: true,
      };
    case FETCH_FEED_DATA_SUCCEEDED:
      console.log(payload.data);
      return {
        ...state,
        data: [
          ...state.data,
          ...payload.data,
        ],
        meta: {
          ...state.meta,
          ...payload.meta,
          nextPage: ++state.meta.nextPage,
        },
        loading: false,
        error: false,
      };
    case FETCH_FEED_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        ...payload,
        meta: {
          ...state.meta,
          nextPage: 1,
        },
        data: [],
      };
    default:
      return state;
  }
};

export default Reducer;
