function getWeekdayName(day) {
  const { getDay } = require("date-fns");

  if (getDay(day) === 0) {
    return "Sunday";
  }
  if (getDay(day) === 1) {
    return "Monday";
  }
  if (getDay(day) === 2) {
    return "Tuesday";
  }
  if (getDay(day) === 3) {
    return "Wednesday";
  }
  if (getDay(day) === 4) {
    return "Thursday";
  }
  if (getDay(day) === 5) {
    return "Friday";
  }
  if (getDay(day) === 6) {
    return "Saturday";
  }
}

export default getWeekdayName;
