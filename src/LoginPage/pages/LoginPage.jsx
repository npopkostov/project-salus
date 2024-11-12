import React, { useState } from "react";
import HeroLogin from "../components/HeroLogin";
import SignInServicesElement from "../components/SignInServicesElement";
import LoginElement from "../components/LoginElement";

const LoginPage = () => {
  return (
    <>
      <div className="grid grid-cols-[70%_30%] w-screen h-screen">
        {/* Left side */}
        <HeroLogin />
        {/* Right side */}
        <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
          <div className=" w-2/3 ">
            <div className="mb-5  w-2/3 ">
              <div className="text-xl font-bold">Welcome to Salus</div>
              <div className="text-sm font-extralight">Event locator</div>
            </div>
            {/* future update */}
            {/* <SignInServicesElement route={"Sign In"} />

            <div className="flex justify-center w-full">
              <div className="flex mt-5 w-full">
                <div className="border-t border-gray-300 w-full mt-3"></div>
                <div className="ml-2 mr-2 text-center w-full">or sign in with</div>
                <div className="border-t border-gray-300 w-full mt-3"></div>
              </div>
            </div> */}
          </div>
          <LoginElement />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
