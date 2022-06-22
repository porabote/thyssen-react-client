import React, { useState } from "react";
import moment from "moment";
import CalendarMonth from "./calendar-month";

const CalendarYear = (props) => {

  const [monthStart, setMonthStart] = useState(moment().month());
  const [months, setMonths] = useState(moment.months());

  return(
    <div className="prb-calendar-year">
      <div className="prb-calendar-year-months">
        {months.map((month, index) => {
          return <CalendarMonth
            key={index}
            alias={month}
            number={index}
            year={props.number}
          />
        })}
      </div>
    </div>
  );
}

export default CalendarYear;