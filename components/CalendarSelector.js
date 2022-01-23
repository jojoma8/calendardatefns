import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useEditUserDetailsContext } from "../contextProvider/EditUserDetailsContext";
import getWeekdayName from "../utilities/GetWeekdayName";
import WeekNames from "../utilities/Weeknames";

function CalendarSelector({
  setCalendar,
  updateState,
  setWeekday,
  setHoursList,
}) {
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

  const {
    issue,
    setIssue,
    doctor,
    setDoctor,
    doctorList,
    setDoctorList,
    bookingDate,
    setBookingDate,
    bookingTime,
    setBookingTime,
    workHoursList,
    setWorkHoursList,
    specialistClinicHours,
    setSpecialistClinicHours,
    specialistUID,
    setSpecialistUID,
    specialistHolidayList,
    setSpecialistHolidayList,
    specialistOnHolidayToggle,
    setSpecialistOnHolidayToggle,
    specialistAvailableHours,
    setSpecialistAvailableHours,
    bookingData,
    setBookingData,
    bookingOptions,
    setBookingOptions,
    doctorAccordionToggle,
    setDoctorAccordionToggle,
    dateAccordionToggle,
    setDateAccordionToggle,
    timeAccordionToggle,
    setTimeAccordionToggle,
  } = useEditUserDetailsContext();

  const [calendarDate, setCalendarDate] = useState(new Date());

  const selectNextMonth = () => {
    const nextMonth = addMonths(calendarDate, 1);
    // console.log(nextMonth);
    setCalendarDate(nextMonth);
  };

  const selectPreviousMonth = () => {
    const prevMonth = addMonths(calendarDate, -1);
    const currentDate = startOfToday();
    const dateComparison = compareAsc(prevMonth, currentDate);
    if (dateComparison < 0);
    else setCalendarDate(prevMonth);
    // console.log(prevMonth);
  };

  const daySelector = (day) => {
    const currentDate = startOfToday();
    const dateComparison = compareAsc(day, currentDate);
    if (dateComparison < 0);
    else
      setCalendarDate(day),
        setCalendar(day),
        updateState(day.toDateString()),
        setWeekday(getWeekdayName(calendarDate).substring(0, 3)),
        setHoursList(
          workHoursList[getWeekdayName(calendarDate).substring(0, 3)]
        ),
        setSpecialistAvailableHours(
          specialistClinicHours[getWeekdayName(calendarDate).substring(0, 3)]
        );
    console.log(
      "avial: " +
        specialistClinicHours[getWeekdayName(calendarDate).substring(0, 3)]
    );
    // console.log("weekDay: " + getWeekdayName(calendarDate).substring(0, 3));
    console.log("selected day: " + day.toDateString());
    console.log("holiday List: " + specialistHolidayList);
    const temp = specialistHolidayList.map((date) =>
      new Date(date).toDateString()
    );
    console.log("converted: " + temp);
    const check = temp.indexOf(day.toDateString());
    console.log("exists: " + check);
    if (check > -1) {
      setSpecialistOnHolidayToggle(true);
    } else setSpecialistOnHolidayToggle(false);
    console.log("holiday toggle" + specialistOnHolidayToggle);
  };

  function takeWeek(start = new Date()) {
    let date = startOfWeek(startOfDay(start));
    return function () {
      const week = [...Array(7)].map((_, i) => addDays(date, i));
      date = addDays(week[6], 1);
      return week;
    };
  }

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

  const monthGenerator = takeMonth(calendarDate);
  const data = monthGenerator();
  const weekGenerator = takeWeek();

  function dayColor(day) {
    if (!isSameMonth(day, calendarDate)) return "text-gray-400";
    if (isSameDay(day, calendarDate)) return "bg-red-400";
    if (isToday(day)) return "bg-red-200";
    // console.log(day);
  }

  function cornerClassName(weekIndex, dayIndex) {
    if (weekIndex !== data.length - 1) return;
    if (dayIndex === 0) return "rounded-bl-lg";
    if (dayIndex === 6) return "rounded-br-lg";
  }

  // console.log("apptDate: " + calendarDate.toDateString());

  // useEffect(() => {
  // setBookingDate(calendarDate);
  // const temp = bookingData;
  // temp.date = calendarDate.toDateString();
  // setBookingData(temp);
  // console.log("updatedBookingData: " + bookingData.date);
  // setApptDate(calendarDate);
  // setCalendar(calendarDate);
  // }, []);

  return (
    <div className="max-w-fit">
      {/* <div>{calendarDate.toDateString()}</div> */}
      <div className="flex px-2">
        <div>
          <ChevronLeftIcon
            className="h-6"
            onClick={() => selectPreviousMonth()}
            cursor="pointer"
          />
        </div>
        <h1 className="flex w-full items-center justify-center mb-2 text-xl">
          {format(calendarDate, "MMMM")} {format(calendarDate, "yyyy")}
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
    </div>
  );
}

export default CalendarSelector;
