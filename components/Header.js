import Image from "next/image";
import db from "../firebase";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  PlusIcon,
  UserIcon,
  TableIcon,
  CalendarIcon,
  MailIcon,
  ShoppingCartIcon,
  PhotographIcon,
} from "@heroicons/react/solid";
import { login, signInWithGoogle, signup, updateUserName } from "../firebase";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  DocumentAddIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import { FaBeer, FaNotesMedical } from "react-icons/fa";
import { GiPalmTree } from "react-icons/gi";

import HeaderIcon from "./HeaderIcon";
import { useAuth } from "../firebase";
import UserAuthentication from "./UserAuthentication";
import { useContext, useEffect, useState } from "react";

// import {
//   EditPostContext,
//   PassDocIDContext,
//   SignInContext,
// } from "../utilities/Context";
// import { handleSearchChange } from "./Posts";
import Link from "next/link";
import { useSignInContext } from "../contextProvider/SignInContext";
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
import { useEditUserDetailsContext } from "../contextProvider/EditUserDetailsContext";
import GetUserDetails from "./GetUserDetails";
import { useSelectedDateContext } from "../contextProvider/SelectedDateContext";
import { handleClinicHoursEdit } from "../utilities/UserUtils";

function Header() {
  const currentUser = useAuth();
  const {
    userDetailsModal,
    setUserDetailsModal,
    specialistDetailsModal,
    setSpecialistDetailsModal,
    editClinicHoursModal,
    setEditClinicHoursModal,
    editHolidaysModal,
    setEditHolidaysModal,
    contactUsModal,
    setContactUsModal,
    setPaymongoModal,
    serRolesModal,
    setUserRolesModal,
    calendarOverviewModal,
    setCalendarOverviewModal,
  } = useSignInContext();

  const [scheduleLoaded, setScheduleLoaded] = useState(false);
  //   const {
  //     docID,
  //     setDocID,
  //     searchTerm,
  //     setSearchTerm,
  //     postFilterData,
  //     setPostFilterData,
  //     postData,
  //     setPostData,
  //   } = useContext(PassDocIDContext);

  //   const {
  //     editPostModal,
  //     setEditPostModal,
  //     editPostTitleModal,
  //     setEditPostTitleModal,
  //     editPostCodeSnippetModal,
  //     setEditPostCodeSnippetModal,
  //     editPostDescriptionModal,
  //     setEditPostDescriptionModal,
  //     newPostModal,
  //     setNewPostModal,
  //     filterPostModal,
  //     setFilterPostModal,
  //   } = useContext(EditPostContext);

  //   const { userDetailsModal, setUserDetailsModal } =
  //     useContext(useSignInContext);

  //   const excludeColumns = ["id", "timestamp", "user"];

  //   const handleSearchChange = (value) => {
  //     // console.log(value);
  //     setSearchTerm(value);
  //     filterSearchData(value);
  //   };

  // Filter Records by Search Text
  //   const filterSearchData = (value) => {
  //     const lowerCaseValue = value.toLowerCase().trim();
  //     if (lowerCaseValue === "") setPostFilterData(postData);
  //     else {
  //       const filteredSearchData = postData.filter((item) => {
  //         return Object.keys(item).some((key) =>
  //           excludeColumns.includes(key)
  //             ? false
  //             : item[key].toString().toLowerCase().includes(lowerCaseValue)
  //         );
  //       });
  //       setPostFilterData(filteredSearchData);
  //       // setPostData(filteredSearchData);
  //     }
  //   };
  const {
    userDetails,
    setUserDetails,
    userName,
    setUserName,
    userRole,
    setUserRole,
    specialistField,
    setSpecialistField,
    userSpeciality,
    setUserSpeciality,
  } = useEditUserDetailsContext();

  const {
    selectedDate,
    setSelectedDate,
    hoursList,
    setHoursList,
    weekDaySelected,
    setWeekdaySelected,
    clinicHours,
    setClinicHours,
    holidaysData,
    setHolidaysData,
  } = useSelectedDateContext();

  const getUserDetails = async (userName) => {
    try {
      const docRef = doc(db, "users", currentUser?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserName(docSnap.data().name);
        setUserRole(docSnap.data().role);
        setUserDetails(docSnap.data());
        // console.log("user details loaded: " + userDetails);
        // setSpecialistField(docSnap.data().field);
        // setUserSpeciality(docSnap.data().speciality);
      } else {
        console.log("No such document!");
      }
      // GetUserDetails(currentUser?.uid);
      // setUserDetailsModal(true);
    } catch (e) {}
  };

  useEffect(() => {
    getUserDetails();
    console.log("userUpdated " + userRole);
  }, [currentUser]);

  const getSpecialistDetails = async () => {
    const docRef = doc(db, "specialists", currentUser?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserName(docSnap.data().name);
      setSpecialistField(docSnap.data().field);
      setUserSpeciality(docSnap.data().speciality);
    } else {
      console.log("No such document!");
    }
    // GetUserDetails(currentUser?.uid);
    setSpecialistDetailsModal(true);
  };

  const getClinicHours = async () => {
    const docRef = doc(db, "users", currentUser?.uid);
    const docSnap = await getDoc(docRef);
    console.log("check: " + typeof docSnap.data()?.schedule);

    if (typeof docSnap.data()?.schedule !== "undefined") {
      // if (docSnap.data()?.schedule !== "undefined") {
      console.log("this ran huh");
      // setClinicHours(docSnap.data().schedule);
    } else {
      const blankClinicHours = {
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: [],
      };
      setClinicHours(blankClinicHours);
      handleClinicHoursEdit(currentUser.uid, blankClinicHours);

      console.log("No such document!");
    }
    setEditClinicHoursModal(true);
  };

  const getClinicHours2 = async () => {
    // only load firestore data once
    if (!scheduleLoaded) {
      const docRef = doc(db, "users", currentUser?.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          if (docSnap.data().schedule === undefined) {
            handleClinicHoursEdit(currentUser.uid, clinicHours);
          } else {
            setClinicHours(docSnap.data().schedule);
          }
          setScheduleLoaded(true);
        } else {
          console.log("No such document! " + docSnap.data().role);
        }
      });
    }
    setEditClinicHoursModal(true);
  };

  const getHolidayDates = async () => {
    // const docRef = doc(db, "holidays", currentUser?.uid);
    const docRef = doc(db, "holidays", currentUser?.uid);
    const docSnap = await getDoc(docRef);
    if (typeof docSnap.data() !== "undefined") {
      setHolidaysData(docSnap.data().date);
      // console.log("this ran");
    } else {
      setHolidaysData([]);
      // console.log("this did not run");
    }
    setEditHolidaysModal(true);
  };

  return (
    <div
      className={` top-0 z-40 bg-white flex items-center  px-5 py-2
      lf:px-5 shadow-md overflow-hidden font-bold 
      ${calendarOverviewModal ? "sticky" : "sticky"}`}
    >
      {/* <h1 className="text-orange-500 font-extrabold text-2xl">NextGen</h1> */}

      {/* Left */}
      {/* REMOVED 26Jan 2022 */}
      {/* <div className="hidden">{clinicHours[0]}</div> */}
      <div className="flex items-center">
        <Image
          src="https://nxtgeneclinic.com.ph/wp-content/uploads/2021/08/NXTgen-logo-horizontal-1536x540.png"
          width={150}
          height={60}
          layout="fixed"
          alt="logo"
        />
        {/* {currentUser && (
          <div className="flex ml-0 items-center rounded-full bg-gray-100 p-2">
            <SearchIcon className="h-6 text-gray-600" />
            <input
              className="hidden md:inline-flex flex ml-2 items-center bg-transparent 
              outline-none placeholder-gray-500 flex-shrink"
              type="text"
              placeholder="search pyNotes"
              onChange={(event) => {
                // setSearchTerm(event.target.value);
                handleSearchChange(event.target.value);
              }}
            />
          </div>
        )} */}
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-2 sm:space-x-4">
          {currentUser && (
            <div onClick={() => setUserDetailsModal(true)}>
              {/* <div onClick={() => getUserDetails()}> */}
              <HeaderIcon Icon={UserIcon} />
            </div>
          )}
          {/* {userRole === "Doctor" && ( */}
          {currentUser && (
            <div onClick={() => getClinicHours2()}>
              {<HeaderIcon Icon={TableIcon} />}
            </div>
          )}
          {/* {userRole === "Doctor" && ( */}
          {currentUser && (
            <div onClick={() => getHolidayDates()}>
              {<HeaderIcon Icon={PhotographIcon} />}
            </div>
          )}
          {/* {userRole === "Doctor" && ( */}
          {currentUser && (
            <div onClick={() => getSpecialistDetails()}>
              {<HeaderIcon Icon={FaNotesMedical} />}
            </div>
          )}
          <div onClick={() => setContactUsModal(true)}>
            {currentUser && <HeaderIcon Icon={MailIcon} />}
          </div>
          <div onClick={() => setPaymongoModal(true)}>
            {currentUser && <HeaderIcon Icon={ShoppingCartIcon} />}
          </div>
          <div onClick={() => setCalendarOverviewModal(true)}>
            {currentUser && <HeaderIcon Icon={CalendarIcon} />}
          </div>
          <div onClick={() => setUserRolesModal(true)}>
            {/* only admin can view - Main Admin*/}
            {currentUser?.email === process.env.REACT_APP_ADMIN_EMAIL && (
              <HeaderIcon Icon={UserGroupIcon} />
            )}
          </div>
          <div onClick={() => setUserRolesModal(true)}>
            {/* onlyadmin can view - additional admin*/}
            {/* {currentUser && userRole === "admin" && (
              <HeaderIcon Icon={UserGroupIcon} />
            )} */}
          </div>
        </div>
      </div>
      {/* Right */}

      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile Pic */}

        <p className="whitepace-nowrap font-semibold pr-0 hidden sm:block">
          {/* {currentUser?.email} */}
          {currentUser?.displayName}
          {/* {currentUser?.uid} */}
        </p>

        {/* <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" /> */}
        <UserAuthentication />
      </div>
    </div>
  );
}

export default Header;
