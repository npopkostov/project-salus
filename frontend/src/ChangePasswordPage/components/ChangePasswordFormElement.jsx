import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const ChangePasswordFormElement = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { username } = useParams();
  const { loginPage } = useContext(AppContext);

  // Handle new password request
  const handleSubmit = async function (e) {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Paswords dont match");
      return;
    }

    try {
      const userData = { username, newPassword };
      axios
        .post("/auth/change-password:username", userData)
        .then((response) => {
          if (response.status === 200) {
            loginPage.setNewPassSuccesfull(true);
          }
        })
        .catch((error) => console.error("Failed to change password", error));
    } catch (error) {
      console.log("Network error", error);
      alert("Failed to change password. Please try again later");
    }
  };

  return (
    <>
      <form className="mt-4 w-2/3 space-y-2 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <div className="mb-1 mt-4 text-sm font-bold"> New Password</div>
          <input
            className="border rounded-md py-2"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <div className="mb-1 mt-4 text-sm font-bold"> Confirm New Password</div>
          <input
            className="border rounded-md py-2"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />

          <button
            className="flex items-center justify-center w-full border h-10 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-600 transition duration-300 mt-4 cursor-pointer"
            type="submit"
          >
            {" "}
            Change Password
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordFormElement;
