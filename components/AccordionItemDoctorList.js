import React, { useRef, useState } from "react";

function AccordionItemDoctorList({
  title = "Title",
  desc = "Selected",
  setDesc,
  setDoctorList,
  options = ["a", "b", "c"],
  uid = "",
  doctorList = "",
  name = "",
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
    if (item == "Doctor") {
      if (!JSON.stringify(doctorList.map(Object.values)).includes(uid)) {
        // console.log("add doctor to list " + uid);
        setDoctorList((list) => [...list, { uid: uid, name: name }]);
      }
      // console.log("doctor already in list");
    }
    if (item != "Doctor") {
      if (JSON.stringify(doctorList.map(Object.values)).includes(uid)) {
        // console.log("remove doctor " + uid);
        const myArray = doctorList.filter(function (obj) {
          return obj.uid !== uid;
        });
        // console.log("newList " + myArray);
        setDoctorList(myArray);
      }
    }
  };
  //   console.log("height: " + contentSpace.current.scrollHeight);

  return (
    <div className={` border flex flex-col`}>
      <div
        className="flex cursor-pointer p-2 hover:bg-orange-100
            transition-all duration-500"
        onClick={() => toggleAccordion()}
      >
        <div className="headerText font-semibold text-lg">{title}</div>
        <div className="ml-2 text-xl">{descLocal}</div>
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

export default AccordionItemDoctorList;
