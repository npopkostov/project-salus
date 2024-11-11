import React from "react";
import google from "../assets/google.svg";
import fb from "../assets/fb.svg";

const SignInServicesElement = ({ route }) => {
  return (
    <>
      <div className="flex w-full justify-between gap-4">
        <div className="flex items-center justify-center border rounded-md h-10 w-[170px] hover:bg-[#F2F4FC] hover:text-blue-500 cursor-pointer transition duration-300">
          <img src={google} className="h-8" />
          <div className="text-xs mr-1">{route} with Google</div>
        </div>
        <div className="flex items-center justify-center border rounded-md h-10 w-[170px] hover:bg-[#F2F4FC] hover:text-blue-500 cursor-pointer transition duration-300">
          <img src={fb} className="h-5" />
          <div className="ml-3 text-xs">{route} with FB</div>
        </div>{" "}
      </div>
    </>
  );
};

export default SignInServicesElement;
