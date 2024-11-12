import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeroLogin from "../../LoginPage/components/HeroLogin";
import AccVerifyEelement from "../components/AccVerifyEelement";
import { AppContext } from "../../context/AppContext";

const AccountVerifyPage = () => {
  const { loginPage } = useContext(AppContext);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    if (loginPage.successfullVerification === true) {
      setTimeout(() => {
        navigate("/auth/login");
        loginPage.setSuccessfullVerification(false);
      }, 5000);
    }
  }, [loginPage.successfullVerification]);

  if (loginPage.successfullVerification === false) {
    return (
      <>
        <div className="grid grid-cols-[70%_30%] w-screen h-screen">
          {/* Left side */}
          <HeroLogin />
          {/* Right side */}
          <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
            <div className=" w-2/3 ">
              <div className="mb-5  w-2/3 ">
                <div className="text-xl font-bold">Account Verification</div>
                <div className="text-sm font-extralight">
                  Please below enter the verification code that you received to your email address
                  linked with your account.
                </div>
              </div>

              <div className="flex justify-center w-full"></div>
              <AccVerifyEelement />
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
          <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
            <div className=" w-2/3 ">
              <div className="mb-5  w-2/3 ">
                <div className="text-xl font-bold">Account Verified</div>
                <div className="text-sm font-extralight">
                  {" "}
                  Dear {username}, your account has been succesfully verified. You are redirected to
                  login page where you can proceed to login with your account. Welcome to Salus.
                </div>
              </div>

              <div className="flex justify-center w-full"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AccountVerifyPage;
