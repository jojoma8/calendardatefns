import React from "react";
import { dateListToTimeList } from "../../utilities/TimeCalculations";

function WorkGrid({
  weekDay = "Sun",
  // doctorDetails,
  hoursData,
  //   index = 0,
  // selectedDoctorIndexList = [],
  filteredDoctorDetails = [],
}) {
  //   const index = doctorDetails
  //     .map(function (e) {
  //       return e.name;
  //     })
  //     .indexOf("rolf");
  //   console.log("index: " + index);

  const hourColor = (day, data, index) => {
    try {
      // if (doctorDetails[index]) {
      if (filteredDoctorDetails[index]) {
        // const list = dateListToTimeList(doctorDetails[index].schedule[weekDay]);
        const list = dateListToTimeList(
          filteredDoctorDetails[index].schedule[weekDay]
        );
        if (list) {
          if (list.toString().includes(dateListToTimeList([data]).toString())) {
            if (index === "0") {
              return "bg-orange-200 ";
            }
            if (index === "1") {
              return "bg-blue-200";
            }
            if (index === "2") {
              return "bg-lime-200";
            }
            if (index === "3") {
              return "bg-green-200";
            }
            if (index === "4") {
              return "bg-violet-200";
            }
            if (index === "5") {
              return "bg-rose-200";
            }
            if (index === "6") {
              return "bg-teal-200";
            }
            if (index === "7") {
              return "bg-amber-200";
            }
            if (index === "8") {
              return "bg-purple-200";
            }
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
      {/* {selectedDoctorIndexList.length > 0 && ( */}
      {filteredDoctorDetails.length > 0 && (
        <div className="grow">
          {hoursData.map((week, wi) =>
            week.map((day, di) => (
              <div
                key={day}
                cursor="pointer"
                className={`h-4 flex flex-col text-xs 
                 border border-t-gray-200 border-r-0 border-b-0 border-l-gray-200
                ${hourColor(
                  weekDay,
                  day.toUTCString(),
                  // selectedDoctorIndexList[0]
                  "0"
                )}
                    `}
              ></div>
            ))
          )}
        </div>
      )}
      {/* {selectedDoctorIndexList.length > 1 && ( */}
      {filteredDoctorDetails.length > 1 && (
        <div className="grow">
          {hoursData.map((week, wi) =>
            week.map((day, di) => (
              <div
                key={day}
                cursor="pointer"
                className={`h-4 flex flex-col text-xs 
                border border-t-1 border-b-0 border-l-0 border-r-0 border-gray-200 
                ${hourColor(
                  weekDay,
                  day.toUTCString(),
                  // selectedDoctorIndexList[1]
                  "1"
                )}
                    `}
              ></div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default WorkGrid;
