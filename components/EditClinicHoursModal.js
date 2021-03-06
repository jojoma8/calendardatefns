import { useContext, useEffect, useRef, useState } from "react";
import {
  login,
  signInWithGoogle,
  signup,
  updateUserName,
  useAuth,
} from "../firebase";
import WeekdayButtons from "./WeekdayButtons";
import {
  ConvertToDate,
  ConvertToTime,
  convertToToday,
  dateListToTimeList,
  GenerateHoursList,
  HourListReader,
  HourRangeGenerator,
  NextThirtyMinutes,
  selectedWeekDay,
  updateDates,
} from "../utilities/TimeCalculations";
import { useSignInContext } from "../contextProvider/SignInContext";
import { useSelectedDateContext } from "../contextProvider/SelectedDateContext";
import { handleClinicHoursEdit } from "../utilities/UserUtils";
import ClinicHoursSummary from "./ClinicHoursSummary";
import { motion, AnimatePresence } from "framer-motion";

function EditClinicHoursModal() {
  const { format, set, isSameMinute } = require("date-fns");

  const {
    signInModal,
    setSignInModal,
    signUpModal,
    setSignUpModal,
    forgotPasswordModal,
    setForgotPasswordModal,
    currentUserID,
    setCurrentUserID,
    amendClinicHoursModal,
    setAmendClinicHoursModal,
    editClinicHoursModal,
    setEditClinicHoursModal,
  } = useSignInContext();

  const {
    selectedDate,
    setSelectedDate,
    hoursList,
    setHoursList,
    weekDaySelected,
    setWeekdaySelected,
    clinicHours,
    setClinicHours,
  } = useSelectedDateContext();
  const currentUser = useAuth();

  const hourGenerator = GenerateHoursList();
  const hoursData = hourGenerator();
  // const [clinicHours, setClinicHours] = useState({
  //   Mon: [],
  //   Tue: [],
  //   Wed: [],
  //   Thu: [],
  //   Fri: [],
  //   Sat: [],
  //   Sun: [],
  // });
  const [clinicHoursList, setClinicHoursList] = useState([]);

  // useEffect(() => {
  const hours = clinicHours;
  // console.log("hours ran: " + clinicHours);

  // REMOVED 26JAN 2022
  // updateDates(hours);

  // console.log(
  //   "clinicHours: " +
  //     new Date(clinicHours[weekDaySelected][0]).toLocaleTimeString("en-US", {
  //       hour: "numeric",
  //       minute: "numeric",
  //     })
  // );

  // const dateListToTimeListLocal = (data) => {
  //   // console.log("test: " + data);
  //   const test = data.map((date) => {
  //     return new Date(date).toLocaleTimeString("en-US", {
  //       hour: "numeric",
  //       minute: "numeric",
  //     });
  //   });
  //   return test;
  //   // console.log("test2: " + test);
  // };

  // console.log(
  //   "clinicHoursList " +
  //     clinicHours[weekDaySelected].map((date) => {
  //       return new Date(date).toLocaleTimeString("en-US", {
  //         hour: "numeric",
  //         minute: "numeric",
  //       });
  //     })
  // );

  // const time = new Date(clinicHours[weekDaySelected][0]).toTimeString();
  // const today = new Date().toDateString();
  // const newDate = new Date(today + " " + time);

  // console.log(
  //   "clinicHoursList " + dateListToTimeList(clinicHours[weekDaySelected])
  // );

  // console.log("weekdaySelected: " + weekDaySelected);
  const hourColor = (data) => {
    const tempList = dateListToTimeList(clinicHours[weekDaySelected]);

    if (tempList) {
      if (tempList.toString().includes(dateListToTimeList([data]).toString())) {
        return "bg-orange-400";
      }
    }
  };

  // function handleUpdateClinicHoursList(data) {
  //   // console.log("handle function ran " + data);
  //   if (!clinicHours[weekDaySelected].includes(data)) {
  //     console.log("add was ran");
  //     addHourToList(data);
  //   } else {
  //     removeHourToList(data);
  //   }
  // }

  function handleUpdateClinicHoursList(data) {
    // console.log("handle function ran " + data);
    const tempList = dateListToTimeList(
      clinicHours[weekDaySelected]
    ).toString();

    const tempData = dateListToTimeList([data]).toString();

    if (!tempList.includes(tempData)) {
      console.log("add was ran");
      addHourToList(data);
    } else {
      removeHourToList(data);
    }
  }

  const addHourToList = (date, day) => {
    const data = clinicHours;
    data[weekDaySelected].push(date);
    setClinicHours(() => {
      return data;
    });
    setClinicHoursList((oldArray) => [...oldArray, date]);
    console.log("clinicHours Thu:" + clinicHours[weekDaySelected]);
    console.log("clinicHoursList Thu:" + clinicHoursList);
  };

  // const removeHourToList = (date, day) => {
  //   console.log("remove was ran");
  //   setClinicHours((prev) => {
  //     const data = clinicHours;
  //     const filteredList = clinicHours[weekDaySelected].filter(
  //       (item) => item !== date
  //     );
  //     const newData = prev;
  //     // newState[weekDaySelected] = filteredList;
  //     newData[weekDaySelected] = filteredList;
  //     return { ...newData };
  //   });
  //   // console.log("modified obj:" + data[weekDaySelected]);
  // };

  const removeHourToList = (date, day) => {
    console.log("remove was ran");

    const newList = clinicHours[weekDaySelected].map((date) => {
      return dateListToTimeList([date]).toString();
    });

    console.log("newList: " + newList);

    setClinicHours((prev) => {
      const data = clinicHours;
      // const filteredList = clinicHours[weekDaySelected].filter(
      const filteredList = newList.filter(
        (item) => item !== dateListToTimeList([date]).toString()
      );
      const newData = prev;
      // newState[weekDaySelected] = filteredList;
      newData[weekDaySelected] = filteredList;
      return { ...newData };
    });
    // console.log("modified obj:" + data[weekDaySelected]);
  };

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.5,
        type: "spring",
        // damping: 25,
        // stiffness: 500,
      }}
      className="flex fixed  md:px-0 bg-gray-200 top-0
        items-center justify-center z-50 bg-opacity-70 w-full
        h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ y: -50, opacity: 0, transition: { duration: 0.2 } }}
        transition={{
          duration: 0.5,
          type: "spring",
          // damping: 25,
          // stiffness: 500,
        }}
        className="bg-white max-w-lg p-8 md:p-12 
          rounded-lg shadow-2xl h-5/6
          flex flex-col "
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="headerText text-3xl">Edit Clinic Hours</h3>
          {/* <p className="text-gray-600 pt-2">Choose sign in method</p> */}
        </section>
        <section className="my-2">
          {/* <div className="flex flex-col"> */}
          <div>
            <div className="font-semibold text-xl">
              {currentUser?.displayName}
            </div>
          </div>

          <div>
            <div className="text-md font-semibold my-2">Clinic Hours</div>
            <div className="mt-2">
              <div className="">
                <ClinicHoursSummary day={"Mon"} schedule={clinicHours} />
                <ClinicHoursSummary day={"Tue"} schedule={clinicHours} />
                <ClinicHoursSummary day={"Wed"} schedule={clinicHours} />
                <ClinicHoursSummary day={"Thu"} schedule={clinicHours} />
                <ClinicHoursSummary day={"Fri"} schedule={clinicHours} />
                <ClinicHoursSummary day={"Sat"} schedule={clinicHours} />
                <ClinicHoursSummary day={"Sun"} schedule={clinicHours} />
              </div>
            </div>
          </div>
        </section>
        {/* THIS SECTION JUST TO REFRESH THE STATE */}
        {/* <div className="hidden">{clinicHoursList}</div> */}
        {/* REMOVED 26JAN 2022 */}
        {/* <div className="hidden">{clinicHours["Sat"]}</div> */}
        {/* THIS SECTION JUST TO REFRESH THE STATE */}
        {/* <div className="overflow-hidden overflow-y-scroll"> */}
        <div className="flex flex-row items-center">
          <WeekdayButtons day={"Mon"} />
          <WeekdayButtons day={"Tue"} />
          <WeekdayButtons day={"Wed"} />
          <WeekdayButtons day={"Thu"} />
          <WeekdayButtons day={"Fri"} />
          <WeekdayButtons day={"Sat"} />
          <WeekdayButtons day={"Sun"} />
        </div>
        <div className="overflow-hidden overflow-y-scroll">
          <div className="grid grid-flow-col grid-rows-12 ">
            {hoursData.map((week, wi) =>
              week.map((day, di) => (
                <div
                  key={day}
                  cursor="pointer"
                  onClick={() => {
                    handleUpdateClinicHoursList(day.toUTCString());

                    // console.log(day.toUTCString());
                  }}
                  className={`h-10 w-25 m-0.5 flex items-center justify-center
                    border border-blue-200 
                         ${hourColor(day.toUTCString())}
                      `}
                >
                  {format(day, "hh:mm a")}
                </div>
              ))
            )}
          </div>
        </div>
        {/* </div> */}
        <div className="flex justify-evenly mt-5">
          <button
            className="btn w-44"
            onClick={() => {
              handleClinicHoursEdit(currentUser.uid, clinicHours);
              setEditClinicHoursModal(false);
            }}
          >
            Update Details
          </button>
          <button
            className="btnCancel w-44 "
            onClick={() => {
              setEditClinicHoursModal(false);
            }}
          >
            Cancel
          </button>
        </div>
        {/* </div> */}
      </motion.div>
    </motion.div>
  );
}

export default EditClinicHoursModal;
