import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  //LOGIN PAGE
  // Forgot password request ifSuccesfull
  const [requestSuccesfull, setRequestSuccesfull] = useState(false);
  // Create new account request ifSuccesfull
  const [newAccReqSuccsefull, setNewAccReqSuccesfull] = useState(false);
  // Verification ifSuccesfull
  const [successfullVerification, setSuccesfullVerification] = useState(false);
  // New Password ifSuccesfull
  const [newPassSuccesfull, setNewPassSuccesfull] = useState(false);

  //DASHBOARD
  //Menu change
  const [isMinimized, setIsMinimized] = useState(false);
  // Day/Night theme
  const [isNightMode, setIsNightMode] = useState(false);
  // Admin route
  const [isAdmin, setIsAdmin] = useState();

  // Username
  const [userName, setUserName] = useState();
  // Role
  const [userRole, setUserRole] = useState();
  // Email
  const [userMail, setUserMail] = useState("");

  // Events data
  const [data, setData] = useState();

  return (
    <AppContext.Provider
      value={{
        loginPage: {
          requestSuccesfull,
          setRequestSuccesfull,
          newAccReqSuccsefull,
          setNewAccReqSuccesfull,
          successfullVerification,
          setSuccesfullVerification,
          newPassSuccesfull,
          setNewPassSuccesfull,
        },
        dashboardPage: {
          isMinimized,
          setIsMinimized,
          isNightMode,
          setIsNightMode,
          data,
          userName,
          setUserName,
          isAdmin,
          setIsAdmin,
          userRole,
          setUserRole,
          userMail,
          setUserMail,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
