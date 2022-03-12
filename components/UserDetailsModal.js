import { useContext, useEffect, useRef, useState } from "react";
import { useSignInContext } from "../contextProvider/SignInContext";
import db, { storage } from "../firebase";
// import { ref } from "@firebase.storage";
import {
  login,
  signInWithGoogle,
  signup,
  updateUserName,
  useAuth,
} from "../firebase";
import { handleUserEdit } from "../utilities/UserUtils";
// import { SignInContext } from "../utilities/Context";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useEditUserDetailsContext } from "../contextProvider/EditUserDetailsContext";
import WeekdayButtons from "./WeekdayButtons";
import {
  HourListReader,
  HourRangeGenerator,
  NextThirtyMinutes,
} from "../utilities/TimeCalculations";
import AccordionItem from "./AccordionItem";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import Image from "next/image";

function UserDetailsModal() {
  const [loading, setLoading] = useState(false);
  const [userRoleLocal, setUserRoleLocal] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();
  const userRoleRef = useRef();
  const userMobileRef = useRef();
  const specialistFieldRef = useRef();
  const userSpecialityRef = useRef();
  const { userDetailsModal, setUserDetailsModal } = useSignInContext();
  const currentUser = useAuth();
  const {
    userDetails,
    setUserDetails,
    userName,
    setUserName,
    userRole,
    setUserRole,
    specialistField,
    setSpecialistField,
    userSpeciality,
    setUserSpeciality,
  } = useEditUserDetailsContext();
  const {
    startOfMonth,
    startOfWeek,
    endOfMonth,
    endOfWeek,
    addDays,
    addMonths,
    startOfDay,
    format,
    isSameMonth,
    isSameDay,
    isToday,
    isPast,
    getMonth,
    compareAsc,
    startOfToday,
    startOfHour,
    endOfDay,
    addHours,
    addMinutes,
    isSameHour,
    isSameMinute,
    startOfMinute,
    getDay,
  } = require("date-fns");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  //   useEffect(async () => {
  //     const getUserDetails = async (userName) => {
  //       // const auth = await getAuth();
  //       // const docRef = doc(db, "users");
  //       const docRef = doc(db, "users", currentUser?.uid);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         //   console.log("Document data:", docSnap.data().role);
  //         setUserName(docSnap.data().name);
  //         setUserRole(docSnap.data().role);
  //       } else {
  //         console.log("No such document!");
  //       }
  //       console.log(userRole);
  //       // onSnapshot(doc(db, "users", currentUser.uid));
  //     };
  //   }, []);

  //   useEffect(() => {
  //   const getUserDetails = async (userName) => {
  //     const docRef = doc(db, "users", currentUser?.uid);
  //     const docSnap = await getDoc(docRef).data();

  //     // setUserName(docSnap.name);
  //     // setUserRole(docSnap.role);
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data().role);
  //       setUserName(docSnap.data().name);
  //       setUserRole(docSnap.data().role);
  //     } else {
  //       console.log("No such document!");
  //     }
  //     console.log(currentUser?.uid);
  //     // onSnapshot(doc(db, "users", currentUser.uid));
  //   };
  //   }, []);

  async function handleChangeUserDetails() {
    setLoading(true);
    try {
      await updateUserName(displayNameRef.current.value);
      await handleUserEdit(
        displayNameRef.current.value,
        currentUser?.uid,
        // userRoleRef.current.value,
        userRoleLocal,
        currentUser.email,
        userMobileRef.current.value
        // specialistFieldRef.current.value,
        // userSpecialityRef.current.value
      );
      //   console.log(userRole);
    } catch {
      alert("Error");
    }
    setLoading(false);
    setUserDetailsModal(false);
    // console.log(currentUser.displayName);
  }

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
  };

  useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const reference = ref(storage, "/files/Chesca-Quinio.jpg");
      await getDownloadURL(refernece).then((x) => {
        setUrl(x);
      });
    };
  });

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        setUserDetailsModal(false);
        // console.log("esc");
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center 
    justify-center z-50 bg-opacity-70 w-screen"
      // onClick={() => {
      //   setUserDetailsModal(false);
      // }}
    >
      <div
        className="bg-white max-w-lg mx-auto p-8 sm:p-12 my-10 w-5/6
        rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="headerText text-3xl">User Details</h3>
          {/* <p className="text-gray-600 pt-2">Choose sign in method</p> */}
        </section>
        <section className="mt-5">
          <div className="flex flex-col ">
            <div className="mb-5">
              <div className="headerText text-lg ml-2">User Name</div>
              <input
                ref={displayNameRef}
                className=" p-3 rounded bg-gray-100 min-w-full"
                // placeholder="User Name"
                defaultValue={currentUser?.displayName}
              />
            </div>
            <div className="mb-5 flex">
              <div className="headerText text-lg ml-2">Email: </div>
              <div className="pl-2 flex items-center">{currentUser?.email}</div>
            </div>
            {/* <div className="mb-5 ">
              <div className="headerText text-lg">User Role</div>
              <input
                ref={userRoleRef}
                className=" p-3 rounded bg-gray-100 min-w-full"
                // defaultValue={userRole}
                defaultValue={userDetails.role}
              />
            </div> */}
            <div className="mb-5 ">
              <div className="headerText text-lg ml-2">Mobile Number</div>
              <input
                ref={userMobileRef}
                className=" p-3 rounded bg-gray-100 min-w-full"
                // defaultValue={userRole}
                defaultValue={userDetails.mobile}
              />
            </div>
            {/* <div>
              <AccordionItem
                title={"User Role: "}
                desc={userDetails.role}
                setDesc={setUserRoleLocal}
                options={["Customer", "Doctor", "VA"]}
              />
            </div> */}

            <div>
              <div>
                <form onSubmit={formHandler}>
                  <input type="file" className="input" />
                  <button type="submit">Upload</button>
                </form>
                {/* {!url && (
                  <Image
                    width={60}
                    height={60}
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/calendardatefns.appspot.com/o/files%2FChesca-Quinio.jpg?alt=media&token=004c2fa7-79e5-4705-86ad-ec86dc3c1029"
                    }
                  />
                )} */}
              </div>
              <div>Uploaded {progress} % </div>
            </div>
            <div className="flex justify-evenly mt-5">
              <button
                className="btn w-44"
                onClick={() => {
                  handleChangeUserDetails();
                }}
              >
                Update Details
              </button>
              <button
                className="btnCancel w-44 "
                onClick={() => {
                  setUserDetailsModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserDetailsModal;
