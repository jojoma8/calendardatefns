import { getAuth } from "@firebase/auth";
import { useContext, useRef, useState } from "react";
import { useSignInContext } from "../contextProvider/SignInContext";
import {
  forgotPassword,
  login,
  signInWithGoogle,
  signup,
  useAuth,
} from "../firebase";
import { handleStoreNewUser } from "../utilities/UserUtils";

function SignInModal() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const {
    signInModal,
    setSignInModal,
    signUpModal,
    setSignUpModal,
    forgotPasswordModal,
    setForgotPasswordModal,
    currentUserID,
    setCurrentUserID,
  } = useSignInContext();
  const currentUser = useAuth();

  async function handleLogin() {
    const auth = getAuth();
    // e.preventDefault();
    setLoading(true);
    try {
      // console.log(emailRef.current.value);
      // console.log(passwordRef.current.value);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      alert(error.message);
    }
    // console.log(auth.currentUser.uid);
    setLoading(false);
    setSignInModal(false);
  }

  async function handleForgotPassword() {
    const emailInput = emailRef.current.value;

    // if (emailRef.current.value == null) {
    //   alert("Please enter your email");
    // } else {
    //   setLoading(true);
    try {
      await forgotPassword(emailRef.current.value);
      // console.log("email sent");
      setForgotPasswordModal(true);
    } catch (error) {
      alert(error.message);
      // return false;
    }
    setLoading(false);
    setSignInModal(false);
    // }
  }

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center
      justify-center z-50 bg-opacity-90 w-screen"
      onClick={() => {
        setSignInModal(false);
      }}
    >
      <div
        className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="font-bold text-2xl">Sign In</h3>
          <p className="text-gray-600 pt-6">If you already have an account</p>
        </section>
        <section className="mt-4">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <input
                ref={emailRef}
                className="mb-5 p-3 rounded bg-gray-100"
                placeholder="Registered email with us"
              />
            </div>
            <div className="flex flex-col">
              <input
                ref={passwordRef}
                className="mb-5 p-3 rounded bg-gray-100"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="flex flex-col ">
              <button
                className="text-sm text-blue-600 hover:text-blue-800 mb-4"
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </button>
              <div className="text-sm mb-5">
                {"Don't have an account yet? "}
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    setSignInModal(false);
                    setSignUpModal(true);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white
              font-bold py-2 
              rounded shadow-lg hover:shadow-xl transition duration-200"
              onClick={handleLogin}
            >
              Login
            </button>
            <div className="w-full flex items-center justify-center">
              <span className="p-3 text-gray-400 m-2">OR</span>
            </div>
            <button
              className="bg-red-600 hover:bg-red-700 text-white
            font-bold py-2 
            rounded shadow-lg hover:shadow-xl transition duration-200"
              onClick={() => {
                signInWithGoogle();
                setSignInModal(false);
              }}
            >
              Login with Google
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SignInModal;
