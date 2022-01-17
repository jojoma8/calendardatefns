import { useContext, useEffect, useRef, useState } from "react";
import {
  login,
  signInWithGoogle,
  signup,
  updateUserName,
  useAuth,
} from "../firebase";
import WeekdayButtons from "./WeekdayButtons";
import {
  HourListReader,
  HourRangeGenerator,
  NextThirtyMinutes,
} from "../utilities/TimeCalculations";
import { useSignInContext } from "../contextProvider/SignInContext";

function AmendClinicHoursModal() {
  const currentUser = useAuth();
  const workHoursList = [
    "1:00 AM",
    "1:30 AM",
    "2:00 AM",
    "4:00 AM",
    "10:00 AM",
  ];
  const {
    signInModal,
    setSignInModal,
    signUpModal,
    setSignUpModal,
    forgotPasswordModal,
    setForgotPasswordModal,
    currentUserID,
    setCurrentUserID,
    amendClinicHoursModal,
    setAmendClinicHoursModal,
    editClinicHoursModal,
    setEditClinicHoursModal,
  } = useSignInContext();

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center 
      justify-center z-50 bg-opacity-70 w-screen"
      onClick={() => {
        setAmendClinicHoursModal(false);
      }}
    >
      <div
        className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="font-bold text-2xl">Clinic Hours</h3>
          {/* <p className="text-gray-600 pt-2">Choose sign in method</p> */}
        </section>
        <section className="mt-10">
          <div className="flex flex-col">
            <div>
              <input
                className="mb-5 p-3 rounded bg-gray-100"
                // placeholder="User Name"
                defaultValue={currentUser?.displayName}
              />
            </div>

            <div className="flex">
              <WeekdayButtons day={"Mon"} />
              <WeekdayButtons day={"Tue"} />
              <WeekdayButtons day={"Wed"} />
              <WeekdayButtons day={"Thu"} />
              <WeekdayButtons day={"Fri"} />
              <WeekdayButtons day={"Sat"} />
              <WeekdayButtons day={"Sun"} />
            </div>

            <div>
              <div className="text-lg font-bold m-5">Clinic Hours</div>
              <div className="m-5">
                <div className="flex">
                  <div className="ml-2">Mon</div>
                  <div className="ml-2">
                    {/* {workHoursRange(workHoursList[0], workHoursList[0])} */}
                    {HourRangeGenerator(workHoursList)}
                  </div>
                </div>
              </div>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white
                font-bold py-2 
                rounded shadow-lg hover:shadow-xl transition duration-200"
              onClick={() => {
                handleChangeUserDetails();
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

export default AmendClinicHoursModal;
