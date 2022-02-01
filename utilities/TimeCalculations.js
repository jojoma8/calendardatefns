import { useSelectedDateContext } from "../contextProvider/SelectedDateContext";

export const NextThirtyMinutes = (input) => {
  const { addMinutes } = require("date-fns");
  const today = new Date();
  const getDate = today.toDateString();
  const dateTime = getDate + " " + input;
  const nextThirtyMinutes = addMinutes(new Date(dateTime), 30);
  return nextThirtyMinutes;
};

export const ConvertToDate = (input) => {
  const today = new Date();
  const getDate = today.toDateString();
  const dateTime = getDate + " " + input;
  const date = new Date(dateTime);
  return date;
};

export const ConvertToTime = (input) => {
  const { format } = require("date-fns");
  const date = new Date(input);
  // console.log("date: " + date);
  if (input != null) return format(date, "hh:mm a");
};

export function HourListReader(input) {
  const { format, isEqual } = require("date-fns");
  let startList = [];
  let endList = [];
  //   console.log("length: " + input.length);

  if (input.length === 1) {
    startList = [input[0]];
    endList = [format(NextThirtyMinutes(input), "hh:mm a")];
  }
  if (input.length > 1) {
    startList = [input[0]];
    for (let i = 0; i < input.length - 1; i++) {
      if (!isEqual(ConvertToDate(input[i + 1]), NextThirtyMinutes(input[i]))) {
        startList.push(input[i + 1]);
        endList.push(format(NextThirtyMinutes(input[i]), "hh:mm a"));
      }
    }
    endList.push(format(NextThirtyMinutes(input[input.length - 1]), "hh:mm a"));
    // endList.push(format(NextThirtyMinutes(input[input.length - 1]), "hh:mm a"));
  }
  //   console.log("input: " + ConvertToDate(input[1]).getTime());
  //   console.log("this ran: " + NextThirtyMinutes(input[i]).getTime());
  //   console.log(
  //     "boolean: " + !isEqual(ConvertToDate(input[1]), NextThirtyMinutes(input[i]))
  //   );
  return { startList: startList, endList: endList };
}

export const HourRangeGenerator = (hoursList) => {
  const resultList = HourListReader(hoursList);
  const startList = resultList.startList;
  const endList = resultList.endList;
  // console.log("startList: " + startList);
  // console.log("endList: " + endList);
  // console.log("length: " + resultList.startList.length);

  const result = { start: startList, end: endList };
  // console.log("dict: " + result);
  return startList.map(function (item, index) {
    const endList2 = endList[index];
    return (
      <div key={index}>
        {item}
        {" to "}
        {endList2}
      </div>
    );
  });
};

export function ThirtyMinuteIntervalList(start = new Date()) {
  const { startOfHour, addMinutes, startOfDay } = require("date-fns");

  let date = startOfHour(startOfDay(start));
  return function () {
    const hours = [...Array(48)].map((_, i) => addMinutes(date, i * 30));
    return hours;
  };
}

// const hoursGenerator = takeHours();

export function GenerateHoursList(start = new Date()) {
  const { startOfHour, addMinutes, startOfDay, endOfDay } = require("date-fns");
  let hours = [];
  let date = start;

  function lastHourOfRange(range) {
    return range[range.length - 1][47];
  }

  function takeHours(start = new Date()) {
    let date = startOfHour(startOfDay(start));
    return function () {
      const hours = [...Array(48)].map((_, i) => addMinutes(date, i * 30));
      return hours;
    };
  }

  return function () {
    const hoursGen = takeHours(startOfDay(date));
    const endOfDayHour = addMinutes(startOfHour(endOfDay(start)), 30);
    hours.push(hoursGen());
    while (lastHourOfRange(hours) < endOfDayHour) {
      hours.push(hoursGen());
    }

    const range = hours;
    hours = [];
    date = addMinutes(lastHourOfRange(range), 30);

    return range;
  };
}

// export const hourColor = (data) => {
//   const {
//     selectedDate,
//     setSelectedDate,
//     hoursList,
//     setHoursList,
//     clinicHours,
//     setClinicHours,
//     weekDaySelected,
//     setWeekdaySelected,
//   } = useSelectedDateContext();
//   // if (clinicHours[weekDaySelected].includes(data)) {
//   //   return "bg-orange-400";
//   // }
// };

export const selectedWeekDay = (day) => {
  const { weekDaySelected, setWeekDaySelected } = useSelectedDateContext();
  // console.log(day === selectedDay);
  if (day === weekDaySelected) {
    // if (true) {
    // console.log("fx check: " + day + " " + weekDaySelected);
    return "bg-orange-400";
  }
};

// Change date to today but keep same time
export const convertToToday = (input) => {
  const today = new Date().toDateString();
  const inputTime = new Date(input).toTimeString();
  const combine = today + " " + inputTime;
  return new Date(combine).toUTCString();
};

export const updateDates = (obj) => {
  Object.keys(obj).forEach((key) => {
    const newList = obj[key].map((item) => {
      return convertToToday(item);
    });
    obj[key] = newList;
    // console.log("new: " + newList[2]);
  });
  // console.log(obj["Mon"][0]);
};

export const dateListToTimeList = (list) => {
  // converts past date into today but with same time
  const result = list.map((date) => {
    const time = new Date(date).toTimeString();
    const today = new Date().toDateString();
    const newDate = new Date(today + " " + time).toUTCString();
    return newDate;
  });
  return result;
};
