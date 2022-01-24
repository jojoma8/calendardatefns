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

function BookingAccordionIssue({ title, titleContent, list }) {
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
  const [height, setHeight] = useState("0px");
  const contentSpace = useRef(null);

  function toggleAccordion() {
    setToggle(!toggle);
    setHeight(toggle ? "0px" : `${contentSpace.current.scrollHeight}px`);
  }

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

  const updateState = (item) => {
    setDesc(item);

    const temp = bookingData;

    temp.issue = item;
    setBookingData(temp);
    setIssue(item);

    setDoctorAccordionToggle(true);

    getDoctors(item);
    // setToggle(!toggle);
    toggleAccordion();
  };

  return (
    <div className={`mt-5 border  `}>
      <div
        className="flex cursor-pointer p-2 hover:bg-orange-100
            transition-all duration-500"
        // onClick={() => setToggle(!toggle)}
        onClick={() => toggleAccordion()}
      >
        <div className="font-semibold text-xl">{title}:</div>
        <div className="ml-2 text-xl">{desc}</div>
      </div>
      {/* <div
        className={`flex flex-wrap px-2 origin-center transition-all duration-500
        ${toggle ? "scale-y-10 h-72 " : "scale-y-0 h-0 "}
             `}
      > */}
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="flex flex-wrap overflow-hidden transition-max-height 
            duration-700 ease-in-out items-center "
      >
        {list.map((item) => (
          <div
            key={item}
            className={`ml-2 px-2 py-1 my-1 rounded-xl bg-orange-400
            cursor-pointer hover:bg-sky-400 transition-all duration-200
        `}
            onClick={() => updateState(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingAccordionIssue;
