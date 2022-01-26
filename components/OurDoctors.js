import { useEffect, useState } from "react";
import { useEditUserDetailsContext } from "../contextProvider/EditUserDetailsContext";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
  getDocs,
  serverTimestamp,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import db, { useAuth } from "../firebase";
import SpecialistCard from "./SpecialistCard";
import { data } from "autoprefixer";
import SpecialitiesCard from "./SpecialitiesCard";
import { useSelectedDateContext } from "../contextProvider/SelectedDateContext";
import { trial } from "../utilities/SpecialistDetailsUpdate";
import EditClinicHoursModal from "./EditClinicHoursModal";
import { useSignInContext } from "../contextProvider/SignInContext";
import useCalendar from "./CalendarSelector";
import CalendarSelector from "./CalendarSelector";
import { ContactUs } from "./EmailForm";

function OurDoctors() {
  const [calendar, setCalendar] = useState(new Date().toDateString());

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
    allSpecialistsDetails,
    setAllSpecialistsDetails,
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
  } = useSelectedDateContext();

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
    appointmentBookingModal,
    setAppointmentBookingModal,
    specialistDetailsModal,
  } = useSignInContext();

  const getSpecialistDetails = async () => {
    const docRef = collection(db, "specialists");
    const docSnap = await getDocs(docRef);
    const userData = docSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    setAllSpecialistsDetails(userData);
    // console.log("specilistData: " + userData);
    // const test = trial();
    // console.log("testData: " + test);
  };

  useEffect(() => {
    getSpecialistDetails();
    // setAllSpecialistsDetails(getSpecialistDetails());
  }, [editClinicHoursModal]);

  // useEffect(() => {
  //   getSpecialistDetails();
  //   // setAllSpecialistsDetails(getSpecialistDetails());
  // }, [specialistDetailsModal]);

  return (
    <div>
      <div className="bg-cyan-50 px-20">
        <div className="headerText text-4xl pt-20">Our Doctors</div>
        <div className="bodyText  pt-10 pb-20">
          NXTgen E-Clinic offers access to expert specialists via a secured
          video consultation platform. Scroll down to see our doctors’ profiles,
          specialty and schedule. Consultation fees already include
          e-prescription and lab requests, if deemed necessary. Fees vary per
          doctor but start as low as PHP 670.
        </div>
        <div className="pb-10">
          <button
            onClick={() => setAppointmentBookingModal(true)}
            className="btn py-3 text-white w-full sm:w-3/6"
          >
            Book an Appointment
          </button>
        </div>
      </div>

      {/* <CalendarSelector setCalendar={setCalendar} />
      <div>{calendar}</div> */}
      <div className="mt-10">
        <div>
          <SpecialitiesCard
            fieldName="Otorhinolaryngology - Head and Neck Surgery (ENT)"
            fieldDesc="Specializes in the management of medical conditions of the ears,
            nose and sinuses, throat, voice box; and performs procedures
            and/or surgeries for obstructive conditions and tumors of the head
            and neck including thyroid masses and cancers."
            fieldCode="ent"
          />
          <SpecialitiesCard
            fieldName="Family Medicine"
            fieldDesc="Treats individual and family across all ages, genders, and parts of the body such as cough, colds, fever, headache and other diseases."
            fieldCode="family medicine"
          />
        </div>
      </div>
    </div>
  );
}

export default OurDoctors;
