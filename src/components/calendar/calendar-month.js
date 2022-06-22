import React, {useEffect, useContext} from "react";
import moment from "moment";
import CalendarContext from "./calendar-context";
import CalendarDay from "./calendar-day";

const CalendarMonth = (props) => {

  useEffect(() => {
  }, [props]);

  const context = useContext(CalendarContext);

  let monthLogicalNumber = props.number + 1;
  monthLogicalNumber.toString().padStart(2, "0");

  let daysInMonth = moment(`${props.year}-${monthLogicalNumber}`, "YYYY-MM").daysInMonth();

  let {periods} = context;

  let days = [];
  for(let i = 1; i <= daysInMonth; i++) {

    let date = new Date(props.year, props.number, i, 0, 0, 0);
    let isSelected = false;
    let belongToPeriod = null;

    for (let timestamp in periods) {
      if (date >= periods[timestamp].dateStart && date <= periods[timestamp].dateFinish) {
        isSelected = true;
        belongToPeriod = timestamp;
        break;
      }
    }
    days.push({
      number: i,
      isSelected,
      belongToPeriod,
    });
  };

  let weekDaysAliases = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  let firstDayNumberOfWeek = moment(`${props.year}-${props.number+1}-01`).day();
  let delta = (6- Math.abs(firstDayNumberOfWeek - 7));
  if (delta < 0) delta = 6;

  let daysDummy = [];
  for (let i = 0; i < delta; i++ ) daysDummy.push(i);

  return(
    <div className="prb-calendar-year-months-month">
      <div className="prb-calendar-year-months-month-panel">
        {props.alias} {props.year}
      </div>
      <div className="prb-calendar-year-months-month-days-names">
        {weekDaysAliases.map((dayAlis, index) => {
          return <div key={index} className="prb-calendar-year-months-month-day">{dayAlis}</div>
        })}
      </div>
      <div className="prb-calendar-year-months-month-days">
        {daysDummy.map((month, index) => (<div key={index} className="prb-calendar-year-months-month-day"></div>))}
        {days.map((day, index) => {
          return <CalendarDay
            key={index}
            year={props.year}
            month={props.number}
            monthNatural={props.number + 1}
            number={day.number}
            isSelected={day.isSelected}
            belongToPeriod={day.belongToPeriod}
          />
        })}
      </div>
    </div>
  );
}

export default CalendarMonth;