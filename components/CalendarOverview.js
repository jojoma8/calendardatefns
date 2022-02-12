import { useEffect, useState } from "react";
import { useSignInContext } from "../contextProvider/SignInContext";
import { useAuth } from "../firebase";
import getWeekdayName from "../utilities/GetWeekdayName";
import {
  GenerateHourlyList,
  GenerateHoursList,
} from "../utilities/TimeCalculations";
import WeekHeader from "./calendarOverview/WeekHeader";
import { motion, AnimatePresence } from "framer-motion";
import AccordionItem from "./AccordionItem";
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

function CalendarOverview() {
  const {
    format,
    set,
    isSameMinute,
    startOfWeek,
    addDays,
    startOfDay,
  } = require("date-fns");

  const currentUser = useAuth();
  const { calendarOverviewModal, setCalendarOverviewModal } =
    useSignInContext();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const hourGenerator = GenerateHoursList();
  const hoursData = hourGenerator();
  const hourGenerator2 = GenerateHourlyList();
  const hoursData2 = hourGenerator2();
  const [doctorsList, setDoctorsList] = useState([]);
  const [doctorsUIDList, setDoctorsUIDList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  // console.log("data2: " + hoursData2);

  useEffect(() => {
    const element = document.getElementById("calendar");
    element.scrollTop = element.scrollTop = element.scrollHeight * 0.38;
  }, []);

  const handleLoadDoctors = async () => {
    const docRef = doc(db, "doctors", "doctors");
    const docSnap = await getDoc(docRef);

    // setDoctorsList(Object.values(docSnap.data().doctors.map((a) => a.name)));
    const doctorNames = docSnap.data().doctors.map((a) => a.name);
    // console.log("docList: " + docSnap.data().doctors.map((a) => a.name));
    // console.log("finalArray " + typeof finalArray.map((obj) => [obj]));
    // console.log("array " + typeof temp);
    setDoctorsList(doctorNames.map((obj) => [obj]));
  };

  // get doctors list
  useEffect(() => {
    handleLoadDoctors();
  }, []);

  function takeWeek(start = new Date()) {
    let date = startOfWeek(startOfDay(start));
    return function () {
      const week = [...Array(7)].map((_, i) => addDays(date, i));
      date = addDays(week[6], 1);
      return week;
    };
  }

  const weekGenerator = takeWeek(selectedDate);
  const weekData = weekGenerator();
  // console.log("week: " + weekData[1].getDate());

  useEffect(() => {
    getWorkHoursData();
  }, []);

  const getDoctorSchedule = async () => {
    const docRef = doc(db, "users", "docFM");
  };

  const getWorkHoursData = async () => {
    const docRef = doc(db, "workHours", "2022-01");
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("exists");
      } else {
        console.log("does not exist");
      }
    });
  };

  return (
    // <AnimatePresence
    //   initial={true}
    //   exitBeforeEnter={true}
    //   onExitComplete={() => null}

    // >
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
      className="flex fixed md:px-0 bg-gray-200 
      items-center justify-center z-50 bg-opacity-70 w-full 
       h-screen 
       "
      onClick={() => {
        setCalendarOverviewModal(false);
      }}
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
        className="bg-white max-w-4xl 
          p-8 md:p-12 my-10 
            rounded-lg shadow-2xl  w-5/6   h-5/6 
            flex flex-col items-stretch justify-start
            "
        onClick={(e) => e.stopPropagation()}
      >
        <section className="flex flex-col items-center">
          <h3 className="font-bold text-2xl">Weekly Overview</h3>
          {/* <p className="text-gray-600 pt-2">Choose sign in method</p> */}
        </section>
        {/* <div>{doctorsList}</div> */}
        <section>
          <AccordionItem
            title={"Doctor: "}
            // desc={searchResults?.role}
            setDesc={setSelectedDoctor}
            // setDoctorList={setDoctorsList}
            // options={["one", "two"]}
            options={doctorsList}
            // uid={searchResults?.uid}
            // doctorList={doctorsList}
            // name={searchResults?.name}
          />
        </section>
        <section
          className="flex flex-row text-lg my-2 ml-8 mr-5 items-center 
          justify-around"
        >
          <WeekHeader day={"Sun"} date={weekData} />
          <WeekHeader day={"Mon"} date={weekData} />
          <WeekHeader day={"Tue"} date={weekData} />
          <WeekHeader day={"Wed"} date={weekData} />
          <WeekHeader day={"Thu"} date={weekData} />
          <WeekHeader day={"Fri"} date={weekData} />
          <WeekHeader day={"Sat"} date={weekData} />
        </section>
        <section
          // className="flex  overflow-hidden hover:overflow-y-scroll
          //        "
          className="flex container "
          id="calendar"
        >
          <div>
            {hoursData2.map((week, wi) =>
              week.map((day, di) => (
                <div
                  key={day}
                  cursor="pointer"
                  className={`h-8 w-10  flex flex-col justify-items-stretch 
                items-end text-xs  border-t border-gray-200
                    `}
                >
                  {format(day, "h a")}
                </div>
              ))
            )}
          </div>
          <div>
            {hoursData.map((week, wi) =>
              week.map((day, di) => (
                <div
                  key={day}
                  cursor="pointer"
                  className={`h-4 w-14  flex flex-col justify-around 
                items-end text-xs border-t border-l border-r border-gray-200 
                    `}
                >
                  {format(day, "h:mm a")}
                </div>
              ))
            )}
          </div>
        </section>
        <section className="mt-2 ">
          <div className="flex flex-col">
            {/* <div>{currentUser?.displayName}</div> */}

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white
                font-bold py-2 rounded shadow-lg hover:shadow-xl 
                transition duration-200 mt-2"
              onClick={() => {
                // handleChangeUserDetails();
              }}
            >
              Calendar Overview
            </button>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
}

export default CalendarOverview;
