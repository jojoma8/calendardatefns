import { Firestore } from "@firebase/firestore";
import React, { useRef, useState } from "react";

function AccordionItemWeeklyOverview({
  title = "Title",
  desc = "Selected",
  setDesc,
  // setDoctorList,
  options = ["a", "b", "c"],
  // uid = "",
  // doctorList = "",
  // name = "",
  doctorDetails,
  listSelectedDoctor,
  setListSelectedDoctor,
  filteredDoctorDetails,
  setFilteredDoctorDetails,
}) {
  const [toggle, setToggle] = useState(false);
  const [descLocal, setDescLocal] = useState(desc);

  const [height, setHeight] = useState("0px");
  const contentSpace = useRef(null);

  function toggleAccordion() {
    setToggle(!toggle);
    setHeight(toggle ? "0px" : `${contentSpace.current.scrollHeight}px`);
  }

  const updateState = (item) => {
    setDescLocal(item);
    toggleAccordion();
    setDesc(item);

    // create list of names of slected doctors
    if (listSelectedDoctor.includes(item)) {
      // console.log("already in list");
      setListSelectedDoctor(listSelectedDoctor.filter((x) => x != item));
    } else {
      // console.log("not in list");
      setListSelectedDoctor((oldArray) => [...oldArray, item]);
    }

    // create list of doctor details (object list)
    try {
      // search for index position of doctor's details in object list
      const index = doctorDetails.map((x) => x.name).indexOf(item.toString());
      // check
      // if (filteredDoctorDetails[0]) {
      //   console.log(
      //     "filtered Doctor Details List start " +
      //       JSON.stringify(filteredDoctorDetails[0].name)
      //   );
      // }
      // First check if doctor name is in doctorDetails
      if (index >= 0) {
        // console.log("add doctor to object list");
        // Then check if specific doctor's details is in filtered obj list
        const isFound = filteredDoctorDetails.some((element) => {
          if (element.name === doctorDetails[index].name.toString()) {
            return true;
          }
        });
        // console.log("foundDoctor? " + isFound);
        // if doctor's details not in object list, then add
        if (!isFound) {
          setFilteredDoctorDetails((oldArray) => [
            ...oldArray,
            doctorDetails[index],
          ]);
        }
        // if doctor's details already in object list, then remove
        if (isFound) {
          const filtered = filteredDoctorDetails.filter(
            (d) => d.name !== doctorDetails[index].name
          );
          // console.log("searching for " + doctorDetails[index].name);
          setFilteredDoctorDetails(filtered);
          // console.log("fileteredList here " + filtered[0].name);
        }
        // console.log("filteredDoctorDetails List end :" + filteredDoctorDetails);
      }
      // if (index < 0) {
      //   console.log("doctor not found in object list");
      // }
      // console.log("index here: " + index);
    } catch (e) {}
  };

  //   console.log("len " + selectedDoctorIndexList.length);

  return (
    <div className={` border flex flex-col`}>
      <div
        className="flex cursor-pointer p-2 hover:bg-orange-100
            transition-all duration-500"
        onClick={() => toggleAccordion()}
      >
        <div className="headerText font-semibold text-lg flex items-center justify-center">
          {title}
        </div>
        {/* <div className="ml-2 text-xl">{descLocal}</div> */}
        <div className="ml-2 text-base flex">
          {listSelectedDoctor[0] && (
            <div className="bg-orange-200 px-3 py-1 rounded-xl shadow-l">
              {listSelectedDoctor[0]}
            </div>
          )}
          {listSelectedDoctor[1] && (
            <div className="bg-blue-200 px-3 py-1 rounded-xl shadow-l">
              {listSelectedDoctor[1]}
            </div>
          )}
        </div>
      </div>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="flex flex-wrap overflow-hidden transition-max-height 
            duration-700 ease-in-out items-center "
      >
        {options.map((item) => (
          <div key={item} className="pl-2 pr-1 py-1 ">
            <div
              key={item}
              className={` px-3 py-1 rounded-xl shadow-l
                text-orange-500 border-2 border-orange-500
                cursor-pointer hover:bg-orange-500 hover:text-white
                transition-all duration-200
                `}
              onClick={() => updateState(item)}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccordionItemWeeklyOverview;
