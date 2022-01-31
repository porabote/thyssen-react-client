import { UPDATE_FILTERS } from "./filters-types";

const initState = {
  equipments: {},
}

const filtersReducer = (state = initState, { type, payload } = {}) => {

  switch (type) {
    case UPDATE_FILTERS:
      state[payload.storeAlias] = payload.data;
      return {
        ...state,
      };
    default:
      return state;
  }

}

export default filtersReducer;