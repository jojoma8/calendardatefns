import { useSignInContext } from "../contextProvider/SignInContext";
import db, { useAuth } from "../firebase";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useSelectedDateContext } from "../contextProvider/SelectedDateContext";
import WeekNames from "../utilities/Weeknames";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { handleHolidayUpdate } from "../utilities/UserUtils";
import { ConvertToTime } from "../utilities/TimeCalculations";

function HolidaysModal() {
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
  const currentUser = useAuth();
  const { editHolidaysModal, setEditHolidaysModal } = useSignInContext();
  const {
    // selectedDate,
    // setSelectedDate,
    hoursList,
    setHoursList,
    weekDaySelected,
    setWeekdaySelected,
    holidaysData,
    setHolidaysData,
  } = useSelectedDateContext();

  const [selectedHolidayDate, setSelectedHolidayDate] = useState(new Date());
  const [holidayDatesList, setHolidayDatesList] = useState([]);

  const [loading, setLoading] = useState(false);

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

  const monthGenerator = takeMonth(selectedHolidayDate);
  const data = monthGenerator();
  const weekGenerator = takeWeek();

  function dayColor(day) {
    if (!isSameMonth(day, selectedHolidayDate)) return "text-gray-400";
    if (isSameDay(day, selectedHolidayDate)) return "bg-red-400";
    if (isToday(day)) return "bg-red-200";
    // console.log(day);
  }

  function cornerClassName(weekIndex, dayIndex) {
    if (weekIndex !== data.length - 1) return;
    if (dayIndex === 0) return "rounded-bl-lg";
    if (dayIndex === 6) return "rounded-br-lg";
  }

  const selectNextMonth = () => {
    const nextMonth = addMonths(selectedHolidayDate, 1);
    // console.log(nextMonth);
    setSelectedHolidayDate(nextMonth);
  };

  const selectPreviousMonth = () => {
    const prevMonth = addMonths(selectedHolidayDate, -1);
    const currentDate = startOfToday();
    const dateComparison = compareAsc(prevMonth, currentDate);
    if (dateComparison < 0);
    else setSelectedHolidayDate(prevMonth);
    // console.log(prevMonth);
  };

  const daySelector = (day) => {
    const currentDate = startOfToday();
    const dateComparison = compareAsc(day, currentDate);
    if (dateComparison < 0);
    else setSelectedHolidayDate(day);
  };

  function handleUpdateHolidayDateList() {
    const selected = selectedHolidayDate;
    if (!holidayDatesList.includes(startOfDay(selected).toUTCString())) {
      console.log("add was ran");
      addHolidayDate();
    } else {
      console.log("nothing");
    }
  }

  function addHolidayDate() {
    let data = holidayDatesList;
    const selected = selectedHolidayDate;
    const day = new startOfDay(selected).toUTCString();
    if (!holidayDatesList.includes(startOfDay(selected).toUTCString())) {
      setHolidayDatesList((oldArray) => [...oldArray, day]);
    }
    // console.log(holidayDatesList);
  }

  function removeHolidayDate() {
    const data = holidayDatesList;
    const selected = selectedHolidayDate;
    const day = startOfDay(selected).toUTCString();
    if (holidayDatesList.includes(startOfDay(selected).toUTCString())) {
      const filteredList = data.filter((item) => item !== day);
      setHolidayDatesList(filteredList);
    }
  }

  function createObj() {
    const list = holidayDatesList;
    const listObjKeys = [];
    const listObjValues = [];
    // console.log("start: " + list);
    if (list.length > 0) {
      const yyyy = format(new Date(holidayDatesList[0]), "yyyy");
      // console.log(yyyy);
      const holidayObject = {};
      for (const key of list) {
        const yyyy = format(new Date(key), "yyyy");
        holidayObject[yyyy] = [];
      }
      for (const key of list) {
        const yyyy = format(new Date(key), "yyyy");
        holidayObject[yyyy].push(key);
      }
      listObjKeys = Object.keys(holidayObject);
      listObjValues = Object.values(holidayObject);
      console.log("obj: " + listObjValues);
    }
    holidayListLoop(listObjKeys, listObjValues);
  }

  function holidayListLoop(keys, values) {
    console.log("keys: " + keys.length);
    for (let i = 0; i < keys.length; i++) {
      handleUpdateHolidayDetails(keys[i], values[i]);
      // console.log(values[i]);
    }
  }

  async function handleUpdateHolidayDetails(year, list) {
    // const year = format(selectedHolidayDate, "yyyy");
    // const docName = year + "-" + currentUser.uid;
    const docName = currentUser.uid;
    // const day = selectedHolidayDate.toUTCString();
    // let holidayDate = {};
    // holidayDate[day] = [];

    setLoading(true);
    try {
      // await handleHolidayUpdate(docName, holidayDate);
      await handleHolidayUpdate(docName, list);
    } catch {
      alert("Error");
    }
    setLoading(false);
    // console.log(day);
  }

  // const fetchHolidayData = async () => {
  //   const collectionRef = collection(db, "holidays");

  //   const q = query(collectionRef);
  //   const unsub = onSnapshot(q, (snapshot) =>
  //     setHolidayDatesList(
  //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].date
  //     )
  //   );
  //   return unsub;
  // };

  const fetchHolidayData = async () => {
    if (currentUser) {
      // if (docRef.exists) {
      // console.log("this ran");
      onSnapshot(doc(db, "holidays", currentUser?.uid), (doc) => {
        console.log("currentData: " + doc.data());
        if (!doc.data() === undefined) {
          setHolidayDatesList(doc.data().date);
          // console.log("this ran");
        }
      });
      // }
    }
  };

  // console.log("holidays:  " + holidaysData);
  // const getHolidayDates = async () => {
  //   const docRef =  doc(db, "holidays", currentUser?.uid);
  //   // const docSnap = await getDoc(docRef);
  //   // setHolidayDatesList(docSnap.data().date);
  // };

  useEffect(async () => {
    // let test = currentUser.uid;
    // console.log("uid: " + test);
    // fetchHolidayData();
    // getHolidayDates();
    setHolidayDatesList(holidaysData);
  }, [editHolidaysModal]);

  // let test = currentUser.uid;
  // console.log("uid: " + test);
  // console.log("holidayData: " + holidayDatesList);

  // HOW TO SORT DATES
  function sortDateList(list) {
    const newList = list.map(function (e) {
      return format(new Date(e), "yyyy-MM-dd");
    });
    const sortedList = newList.sort();
    // return newList
    // console.log("newList: " + newList);
    return sortedList;
  }

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center 
        justify-center z-50 bg-opacity-70 w-screen"
      onClick={() => {
        setEditHolidaysModal(false);
      }}
    >
      <div
        className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="headerText text-3xl">Holiday Details</h3>
          {/* <p className="text-gray-600 pt-2">Choose sign in method</p> */}
        </section>
        <section className="mt-2">
          <div className="flex flex-col">
            <div>{currentUser?.displayName}</div>
            <div>
              {/* THIS SECTION JUST TO REFRESH THE STATE */}
              <div className="hidden">{holidayDatesList}</div>
              {/* THIS SECTION JUST TO REFRESH THE STATE */}
              <div className="font-semibold my-2">Booked Holidays</div>
              <div>
                {holidayDatesList.map((day) => (
                  <div key={day}>{format(new Date(day), "E dd MMM yyyy")}</div>
                ))}
              </div>
            </div>
            <div className="flex px-2">
              <div>
                <ChevronLeftIcon
                  className="h-6"
                  onClick={() => selectPreviousMonth()}
                  cursor="pointer"
                />
              </div>
              <h1 className="flex w-full items-center justify-center mb-2 text-xl">
                {format(selectedHolidayDate, "MMMM")}{" "}
                {format(selectedHolidayDate, "yyyy")}
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
              <div>
                Selected date: {format(selectedHolidayDate, "E dd-MMMM-yyyy")}
              </div>
              <div className="flex justify-evenly">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white
                            font-bold py-2 
                            rounded shadow-lg hover:shadow-xl 
                            transition duration-200 mt-2 w-32"
                  onClick={() => {
                    addHolidayDate();
                  }}
                >
                  Add Date
                </button>
                <button
                  className="bg-red-600 hover:bg-blue-700 text-white
                            font-bold py-2 
                            rounded shadow-lg hover:shadow-xl 
                            transition duration-200 mt-2 w-32"
                  onClick={() => {
                    removeHolidayDate();
                  }}
                >
                  Remove Date
                </button>
              </div>
              <div className="flex mt-5 ">
                <div>Duration:</div>
                <div>
                  <div>Whole day</div>
                  {/* <div>Specific time</div> */}
                </div>
              </div>
            </div>
            <button
              className="mt-5 btn"
              onClick={() => {
                createObj();
              }}
            >
              Save Changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HolidaysModal;
