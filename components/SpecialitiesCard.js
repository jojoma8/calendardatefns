import { data } from "autoprefixer";
import { useState } from "react";
import { useEditUserDetailsContext } from "../contextProvider/EditUserDetailsContext";
import SpecialistCard from "./SpecialistCard";

function SpecialitiesCard({ fieldName, fieldDesc, fieldCode }) {
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

  // const [specialistDetails, setSpecialistDetails] = useState({
  //   id: "pending",
  //   name: "Loading",
  //   speciality: "pending",
  //   schedule: { Mon: ["pending"] },
  // });
  //   check how to run this section after state is set

  const ent = allSpecialistsDetails.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(fieldCode)
    );
  });
  // setSpecialistDetails(ent());

  //   console.log("ent filter: " + ent[0]["field"]);
  // setAllSpecialistsDetails(ent);
  // console.log("allData: " + allSpecialistsDetails[0].name);

  return (
    <div className="flex justify-center items-center ">
      <div
        className="
       mb-10 border-2 max-w-2xl "
      >
        <div className="flex bg-cyan-50">
          <div
            className="w-32 h-32 bg-sky-300 rounded-full my-10 p-16 m-10
                    border-4 border-orange-500"
          ></div>
          <div className="py-5 pr-10">
            <div className="headerText pt-5 text-xl">{fieldName}</div>
            <div className="bodyText pt-5 ">{fieldDesc}</div>
            <div className="linkText pt-5">See our doctors</div>
          </div>
        </div>
        <div
          className="flex flex-wrap justify-center items-center"
          // key={data.id + data.fieldCode}
        >
          {ent.map((data) => (
            // {{specialistDetails.map((data) => (
            <SpecialistCard
              name={data.name}
              speciality={data.speciality}
              key={data.id}
              schedule={data.schedule}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpecialitiesCard;
