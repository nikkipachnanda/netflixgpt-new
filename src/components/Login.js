import React, { useRef, useState } from "react";
import Header from "./Header";
import { LOGINBG } from "../utils/Constant";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const unameRef = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignIn(!isSignInForm);
  };

  const handleButtonClick = () => {
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    const unameValue = unameRef.current?.value;

    const message = checkValidData(emailValue, passwordValue, unameValue);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: unameValue, photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            // Profile updated!
            const {uid, email, displayName} = auth.currentUser;
            dispatch(addUser({uid:uid, email:email, displayName:displayName}));
            navigate("/browse");
            // ...
          }).catch((error) => {
            // An error occurred
             // setErrorMessage(error.message);
             handleAuthError(error);

          });
          console.log("User signed up:", user);
      
          // ...
        })
        .catch((error) => {
          handleAuthError(error);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User signed in:", user);
          // navigate("/browse");
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // setErrorMessage(`${errorCode} - ${errorMessage}`);
          handleAuthError(error);
        });
    }
  };

  const handleAuthError = (error) => {
    console.log(error.code);
    let customErrorMessage;
    switch (error.code) {
      case 'auth/email-already-in-use':
        customErrorMessage = "Invalid credentials. Please check your email and password.";
        break;
      case 'auth/invalid-credential':
        customErrorMessage = "No user found with this email. Please sign up.";
        break;
      case 'auth/wrong-password':
        customErrorMessage = "Incorrect password. Please try again.";
        break;
      default:
        customErrorMessage = error.message;
    }
    setErrorMessage(customErrorMessage);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={LOGINBG} alt="Login Background" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-lg absolute p-12 bg-black bg-opacity-80 w-4/12 my-36 mx-auto right-0 left-0 text-white"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={unameRef}
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-gray-500"
          />
        )}
        <input
          type="text"
          ref={emailRef}
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-500"
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-500"
        />
        <div className="text-red-500">{errorMessage}</div>
        <button
          className="p-4 my-4 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={toggleSignInForm} className="cursor-pointer">
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
