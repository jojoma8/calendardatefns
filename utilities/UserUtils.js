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
import { FaAlignCenter } from "react-icons/fa";

export const handleNew = async (title, codeSnippet, description) => {
  const auth = getAuth();

  const collectionRef = collection(db, "post");

  const payload = {
    title: title,
    codeSnippet: codeSnippet,
    description: description,
    timestamp: serverTimestamp(),
    user: auth.currentUser?.uid,
    displayName: auth.currentUser?.displayName,
  };
  const docRef = await addDoc(collectionRef, payload);
  // console.log(auth.currentUser.uid);
  // console.log("The new ID is: " + docRef.id);
  // console.log("The user ID is: " + currentUser.uid);
};

export const handleEdit = async (id, title, codeSnippet, description) => {
  // const name = prompt("Enter color name");
  // const value = prompt("Enter color value");
  // console.log(value);
  const docRef = doc(db, "post", id);

  const payload = {
    title: title,
    codeSnippet: codeSnippet,
    description: description,
    timestamp: serverTimestamp(),
  };

  updateDoc(docRef, payload);
};

export const handleUserEdit = async (name, uid, role, email, mobile) => {
  //   const auth = getAuth();
  //   const currentUser = useAuth();
  // const name = prompt("Enter color name");
  // const value = prompt("Enter color value");
  console.log(role);
  const docRef = doc(db, "users", uid);

  const payload = {
    name: name,
    role: role,
    email: email,
    mobile: mobile,
    timestamp: serverTimestamp(),
  };

  updateDoc(docRef, payload);
};

export const handleHolidayUpdate = async (yyyy_uid, date) => {
  const docRef = doc(db, "holidays", yyyy_uid);

  const payload = {
    date: date,
  };

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    updateDoc(docRef, payload);
  } else {
    setDoc(docRef, payload);
  }
};

export const handleClinicHoursEdit = async (uid, schedule) => {
  const docRef = doc(db, "specialists", uid);
  const payload = {
    schedule: schedule,
  };
  updateDoc(docRef, payload);
};

export const handleDelete = async (id) => {
  const docRef = doc(db, "post", id);
  await deleteDoc(docRef);
};

// export const handleQueryDelete = async (id) => {
//   const userInputName = prompt("Enter color name");
//   const collectionRef = collection(db, "post");
//   const q = query(collectionRef, where("name", "==", userInputName));

//   const snapshot = await getDocs(q);
//   const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//   results.forEach(async (result) => {
//     const docRef = doc(db, "post", result.id);
//     await deleteDoc(docRef);
//   });
// };

export const handleStoreNewUser = async () => {
  const auth = await getAuth();
  const collectionRef = doc(db, "users", auth.currentUser?.uid);
  const payload = {
    name: auth.currentUser?.displayName,
    uid: auth.currentUser?.uid,
  };
  //   try {
  //     updateDoc(collectionRef, payload);
  //   } catch (err) {
  //     setDoc(collectionRef, payload);
  //   }
  const docSnap = await getDoc(collectionRef);
  if (docSnap.exists()) {
    // console.log(docSnap.data());
  } else {
    setDoc(collectionRef, payload);
  }
};

export const handleSpecialistEdit = async (name, uid, field, speciality) => {
  const docRef = doc(db, "specialists", uid);

  const payload = {
    name: name,
    uid: uid,
    field: field,
    speciality: speciality,
    timestamp: serverTimestamp(),
  };

  const docSnap = await getDoc(docRef);
  console.log("test: " + uid);
  if (docSnap.exists()) {
    updateDoc(docRef, payload);
  } else {
    setDoc(docRef, payload);
  }
};

export const checkIfUserExists = async () => {
  handleStoreNewUser();
};

// export const getUserDetails = async (userName) => {
//   const auth = await getAuth();
//   const docRef = doc(db, "users", auth.currentUser?.uid);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data().role);
//   } else {
//     console.log("No such document!");
//   }
//   console.log(userName);
// };
