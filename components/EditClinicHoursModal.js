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
  GenerateHoursList,
  hourColor,
  HourListReader,
  HourRangeGenerator,
  NextThirtyMinutes,
  selectedWeekDay,
} from "../utilities/TimeCalculations";
import { useSignInContext } from "../contextProvider/SignInContext";
import { useSelectedDateContext } from "../contextProvider/SelectedDateContext";
import { handleClinicHoursEdit } from "../utilities/UserUtils";
import ClinicHoursSummary from "./ClinicHoursSummary";

function EditClinicHoursModal() {
  const { format, set } = require("date-fns");
  // const currentUser = useAuth();
  // const workHoursList = [
  //   "1:00 AM",
  //   "1:30 AM",
  //   "2:00 AM",
  //   "4:00 AM",
  //   "10:00 AM",
  // ];
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
  // const { clinicHours, setClinicHours } = useSignInContext();
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

  // console.log("weekdaySelected: " + weekDaySelected);
  const hourColor = (data) => {
    // console.log(format(new Date(data), "hh:mm a"));
    if (clinicHours[weekDaySelected].includes(data)) {
      // if (clinicHours[weekDaySelected].includes(data)) {
      return "bg-orange-400";
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
    // setClinicHoursList(() => {
    //   return data[weekDaySelected];
    // });
    setClinicHoursList((oldArray) => [...oldArray, date]);
    // setClinicHoursList({ date: { ...date, Thu: date } });
    // clinicHours[weekDaySelected].set((p) => p + date);
    // setClinicHoursList(data);
    console.log("clinicHours Thu:" + clinicHours[weekDaySelected]);
    console.log("clinicHoursList Thu:" + clinicHoursList);
  };

  const removeHourToList = (date, day) => {
    console.log("remove was ran");
    const data = clinicHours;
    // console.log("original data:" + data.Wed);
    const filteredList = clinicHours[weekDaySelected].filter(
      (item) => item !== date
    );
    // console.log("modified list:" + filteredList);
    data[weekDaySelected] = filteredList;
    setClinicHours(() => {
      return data;
    });
    console.log("modified obj:" + data[weekDaySelected]);
  };
  // if (!clinicHoursList.includes(date)) {
  //   console.log("add to list ran");
  //   setClinicHoursList((oldArray) => [...oldArray, date]);
  // }
  // if (clinicHoursList.includes(date)) {
  //   console.log("remove list ran");
  //   const filteredList = clinicHoursList.filter((item) => item !== date);
  //   // console.log("filteredList: " + filteredList);
  //   setClinicHoursList(filteredList);
  // }

  // const [temp, setTemp] = useState();
  // const data = clinicHours;
  // setData(temp);
  // const data = clinicHours;
  // const dayList = clinicHours[weekDaySelected];
  // console.log("dayList: " + dayList);
  // if (!data[day].includes(date)) {
  //   console.log("add to list ran");
  // setClinicHours((oldArray) => [...oldArray, date]);
  // const data = clinicHours;
  // setClinicHours(data.day((oldArray) => [...oldArray, date]));
  // data[day].push(date);
  // setClinicHours(data);
  // }
  // if (data[day].includes(date)) {
  //   console.log("remove list ran");
  //   const filteredList = clinicHours[weekDaySelected].filter(
  //     (item) => item !== date
  //   );
  //   setClinicHours(filteredList);
  //   console.log("filteredList: " + filteredList);
  // }
  // data["Wed"].push(date);
  // setClinicHours(data);
  // console.log("clinicHoursList: " + clinicHoursList);
  // console.log("clinicHours: " + clinicHours.Wed);
  // };

  // console.log("clinicHours outside fx: " + clinicHours.Wed);
  // console.log(ConvertToTime(test));
  // handleClinicHoursSummary(clinicHours.Tue);

  // const testList = [new Date()];
  // console.log("testList: " + testList);

  function handleClinicHoursSummary(list) {
    const sortedList = list.sort();
    const newList = sortedList.map(function (e) {
      return ConvertToTime(e);
    });
    // return newList
    // console.log("newList: " + newList);
    return newList;
  }
  // const clinicHoursListTest = handleClinicHoursSummary(clinicHours.Wed);
  // console.log("test: " + clinicHoursListTest);
  // HourRangeGenerator(clinicHoursListTest);
  // const anotherArray = hoursList.map(function (e) {
  //   return ConvertToTime(e);
  // });

  // console.log("another: " + anotherArray);

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center 
      justify-center z-50 bg-opacity-70 w-screen"
      onClick={() => {
        setEditClinicHoursModal(false);
      }}
    >
      <div
        className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="font-bold text-2xl">Edit Clinic Hours</h3>
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
                  <ClinicHoursSummary day={"Mon"} />
                  <ClinicHoursSummary day={"Tue"} />
                  <ClinicHoursSummary day={"Wed"} />
                  <ClinicHoursSummary day={"Thu"} />
                  <ClinicHoursSummary day={"Fri"} />
                  <ClinicHoursSummary day={"Sat"} />
                  <ClinicHoursSummary day={"Sun"} />
                </div>
              </div>
            </div>
            {/* THIS SECTION JUST TO REFRESH THE STATE */}
            <div className="hidden">{clinicHoursList}</div>
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
                        // addHourToList(format(day, "hh:mm a"));
                        // addHourToList(day.toUTCString(), weekDaySelected);
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

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white
                font-bold py-2 
                rounded shadow-lg hover:shadow-xl transition duration-200"
              onClick={() => {
                handleClinicHoursEdit(currentUser.uid, clinicHours);
              }}
            >
              Update Details
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditClinicHoursModal;
