import React from "react";
import { dateListToTimeList } from "../../utilities/TimeCalculations";

function WorkGrid({ weekDay = "Sun", doctorDetails, hoursData, index = 0 }) {
  //   const index = doctorDetails
  //     .map(function (e) {
  //       return e.name;
  //     })
  //     .indexOf("rolf");
  //   console.log("index: " + index);

  const hourColor = (day, data) => {
    try {
      if (doctorDetails[index]) {
        const list = dateListToTimeList(doctorDetails[index].schedule[weekDay]);
        if (list) {
          if (list.toString().includes(dateListToTimeList([data]).toString())) {
            return "bg-orange-200 border-solid border-2 border-indigo-500 border-dashed";
          }
        }
      }
    } catch (e) {
      console.log("Work Grid Error" + e);
      return;
    }
  };

  return (
    <div className="grow flex flex-row">
      <div className="grow">
        {hoursData.map((week, wi) =>
          week.map((day, di) => (
            <div
              key={day}
              cursor="pointer"
              className={`h-4 flex flex-col  
                 text-xs border-t border-l  border-gray-200 
                ${hourColor(weekDay, day.toUTCString())}
                    `}
            ></div>
          ))
        )}
      </div>
      <div className="grow">
        {hoursData.map((week, wi) =>
          week.map((day, di) => (
            <div
              key={day}
              cursor="pointer"
              className={`h-4 flex flex-col  
                 text-xs border-t border-l  border-gray-200 
                ${hourColor(weekDay, day.toUTCString())}
                    `}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default WorkGrid;
