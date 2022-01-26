import { useSelectedDateContext } from "../contextProvider/SelectedDateContext";
import {
  ConvertToTime,
  HourRangeGenerator,
} from "../utilities/TimeCalculations";

function ClinicHoursSummary({ day, schedule }) {
  // const {
  //   selectedDate,
  //   setSelectedDate,
  //   hoursList,
  //   setHoursList,
  //   weekDaySelected,
  //   setWeekdaySelected,
  //   clinicHours,
  //   setClinicHours,
  // } = useSelectedDateContext();

  function handleClinicHoursSummary(list) {
    const sortedList = list.sort();
    const newList = sortedList.map(function (e) {
      return ConvertToTime(e);
    });
    // return newList
    // console.log("newList: " + newList);
    return newList;
  }

  return (
    <div
      className="flex border border-solid border-stone-400 
    text-sm font-semibold"
    >
      <div className="ml-2 w-10">{day}</div>
      <div className="ml-1 mr-2">
        {/* {workHoursRange(workHoursList[0], workHoursList[0])} */}
        {/* {HourRangeGenerator(handleClinicHoursSummary(clinicHours[day]))} */}
        {typeof schedule !== "undefined" &&
          HourRangeGenerator(handleClinicHoursSummary(schedule[day]))}
      </div>
    </div>
  );
}

export default ClinicHoursSummary;
