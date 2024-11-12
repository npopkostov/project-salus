import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeroLogin from "../../LoginPage/components/HeroLogin";
import SignInServicesElement from "../../LoginPage/components/SignInServicesElement";
import CreateAccountElement from "../components/CreateAccountElement";
import { AppContext } from "../../context/AppContext";

const CreateAccountPage = () => {
  const { loginPage } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginPage.newAccReqSuccsefull === true) {
      setTimeout(() => {
        navigate("/auth/login");
        loginPage.setNewAccReqSuccesfull(false);
      }, 5000);
    }
  }, [loginPage.newAccReqSuccsefull]);

  if (loginPage.newAccReqSuccsefull === false) {
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
              {/* <SignInServicesElement route={"Sign Up"} />

              <div className="flex justify-center w-full">
                <div className="flex mt-5 w-full">
                  <div className="border-t border-gray-300 w-full mt-3"></div>
                  <div className="ml-2 mr-2 text-center w-full">or sign up with</div>
                  <div className="border-t border-gray-300 w-full mt-3"></div>
                </div>
              </div> */}
            </div>
            <CreateAccountElement />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="grid grid-cols-[70%_30%] w-screen h-screen">
          {/* Left side */}
          <HeroLogin />
          {/* Right side */}
          <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
            <div className=" w-2/3 ">
              <div className="mb-5  w-2/3 ">
                <div className="text-xl font-bold">Account Created</div>
                <div className="text-sm font-extralight">
                  Please check your email address linked to your new account for Account
                  verification
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CreateAccountPage;
