const initialState = {
  title: "Списки доступа",
  event_ids: [],
  alias: "accessLists",
  data: [],
  meta: {
    count: 0, // total count of records
    limit: 50,
    offset: 0,
    nextPage: 1,
    perPage: 0, // total count of loaded records
    lastId: 0,
  },
  filter: {
    where: {
      department_id: '',
      status: '',
      account_id: '',
    },
    orWhereGrouped: [
      {
        subject: {
          operand: "like",
          pattern: "%T%",
          value: ""
        },
        description: {
          operand: "like",
          pattern: "%T%",
          value: ""
        },
      }
    ],
    whereIn: {
      department_id: [],
    },
    seekString: "",
  },
  dictsRequired: [
    "api_users",
  ],
  relationships: [
   // "avatar",
  ],
};

export default initialState;