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

  async function handleSignup() {
    setLoading(true);
    try {
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        displayNameRef.current.value
      );
      checkIfUserExists();
    } catch (error) {
      alert(error);
    }
    setLoading(false);
    setSignUpModal(false);
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
        className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <h3 className="font-bold text-2xl">Sign Up</h3>
          {/* <p className="text-gray-600 pt-2">Choose sign in method</p> */}
        </section>
        <section className="mt-10">
          <div className="flex flex-col">
            <div>
              <input
                ref={displayNameRef}
                className="mb-5 p-3 rounded bg-gray-100"
                placeholder="User Name"
              />
            </div>
            <div>
              <input
                ref={emailRef}
                className="mb-5 p-3 rounded bg-gray-100"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                ref={passwordRef}
                className="mb-5 p-3 rounded bg-gray-100"
                placeholder="Password"
                type="password"
              />
            </div>
            {/* <div className="flex flex-col justify-end">
              <a className="text-sm text-blue-600 hover:text-blue-800 mb-2">
                Forgot your password?
              </a>
              <p className="text-sm mb-5">
                Don't have an account yet?{" "}
                <a className="text-blue-600 hover:text-blue-800">Sign Up</a>
              </p>
            </div> */}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white
              font-bold py-2 
              rounded shadow-lg hover:shadow-xl transition duration-200"
              // type="submit"
              onClick={handleSignup}
            >
              Sign Up
            </button>
            {/* <div className="w-full flex items-center justify-center">
              <span className="p-3 text-gray-400 m-2">OR</span>
            </div> */}
            {/* <button
              className="bg-red-600 hover:bg-red-700 text-white
            font-bold py-2 
            rounded shadow-lg hover:shadow-xl transition duration-200"
              // type="submit"
              onClick={() => {
                signInWithGoogle();
                setSignUpModal(false);
              }}
            >
              Login with Google
            </button> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default SignUpModal;
