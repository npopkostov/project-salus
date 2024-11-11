import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const AccVerifyEelement = () => {
  const { loginPage } = useContext(AppContext);
  const [verificationCode, setVerificationCode] = useState(null);
  const { username } = useParams();

  // Handle submit 6 digit code for verification
  const handleSubmit = function (verificationCode) {
    try {
      const codeForVerification = Number(verificationCode);
      const userData = { username: username, codeForVerification: codeForVerification };
      axios
        .post("/auth/verify/:username", userData)
        .then((response) => {
          if (response.status === 200) {
            loginPage.setSuccesfullVerification(true);
          }
        })
        .catch((error) => console.log("Error:", error));
    } catch (error) {
      console.log("Network error", error);
      alert("Failed to verify the account. Please try again later");
    }
  };

  // Launch handleSubmit when the code is 6 digits long
  useEffect(() => {
    if (verificationCode !== null) {
      if (verificationCode.length === 6) {
        handleSubmit(verificationCode);
      }
    }
  }, [verificationCode]);

  return (
    <>
      <form className="mt-4 w-2/3 space-y-2 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <div className="mb-1 mt-4 text-sm font-bold"> Verification Code</div>
          <input
            className="border rounded-md py-2"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
      </form>
    </>
  );
};

export default AccVerifyEelement;
