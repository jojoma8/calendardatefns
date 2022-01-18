import { useSignInContext } from "../contextProvider/SignInContext";
import { useAuth } from "../firebase";
import db from "../firebase";
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

function GetUserDetails(currentUser) {
  // THIS DOES NOT WORK
  // THIS DOES NOT WORK
  // THIS DOES NOT WORK
  const {
    userName,
    setUserName,
    userRole,
    setUserRole,
    userSpeciality,
    setUserSpeciality,
  } = useEditUserDetailsContext();

  const getUserDetails = async () => {
    // const currentUser = useAuth();
    const docRef = doc(db, "users", currentUser);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    // setUserName(docSnap.name);
    // setUserRole(docSnap.role);
    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data().role);
      setUserName(docSnap.data().name);
      setUserRole(docSnap.data().role);
      setUserSpeciality(docSnap.data().speciality);
    } else {
      console.log("No such document!");
    }
  };

  getUserDetails();
}

export default GetUserDetails;
