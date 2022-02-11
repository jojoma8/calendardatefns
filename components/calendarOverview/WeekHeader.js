import React from "react";

function WeekHeader({ day, date }) {
  const { format, set, isSameMonth, isSameDay, isToday } = require("date-fns");

  function dayColor(day) {
    if (isToday(day)) return "bg-orange-400";
  }

  return (
    <div className="w-12 flex flex-col items-center">
      <div className="pb-1 text-base">{day}</div>
      {day === "Sun" && (
        <div className={`${dayColor(date[0])} px-3 py-1 rounded-full `}>
          {date[0].getDate()}
        </div>
      )}
      {day === "Mon" && (
        <div className={`${dayColor(date[1])} px-3 py-1 rounded-full `}>
          {date[1].getDate()}
        </div>
      )}
      {day === "Tue" && (
        <div className={`${dayColor(date[0])} px-3 py-1 rounded-full `}>
          {date[2].getDate()}
        </div>
      )}
      {day === "Wed" && (
        <div className={`${dayColor(date[0])} px-3 py-1 rounded-full `}>
          {date[3].getDate()}
        </div>
      )}
      {day === "Thu" && (
        <div className={`${dayColor(date[0])} px-3 py-1 rounded-full `}>
          {date[4].getDate()}
        </div>
      )}
      {day === "Fri" && (
        <div className={`${dayColor(date[0])} px-3 py-1 rounded-full `}>
          {date[5].getDate()}
        </div>
      )}
      {day === "Sat" && (
        <div className={`${dayColor(date[0])} px-3 py-1 rounded-full `}>
          {date[6].getDate()}
        </div>
      )}
    </div>
  );
}

export default WeekHeader;
