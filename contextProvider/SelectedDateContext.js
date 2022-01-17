import { createContext, useContext, useState } from "react";
const SelectedDateContext = createContext();

export const useSelectedDateContext = () => useContext(SelectedDateContext);

const SelectedDateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(new Date());
  const [hoursList, setHoursList] = useState([]);
  const [clinicHours, setClinicHours] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });
  const [weekDaySelected, setWeekdaySelected] = useState("Wed");
  const [holidaysData, setHolidaysData] = useState(["Loading data"]);

  return (
    <SelectedDateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedHour,
        setSelectedHour,
        clinicHours,
        setClinicHours,
        hoursList,
        setHoursList,
        weekDaySelected,
        setWeekdaySelected,
        holidaysData,
        setHolidaysData,
      }}
    >
      {children}
    </SelectedDateContext.Provider>
  );
};

export default SelectedDateProvider;
