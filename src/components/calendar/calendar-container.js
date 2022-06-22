import React, { useState } from "react";
import moment from "moment";
import DateTime from "porabote/date-time";
import Datas from "porabote/datas";
import CalendarYear from "./calendar-year.js";
import CalendarContext from "./calendar-context";
import "./style.less";

const CalendarContainer = (props) => {

  const [yearStart, setYearStart] = useState(moment().year());
  const [years, setYears] = useState([yearStart]);
  const [pickedDateStart, setPickedDateStart] = useState(null);
  const [pickedDateFinish, setPickedDateFinish] = useState(null);
  let [periods, setPeriods] = useState(DateTime.convertPeriodsToDates(props.periods || {}));

  let onSelect = props.onSelect || (() => {});

  const onClick = (day, callback) => {

    let date = new Date(day.year, day.month, day.number);

    // If date not in a period
    if (!day.belongToPeriod) {
      if (!pickedDateStart) {
        setPickedDateStart(date);
        callback(true);
      } else {
        setPickedDateFinish(pickedDateStart, date);
        addPeriod(date);
      }
    } else {
      clickBySelectedDay(date, day.belongToPeriod);
    }
  }

  const clickByNotSelectedDate = (date, periodKey) => {
    if (
      date.getTime() == periods[periodKey].dateStart.getTime()
      || date.getTime() == periods[periodKey].dateFinish.getTime()
    ) {
      deletePeriod(periodKey);
    }
  }

  const clickBySelectedDay = (date, periodKey) => {
    if (
      date.getTime() == periods[periodKey].dateStart.getTime()
      || date.getTime() == periods[periodKey].dateFinish.getTime()
    ) {
      deletePeriod(periodKey);
    }
  }

  let addPeriod = (dateFinish) => {

    let pickedPeriod = (pickedDateStart < dateFinish) ?
      {dateStart: pickedDateStart, dateFinish} : {dateStart: dateFinish, dateFinish: pickedDateStart};

    periods[pickedDateStart.getTime()] = pickedPeriod;
    periods = Datas.sortObject(periods);
    setPeriods(periods);

    // todo merge periods
    for (let i = 0; i < length; i++) {

    }

    setPickedDateStart(null);
    setPickedDateFinish(null);

    let periodsAsStrings = DateTime.convertDatesPeriodsToStringFormat(periods);

    onSelect(periods, periodsAsStrings);
  }


  const deletePeriod = (periodKey) => {
    if ( periods[periodKey].markedToDelete) {
      delete periods[periodKey];
      let periodsAsStrings = DateTime.convertDatesPeriodsToStringFormat(periods);
      setPeriods(periods);
      onSelect(periods, periodsAsStrings);
    } else {
      periods[periodKey].markedToDelete = true;
    }

    setPickedDateStart(null);
    setPickedDateFinish(null);
  }

  return <CalendarContext.Provider value={{
    onClick,
    periods,
  }}>
    <div className="prb-calendar">
      {years.map((year, index) => {
        return  <CalendarYear key={index} number={year} />
      })}
    </div>
  </CalendarContext.Provider>
}

export default CalendarContainer;