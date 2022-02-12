import React from "react";
import { dateListToTimeList } from "../../utilities/TimeCalculations";

function WorkGrid({ weekDay = "Sun", doctorDetails, hoursData }) {
  const hourColor = (day, data) => {
    try {
      if (doctorDetails) {
        const list = dateListToTimeList(doctorDetails[0].schedule[weekDay]);
        if (list) {
          if (list.toString().includes(dateListToTimeList([data]).toString())) {
            return "bg-orange-200 border-solid border-2 border-indigo-500 border-dashed";
          }
        }
      }
    } catch (e) {}
  };

  return (
    <div>
      {hoursData.map((week, wi) =>
        week.map((day, di) => (
          <div
            key={day}
            cursor="pointer"
            className={`h-4 w-20 flex flex-col  
                 text-xs border-t border-l border-r border-gray-200 
                ${hourColor(weekDay, day.toUTCString())}
                    `}
          >
            {/* {format(day, "h:mm a")} */}
          </div>
        ))
      )}
    </div>
  );
}

export default WorkGrid;
