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

function EditClinicHoursModal() {
  const { format, set } = require("date-fns");

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

  // console.log("weekdaySelected: " + weekDaySelected);
  const hourColor = (data) => {
    // console.log(format(new Date(data), "hh:mm a"));
    if (typeof clinicHours !== "undefined") {
      if (clinicHours[weekDaySelected].includes(data)) {
        // if (clinicHours[weekDaySelected].includes(data)) {
        return "bg-orange-400";
      }
    }
  };

  function handleUpdateClinicHoursList(data) {
    // console.log("handle function ran " + data);
    if (!clinicHours[weekDaySelected].includes(data)) {
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

  const removeHourToList = (date, day) => {
    console.log("remove was ran");
    setClinicHours((prev) => {
      const data = clinicHours;
      const filteredList = clinicHours[weekDaySelected].filter(
        (item) => item !== date
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
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center 
      justify-center z-50 bg-opacity-70 w-screen"
      // onClick={() => {
      //   setEditClinicHoursModal(false);
      // }}
    >
      <div
        className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="headerText text-3xl">Edit Clinic Hours</h3>
          {/* <p className="text-gray-600 pt-2">Choose sign in method</p> */}
        </section>
        <section className="mt-5">
          <div className="flex flex-col">
            <div>
              <input
                className=" p-3 rounded bg-gray-100"
                // placeholder="User Name"
                defaultValue={currentUser?.displayName}
              />
            </div>

            <div>
              <div className="text-lg font-bold m-5">Clinic Hours</div>
              <div className="m-5">
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
            {/* THIS SECTION JUST TO REFRESH THE STATE */}
            <div className="hidden">{clinicHoursList}</div>
            {/* REMOVED 26JAN 2022 */}
            {/* <div className="hidden">{clinicHours["Sat"]}</div> */}
            {/* THIS SECTION JUST TO REFRESH THE STATE */}
            <div className="flex">
              <WeekdayButtons day={"Mon"} />
              <WeekdayButtons day={"Tue"} />
              <WeekdayButtons day={"Wed"} />
              <WeekdayButtons day={"Thu"} />
              <WeekdayButtons day={"Fri"} />
              <WeekdayButtons day={"Sat"} />
              <WeekdayButtons day={"Sun"} />
            </div>
            <div>
              <div className="grid grid-flow-col grid-rows-12">
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
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditClinicHoursModal;
