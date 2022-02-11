import { signup, useAuth, logout, login, signInWithGoogle } from "../firebase";
import { useContext, useRef, useState } from "react";
import { useSignInContext } from "../contextProvider/SignInContext";
import { handleStoreNewUser } from "../utilities/UserUtils";

function UserAuthentication() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const currentUser = useAuth();
  const { signInModal, setSignInModal } = useSignInContext();

  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Error");
    }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.log(process.env.REACT_APP_FIREBASE_API_KEY);
      alert(error.message);
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error");
    }
    setLoading(false);
  }

  return (
    <div className="flex ml-1 p-1 ">
      {/* {!currentUser && (
        <div>
          <input className="inpt" ref={emailRef} placeholder="Email" />
          <input
            className="inpt"
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
        </div>
      )}
      {!currentUser && (
        <button
          className="btn"
          disabled={loading || currentUser}
          onClick={handleSignup}
        >
          Sign Up
        </button>
      )} */}
      {!currentUser && (
        <button
          className="btn"
          disabled={loading || currentUser}
          // onClick={handleLogin}
          // onClick={signInWithGoogle}
          onClick={() => {
            setSignInModal(true);
            // console.log(`hello`);
            // handleStoreNewUser();
          }}
        >
          Log In
        </button>
      )}
      {currentUser && (
        <button
          className="btn "
          disabled={loading || !currentUser}
          onClick={handleLogout}
        >
          Log Out
        </button>
      )}
    </div>
  );
}

export default UserAuthentication;
