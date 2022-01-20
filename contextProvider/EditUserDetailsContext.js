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
      }}
    >
      {children}
    </EditUserDetailsContext.Provider>
  );
};

export default EditUserDetailsProvider;
