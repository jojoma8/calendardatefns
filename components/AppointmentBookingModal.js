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
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen 
            items-center 
            justify-center z-50 bg-opacity-70 w-screen"
      onClick={() => {
        setAppointmentBookingModal(false);
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
        className="bg-white p-8 sm:p-12 my-10 w-5/6
            md:w-8/12
            rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="headerText text-3xl">Book an Appointment</h3>
        </section>
        <div className="">
          <section className="mt-2">
            <div className="flex mt-5">
              <div className="font-semibold text-xl">Patient Name:</div>
              <div className="ml-2 text-xl">{currentUser?.displayName}</div>
            </div>
            {/* <div>{data[0].issue}</div> */}
          </section>
          <section>
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
        <section>
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
        </section>
      </motion.div>
    </motion.div>
  );
}

export default AppointmentBookingModal;
