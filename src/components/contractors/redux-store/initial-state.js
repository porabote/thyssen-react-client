function subtractMonths(date, months) {
  date.setMonth(date.getMonth() - months);
  return date;
}

const initialState = {
  title: "Контрагенты",
  event_ids: [],
  alias: "contractors",
  data: [],
  loading: true,
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
      source_type: {
        operand: "=",
        value: ""
      },
    },

    orWhereGrouped: [

        {
          inn: {
            operand: "like",
            pattern: "%T%",
            value: ""
          },
          name: {
            operand: "like",
            pattern: "%T%",
            value: ""
          },
        }

    ],
    // whereIn: {
    //   department_id: [],
    // },
    seekString: "",
  },
  relationships: [
    // "status",
    // "bill.file_of_bill",
    // "contractor.guid",
    // "client",
    // "object",
    // "payments_set",
  ],
};

export default initialState;
