import { useEffect, useState } from "react";
import { useSignInContext } from "../contextProvider/SignInContext";
import { useAuth } from "../firebase";
import getWeekdayName from "../utilities/GetWeekdayName";
import {
  dateListToTimeList,
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
import WorkGrid from "./calendarOverview/WorkGrid";
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import AccordionItemWeeklyOverview from "./AccordionItemWeeklyOverview";

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
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState([]);
  const [selectedDoctorIndexList, setSelectedDoctorIndexList] = useState([]);
  const [selectedDoctorList, setSelectedDoctorList] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [filteredDoctorDetails, setFilteredDoctorDetails] = useState([]);
  const [listSelectedDoctor, setListSelectedDoctor] = useState([]);
  // console.log("data2: " + hoursData2);

  useEffect(() => {
    const element = document.getElementById("calendar");
    element.scrollTop = element.scrollTop = element.scrollHeight * 0.38;
  }, []);

  const handleLoadDoctors = async () => {
    const docRef = doc(db, "doctors", "doctors");
    const docSnap = await getDoc(docRef);

    const doctorNames = docSnap.data().doctors.map((a) => a.name);
    setDoctorsList(doctorNames.map((obj) => [obj]));

    const doctorUIDs = docSnap.data().doctors.map((a) => a.uid);
    setDoctorsUIDList(doctorUIDs.map((obj) => [obj]));
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
    getDoctorSchedule();
  }, []);

  const objToStr = (obj) => {
    return JSON.parse(JSON.stringify(Object.values(obj)[0]));
  };

  const getDoctorSchedule = async () => {
    // this downloads all doctor's details and stores into an object
    const q = query(collection(db, "users"), where("role", "==", "Doctor"));
    const querySnapshot = await getDocs(q);
    const results = [];

    if (querySnapshot.empty) {
      // console.log("no doctors found");
    } else {
      // console.log("doctors found");
      // setDoctorDetails(querySnapshot.docs());

      querySnapshot.forEach((doc) => {
        // setSearchResults(doc.data());
        // console.log("userRole: " + doc.data().role);
        if (doc.data().schedule) {
          // setUserRole(doc.data().role);
          // console.log(doc.id, " => ", doc.data());
          results.push(doc.data());
        }
      });
    }
    // console.log("results " + results);
    setDoctorDetails(results);
  };

  const getWorkHoursData = async () => {
    const docRef = doc(db, "workHours", "2022-01");
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        // console.log("exists");
      } else {
        // console.log("does not exist");
      }
    });
  };

  const hourColor = (day, data) => {
    try {
      // console.log("doctorDetails " + doctorDetails[0]);

      // console.log("schedule " + doctorDetails[0].schedule["Sun"]);
      const list = dateListToTimeList(doctorDetails[0].schedule["Sun"]);
      if (list) {
        if (list.toString().includes(dateListToTimeList([data]).toString())) {
          return "bg-orange-200 border-solid border-2 border-indigo-500 border-dashed";
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    test();
  }, [selectedDoctor]);

  const test = () => {
    try {
      const index = doctorDetails
        .map((item) => item.name)
        .indexOf(selectedDoctor.toString());
      if (index >= 0) {
        setSelectedDoctorIndex(index);
        // console.log("changed index");
      }
      if (index < 0) {
        setSelectedDoctorIndex("");
        // console.log("set index to null");
      }
      // console.log("doctorDetails " + doctorDetails[index]);
      // console.log("index: " + index);
    } catch (e) {}
  };

  useEffect(() => {
    // console.log("doctorList: " + listSelectedDoctor);
    // console.log("length: " + listSelectedDoctor.length);
    doctorListToIndexList();
    // }, [listSelectedDoctor]);
  }, [filteredDoctorDetails]);

  const doctorListToIndexList = () => {
    try {
      const index = filteredDoctorDetails
        .map((item) => item.name)
        .indexOf(selectedDoctor.toString());
      if (index >= 0) {
        if (selectedDoctorIndexList.includes(index.toString())) {
          console.log("remove index " + index);

          setSelectedDoctorIndexList(
            selectedDoctorIndexList.filter((x) => x != index)
          );
        } else {
          console.log("added to index list " + index.toString());
          // console.log("type: " + typeof index);
          setSelectedDoctorIndexList((x) => [...x, index.toString()]);
        }
      }
      // if (index < 0) {
      //   console.log(
      //     "doctor not found " + JSON.stringify(filteredDoctorDetails)
      //   );
      // }
    } catch (e) {
      console.log("error " + e);
    }
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
      className="flex fixed md:px-0 bg-gray-200 top-0
      items-center justify-center z-50 bg-opacity-70 w-full 
       h-screen 
       "
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
        className="bg-white max-w-4xl p-8 md:p-12
          rounded-lg shadow-2xl  w-5/6  h-5/6
          flex flex-col 
            "
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="headerText text-3xl">Weekly Overview</h3>
        </section>

        <section className="my-5">
          <AccordionItemWeeklyOverview
            title={"Doctor: "}
            // desc={searchResults?.role}
            setDesc={setSelectedDoctor}
            // setDoctorList={setDoctorsList}
            // options={["one", "two"]}
            options={doctorsList}
            // uid={searchResults?.uid}
            // doctorList={doctorsList}
            // name={searchResults?.name}
            doctorDetails={doctorDetails}
            listSelectedDoctor={listSelectedDoctor}
            setListSelectedDoctor={setListSelectedDoctor}
            filteredDoctorDetails={filteredDoctorDetails}
            setFilteredDoctorDetails={setFilteredDoctorDetails}
          />
        </section>
        {/* <div>{JSON.stringify(filteredDoctorDetails)}</div> */}
        <div className="overflow-hidden overflow-y-scroll ">
          <section
            className="flex flex-row  items-center 
          top-0 z-50  sticky bg-white
          "
          >
            <div className="">
              <div
                className={`h-8 flex flex-col  
                items-center text-xs w-10
                    `}
              >
                {/* Time */}
              </div>
            </div>
            <div className="grow grid grid-flow-col auto-cols-fr">
              {/* <WeekHeader day={"Time"} date={weekData} /> */}
              <WeekHeader day={"Sun"} date={weekData} />
              <WeekHeader day={"Mon"} date={weekData} />
              <WeekHeader day={"Tue"} date={weekData} />
              <WeekHeader day={"Wed"} date={weekData} />
              <WeekHeader day={"Thu"} date={weekData} />
              <WeekHeader day={"Fri"} date={weekData} />
              <WeekHeader day={"Sat"} date={weekData} />
              {/* <WeekHeader day={"Right"} date={weekData} /> */}
            </div>
          </section>

          <section
            className="flex flex-row items-center justify-around 
          "
            // className="flex  container"
            // className="flex  container"
            id="calendar"
          >
            <div className="">
              {hoursData2.map((week, wi) =>
                week.map((day, di) => (
                  <div
                    key={day}
                    cursor="pointer"
                    className={`h-8 flex flex-col justify-items-stretch 
                      items-center text-xs  border-t 
                      border-gray-200 w-10
                    `}
                  >
                    {format(day, "h a")}
                  </div>
                ))
              )}
            </div>
            <div className="flex grow">
              <WorkGrid
                weekDay={"Sun"}
                // doctorDetails={doctorDetails}
                hoursData={hoursData}
                index={selectedDoctorIndex}
                // selectedDoctorIndexList={selectedDoctorIndexList}
                filteredDoctorDetails={filteredDoctorDetails}
              />
              <WorkGrid
                weekDay={"Mon"}
                // doctorDetails={doctorDetails}
                hoursData={hoursData}
                index={selectedDoctorIndex}
                // selectedDoctorIndexList={selectedDoctorIndexList}
                filteredDoctorDetails={filteredDoctorDetails}
              />
              <WorkGrid
                weekDay={"Tue"}
                // doctorDetails={doctorDetails}
                hoursData={hoursData}
                index={selectedDoctorIndex}
                // selectedDoctorIndexList={selectedDoctorIndexList}
                filteredDoctorDetails={filteredDoctorDetails}
              />
              <WorkGrid
                weekDay={"Wed"}
                // doctorDetails={doctorDetails}
                hoursData={hoursData}
                index={selectedDoctorIndex}
                // selectedDoctorIndexList={selectedDoctorIndexList}
                filteredDoctorDetails={filteredDoctorDetails}
              />
              <WorkGrid
                weekDay={"Thu"}
                // doctorDetails={doctorDetails}
                hoursData={hoursData}
                index={selectedDoctorIndex}
                // selectedDoctorIndexList={selectedDoctorIndexList}
                filteredDoctorDetails={filteredDoctorDetails}
              />
              <WorkGrid
                weekDay={"Fri"}
                // doctorDetails={doctorDetails}
                hoursData={hoursData}
                index={selectedDoctorIndex}
                // selectedDoctorIndexList={selectedDoctorIndexList}
                filteredDoctorDetails={filteredDoctorDetails}
              />
              <WorkGrid
                weekDay={"Sat"}
                // doctorDetails={doctorDetails}
                hoursData={hoursData}
                index={selectedDoctorIndex}
                // selectedDoctorIndexList={selectedDoctorIndexList}
                filteredDoctorDetails={filteredDoctorDetails}
              />
            </div>
          </section>
        </div>
        <section className="mt-2 ">
          <div className="flex justify-evenly mt-5">
            <button
              className="btnCancel w-44 "
              onClick={() => {
                setCalendarOverviewModal(false);
              }}
            >
              Close
            </button>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
}

export default CalendarOverview;
