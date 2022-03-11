import { useEffect, useState } from "react";
import { useEditUserDetailsContext } from "../contextProvider/EditUserDetailsContext";
import { useSignInContext } from "../contextProvider/SignInContext";
import { useAuth } from "../firebase";
import BookingAccordion from "./BookingAccordion";
import BookingAccordionDate from "./BookingAccordionDate";
import BookingAccordionDoctor from "./BookingAccordionDoctor";
import BookingAccordionIssue from "./BookingAccordionIssue";
import BookingAccordionTime from "./BookingAccordionTime";
import { motion, AnimatePresence } from "framer-motion";

function AppointmentBookingModal() {
  const [tabSelected, setTabSelected] = useState(1);
  const currentUser = useAuth();
  const { appointmentBookingModal, setAppointmentBookingModal } =
    useSignInContext();

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

  //   console.log("this ran: " + doctorAccordionToggle);
  useEffect(() => {
    console.log("modal doctor toggle " + doctorAccordionToggle);
  }, [doctorAccordionToggle]);

  //   useEffect(() => {
  //     console.log("updatedBookingData2 " + bookingData.date);
  //   }, [bookingData]);

  const tabColor = (number) => {
    if (number === tabSelected) {
      return "text-orange-550 border-b-2 border-orange-550";
    }
  };
  const hiddenTab = (number) => {
    if (number !== tabSelected) {
      return "hidden";
    }
  };

  return (
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
            h-screen"
      // onClick={() => {
      //   setAppointmentBookingModal(false);
      // }}
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
        className="flex flex-col w-11/12
          bg-white sm:max-w-xl md:max-w-2xl p-8 md:p-12 
            rounded-lg shadow-2xl sm:h-5/6 h-5/6"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="flex">
          <h3 className="headerText text-3xl sm:w-screen">
            Book an Appointment
          </h3>
        </section>
        <div
          className="flex flex-row 
          mt-4 items-center cursor-pointer w-full"
        >
          <div
            className={`${tabColor(
              1
            )} flex-grow p-2 flex items-center justify-center
              text-center basis-1/3`}
            onClick={() => setTabSelected(1)}
          >
            <div className="flex flex-col ">
              <div>Step 1:</div>
              <div className="flex ">Patient Details</div>
            </div>
          </div>
          <div
            className={`${tabColor(
              2
            )} flex-grow p-2 flex items-center justify-center
              text-center basis-1/3`}
            onClick={() => setTabSelected(2)}
          >
            <div className="flex flex-col ">
              <div>Step 2:</div>
              <div>Appointment Details</div>
            </div>
          </div>
          <div
            className={`${tabColor(
              3
            )} flex-grow p-2 flex items-center justify-center
              text-center basis-1/3`}
            onClick={() => setTabSelected(3)}
          >
            <div className="flex flex-col ">
              <div>Step 3:</div>
              <div>Payment</div>
            </div>
          </div>
        </div>
        <div
          className="flex-grow overflow-hidden 
          overflow-y-auto"
        >
          <div className={`${hiddenTab(1)} flex flex-col `}>
            <section className="mt-2">
              <div className="flex mt-5">
                <div className="font-semibold text-xl">Patient Name:</div>
                <div className="ml-2 text-xl">{currentUser?.displayName}</div>
              </div>
              {/* <div>{data[0].issue}</div> */}
            </section>
          </div>
          <div className={`${hiddenTab(2)} flex flex-col `}>
            <section className="">
              <BookingAccordionIssue
                title="Issue"
                titleContent={bookingData.issue}
                list={bookingOptions.issue}
              />
              {doctorAccordionToggle && (
                <BookingAccordionDoctor
                  title="Doctor"
                  titleContent={bookingData.doctor}
                  list={bookingOptions.doctor}
                />
              )}
              {dateAccordionToggle && (
                <BookingAccordionDate
                  title="Date"
                  titleContent={bookingData.date}
                  list={bookingOptions.date}
                />
              )}
              {timeAccordionToggle && (
                <BookingAccordionTime
                  title="Time"
                  titleContent={bookingData.time}
                  list={bookingOptions.time.Mon}
                />
              )}
            </section>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="flex justify-evenly mt-5">
            <button
              className="btn w-44"
              onClick={() => {
                // handleChangeUserDetails();
              }}
            >
              Confirm Booking
            </button>
            <button
              className="btnCancel w-44 "
              onClick={() => {
                setAppointmentBookingModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AppointmentBookingModal;
