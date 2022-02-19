import { data } from "autoprefixer";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useEditUserDetailsContext } from "../contextProvider/EditUserDetailsContext";
import SpecialistCard from "./SpecialistCard";
import SVGIcon from "./svg/SVGIcon";

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
  const [toggle, setToggle] = useState(false);

  const ent = allSpecialistsDetails.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(fieldCode)
    );
  });
  // setSpecialistDetails(ent());

  //   console.log("ent filter: " + ent[0]["field"]);
  // setAllSpecialistsDetails(ent);
  // console.log("allData: " + allSpecialistsDetails[0].name);

  const carretDirection = () => {
    if (toggle) {
      return "-rotate-90";
    } else {
      return "rotate-90";
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div
        className="flex-grow
        border-2 max-w-7xl mx-5 mt-10 "
      >
        <div
          className="flex cursor-pointer "
          onClick={() => setToggle(!toggle)}
        >
          <div className=" p-5 m-5">
            <SVGIcon field={fieldName} />
          </div>
          <div className="py-5 pr-10 flex-grow">
            <div className="headerText pt-5 text-xl">{fieldName}</div>
            <div className="bodyText pt-5 ">{fieldDesc}</div>
            <div className="linkText pt-5">See our doctors</div>
          </div>
          <div className="flex items-center">
            <div
              className={`mr-5 ${carretDirection()} 
              transition-all duration-700`}
            >
              <SVGIcon field={"play"} />
            </div>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {toggle && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}

              // key={data.id + data.fieldCode}
            >
              <motion.div
                variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap justify-center items-center"
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SpecialitiesCard;
