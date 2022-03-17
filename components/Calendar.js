import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useSelectedDateContext } from "../contextProvider/SelectedDateContext";
import { connectFirestoreEmulator } from "@firebase/firestore";
import getWeekdayName from "../utilities/GetWeekdayName";
import { GenerateHoursList } from "../utilities/TimeCalculations";
import { useAuth } from "../firebase";
import { handleClinicHoursEdit } from "../utilities/UserUtils";
import { useSignInContext } from "../contextProvider/SignInContext";

function Calendar() {
  const {
    startOfMonth,
    startOfWeek,
    endOfMonth,
    endOfWeek,
    addDays,
    addMonths,
    startOfDay,
    format,
    isSameMonth,
    isSameDay,
    isToday,
    isPast,
    getMonth,
    compareAsc,
    startOfToday,
    startOfHour,
    endOfDay,
    addHours,
    addMinutes,
    isSameHour,
    isSameMinute,
    startOfMinute,
    getDay,
  } = require("date-fns");

  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState([]);
  // const [hoursList, setHoursList] = useState([]);
  //   const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    selectedDate,
    setSelectedDate,
    hoursList,
    setHoursList,
    weekDaySelected,
    setWeekdaySelected,
  } = useSelectedDateContext();
  const currentUser = useAuth();
  const [loading, setLoading] = useState(false);
  const { editClinicHoursModal, setEditClinicHoursModal } =
    useSelectedDateContext();

  function WeekNames() {
    function cornerClassName(i) {
      if (i === 0) return "rounded-tl-lg";
      if (i === 6) return "rounded-tr-lg";
    }
    return (
      <div className="grid grid-cols-7">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName, i) => (
          <div
            key={dayName}
            className={`bg-blue-300 h-10 w-10 flex items-center justify-center 
            border border-blue-200 ${cornerClassName(i)}`}
          >
            {dayName}
          </div>
        ))}
      </div>
    );
  }
  // **************** Hour ***************
  const startOfDayHour = startOfHour(startOfDay(selectedDate));
  const endOfDayHour = addMinutes(startOfHour(endOfDay(selectedDate)), 30);

  // function takeHours(start = new Date()) {
  //   let date = startOfHour(startOfDay(start));
  //   return function () {
  //     const hours = [...Array(48)].map((_, i) => addMinutes(date, i * 30));
  //     // date = addMinutes(hours[43], 60);
  //     return hours;
  //   };
  // }

  // const hoursGenerator = takeHours();

  // function takeHours2(start = new Date()) {
  //   let hours = [];
  //   let date = start;

  //   function lastHourOfRange(range) {
  //     return range[range.length - 1][47];
  //   }

  //   return function () {
  //     const hoursGen = takeHours(startOfDay(date));
  //     const endOfDayHour = addMinutes(startOfHour(endOfDay(selectedDate)), 30);
  //     hours.push(hoursGen());
  //     while (lastHourOfRange(hours) < endOfDayHour) {
  //       hours.push(hoursGen());
  //     }

  //     const range = hours;
  //     hours = [];
  //     date = addMinutes(lastHourOfRange(range), 30);

  //     return range;
  //   };
  // }

  // const hourGenerator = takeHours2(selectedDate);

  // useEffect(async () => {
  const hourGenerator = GenerateHoursList();
  const hoursData = hourGenerator();
  // setHoursData(hourGenerator());
  // console.log(hoursData);
  // }, []);

  useEffect(() => {
    const today = getWeekdayName(new Date()).substring(0, 3);
    setWeekdaySelected(() => today);
    // console.log("effect: ");
    // console.log(today);
  }, []);

  // useEffect(() => {
  //   console.log("effect triggered: " + hoursList);
  // }, [hoursList]);

  const addHourToList = (date) => {
    if (!hoursList.includes(date)) {
      setHoursList((oldArray) => [...oldArray, date]);
    }
    if (hoursList.includes(date)) {
      setHoursList(hoursList.filter((item) => item !== date));
    }
    console.log("hoursList: " + hoursList);
  };

  const hourColor = (data) => {
    if (hoursList.includes(data)) {
      return "bg-orange-400";
    }
  };

  // **************** Calendar ***************
  //   useEffect(() => {
  //   const selectedDate = new Date();
  const startDate = startOfWeek(startOfMonth(selectedDate));
  const endDate = endOfWeek(endOfMonth(selectedDate));
  // console.log(endDate);

  function takeWeek(start = new Date()) {
    let date = startOfWeek(startOfDay(start));
    return function () {
      const week = [...Array(7)].map((_, i) => addDays(date, i));
      date = addDays(week[6], 1);
      return week;
    };
  }

  const weekGenerator = takeWeek();
  //   console.log(weekGenerator());

  function takeMonth(start = new Date()) {
    let month = [];
    let date = start;

    function lastDayOfRange(range) {
      return range[range.length - 1][6];
    }

    return function () {
      const weekGen = takeWeek(startOfMonth(date));
      const endDate = startOfDay(endOfWeek(endOfMonth(date)));
      month.push(weekGen());
      while (lastDayOfRange(month) < endDate) {
        month.push(weekGen());
      }

      const range = month;
      month = [];
      date = addDays(lastDayOfRange(range), 1);

      return range;
    };
  }

  //   setCalendar(monthGenerator());
  //   }, []);

  const monthGenerator = takeMonth(selectedDate);
  const data = monthGenerator();
  // console.log(data);

  function dayColor(day) {
    if (!isSameMonth(day, selectedDate)) return "text-gray-400";
    if (isSameDay(day, selectedDate)) return "bg-red-400";
    if (isToday(day)) return "bg-red-200";
    // console.log(day);
  }

  //   function todayDayColor(day) {
  //     if (isToday(day)) return "bg-red-400";
  //   }

  function cornerClassName(weekIndex, dayIndex) {
    if (weekIndex !== data.length - 1) return;
    if (dayIndex === 0) return "rounded-bl-lg";
    if (dayIndex === 6) return "rounded-br-lg";
  }

  const selectNextMonth = () => {
    const nextMonth = addMonths(selectedDate, 1);
    // console.log(nextMonth);
    setSelectedDate(nextMonth);
  };

  const selectPreviousMonth = () => {
    const prevMonth = addMonths(selectedDate, -1);
    const currentDate = startOfToday();
    const dateComparison = compareAsc(prevMonth, currentDate);
    if (dateComparison < 0);
    else setSelectedDate(prevMonth);
    // console.log(prevMonth);
  };

  const daySelector = (day) => {
    const currentDate = startOfToday();
    const dateComparison = compareAsc(day, currentDate);
    if (dateComparison < 0);
    else setSelectedDate(day);
  };

  // const getWeekdayName = (day) => {
  //   if (getDay(day) === 3) {
  //     return "Wed";
  //   }
  // };

  const manipulateDates = () => {
    const today = new Date();
    const getDate = today.toDateString();
    const getTime = today.toTimeString();
    const time = "9:30 PM";
    const dateAndTime = getDate + " " + time;
    console.log("today: " + today);
    console.log("getDate: " + today.toDateString());
    // console.log("date: " + new Date("01 January 2000 9:30 PM"));
    console.log("date: " + new Date(getDate));
    console.log("date and time : " + new Date(dateAndTime));
  };

  // const getHoursBetweenDates = () => {
  const startTime = "1:00 AM";
  const endTime = "3:00 AM";

  const today = new Date();
  const getDate = today.toDateString();

  const startTimeDate = getDate + " " + startTime;
  const endTimeDate = getDate + " " + endTime;

  let listOfHoursTest = [];
  listOfHoursTest.push(startTimeDate);
  const nextThirtyMins = addMinutes(new Date(startTimeDate), 30);

  function hourToUTCDateConverter(hour, date = new Date()) {
    return new Date(date.toDateString() + " " + hour).toUTCString();
  }
  // console.log("test: " + new Date(startTimeDate).toUTCString());
  // console.log("function: " + hourToUTCDateConverter(startTime));
  // console.log(nextThirtyMins.toUTCString());
  // console.log(
  //   new Date(startTimeDate).toUTCString() < nextThirtyMins.toUTCString()
  // );
  // console.log("startOfList: " + listOfHoursTest);

  // hourListGenerator();
  function hourListGenerator() {
    while (
      new Date(startTimeDate).toUTCString() <
      addMinutes(new Date(endTimeDate), -30).toUTCString()
    ) {
      console.log("loop ran");
      startTimeDate = addMinutes(new Date(startTimeDate), 30);
      listOfHoursTest.push(new Date(startTimeDate).toUTCString());
    }
    console.log("newList: " + listOfHoursTest);
  }

  const workingHoursJojo = {
    Monday: ["1:00 AM", "1:30 AM"],
    Thursday: ["9:00 AM", "9:30 AM"],
  };
  // console.log(workingHoursJojo.mon);
  const weekDayName = getWeekdayName(new Date().getDay());
  // console.log(weekDayName);
  if (weekDayName === "Thursday") {
    // console.log(workingHoursJojo.Thursday);
  }

  const handleSaveClinicHoursChanges = () => {
    const schedule = { mon: hoursList };
    handleClinicHoursEdit(currentUser?.uid, schedule);
  };

  return (
    <div className="bg-white box-border m-8 ">
      {/* <div>{JSON.stringify(data)}</div> */}
      {/* <div className="grid grid-cols-2"> */}
      <div className="grid grid-flow-col grid-rows-12">
        {hoursData.map((week, wi) =>
          week.map((day, di) => (
            <div
              key={day}
              cursor="pointer"
              onClick={() => {
                // addHourToList(format(day, "hh:mm a"));
                addHourToList(
                  // Intl.DateTimeFormat("en-GB", {
                  //   dateStyle: "full",
                  //   timeStyle: "long",
                  // }).format(day)
                  day.toUTCString()
                );
              }}
              className={`h-10 w-25 m-0.5 flex items-center justify-center
                    border border-blue-200 ${hourColor(day.toUTCString())}
                     `}
            >
              {format(day, "hh:mm a")}
            </div>
          ))
        )}
      </div>
      {/* <div>list {hoursList}</div> */}
      <div>
        Today is {getWeekdayName(selectedDate)} {format(selectedDate, "dd")}{" "}
        {format(selectedDate, "MMMM")} {format(selectedDate, "yyyy")}
      </div>
      <div className="flex">
        <div className="block ">
          <div className="flex px-2">
            <div>
              <ChevronLeftIcon
                className="h-6"
                onClick={() => selectPreviousMonth()}
                cursor="pointer"
              />
            </div>
            <h1 className="flex w-full items-center justify-center mb-2 text-xl">
              {format(selectedDate, "MMMM")} {format(selectedDate, "yyyy")}
            </h1>
            <div>
              <ChevronRightIcon
                className="h-6"
                onClick={() => selectNextMonth()}
                cursor="pointer"
              />
            </div>
          </div>
          <WeekNames />
          <div className="grid grid-cols-7">
            {data.map((week, wi) =>
              week.map((day, di) => (
                <div
                  key={day}
                  //   onClick={() => setSelectedDate(day)}
                  onClick={() => daySelector(day)}
                  className={`h-10 w-10 flex items-center justify-center 
                    border border-blue-200  ${dayColor(day)}
                    ${cornerClassName(wi, di)}`}
                >
                  {format(day, "dd")}
                </div>
              ))
            )}
          </div>
          <div>
            <button
              className="btn hover:bg-blue-300 transition-all active:scale-95"
              disabled={loading || !currentUser}
              onClick={() => handleSaveClinicHoursChanges()}
            >
              Save Changes..
            </button>
          </div>
          <div>Mon</div>
          <div>
            {hoursList.sort().map((data) => (
              <div key={data}>{format(Date.parse(data), "hh:mm a")}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
