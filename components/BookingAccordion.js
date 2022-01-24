import React, { useEffect, useState } from "react";
import { useEditUserDetailsContext } from "../contextProvider/EditUserDetailsContext";
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
import db from "../firebase";
import BookingAccordionCalendar from "./CalendarSelector";
import useCalendar from "./CalendarSelector";
import CalendarSelector from "./CalendarSelector";

function BookingAccordion({ title, titleContent, list }) {
  const [calendar, setCalendar] = useState();
  const [weekDay, setWeekday] = useState("");
  const [daySchedule, setDaySchedule] = useState();
  const [hoursList, setHoursList] = useState([..."Loading"]);

  const { format } = require("date-fns");

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

  const [toggle, setToggle] = useState(false);
  const [desc, setDesc] = useState(titleContent);
  const [selectedDate, setSelectedDate] = useState("Choose Date");
  const [selectedTime, setSelectedTime] = useState("Choose Time");

  // useEffect(() => {
  //   // setDesc(titleContent);
  //   // console.log("docList2: " + doctorList);
  // }, [issue]);

  // useEffect(() => {
  //   // console.log("docList2 here: " + doctorList);
  //   const temp = bookingOptions;
  //   temp.doctor = doctorList;
  //   setBookingOptions(temp);
  // }, [doctorList]);

  const getDoctors = async (field) => {
    setDoctorList([]);
    const q = query(collection(db, "specialists"), where("field", "==", field));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data().name);

      setDoctorList((oldArray) => [...oldArray, doc.data().name]);
    });
    // console.log("docList here: " + doctorList);
  };

  useEffect(() => {
    // console.log("workHoursList here: " + workHoursList);
    // const temp = bookingOptions;
    // temp.time = workHoursList;
    // setBookingOptions(temp);
  }, [workHoursList]);

  const getWorkingHours = async (field) => {
    // console.log("querying work hours");
    setWorkHoursList({
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
    });
    const q = query(collection(db, "specialists"), where("name", "==", field));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data().schedule);
      setWorkHoursList(doc.data().schedule);
      // console.log("workHourslistUpdated: " + workHoursList);
    });
  };

  useEffect(() => {
    // console.log("selected Time here: " + selectedTime);
  }, [selectedTime]);

  useEffect(() => {
    // console.log("workHoursList[weekDay]: " + workHoursList[weekDay]);
  }, [weekDay]);

  console.log("weekday: " + weekDay);
  console.log("workHoursList[weekDay]: " + workHoursList[weekDay]);

  // useEffect(() => {
  //   // console.log("weekDay changed");
  //   // setHoursList(workHoursList["Wed"]);
  //   // if (weekDay !== null) setHoursList(workHoursList[weekDay]);
  //   // setHoursList(workHoursList[weekDay]);
  //   console.log("hoursList: " + hoursList);
  //   // console.log("workHoursList: " + workHoursList["Wed"]);
  //   // console.log("type: " + typeof hoursList);
  //   // console.log("workHoursList Type: " + typeof workHoursList["Wed"]);
  // }, [weekDay]);

  const updateState = (item) => {
    setDesc(item);
    // console.log("updateState: " + item);
    if (title === "Issue") {
      //   console.log("issue was changed");
      const temp = bookingData;
      //   console.log("issue: " + issue);
      temp.issue = item;
      setBookingData(temp);
      setIssue(item);
      //   console.log("updated issue: " + issue);
      //   console.log("updated desc: " + desc);
      setDoctorAccordionToggle(true);

      //   console.log("doctor toggle: " + doctorAccordionToggle);
      getDoctors(item);
    }
    if (title === "Doctor") {
      //   console.log("doctor was changed");
      setDateAccordionToggle(true);
      //   console.log("time toggle: " + timeAccordionToggle);
      getWorkingHours(item);
    }
    if (title === "Date") {
      // console.log("date was selected");
      // setSelectedDate(item);
      // console.log("selectedDate: " + selectedDate);
      setTimeAccordionToggle(true);
    }
    if (title === "Time") {
      // console.log("time was changed");
      setSelectedTime(item);
      // console.log("selectedTime: " + selectedTime);
    }
  };

  return (
    <div
      className={`mt-5 border flex flex-col
   
    `}
    >
      {/* <div className="hidden">{issue}</div> */}
      <div
        className="flex cursor-pointer p-2 hover:bg-orange-100
            transition-all duration-500"
        onClick={() => setToggle(!toggle)}
      >
        <div className="font-semibold text-xl">{title}:</div>
        {title != "Time" && <div className="ml-2 text-xl">{desc}</div>}
        {title === "Time" && (
          <div className="ml-2 text-xl">
            {/* {format(new Date(desc), "hh:mm a")} */}
            {selectedTime === "Choose Time"
              ? "Choose Time"
              : format(new Date(selectedTime), "hh:mm a")}
          </div>
        )}
      </div>
      <div
        className={` px-2 origin-center 
        ${
          toggle && title !== "Date"
            ? "scale-y-10 h-10 flex "
            : toggle && title === "Date"
            ? "scale-y-10 h-96  "
            : "scale-y-0 h-0 "
        }
            transition-all duration-500 `}
      >
        {title === "Issue" &&
          list.map((item) => (
            <div
              key={item}
              className={`mr-3 px-2 py-1 my-1 rounded-xl bg-orange-400
        `}
              onClick={() => updateState(item)}
            >
              {item}
            </div>
          ))}
        {title === "Doctor" &&
          doctorList.map((item) => (
            <div
              key={item}
              className={`mr-3 px-2 py-1 my-1 rounded-xl bg-orange-400
        `}
              onClick={() => updateState(item)}
            >
              {item}
            </div>
          ))}
        {title === "Date" && (
          <CalendarSelector
            setCalendar={setCalendar}
            updateState={updateState}
            setWeekday={setWeekday}
            setHoursList={setHoursList}
          />
        )}
        {title === "Date" &&
          // hoursList !== null &&
          // weekDay !== null &&
          workHoursList[weekDay] !== undefined &&
          // hoursList != null &&
          // hoursList.map((item) => (
          // workHoursList["Fri"].map((item) => (
          workHoursList[weekDay].map((item) => (
            <div className=" bg-gray-500 " key={item}>
              <div className="" key={item}>
                <div
                  key={item}
                  className={` max-w-fit mr-3 px-2 py-1 my-1 rounded-xl 
              bg-orange-400
                `}
                  onClick={() => updateState(item)}
                >
                  {format(new Date(item), "hh:mm a")}
                  {/* {item} */}
                </div>
              </div>
            </div>
          ))}
        {/* <div>{workHoursList["Fri"]}</div> */}
        {/* <div>HL: {hoursList}</div> */}
      </div>
    </div>
  );
}

export default BookingAccordion;
