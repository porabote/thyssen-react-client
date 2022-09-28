const initialState = {
  title: "Компании - контрагенты",
  event_ids: [],
  alias: "companies",
  apiUrl: "/api/companies",
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
    //"menus",
  ],
  relationships: [
    "logo",
  ],
};

export default initialState;