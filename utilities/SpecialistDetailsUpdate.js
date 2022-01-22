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
} from "firebase/firestore";
import { useState } from "react";
import db, { useAuth } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEditUserDetailsContext } from "../contextProvider/EditUserDetailsContext";
import { unstable_batchedUpdates } from "react-dom";

// NOT USED NOT WORKING

export async function trial() {
  //   const [specialistData, setSpecialistData] = useState();
  console.log("i ran");
  //   useEffect(() => {
  const docRef = collection(db, "specialists");
  const docSnap = await getDocs(docRef);
  const userData = docSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
  //   setSpecialistData(userData);
  // return userData;
  //   }, []);
  return userData;
  //   return specialistData;
}
