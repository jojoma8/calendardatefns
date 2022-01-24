import React, { useEffect, useRef, useState } from "react";
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

function BookingAccordionTime({ title, titleContent, list }) {
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

  const [toggle, setToggle] = useState(false);
  const [desc, setDesc] = useState(titleContent);
  const [selectedDate, setSelectedDate] = useState("Choose Date");
  const [selectedTime, setSelectedTime] = useState("Choose Time");
  const [height, setHeight] = useState("0px");
  const contentSpace = useRef(null);

  function toggleAccordion() {
    setToggle(!toggle);
    setHeight(toggle ? "0px" : `${contentSpace.current.scrollHeight}px`);
  }

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

  //   useEffect(() => {
  //     // console.log("workHoursList[weekDay]: " + workHoursList[weekDay]);
  //   }, [weekDay]);

  //   console.log("weekday: " + weekDay);
  //   console.log("workHoursList[weekDay]: " + workHoursList[weekDay]);

  const updateState = (item) => {
    setDesc(item);

    if (title === "Time") {
      // console.log("time was changed");
      setSelectedTime(item);
      // console.log("selectedTime: " + selectedTime);
      toggleAccordion();
    }
  };

  useEffect(() => {
    console.log("specialist on holiday? " + specialistOnHolidayToggle);
  }, [specialistOnHolidayToggle]);

  return (
    <div
      className={`mt-5 border flex flex-col
   
    `}
    >
      <div
        className="flex cursor-pointer p-2 hover:bg-orange-100
            transition-all duration-500"
        // onClick={() => setToggle(!toggle)}
        onClick={() => toggleAccordion()}
      >
        <div className="font-semibold text-xl">{title}:</div>

        {title === "Time" && (
          <div className="ml-2 text-xl">
            {selectedTime === "Choose Time"
              ? "Choose Time"
              : format(new Date(selectedTime), "hh:mm a")}
          </div>
        )}
      </div>
      {/* <div
        className={`flex flex-wrap px-2 origin-center transition-all duration-500
        ${toggle ? "scale-y-10 h-20  " : "scale-y-0 h-0 "}
             `}
      > */}
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="flex flex-wrap overflow-hidden transition-max-height 
            duration-700 ease-in-out items-center "
      >
        {title === "Time" &&
          !specialistOnHolidayToggle &&
          specialistAvailableHours.map((item) => (
            <div className="" key={item}>
              <div className="" key={item}>
                <div
                  key={item}
                  //   id={item.id}
                  className={` ml-2 px-2 py-1 my-1 rounded-xl 
              bg-orange-400 cursor-pointer hover:bg-sky-400 transition-all duration-200
                `}
                  onClick={() => updateState(item)}
                >
                  {format(new Date(item), "hh:mm a")}
                </div>
              </div>
            </div>
          ))}
        {specialistOnHolidayToggle && <div>No Time Slots Available</div>}
      </div>
    </div>
  );
}

export default BookingAccordionTime;
