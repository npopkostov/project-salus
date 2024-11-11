// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";

// const AppContext = createContext();

// const AppProvider = ({ children }) => {
//   //LOGIN PAGE
//   // Forgot password request ifSuccesfull
//   const [requestSuccesfull, setRequestSuccesfull] = useState(false);
//   // Create new account request ifSuccesfull
//   const [newAccReqSuccsefull, setNewAccReqSuccesfull] = useState(false);
//   // Verification ifSuccesfull
//   const [successfullVerification, setSuccesfullVerification] = useState(false);
//   // New Password ifSuccesfull
//   const [newPassSuccesfull, setNewPassSuccesfull] = useState(false);

//   //DASHBOARD
//   //Menu change
//   const [isMinimized, setIsMinimized] = useState(false);
//   // Day/Night theme
//   const [isNightMode, setIsNightMode] = useState(false);
//   // Admin route
//   const [isAdmin, setIsAdmin] = useState();

//   // Username
//   const [userName, setUserName] = useState();
//   // Role
//   const [userRole, setUserRole] = useState();
//   // Email
//   const [userMail, setUserMail] = useState("");

//   // Show search div
//   // const [search, setSearch] = useState(false);
//   // Show key div
//   // const [showKey, setShowKey] = useState(false);
//   // Show information div
//   // const [showInfo, setShowInfo] = useState(false);
//   // Search params
//   // const [queryDate, setQueryDate] = useState();
//   // Events data
//   // const [data, setData] = useState();
//   // Change variant used to detect changes in the search bar to perform a new request to the backend
//   // const [change, setChange] = useState(0);
//   // Map location/position
//   // const [position, setPosition] = useState([41.627933960801556, 21.777213112005363]);
//   // Map zoom level
//   // const [zoomLevel, setZoomLevel] = useState(9);
//   // Map settings "isSelected"
//   // const [isSelected, setIsSelected] = useState("Macedonia");

//   return (
//     <AppContext.Provider
//       value={{
//         loginPage: {
//           requestSuccesfull,
//           setRequestSuccesfull,
//           newAccReqSuccsefull,
//           setNewAccReqSuccesfull,
//           successfullVerification,
//           setSuccesfullVerification,
//           newPassSuccesfull,
//           setNewPassSuccesfull,
//         },
//         dashboardPage: {
//           isMinimized,
//           setIsMinimized,
//           isNightMode,
//           setIsNightMode,
//           data,
//           userName,
//           setUserName,
//           isAdmin,
//           setIsAdmin,
//           userRole,
//           setUserRole,
//           userMail,
//           setUserMail,
//         },
//         // ui: { search, setSearch, showKey, setShowKey, showInfo, setShowInfo },
//         // query: { setChange, setQueryDate, queryDate },
//         // mapSettings: { position, setPosition, zoomLevel, setZoomLevel, isSelected, setIsSelected },
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// // export { AppProvider, AppContext };
