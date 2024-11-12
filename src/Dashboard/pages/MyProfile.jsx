import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import { AppContext } from "../../context/AppContext";
import coverImage from "../assets/coverImage.jpg";
import user from "../assets/user.jpg";

const MyProfile = () => {
  const { dashboardPage } = useContext(AppContext);
  const navigate = useNavigate();
  const [ischangePassActive, setIsChangePassActive] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { username } = useParams();
  const [isChangeSuccesfull, setIsChangeSuccesfull] = useState(false);
  const [arePasswordsSame, setarePasswordsSame] = useState();

  // Token auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }

    if (token) {
      axios
        .post("https://project-salus.onrender.com/auth/dashboard", { token: token })
        .then((response) => {
          if (response.status === 200) {
            setIsChangePassActive(false);
            dashboardPage.setUserName(response.data.username);
            dashboardPage.setUserRole(response.data.role);
            dashboardPage.setUserMail(response.data.mail);
            dashboardPage.setIsAdmin(response.data.role === "admin" ? true : false);
          } else {
            console.log("Response was not successful. Status:", response.status);
            navigate("/auth/login");
          }
        })
        .catch((error) => {
          if (error.status === 403) {
            navigate("/auth/login");
          } else {
            console.log("Error", error);
          }
        });
    }
  }, []);

  // Handle new password request
  const handleSubmit = async function (e) {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setarePasswordsSame(false);
      return;
    }

    try {
      const userData = { username, newPassword };
      axios
        .post("/auth/change-password:username", userData)
        .then((response) => {
          if (response.status === 200) {
            setIsChangeSuccesfull(true);
            setarePasswordsSame();
          }
        })
        .catch((error) => console.error("Failed to change password", error));
    } catch (error) {
      console.log("Network error", error);
      alert("Failed to change password. Please try again later");
    }
  };

  useEffect(() => {
    if (isChangeSuccesfull) {
      localStorage.removeItem("token");

      setTimeout(() => navigate("/auth/login"), 3000);
    }
  }, [isChangeSuccesfull]);

  return (
    <>
      {/* Main div */}
      <div
        className={
          dashboardPage.isMinimized === false
            ? `grid grid-cols-[15%_85%] w-screen h-screen cursor-pointer transition-all duration-300`
            : `grid grid-cols-[3%_97%] w-screen h-screen cursor-pointer transition-all duration-300`
        }
      >
        {/* navbar */}
        <Navbar />
        {/* dashboard/pages */}
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex flex-col bg-white"
              : " flex flex-col bg-[#2A3447]"
          }
        >
          <Toolbar />
          <div className="flex flex-grow flex-col">
            {" "}
            <div className="flex flex-col p-5">
              <img src={coverImage} className="w-full rounded-md h-96" />
              <div className="flex items-center justify-center ">
                <div className="bg-gradient-to-b from-[#54B0F9] to-[#F04E69] -mt-16 rounded-full p-1">
                  <div className="bg-white rounded-full p-1">
                    <img src={user} className="w-full rounded-full h-24 w-24" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "text-center font-bold text-xl"
                  : "text-center font-bold text-white text-xl"
              }
            >
              {dashboardPage.userName}
            </div>
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "text-center text-sm"
                  : "text-center text-sm text-[#7788A5]"
              }
            >
              {dashboardPage.userRole}
            </div>
            {/* Basic information & change password */}
            <div
              className={
                isChangeSuccesfull === true ? "flex items-center justify-center" : "hidden"
              }
            >
              {" "}
              <div
                className={
                  dashboardPage.isNightMode === false
                    ? "w-1/3 border text-center p-5 mt-5 rounded-md shadow"
                    : "text-white w-1/3 border border-[#7788A5] text-center p-5 mt-5 rounded-md shadow-2xl shadow-[#253662]"
                }
              >
                {" "}
                Your password has been succesfully changed, please login with your new password
              </div>
            </div>
            <div
              className={
                isChangeSuccesfull === false
                  ? "flex flex-col space-y-2 flex-grow m-5 items-center"
                  : "hidden"
              }
            >
              <div
                className={
                  dashboardPage.isNightMode === false
                    ? "font-bold text-xl mt-5"
                    : "text-xl font-bold text-white mt-5"
                }
              >
                {" "}
                Basic Information
              </div>
              <div
                className={
                  dashboardPage.isNightMode === false
                    ? "flex pt-5 border rounded-md shadow justify-around w-1/2 p-5 gap-5 "
                    : "flex pt-5 border rounded-md shadow-xl shadow-[#253662] justify-around w-1/2 p-5 gap-5 border-[#7788A5]"
                }
              >
                <div className="flex flex-col w-full">
                  <div className={dashboardPage.isNightMode === false ? "" : "text-[#ECF2FF] "}>
                    {" "}
                    Username:
                  </div>
                  <div
                    className={
                      dashboardPage.isNightMode === false
                        ? "border rounded p-1 hover:cursor-not-allowed"
                        : "text-[#7788A5] border border-[#333F55] bg-[#253662] rounded p-1 hover:cursor-not-allowed"
                    }
                  >
                    {" "}
                    {dashboardPage.userName}
                  </div>
                  {/* usernameEnd */}
                </div>
                <div className="flex flex-col w-full">
                  <div className={dashboardPage.isNightMode === false ? "" : "text-[#ECF2FF] "}>
                    {" "}
                    Email:
                  </div>
                  <div
                    className={
                      dashboardPage.isNightMode === false
                        ? "border rounded p-1 hover:cursor-not-allowed "
                        : "text-[#7788A5] border border-[#333F55] bg-[#253662] rounded p-1 hover:cursor-not-allowed"
                    }
                  >
                    {" "}
                    {dashboardPage.userMail}
                  </div>
                  {/* usernameEnd */}
                </div>
                <div className="flex flex-col w-full">
                  <div className={dashboardPage.isNightMode === false ? "" : "text-[#ECF2FF] "}>
                    {" "}
                    {arePasswordsSame === false ? (
                      <div className="text-red-500"> Passwords Dont Match</div>
                    ) : ischangePassActive === false ? (
                      "Password:"
                    ) : (
                      "New Password"
                    )}
                  </div>
                  <button
                    className={
                      ischangePassActive === true
                        ? "hidden"
                        : dashboardPage.isNightMode === false
                        ? "w-full border p-1 text-sm rounded-md bg-white text-[#5D87FF] hover:bg-[#5D87FF] hover:text-white border-[#5D87FF] text-center"
                        : "w-full border p-1 text-sm rounded-md bg-[#253662] text-[#5D87FF] hover:bg-[#5D87FF] hover:text-white border-[#5D87FF] text-center"
                    }
                    onClick={() => {
                      setIsChangePassActive((prev) => !prev);
                    }}
                  >
                    {" "}
                    Change Password
                  </button>
                  <form className="space-y-2" onSubmit={handleSubmit}>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className={
                        ischangePassActive === true
                          ? dashboardPage.isNightMode === false
                            ? "border rounded p-1 w-full"
                            : "text-[#7788A5] border border-[#333F55] bg-[#253662] rounded p-1 w-full"
                          : "hidden"
                      }
                    />{" "}
                    <div className={dashboardPage.isNightMode === false ? "" : "text-[#ECF2FF]"}>
                      {" "}
                      {arePasswordsSame === false ? (
                        <div className="text-red-500"> Passwords Dont Match</div>
                      ) : ischangePassActive === false ? (
                        ""
                      ) : (
                        "Confirm New Password"
                      )}
                    </div>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      required
                      className={
                        ischangePassActive === true
                          ? dashboardPage.isNightMode === false
                            ? "border rounded p-1 w-full "
                            : "text-[#7788A5] border border-[#333F55] bg-[#253662] rounded p-1 w-full "
                          : "hidden"
                      }
                    />{" "}
                    <button
                      type="submit"
                      className={
                        ischangePassActive === false
                          ? "hidden"
                          : dashboardPage.isNightMode === false
                          ? "w-1/3 border p-1 text-sm rounded-md bg-white text-[#5D87FF] hover:bg-[#5D87FF] hover:text-white border-[#5D87FF] text-center"
                          : "w-1/3 border p-1 text-sm rounded-md bg-[#253662] text-[#5D87FF] hover:bg-[#5D87FF] hover:text-white border-[#5D87FF] text-center"
                      }
                    >
                      {" "}
                      Proceed
                    </button>
                  </form>
                  {/* usernameEnd */}
                </div>
              </div>
            </div>
            {/* end */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
