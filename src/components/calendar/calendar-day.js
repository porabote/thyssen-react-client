import React, {useContext, useEffect, useState} from "react";
import CalendarContext from "./calendar-context";

const CalendarDay = (props) => {

  useEffect(() => {
    setIsSelected(props.isSelected);
  }, [props]);

  const [isSelected, setIsSelected] = useState(props.isSelected);
  const [isMarked, setIsMarked] = useState(false);
  const [isMarkedToDelete, setIsMarkedToDelete] = useState(false);

  const context = useContext(CalendarContext);

  const onClick = () => {
    // if (isSelected) {
    //   setIsMarkedToDelete(true);
    // }
    // setIsMarked((isMarked ? false : true));
    // context.onClick(props, clickCallback);
  }

  let clickCallback = () => {
    setIsSelected(true);
    setIsMarked(true);
  }

  let className = isSelected ? "prb-calendar-year-months-month-day selected" : "prb-calendar-year-months-month-day";
  if (isMarked) className = "prb-calendar-year-months-month-day marked";
  if (isMarkedToDelete) className = "prb-calendar-year-months-month-day marked_delete";

  return <div
    className={className}
    onClick={onClick}
  >
    {props.number}
  </div>

}

export default CalendarDay;