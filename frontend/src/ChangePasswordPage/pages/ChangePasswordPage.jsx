import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeroLogin from "../../LoginPage/components/HeroLogin";
import ChangePasswordFormElement from "../components/ChangePasswordFormElement";
import { AppContext } from "../../context/AppContext";

const ChangePasswordPage = () => {
  const { loginPage } = useContext(AppContext);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    if (loginPage.newPassSuccesfull === true) {
      setTimeout(() => {
        navigate("/auth/login");
        loginPage.setNewPassSuccesfull(false);
      }, 6000);
    }
  }, [loginPage.newPassSuccesfull]);

  if (!loginPage.newPassSuccesfull) {
    return (
      <>
        <div className="grid grid-cols-[70%_30%] w-screen h-screen">
          {/* Left side */}
          <HeroLogin />

          {/* Right side */}
          <div className="flex flex-col items-center justify-center h-screen w-full bg-white  ">
            <div className=" w-2/3 ">
              <div className="flex flex-col mb-5  w-full ">
                <div className="text-xl font-bold w-full">Password Reset</div>
                <div className="text-sm font-extralight mt-2">Please enter your new password.</div>
              </div>
              <ChangePasswordFormElement />
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
                <div className="text-xl font-bold w-full">Password Change Successfull</div>
                <div className="text-sm font-extralight mt-2">
                  Dear {username}, you have succefully changed your password. You are redirected to
                  our login page where you can Sign In with your new credentials.
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ChangePasswordPage;
