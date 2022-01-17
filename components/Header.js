import Image from "next/image";
import db from "../firebase";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  PlusIcon,
  UserIcon,
  TableIcon,
  CalendarIcon,
} from "@heroicons/react/solid";
import { login, signInWithGoogle, signup, updateUserName } from "../firebase";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
  DocumentAddIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import { FaBeer } from "react-icons/fa";
import { GiPalmTree } from "react-icons/gi";

import HeaderIcon from "./HeaderIcon";
import { useAuth } from "../firebase";
import UserAuthentication from "./UserAuthentication";
import { useContext } from "react";
// import {
//   EditPostContext,
//   PassDocIDContext,
//   SignInContext,
// } from "../utilities/Context";
// import { handleSearchChange } from "./Posts";
import Link from "next/link";
import { useSignInContext } from "../contextProvider/SignInContext";
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

function Header() {
  const currentUser = useAuth();
  const {
    userDetailsModal,
    setUserDetailsModal,
    editClinicHoursModal,
    setEditClinicHoursModal,
    editHolidaysModal,
    setEditHolidaysModal,
  } = useSignInContext();
  //   const {
  //     docID,
  //     setDocID,
  //     searchTerm,
  //     setSearchTerm,
  //     postFilterData,
  //     setPostFilterData,
  //     postData,
  //     setPostData,
  //   } = useContext(PassDocIDContext);

  //   const {
  //     editPostModal,
  //     setEditPostModal,
  //     editPostTitleModal,
  //     setEditPostTitleModal,
  //     editPostCodeSnippetModal,
  //     setEditPostCodeSnippetModal,
  //     editPostDescriptionModal,
  //     setEditPostDescriptionModal,
  //     newPostModal,
  //     setNewPostModal,
  //     filterPostModal,
  //     setFilterPostModal,
  //   } = useContext(EditPostContext);

  //   const { userDetailsModal, setUserDetailsModal } =
  //     useContext(useSignInContext);

  //   const excludeColumns = ["id", "timestamp", "user"];

  //   const handleSearchChange = (value) => {
  //     // console.log(value);
  //     setSearchTerm(value);
  //     filterSearchData(value);
  //   };

  // Filter Records by Search Text
  //   const filterSearchData = (value) => {
  //     const lowerCaseValue = value.toLowerCase().trim();
  //     if (lowerCaseValue === "") setPostFilterData(postData);
  //     else {
  //       const filteredSearchData = postData.filter((item) => {
  //         return Object.keys(item).some((key) =>
  //           excludeColumns.includes(key)
  //             ? false
  //             : item[key].toString().toLowerCase().includes(lowerCaseValue)
  //         );
  //       });
  //       setPostFilterData(filteredSearchData);
  //       // setPostData(filteredSearchData);
  //     }
  //   };
  const { userName, setUserName, userRole, setUserRole } =
    useEditUserDetailsContext();

  const getUserDetails = async (userName) => {
    const docRef = doc(db, "users", currentUser?.uid);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    // setUserName(docSnap.name);
    // setUserRole(docSnap.role);
    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data().role);
      setUserName(docSnap.data().name);
      setUserRole(docSnap.data().role);
    } else {
      console.log("No such document!");
    }
    // console.log(currentUser?.uid);
    // onSnapshot(doc(db, "users", currentUser.uid));
    setUserDetailsModal(true);
  };

  return (
    <div
      className="sticky top-0 z-40 bg-white flex items-center  px-5 py-2
      lf:px-5 shadow-md overflow-hidden font-bold "
    >
      {/* <h1 className="text-orange-500 font-extrabold text-2xl">NextGen</h1> */}

      {/* Left */}
      <div className="flex items-center">
        <Image
          src="	https://nxtgeneclinic.com.ph/wp-content/uploads/2021/08/NXTgen-logo-horizontal-1536x540.png"
          width={150}
          height={60}
          layout="fixed"
          alt="logo"
        />
        {/* {currentUser && (
          <div className="flex ml-0 items-center rounded-full bg-gray-100 p-2">
            <SearchIcon className="h-6 text-gray-600" />
            <input
              className="hidden md:inline-flex flex ml-2 items-center bg-transparent 
              outline-none placeholder-gray-500 flex-shrink"
              type="text"
              placeholder="search pyNotes"
              onChange={(event) => {
                // setSearchTerm(event.target.value);
                handleSearchChange(event.target.value);
              }}
            />
          </div>
        )} */}
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-2 sm:space-x-4">
          <Link href="/">
            <a>
              <HeaderIcon Icon={HomeIcon} />
            </a>
          </Link>

          {/* {currentUser && (
            <div onClick={() => setNewPostModal(true)}>
              <HeaderIcon Icon={DocumentAddIcon} />
            </div>
          )} */}
          <Link href="/python_blog">
            <a>
              <HeaderIcon Icon={BookOpenIcon} />
            </a>
          </Link>

          {currentUser && (
            // <div onClick={() => setUserDetailsModal(true)}>
            <div onClick={() => getUserDetails()}>
              <HeaderIcon Icon={UserIcon} />
            </div>
          )}
          <div onClick={() => setEditClinicHoursModal(true)}>
            {currentUser && <HeaderIcon Icon={TableIcon} />}
          </div>
          <div onClick={() => setEditHolidaysModal(true)}>
            {currentUser && <HeaderIcon Icon={GiPalmTree} width={6} />}
          </div>
          {currentUser && <HeaderIcon Icon={UserGroupIcon} />}
        </div>
      </div>
      {/* Right */}

      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile Pic */}

        <p className="whitepace-nowrap font-semibold pr-0 hidden sm:block">
          {/* {currentUser?.email} */}
          {currentUser?.displayName}
          {/* {currentUser?.uid} */}
        </p>

        {/* <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" /> */}
        <UserAuthentication />
      </div>
    </div>
  );
}

export default Header;
