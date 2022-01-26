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
import AccordionItem from "./AccordionItem";

function SpecialistDetailsModal() {
  const [loading, setLoading] = useState(false);
  const [specialistFieldLocal, setSpecialistFieldLocal] = useState();
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
    specialitiesList,
    userSpeciality,
    setUserSpeciality,
    allSpecialistsDetails,
    setAllSpecialistsDetails,
  } = useEditUserDetailsContext();

  function updateAllSpecialistData(uid) {
    const temp = allSpecialistsDetails;
    // temp[currentUser?.uid].name = displayNameRef.current.value;
    // console.log("tempAllData: " + temp[currentUser?.uid].name);
    const key = Object.keys(temp).find(
      (key) => temp[key].uid === currentUser?.uid
    );
    allSpecialistsDetails[key].name = displayNameRef.current.value;
    allSpecialistsDetails[key].field = specialistField;
    allSpecialistsDetails[key].speciality = userSpecialityRef.current.value;
    // console.log("tempAllData: " + allSpecialistsDetails[key].name);
  }

  async function handleChangeSpecialistDetails() {
    setLoading(true);
    try {
      //   await updateUserName(displayNameRef.current.value);
      await handleSpecialistEdit(
        displayNameRef.current.value,
        currentUser?.uid,
        // specialistFieldRef.current.value,
        // specialistFieldLocal,
        specialistField,
        userSpecialityRef.current.value
      );
      updateAllSpecialistData(currentUser?.uid);
    } catch {
      alert("Error");
    }
    setLoading(false);
    setSpecialistDetailsModal(false);
  }

  // console.log("specialist field: " + specialistField);

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center 
    justify-center z-50 bg-opacity-70 w-screen"
      // onClick={() => {
      //   setSpecialistDetailsModal(false);
      // }}
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
              <div className="headerText text-lg ml-2">Specialist Name</div>
              <input
                ref={displayNameRef}
                className=" p-3 rounded bg-gray-100 min-w-full"
                defaultValue={currentUser?.displayName}
              />
            </div>
            <div className="mb-5 flex">
              <div className="headerText text-lg ml-2">Email: </div>
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
            {/* <div className="mb-5 ">
              <div className="headerText text-lg ml-2">Specialist Field</div>
              <input
                ref={specialistFieldRef}
                className=" p-3 rounded bg-gray-100 min-w-full"
                defaultValue={specialistField}
              />
            </div> */}
            <div className="mb-5">
              <AccordionItem
                title={"Specialist Field: "}
                desc={specialistField}
                setDesc={setSpecialistFieldLocal}
                options={specialitiesList}
              />
            </div>
            <div className="mb-5 ">
              <div className="headerText text-lg ml-2">Speciality</div>
              <textarea
                ref={userSpecialityRef}
                className=" p-3 rounded bg-gray-100 min-w-full"
                defaultValue={userSpeciality}
              />
            </div>
            <div className="flex justify-evenly mt-5">
              <button
                className="btn w-44"
                onClick={() => {
                  handleChangeSpecialistDetails();
                }}
              >
                Update Details
              </button>
              <button
                className="btnCancel w-44 "
                onClick={() => {
                  setSpecialistDetailsModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SpecialistDetailsModal;
