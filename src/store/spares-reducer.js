import { FETCH_DATA, FETCH_DICTS } from "./spares-types";

const initialState = {
  data: [],
  meta: {
    page: 1,
    loading: true,
  },
  dicts: {
    storage: {},
    required: [
      "users",
    ],
    loaded: false,
  },
  filter: {
    week: "",
    object_id: "",
    type_id: "",
  },
  include: [
    "user",
  ],
};

const sparesReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_DATA:
      return {
        ...state,
        data: [
          ...state.items.data,
          ...payload,
        ],
        loading: false,
      };
    case FETCH_DICTS:
      return {
        ...state,
        dicts: {
          ...payload,
        },
      };
    default: return state;
  }
};

export default sparesReducer;
