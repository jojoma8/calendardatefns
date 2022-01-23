import { createContext, useContext, useState } from "react";
const EditUserDetailsContext = createContext();

export const useEditUserDetailsContext = () =>
  useContext(EditUserDetailsContext);

const EditUserDetailsProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [specialistField, setSpecialistField] = useState("");
  const [userSpeciality, setUserSpeciality] = useState("");
  const [allSpecialistsDetails, setAllSpecialistsDetails] = useState([
    {
      name: "loading",
      id: "initiate",
      field: "nothing",
    },
  ]);
  const [issue, setIssue] = useState("Choose Issue");
  const [doctor, setDoctor] = useState("Choose Doctor");
  const [doctorList, setDoctorList] = useState([]);
  const [bookingTime, setBookingTime] = useState("Choose Time");
  const [workHoursList, setWorkHoursList] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });
  const [bookingData, setBookingData] = useState({
    issue: "Choose Item",
    doctor: "Choose Doctor",
    time: "Choose Time",
  });
  const [bookingOptions, setBookingOptions] = useState({
    issue: ["ENT", "FM", "Derma"],
    doctor: ["DocX", "DocY", "DocJ"],
    time: {
      Mon: ["25Jan2022 11:00 AM", "25Jan2022 12:00 PM"],
      Tue: ["26Jan2022 10:00 AM"],
    },
  });
  const [doctorAccordionToggle, setDoctorAccordionToggle] = useState(false);
  const [dateAccordionToggle, setDateAccordionToggle] = useState(false);
  const [timeAccordionToggle, setTimeAccordionToggle] = useState(false);
  return (
    <EditUserDetailsContext.Provider
      value={{
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
        issue,
        setIssue,
        doctor,
        setDoctor,
        doctorList,
        setDoctorList,
        bookingTime,
        setBookingTime,
        workHoursList,
        setWorkHoursList,
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
      }}
    >
      {children}
    </EditUserDetailsContext.Provider>
  );
};

export default EditUserDetailsProvider;
