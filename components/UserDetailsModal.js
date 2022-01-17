import { useContext, useEffect, useRef, useState } from "react";
import { useSignInContext } from "../contextProvider/SignInContext";
import db from "../firebase";
import {
  login,
  signInWithGoogle,
  signup,
  updateUserName,
  useAuth,
} from "../firebase";
import { handleUserEdit } from "../utilities/UserUtils";
// import { SignInContext } from "../utilities/Context";
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
import WeekdayButtons from "./WeekdayButtons";
import {
  HourListReader,
  HourRangeGenerator,
  NextThirtyMinutes,
} from "../utilities/TimeCalculations";

function UserDetailsModal() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();
  const userRoleRef = useRef();
  const { userDetailsModal, setUserDetailsModal } = useSignInContext();
  const currentUser = useAuth();
  const { userName, setUserName, userRole, setUserRole } =
    useEditUserDetailsContext();
  const {
    startOfMonth,
    startOfWeek,
    endOfMonth,
    endOfWeek,
    addDays,
    addMonths,
    startOfDay,
    format,
    isSameMonth,
    isSameDay,
    isToday,
    isPast,
    getMonth,
    compareAsc,
    startOfToday,
    startOfHour,
    endOfDay,
    addHours,
    addMinutes,
    isSameHour,
    isSameMinute,
    startOfMinute,
    getDay,
  } = require("date-fns");
  //   useEffect(async () => {
  //     const getUserDetails = async (userName) => {
  //       // const auth = await getAuth();
  //       // const docRef = doc(db, "users");
  //       const docRef = doc(db, "users", currentUser?.uid);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         //   console.log("Document data:", docSnap.data().role);
  //         setUserName(docSnap.data().name);
  //         setUserRole(docSnap.data().role);
  //       } else {
  //         console.log("No such document!");
  //       }
  //       console.log(userRole);
  //       // onSnapshot(doc(db, "users", currentUser.uid));
  //     };
  //   }, []);

  //   useEffect(() => {
  //   const getUserDetails = async (userName) => {
  //     const docRef = doc(db, "users", currentUser?.uid);
  //     const docSnap = await getDoc(docRef).data();

  //     // setUserName(docSnap.name);
  //     // setUserRole(docSnap.role);
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data().role);
  //       setUserName(docSnap.data().name);
  //       setUserRole(docSnap.data().role);
  //     } else {
  //       console.log("No such document!");
  //     }
  //     console.log(currentUser?.uid);
  //     // onSnapshot(doc(db, "users", currentUser.uid));
  //   };
  //   }, []);

  async function handleChangeUserDetails() {
    setLoading(true);
    try {
      await updateUserName(displayNameRef.current.value);
      await handleUserEdit(
        displayNameRef.current.value,
        currentUser?.uid,
        userRoleRef.current.value
      );
      //   console.log(userRole);
    } catch {
      alert("Error");
    }
    setLoading(false);
    setUserDetailsModal(false);
    // console.log(currentUser.displayName);
  }

  // const workHoursList = [
  //   "1:00 AM",
  //   "1:30 AM",
  //   "2:00 AM",
  //   "4:00 AM",
  //   "10:00 AM",
  // ];

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center 
    justify-center z-50 bg-opacity-70 w-screen"
      onClick={() => {
        setUserDetailsModal(false);
      }}
    >
      <div
        className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="font-bold text-2xl">User Details</h3>
          {/* <p className="text-gray-600 pt-2">Choose sign in method</p> */}
        </section>
        <section className="mt-10">
          <div className="flex flex-col">
            <div>
              <input
                ref={displayNameRef}
                className="mb-5 p-3 rounded bg-gray-100"
                // placeholder="User Name"
                defaultValue={currentUser?.displayName}
              />
            </div>
            <div>{currentUser?.email}</div>
            <input
              ref={userRoleRef}
              className="mb-5 p-3 rounded bg-gray-100"
              defaultValue={userRole}
            />
            {/* <div>
              <input
                ref={emailRef}
                className="mb-5 p-3 rounded bg-gray-100"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                ref={passwordRef}
                className="mb-5 p-3 rounded bg-gray-100"
                placeholder="Password"
                type="password"
              />
            </div> */}
            {/* <div className="flex flex-col justify-end">
              <a className="text-sm text-blue-600 hover:text-blue-800 mb-2">
                Forgot your password?
              </a>
              <p className="text-sm mb-5">
                Don't have an account yet?{" "}
                <a className="text-blue-600 hover:text-blue-800">Sign Up</a>
              </p>
            </div> */}
            {/* <div className="flex">
              <WeekdayButtons day={"Mon"} />
              <WeekdayButtons day={"Tue"} />
              <WeekdayButtons day={"Wed"} />
              <WeekdayButtons day={"Thu"} />
              <WeekdayButtons day={"Fri"} />
              <WeekdayButtons day={"Sat"} />
              <WeekdayButtons day={"Sun"} />
            </div>
            <div className="flex">
              <div>Input:</div>
              <div className="ml-2">9:00 AM</div>
            </div>
            <div>
              <div>Work Schedule:</div>
              <div>
                <div className="flex">
                  <div className="ml-2">Mon</div>
                  <div className="ml-2">
                    {/* {workHoursRange(workHoursList[0], workHoursList[0])} */}
            {/* {HourRangeGenerator(workHoursList)}
                  </div>
                </div>
              </div> */}
            {/* </div> */}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white
              font-bold py-2 
              rounded shadow-lg hover:shadow-xl transition duration-200"
              // type="submit"
              onClick={() => {
                handleChangeUserDetails();
                // setUserName(currentUser.displayName);
                // console.log(currentUser?.uid);
              }}
              //   onClick={() => {
              //     handleChangeUserDetails().then((res) => {
              //       setUserDetailsModal(false);
              //     });
              //   }}
            >
              Update Details
            </button>
            {/* <div className="w-full flex items-center justify-center">
              <span className="p-3 text-gray-400 m-2">OR</span>
            </div> */}
            {/* <button
              className="bg-red-600 hover:bg-red-700 text-white
            font-bold py-2 
            rounded shadow-lg hover:shadow-xl transition duration-200"
              // type="submit"
              onClick={() => {
                signInWithGoogle();
                setSignUpModal(false);
              }}
            >
              Login with Google
            </button> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserDetailsModal;
