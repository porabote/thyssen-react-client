import {
  FETCH_FEED_EQUIPMENTS_DATA,
  FETCH_FEED_EQUIPMENTS_DATA_SUCCEEDED,
  FETCH_FEED_EQUIPMENTS_DATA_ERROR,
} from "./equipments-types";

const initialState = {
  title: "Оборудование",
  event_ids: [1, 2, 3],
  alias: "equipments",
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
    "organizations_own",
    "platforms",
    "objects",
    "equipments_types",
    "statuses",
  ],
  relationships: [
    "organizations_own",
    "platform",
    "object",
    "comments",
    "files",
    "history",
    "user",
    "type",
    "status",
    "status_reason",
    "equipment_accidents",
    "equipment_repairs",
    "equipment_repairs.user",
  ],
};

const equipmentsReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_FEED_EQUIPMENTS_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FEED_EQUIPMENTS_DATA_SUCCEEDED:
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
    case FETCH_FEED_EQUIPMENTS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default equipmentsReducer;
