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

function BookingAccordionDate({ title, titleContent, list }) {
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

  //   const getWorkingHours = async (field) => {
  //     // console.log("querying work hours");
  //     setWorkHoursList({
  //       Mon: [],
  //       Tue: [],
  //       Wed: [],
  //       Thu: [],
  //       Fri: [],
  //       Sat: [],
  //       Sun: [],
  //     });
  //     const q = query(collection(db, "specialists"), where("name", "==", field));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       // console.log(doc.id, "=>", doc.data().schedule);
  //       setWorkHoursList(doc.data().schedule);
  //       // console.log("workHourslistUpdated: " + workHoursList);
  //     });
  //   };

  const updateState = (item) => {
    setDesc(item);
    // console.log("updateState: " + item);

    if (title === "Date") {
      // console.log("date was selected");
      // setSelectedDate(item);
      // console.log("selectedDate: " + selectedDate);
      setTimeAccordionToggle(true);
    }
  };

  return (
    <div className={`mt-5 border flex flex-col`}>
      <div
        className="flex cursor-pointer p-2 hover:bg-orange-100
            transition-all duration-500"
        onClick={() => setToggle(!toggle)}
      >
        <div className="font-semibold text-xl">{title}:</div>
        <div className="ml-2 text-xl">{desc}</div>
      </div>
      <div
        className={`flex px-2 origin-center transition-all duration-500
        ${toggle ? "scale-y-10 h-80  " : "scale-y-0 h-0 "}
             `}
      >
        <CalendarSelector
          setCalendar={setCalendar}
          updateState={updateState}
          setWeekday={setWeekday}
          setHoursList={setHoursList}
        />
      </div>
    </div>
  );
}

export default BookingAccordionDate;
