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

import ourDoctorsBG from "../assets/NXTgen-Page-Cover-Our-Doctors.jpg";
import Image from "next/image";

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

  // console.log(
  //   `Basic ${Buffer.from(process.env.REACT_APP_PAYMONGO_PUBLIC_KEY).toString(
  //     "base64"
  //   )}`
  // );
  // console.log("test: " + process.env.REACT_APP_PAYMONGO_SECRET_KEY);

  return (
    <div className=" max-w-7xl mx-auto 8">
      <div
        className="relative bg-blue-10 -z-20 lg:pt-20 xl:pt-32
          "
      >
        <div className="absolute -z-10 bottom-0 translate-y-2">
          <Image src={ourDoctorsBG} alt={`NXTgen e-clinic image`} />
        </div>

        <div
          className="md:px-28 lg:px-40 px-10 md:w-4/5 w-full 
            pt-20 lg:pt-0"
        >
          <div className="headerText md:text-5xl text-4xl ">Our Doctors</div>
          <div
            className="bodyText pt-10 pb-20 font-sans text-base
              max-w-md"
          >
            NXTgen E-Clinic offers access to expert specialists via a secured
            video consultation platform. Scroll down to see our doctors’
            profiles, specialty and schedule. Consultation fees already include
            e-prescription and lab requests, if deemed necessary. Fees vary per
            doctor but start as low as PHP 670.
          </div>
          <div className="pb-10 lg:pt-20">
            <button
              onClick={() => setAppointmentBookingModal(true)}
              className="btn py-3 text-white w-full 
                  sm:w-3/6 md:w-7/12 lg:w-6/12"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </div>

      {/* <CalendarSelector setCalendar={setCalendar} />
      <div>{calendar}</div> */}
      <div className="mt-5">
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
