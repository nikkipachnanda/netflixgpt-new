import React, { useState } from "react";
import Header from "./Header";
import { LOGINBG } from "../utils/Constant";

const Login = () => {

  const [isSignInForm, setIsSignIn] = useState(true);  

  const toggleSignInForm =()=> 
    {
        setIsSignIn(!isSignInForm);
    }  
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={LOGINBG} />
      </div>
      <form className="rounded-lg absolute p-12 bg-black bg-opacity-80 w-4/12 my-36 mx-auto right-0 left-0 text-white"
>
        <h1 className="font-bold text-3xl py-4" >{isSignInForm ? "Sign In" : "Sign Up"} </h1>
        {!isSignInForm && <input type="text" placeholder="Full Name" className="p-2 my-4 w-full bg-gray-500" /> }
        <input type="text" placeholder="Email Address" className="p-2 my-4 w-full bg-gray-500" />
        <input type="password" placeholder="Password" className="p-2 my-4 w-full bg-gray-500" />
        <button className="p-4 my-4 bg-red-700 w-full rounded-lg"> {isSignInForm ? "Sign In" : "Sign Up"} </button>
        <p onClick={toggleSignInForm} className="cursor-pointer">
        {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
