import {
  ADD_MSG,
  SEND_MSG
} from "./chat-types";

const initialState = {
  count: [],
  dialogs: [
    {
      name: 'Stan Smith',
      id: 1
    },
    {
      name: 'Francine Li Smith',
      id: 1
    }
  ],
  bottomAxisX: 0
}

const chatReducer = (store = initialState, action) => {
  switch (action.type) {
    case ADD_MSG:
      return {
        ...store,
        // records: store.records.concat(action.payload.results),
        // count: action.payload.info.count,
        // pagesCount: action.payload.info.pages,
        // nextPage: action.payload.info.next,
      }
    case SEND_MSG:
      return {...store, currentPage: ++store.currentPage}
    default: return store
  }
}

export default chatReducer