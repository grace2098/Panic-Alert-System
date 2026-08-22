import React from "react";
import { UserPlus } from "lucide-react";
import { LogIn } from "lucide-react";
import TermsandPrivacy from "./TermsandPrivacy";
import SignupInputs from "./SignupInputs";
import Google from "./Google";
import { NavLink } from "react-router-dom";
const SignupContainer = () => {
  return (
    <div className="bg-white w-full max-w-100 text-sm gap-2 rounded-2xl shadow-md flex flex-col items-center justify-center p-6 sm:p-10">
      <div className="flex flex-col items-center gap-0 justify-center">
        <UserPlus
          size={28}
          strokeWidth={1.5}
          className="text-primary-container"
        />
        <h2 className=" font-bold text-center text-title-md">Create your Account</h2>
        <p className="text-center text-gray-600 text-sm">
          Join in and take control of your safety
        </p>
      </div>
      <div className="w-full">
        <SignupInputs />
      </div>
      <TermsandPrivacy />
      <NavLink to="/login" className="flex w-full items-center justify-center gap-2 bg-primary  text-on-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:outline-none py-2 px-3 rounded-md">
        Register Account
        <LogIn />
      </NavLink>
      <p className="text-center text-gray-600 text-xs">OR</p>
      <Google />
      <p className="text-center text-gray-600 text-xs">
        Already have an account?{" "}
        <NavLink to="/login" className="text-primary hover:underline">
          Log in here
        </NavLink>
      </p>
    </div>
  );
};

export default SignupContainer;
