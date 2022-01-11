import {
  FETCH_FEED_SAMPLE_COMPONENT_DATA,
  FETCH_FEED_SAMPLE_COMPONENT_DATA_SUCCEEDED,
  FETCH_FEED_SAMPLE_COMPONENT_DATA_ERROR,
} from "./sample-component-types";

const initialState = {
  title: "Тестовый компонент",
  event_ids: [1, 2, 3],
  alias: "sample-component",
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
    seekString: ""
  },
  dictsRequired: [
    "departments",
    "users",
    "report_types",
  ],
  relationships: [
    "comments",
    "files",
    "history",
    "user",
  ],
};

const sampleComponentReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_FEED_SAMPLE_COMPONENT_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FEED_SAMPLE_COMPONENT_DATA_SUCCEEDED:
      return {
        ...state,
        data: [
          ...state.data,
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
    case FETCH_FEED_SAMPLE_COMPONENT_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default sampleComponentReducer;
