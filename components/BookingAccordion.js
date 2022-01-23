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

function BookingAccordion({ title, titleContent, list }) {
  const { format } = require("date-fns");

  const {
    issue,
    setIssue,
    doctor,
    setDoctor,
    doctorList,
    setDoctorList,
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
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    // setDesc(titleContent);
    // console.log("docList2: " + doctorList);
  }, [issue]);

  useEffect(() => {
    console.log("docList2 here: " + doctorList);
    const temp = bookingOptions;
    temp.doctor = doctorList;
    setBookingOptions(temp);
  }, [doctorList]);

  const getDoctors = async (field) => {
    setDoctorList([]);
    const q = query(collection(db, "specialists"), where("field", "==", field));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data().name);

      setDoctorList((oldArray) => [...oldArray, doc.data().name]);
    });
    // console.log("docList here: " + doctorList);
  };

  useEffect(() => {
    console.log("workHoursList here: " + workHoursList);
    const temp = bookingOptions;
    temp.time = workHoursList;
    setBookingOptions(temp);
  }, [workHoursList]);

  const getWorkingHours = async (field) => {
    console.log("querying work hours");
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
      console.log(doc.id, "=>", doc.data().schedule);
      setWorkHoursList(doc.data().schedule);
      console.log("workHourslistUpdated: " + workHoursList);
    });
  };

  useEffect(() => {
    console.log("selectedDate here: " + selectedDate);
  }, [selectedDate]);

  const updateState = (item) => {
    setDesc(item);
    console.log("updateState: " + item);
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
      setTimeAccordionToggle(true);
      //   console.log("time toggle: " + timeAccordionToggle);
      getWorkingHours(item);
    }
    if (title === "Time") {
      console.log("time was changed");
      setSelectedDate(item);
      console.log("selectedDate: " + selectedDate);
    }
  };

  return (
    <div className={`mt-5 border `}>
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
            {format(new Date(selectedDate), "hh:mm a")}
          </div>
        )}
      </div>
      <div
        className={`flex px-2  origin-center 
        ${toggle ? "scale-y-10 h-10" : "scale-y-0 h-0"}
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
        {title === "Time" &&
          workHoursList.Mon.map((item) => (
            <div
              key={item}
              className={`mr-3 px-2 py-1 my-1 rounded-xl bg-orange-400
        `}
              onClick={() => updateState(item)}
            >
              {format(new Date(item), "hh:mm a")}
            </div>
          ))}
      </div>
    </div>
  );
}

export default BookingAccordion;
