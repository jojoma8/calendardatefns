import { useContext, useRef, useState } from "react";
import { useSignInContext } from "../contextProvider/SignInContext";
import { login, signInWithGoogle, signup, useAuth } from "../firebase";
import { checkIfUserExists } from "../utilities/UserUtils";
// import { SignInContext } from "../utilities/Context";

function SignUpModal() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();
  const { signUpModal, setSignUpModal } = useSignInContext();
  const currentUser = useAuth();
  const [toggle, setToggle] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentSpace = useRef(null);
  const [message, setMessage] = useState("Loading...");

  function toggleAccordion() {
    if (toggle) {
      setToggle(!toggle);
    }
    setHeight(toggle ? "0px" : `${contentSpace.current.scrollHeight}px`);
  }

  async function handleSignup() {
    setLoading(true);
    // console.log("this ran");
    try {
      if (passwordRef.current.value === null) {
        setMessage("Email blank");
      }
      if (passwordRef.current.value === null) {
        setMessage("Enter password");
      }
      if (displayNameRef.current.value === null) {
        setMessage("Enter user name");
      }
      if (passwordRef.current.value !== null) {
        // create user in authentication library
        await signup(
          emailRef.current.value,
          passwordRef.current.value,
          displayNameRef.current.value
        );
      }
      // checkIfUserExists();
      setSignUpModal(false);
      setMessage("Success!");
    } catch (error) {
      // alert(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          console.log(
            `Email address ${emailRef.current.value} already in use.`
          );
          setMessage("Email already registered. Trying to log you in");
          toggleAccordion();
          setTimeout(() => {}, 3000);
          try {
            // setTimeout(
            //   async () =>
            //     await login(emailRef.current.value, passwordRef.current.value),
            //   3000
            // );
            await login(emailRef.current.value, passwordRef.current.value);
            setTimeout(() => {
              setMessage("You are now logged in");
              setSignUpModal(false);
            }, 3000);
          } catch (error) {
            // alert(error.message);
            switch (error.code) {
              case "Firebase: Error (auth/wrong-password)":
                setMessage("Incorrect password");
                break;
              default:
                setMessage(error.message);
                break;
            }
          }
          break;
        case "auth/invalid-email":
          console.log(`Email address ${emailRef.current.value} is invalid.`);
          setMessage("Email invalid");
          toggleAccordion();
          // run login script

          break;
        case "auth/operation-not-allowed":
          console.log(`Error during sign up.`);
          setMessage("Error during sign up.");
          toggleAccordion();
          break;
        case "auth/weak-password":
          console.log(
            "Password is not strong enough. Add additional characters including special characters and numbers."
          );
          setMessage("Password is not strong enough");
          toggleAccordion();
          break;
        case "auth/internal-error":
          console.log("Error encountered");
          setMessage("Error encountered");
          toggleAccordion();
          break;

        default:
          console.log(error.message);
          setMessage(error.code);
          toggleAccordion();
          break;
      }
    }
    setLoading(false);
  }

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center 
    justify-center z-50 bg-opacity-70 w-screen"
      onClick={() => {
        setSignUpModal(false);
      }}
    >
      <div
        className="bg-white mx-auto p-8 md:p-12 my-10 rounded-lg 
        shadow-2xl w-2/5"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="font-bold text-2xl">Sign Up</h3>
          {/* <p className="text-gray-600 pt-2">Choose sign in method</p> */}
        </section>
        <section className=" mt-10 ">
          <div className="flex flex-col">
            <div className="">
              <input
                ref={displayNameRef}
                className="mb-5 p-3 rounded bg-gray-100 w-full"
                placeholder="User Name"
              />
            </div>
            <div>
              <input
                ref={emailRef}
                className="mb-5 p-3 rounded bg-gray-100 w-full"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                ref={passwordRef}
                className="mb-5 p-3 rounded bg-gray-100 w-full"
                placeholder="Password"
                type="password"
              />
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white
              font-bold py-2 
              rounded shadow-lg hover:shadow-xl transition duration-200
              w-full"
              onClick={() => (handleSignup(), toggleAccordion())}
              // onClick={() => toggleAccordion()}
            >
              Sign Up
            </button>
            <div
              ref={contentSpace}
              className=" mt-5 ml-3 transition-max-height 
                duration-700 ease-in-out overflow-hidden overflow-wrap "
              style={{ maxHeight: `${height}` }}
            >
              {message}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SignUpModal;
