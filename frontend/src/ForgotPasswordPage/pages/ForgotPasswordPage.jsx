import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroLogin from "../../LoginPage/components/HeroLogin";
import ForgotPasswordFormElement from "../components/ForgotPasswordFormElement";
import { AppContext } from "../../context/AppContext";

const ForgotPasswordPage = () => {
  const { loginPage } = useContext(AppContext);
  const navigate = useNavigate();

  // If password request is succesfull:
  useEffect(() => {
    if (loginPage.requestSuccesfull === true) {
      setTimeout(() => {
        navigate("/auth/login");
        loginPage.setRequestSuccesfull(false);
      }, 5000);
    }
  }, [loginPage.requestSuccesfull]);

  if (!loginPage.requestSuccesfull) {
    return (
      <>
        <div className="grid grid-cols-[70%_30%] w-screen h-screen">
          {/* Left side */}
          <HeroLogin />

          {/* Right side */}
          <div className="flex flex-col items-center justify-center h-screen w-full bg-white  ">
            <div className=" w-2/3 ">
              <div className="flex flex-col mb-5  w-full ">
                <div className="text-xl font-bold w-full">Forgot your password?</div>
                <div className="text-sm font-extralight mt-2">
                  Please enter the email address associated with your account and We will email you
                  a link to reset your password.
                </div>
              </div>
              <ForgotPasswordFormElement />
            </div>
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
          <div className="flex flex-col items-center justify-center h-screen w-full bg-white  ">
            <div className=" w-2/3 ">
              <div className="flex flex-col mb-5  w-full ">
                <div className="text-xl font-bold w-full">Password Change Request Successfull</div>
                <div className="text-sm font-extralight mt-2">
                  Please check your email address associated with your account and follow the
                  instructions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ForgotPasswordPage;
