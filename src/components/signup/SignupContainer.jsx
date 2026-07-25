import React from "react";
import { UserPlus } from "lucide-react";
import { ArrowRight } from "lucide-react";
import TermsandPrivacy from "./TermsandPrivacy";
import SignupInputs from "./SignupInputs";
import Google from "./Google";
const SignupContainer = () => {
  return (
    <div className="bg-white w-full max-w-120 gap-4 rounded-xl flex flex-col items-center justify-center p-6 sm:p-10">
      <div className="flex flex-col items-center justify-center">
        <UserPlus
          size={30}
          strokeWidth={1.5}
          className="text-primary-container"
        />
        <h2 className=" font-bold text-center text-title-md">Create your Account</h2>
        <p className="text-center text-gray-600 text-sm">
          Join in and take control of your safety
        </p>
      </div>
      <SignupInputs />
      <TermsandPrivacy />
      <button className="flex w-full items-center justify-center gap-2 bg-primary  text-on-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:outline-none py-3 px-4 rounded-md">
        Register Account
        <ArrowRight />
      </button>
      <p className="text-center text-gray-600 text-sm">OR</p>
      <Google />
      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline">
          Log in here
        </a>
      </p>
    </div>
  );
};

export default SignupContainer;
