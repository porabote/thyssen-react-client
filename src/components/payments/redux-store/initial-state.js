const initialState = {
  title: "Платежи",
  event_ids: [],
  alias: "payments",
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
      object_id: "",
      contractor_id: "",
      client_id: "",
      status_id: "",
      bill_number: "",
    },
    whereBetween: {
      date_payment: {
        value: [null, null],
      },
    },
    // orWhereGrouped: [
    //   {
    //     subject: {
    //       operand: "like",
    //       pattern: "%T%",
    //       value: ""
    //     },
    //     description: {
    //       operand: "like",
    //       pattern: "%T%",
    //       value: ""
    //     },
    //   }
    // ],
    // whereIn: {
    //   department_id: [],
    // },
    seekString: "",
  },
  relationships: [
    "status",
    "bill.file_of_bill",
    "contractor.guid",
    "client",
    "object",
  ],
};

export default initialState;
