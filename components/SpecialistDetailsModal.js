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
import { handleSpecialistEdit, handleUserEdit } from "../utilities/UserUtils";
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

function SpecialistDetailsModal() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();
  const userRoleRef = useRef();
  const specialistFieldRef = useRef();
  const userSpecialityRef = useRef();
  const { specialistDetailsModal, setSpecialistDetailsModal } =
    useSignInContext();
  const currentUser = useAuth();
  const {
    userName,
    setUserName,
    userRole,
    setUserRole,
    specialistField,
    setSpecialistField,
    userSpeciality,
    setUserSpeciality,
  } = useEditUserDetailsContext();

  async function handleChangeSpecialistDetails() {
    setLoading(true);
    try {
      //   await updateUserName(displayNameRef.current.value);
      await handleSpecialistEdit(
        displayNameRef.current.value,
        currentUser?.uid,
        // userRoleRef.current.value,
        specialistFieldRef.current.value,
        userSpecialityRef.current.value
      );
    } catch {
      alert("Error");
    }
    setLoading(false);
    setSpecialistDetailsModal(false);
  }

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center 
    justify-center z-50 bg-opacity-70 w-screen"
      onClick={() => {
        setSpecialistDetailsModal(false);
      }}
    >
      <div
        className="bg-white max-w-lg mx-auto p-8 sm:p-12 my-10 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="headerText text-3xl">Specialists Details</h3>
        </section>
        <section className="mt-5">
          <div className="flex flex-col w-96">
            <div className="mb-5">
              <div className="headerText text-lg">Specialist Name</div>
              <input
                ref={displayNameRef}
                className=" p-3 rounded bg-gray-100 min-w-full"
                defaultValue={currentUser?.displayName}
              />
            </div>
            <div className="mb-5 flex">
              <div className="headerText text-lg">Email: </div>
              <div className="pl-2 flex items-center">{currentUser?.email}</div>
            </div>
            {/* <div className="mb-5 ">
              <div className="headerText text-lg">Specialist Role</div>
              <input
                ref={userRoleRef}
                className=" p-3 rounded bg-gray-100 min-w-full"
                defaultValue={userRole}
              />
            </div> */}
            <div className="mb-5 ">
              <div className="headerText text-lg">Specialist Field</div>
              <input
                ref={specialistFieldRef}
                className=" p-3 rounded bg-gray-100 min-w-full"
                defaultValue={specialistField}
              />
            </div>
            <div className="mb-5 ">
              <div className="headerText text-lg">Speciality</div>
              <textarea
                ref={userSpecialityRef}
                className=" p-3 rounded bg-gray-100 min-w-full"
                defaultValue={userSpeciality}
              />
            </div>
            <button
              className="btn"
              onClick={() => {
                handleChangeSpecialistDetails();
              }}
            >
              Update Details
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SpecialistDetailsModal;
