import { useEffect, useState } from "react";
import { useEditUserDetailsContext } from "../contextProvider/EditUserDetailsContext";
import { useSignInContext } from "../contextProvider/SignInContext";
import { useAuth } from "../firebase";
import BookingAccordion from "./BookingAccordion";

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
    bookingTime,
    setBookingTime,
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

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen 
            items-center 
            justify-center z-50 bg-opacity-70 w-screen"
      onClick={() => {
        setAppointmentBookingModal(false);
      }}
    >
      <div
        className="bg-white p-8 md:p-12 my-10 w-5/6
            md:w-8/12
            rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="font-bold text-2xl">Book an Appointment</h3>
        </section>
        <section className="mt-2">
          <div className="flex mt-5">
            <div className="font-semibold text-xl">Patient Name:</div>
            <div className="ml-2 text-xl">{currentUser?.displayName}</div>
          </div>
          {/* <div>{data[0].issue}</div> */}
        </section>
        <section>
          <BookingAccordion
            title="Issue"
            titleContent={bookingData.issue}
            list={bookingOptions.issue}
          />
          {doctorAccordionToggle && (
            <BookingAccordion
              title="Doctor"
              titleContent={bookingData.doctor}
              list={bookingOptions.doctor}
            />
          )}
          {timeAccordionToggle && (
            <BookingAccordion
              title="Time"
              titleContent={bookingData.time}
              list={bookingOptions.time.Mon}
            />
          )}
        </section>
        <section>
          <button
            className="btn mt-5"
            onClick={() => {
              // handleChangeUserDetails();
            }}
          >
            Confirm Booking
          </button>
        </section>
      </div>
    </div>
  );
}

export default AppointmentBookingModal;
