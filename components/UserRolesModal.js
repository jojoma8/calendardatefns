import { useSignInContext } from "../contextProvider/SignInContext";
import { useAuth } from "../firebase";
import { SearchIcon } from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { useRef, useState } from "react";
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
import db from "../firebase";
import AccordionItem from "./AccordionItem";
import { handleUserRoleEdit } from "../utilities/UserUtils";

function UserRolesModal() {
  const currentUser = useAuth();
  const { userRolesModal, setUserRolesModal } = useSignInContext();
  const [defaultSearchText, setDefaultSearchText] = useState(
    "search user name or email"
  );
  const [searchResults, setSearchResults] = useState({});
  const [userRole, setUserRole] = useState("");

  const searchRef = useRef();

  const searchItem = async (term) => {
    // console.log("search trigger " + term.length);

    if (term.length > 0) {
      const q = query(collection(db, "users"), where("email", "==", term));
      const querySnapshot = await getDocs(q);
      console.log("userRole: " + searchResults?.role);

      if (querySnapshot.empty) {
        setSearchResults({ remarks: "User not found" });
      } else {
        querySnapshot.forEach((doc) => {
          setSearchResults(doc.data());
          // console.log("userRole: " + doc.data().role);
          if (doc.data().role) {
            setUserRole(doc.data().role);
          }
        });
      }
    }
  };

  const handleSaveChanges = () => {
    console.log("this ran");
    if (searchResults.uid) {
      handleUserRoleEdit(searchResults.uid, userRole);
    }
    setUserRolesModal(false);
  };

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center 
        justify-center z-50 bg-opacity-70 w-screen"
      onClick={() => {
        // setUserRolesModal(false);
      }}
    >
      <div
        className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg 
            shadow-2xl w-9/12"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="font-bold text-2xl mb-10">Set User Roles</h3>
          {/* <p className="text-gray-600 pt-2">Choose sign in method</p> */}
        </section>
        <section className="mt-2">
          <div className="flex bg-gray-100 rounded-2xl ">
            <div className="flex items-center ">
              <SearchIcon className="h-7 pl-3 text-gray-400" />
            </div>
            <input
              placeholder={defaultSearchText}
              ref={searchRef}
              //   onClick={() => setDefaultSearchText("")}
              className=" p-3  bg-gray-100   outline-none 
                w-full rounded-2xl"
              onKeyPress={(e) => {
                // console.log(searchRef.current.value);
                if (e.key === "Enter") {
                  searchItem(searchRef.current.value);
                }
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="m-3">
              {searchResults?.name && (
                <div className="headerText text-lg m-2">
                  User Name: {searchResults?.name}
                </div>
              )}
              {searchResults?.remarks && (
                <div className="headerText text-xl m-2">User not found</div>
              )}

              {searchResults?.name && (
                <AccordionItem
                  title={"User Role: "}
                  desc={searchResults?.role}
                  setDesc={setUserRole}
                  options={["Doctor", "VA", "No Role"]}
                />
              )}
            </div>
            <div className="flex justify-evenly mt-10">
              <button
                className="btn w-44"
                onClick={() => {
                  handleSaveChanges();
                }}
              >
                Save Changes
              </button>
              <button
                className="btnCancel w-44 "
                onClick={() => {
                  setUserRolesModal(false);
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

export default UserRolesModal;
