import React from "react";

function WeekHeader({ day, date }) {
  const { format, set, isSameMonth, isSameDay, isToday } = require("date-fns");

  function dayColor(day) {
    if (isToday(day)) return "bg-orange-400";
  }

  return (
    <div className="grow border-l ">
      <div className=" flex flex-col items-center ">
        {day === "Time" && <div className=" pb-1 text-xs">{day}</div>}
        {day === "Right" && <div className="pb-1 text-xs hidden">{day}</div>}
        {day !== "Time" && day !== "Right" && (
          <div className="pb-1 text-xs ">{day}</div>
        )}
        {day === "Sun" && (
          <div className={`${dayColor(date[0])}  py-1 rounded-full `}>
            {date[0].getDate()}
          </div>
        )}
        {day === "Mon" && (
          <div className={`${dayColor(date[0])}  py-1 rounded-full `}>
            {date[1].getDate()}
          </div>
        )}
        {day === "Tue" && (
          <div className={`${dayColor(date[0])}  py-1 rounded-full `}>
            {date[2].getDate()}
          </div>
        )}
        {day === "Wed" && (
          <div className={`${dayColor(date[0])}  py-1 rounded-full `}>
            {date[3].getDate()}
          </div>
        )}
        {day === "Thu" && (
          <div className={`${dayColor(date[0])}  py-1 rounded-full `}>
            {date[4].getDate()}
          </div>
        )}
        {day === "Fri" && (
          <div className={`${dayColor(date[0])}  py-1 rounded-full `}>
            {date[5].getDate()}
          </div>
        )}
        {day === "Sat" && (
          <div className={`${dayColor(date[0])}  py-1 rounded-full `}>
            {date[6].getDate()}
          </div>
        )}
        {day === "Left" && (
          <div className={`${dayColor(date[0])} py-1 rounded-full hidden `}>
            {date[6].getDate()}
          </div>
        )}
      </div>
    </div>
  );
}

export default WeekHeader;
