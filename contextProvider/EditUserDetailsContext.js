import { createContext, useContext, useState } from "react";
const EditUserDetailsContext = createContext();

export const useEditUserDetailsContext = () =>
  useContext(EditUserDetailsContext);

const EditUserDetailsProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  return (
    <EditUserDetailsContext.Provider
      value={{
        userName,
        setUserName,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </EditUserDetailsContext.Provider>
  );
};

export default EditUserDetailsProvider;
