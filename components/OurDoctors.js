import { useEffect } from "react";
import { useEditUserDetailsContext } from "../contextProvider/EditUserDetailsContext";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
  getDocs,
  serverTimestamp,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import db, { useAuth } from "../firebase";
import SpecialistCard from "./SpecialistCard";
import { data } from "autoprefixer";
import SpecialitiesCard from "./SpecialitiesCard";

function OurDoctors() {
  const currentUser = useAuth();
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

  // const uid = currentUser.uid;

  const getSpecialistDetails = async () => {
    const docRef = collection(db, "specialists");
    const docSnap = await getDocs(docRef);

    // docSnap.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });

    const userData = docSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    // console.log("this ran: " + allSpecialistsDetails);
    // console.log("userData: " + Object.values(userData[1]));
    // console.log("Data: " + userData);
    // console.log("state: " + Object.keys(allSpecialistsDetails));
    setAllSpecialistsDetails(userData);

    // const ent = userData.filter((item) => {
    //   return Object.keys(item).some((key) =>
    //     item[key].toString().toLowerCase().includes("ent")
    //   );
    // });
    // console.log("filter: " + ent[0]["field"]);
    // setAllSpecialistsDetails(ent);
    // console.log("ent: " + allSpecialistsDetails);
  };
  // console.log("data: " + Object.values(allSpecialistsDetails));

  useEffect(() => {
    getSpecialistDetails();
  }, []);

  // useEffect(() => {
  //   const collectionRef = collection(db, "specialists");

  //   const q = query(collectionRef, orderBy("timestamp", "desc"));
  //   const unsub = onSnapshot(q, (snapshot) =>
  //     setAllSpecialistsDetails(
  //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //     )
  //   );
  //   return unsub;
  // }, []);
  // console.log(allSpecialistsDetails);
  // console.log("keys: " + allSpecialistsDetails);

  return (
    <div>
      <div className="bg-cyan-50 px-20">
        <div className="headerText text-4xl pt-20">Our Doctors</div>
        <div className="bodyText  pt-10 pb-20">
          NXTgen E-Clinic offers access to expert specialists via a secured
          video consultation platform. Scroll down to see our doctors’ profiles,
          specialty and schedule. Consultation fees already include
          e-prescription and lab requests, if deemed necessary. Fees vary per
          doctor but start as low as PHP 670.
        </div>
        <div className="pb-10">
          <button
            className="btn py-3 text-white
         w-full sm:w-3/6"
          >
            Book an Appointment
          </button>
        </div>
      </div>
      <div className="mt-10">
        <div>
          <SpecialitiesCard
            fieldName="Otorhinolaryngology - Head and Neck Surgery (ENT)"
            fieldDesc="Specializes in the management of medical conditions of the ears,
            nose and sinuses, throat, voice box; and performs procedures
            and/or surgeries for obstructive conditions and tumors of the head
            and neck including thyroid masses and cancers."
            fieldCode="ent"
          />
          <SpecialitiesCard
            fieldName="Family Medicine"
            fieldDesc="Treats individual and family across all ages, genders, and parts of the body such as cough, colds, fever, headache and other diseases."
            fieldCode="fm"
          />

          {/* <div className="m-10 border-2">
            <div className="flex  bg-cyan-50">
              <div
                className="w-32 h-32 bg-sky-300 rounded-full my-10 p-16 m-10
                    border-4 border-orange-500"
              ></div>
              <div className="py-5">
                <div className="headerText pt-5 text-xl">
                  Otorhinolaryngology - Head and Neck Surgery (ENT)
                </div>
                <div className="bodyText pt-5 ">
                  Specializes in the management of medical conditions of the
                  ears, nose and sinuses, throat, voice box; and performs
                  procedures and/or surgeries for obstructive conditions and
                  tumors of the head and neck including thyroid masses and
                  cancers.
                </div>
                <div className="linkText pt-5">See our doctors</div>
              </div>
            </div>
            <div
              className="flex flex-wrap justify-center items-center"
              key={data.id}
            >
              {allSpecialistsDetails.map((data) => (
                <SpecialistCard name={data.name} speciality={data.speciality} />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default OurDoctors;
