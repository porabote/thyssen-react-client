import {
  FETCH_FEED_USERS_DATA,
  FETCH_FEED_USERS_DATA_SUCCEEDED,
  FETCH_FEED_USERS_DATA_ERROR,
} from "./users-types";

const initialState = {
  title: "Пользователи",
  event_ids: [],
  alias: "users",
  data: [],
  meta: {
    count: 0,
    limit: 0,
    offset: 0,
    page: 1,
    perPage: 0,
  },
  loading: true,
  filter: {
    where: {
      week: "",
      id: {
        operand: "like",
        pattern: "%T%",
        value: ""
      }
    },
    whereIn: {
    },
    seekString: "",
  },
  dictsRequired: [
  ],
  relationships: [
  ],
};

const usersReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_FEED_USERS_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FEED_USERS_DATA_SUCCEEDED:
      return {
        ...state,
        data: [
          // ...state.data,
          ...payload.data,
        ],
        meta: {
          ...state.meta,
          ...payload.meta,
        },
        nextPage: ++state.nextPage,
        loading: false,
        error: false,
      };
    case FETCH_FEED_USERS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default usersReducer;
