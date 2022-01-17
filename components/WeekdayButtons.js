import { useEffect } from "react";
import { useSelectedDateContext } from "../contextProvider/SelectedDateContext";
import getWeekdayName from "../utilities/GetWeekdayName";
import { selectedWeekDay } from "../utilities/TimeCalculations";

function WeekdayButtons({ day }) {
  const { getDay } = require("date-fns");
  const {
    editClinicHoursModal,
    setEditClinicHoursModal,
    hoursData,
    setHoursData,
    weekDaySelected,
    setWeekdaySelected,
  } = useSelectedDateContext();

  // const today = getWeekdayName(new Date()).substring(0, 3);
  // const test = getWeekdayName(day);
  // setWeekdaySelected(today);
  // console.log("test: " + weekDaySelected + " and " + day);
  // console.log(day);
  // console.log("weekday list " + { day });
  // console.log(selectedWeekDay(day, "Wed"));
  return (
    <div>
      <button
        className={`my-2 mx-1 py-2 px-3 rounded
        items-center justify-center 
       ${selectedWeekDay(day)}
       `}
        onClick={() => setWeekdaySelected(day)}
      >
        {" "}
        {day}
      </button>
    </div>
  );
}

export default WeekdayButtons;
