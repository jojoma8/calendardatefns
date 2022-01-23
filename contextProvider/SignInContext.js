import { createContext, useContext, useState } from "react";
const SignInContext = createContext();

export const useSignInContext = () => useContext(SignInContext);

const SignInProvider = ({ children }) => {
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [specialistDetailsModal, setSpecialistDetailsModal] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(false);
  const [amendClinicHoursModal, setAmendClinicHoursModal] = useState(false);
  const [editClinicHoursModal, setEditClinicHoursModal] = useState(false);
  const [editHolidaysModal, setEditHolidaysModal] = useState(false);
  const [appointmentBookingModal, setAppointmentBookingModal] = useState(false);

  return (
    <SignInContext.Provider
      value={{
        signInModal,
        setSignInModal,
        signUpModal,
        setSignUpModal,
        userDetailsModal,
        setUserDetailsModal,
        specialistDetailsModal,
        setSpecialistDetailsModal,
        forgotPasswordModal,
        setForgotPasswordModal,
        currentUserID,
        setCurrentUserID,
        amendClinicHoursModal,
        setAmendClinicHoursModal,
        editClinicHoursModal,
        setEditClinicHoursModal,
        editHolidaysModal,
        setEditHolidaysModal,
        appointmentBookingModal,
        setAppointmentBookingModal,
      }}
    >
      {children}
    </SignInContext.Provider>
  );
};

export default SignInProvider;
