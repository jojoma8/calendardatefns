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

function BookingAccordionDoctor({ title, titleContent, list }) {
  const [calendar, setCalendar] = useState();
  const [weekDay, setWeekday] = useState("");
  const [daySchedule, setDaySchedule] = useState();
  const [hoursList, setHoursList] = useState([..."Loading"]);
  const [specialistUIDLocal, setSpecialistUIDLocal] = useState("");

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

  // useEffect(() => {
  //   // setDesc(titleContent);
  //   // console.log("docList2: " + doctorList);
  // }, [issue]);

  //   useEffect(() => {
  //     // console.log("docList2 here: " + doctorList);
  //     const temp = bookingOptions;
  //     temp.doctor = doctorList;
  //     setBookingOptions(temp);
  //   }, [doctorList]);

  //   const getDoctors = async (field) => {
  //     setDoctorList([]);
  //     const q = query(collection(db, "specialists"), where("field", "==", field));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       // console.log(doc.id, "=>", doc.data().name);

  //       setDoctorList((oldArray) => [...oldArray, doc.data().name]);
  //     });
  //     // console.log("docList here: " + doctorList);
  //   };

  //   useEffect(() => {
  //     // console.log("workHoursList here: " + workHoursList);
  //     // const temp = bookingOptions;
  //     // temp.time = workHoursList;
  //     // setBookingOptions(temp);
  //   }, [workHoursList]);

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

  const getWorkingHours = async (field) => {
    // console.log("querying work hours");
    setSpecialistClinicHours({
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
      setSpecialistClinicHours(doc.data().schedule);
      //   console.log("this ran: " + doc.data().uid);
      setSpecialistUID(doc.data().uid);
      setSpecialistUIDLocal(doc.data().uid);
      //   const uid = doc.data().uid;
    });
  };

  useEffect(() => {
    // console.log("uid check " + specialistUIDLocal);
    const getHolidayList = async () => {
      if (specialistUIDLocal !== "") {
        //   console.log("this ran");
        const docRef = doc(db, "holidays", specialistUIDLocal);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("holiday list " + docSnap.data().date);
          setSpecialistHolidayList(docSnap.data().date);
        } else console.log("no such user");
      }
    };
    getHolidayList();
  }, [specialistUIDLocal]);

  //   useEffect(() => {
  //     // console.log("workHoursList[weekDay]: " + workHoursList[weekDay]);
  //   }, [weekDay]);

  //   console.log("weekday: " + weekDay);
  //   console.log("workHoursList[weekDay]: " + workHoursList[weekDay]);

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

    if (title === "Doctor") {
      //   console.log("doctor was changed");
      setDateAccordionToggle(true);
      //   console.log("time toggle: " + timeAccordionToggle);
      getWorkingHours(item);
      // setToggle(!toggle);
      toggleAccordion();
    }
  };

  return (
    <div className={`mt-5 border flex flex-col`}>
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
        className={`flex flex-wrap px-2 origin-center 
        ${toggle ? "scale-y-10 h-10 " : "scale-y-0 h-0 "}
            transition-all duration-500 `}
      > */}
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="flex flex-wrap overflow-hidden transition-max-height 
            duration-700 ease-in-out items-center "
      >
        {title === "Doctor" &&
          doctorList.map((item) => (
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

export default BookingAccordionDoctor;
