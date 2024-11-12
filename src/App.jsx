import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import DashboardHome from "./Dashboard/pages/DashboardHome";
import Events from "./Dashboard/pages/Events";
import Statistics from "./Dashboard/pages/Statistics";
import Notes from "./Dashboard/pages/Notes";
import ProjectInfo from "./Dashboard/pages/ProjectInfo";
import MyProfile from "./Dashboard/pages/MyProfile";
import Admin from "./Dashboard/pages/Admin";
import LoginPage from "./LoginPage/pages/LoginPage";
import CreateAccountPage from "./CreateAccountPage/pages/CreateAccountPage";
import ForgotPasswordPage from "./ForgotPasswordPage/pages/ForgotPasswordPage";
import AccountVerifyPage from "./AccountVerificationPage/pages/AccountVerifyPage";
import ChangePasswordPage from "./ChangePasswordPage/pages/ChangePasswordPage";

import "./index.css";

import { AppProvider } from "./context/AppContext";
import { HomeProvider } from "./context/HomeContext";
import { EventsProvider } from "./context/EventsContext";
import { NotesProvider } from "./context/NotesContex";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/auth/login"
        element={
          <AppProvider>
            <HomeProvider>
              <LoginPage />{" "}
            </HomeProvider>
          </AppProvider>
        }
      />
      <Route
        path="/auth/register"
        element={
          <AppProvider>
            <CreateAccountPage />{" "}
          </AppProvider>
        }
      />
      <Route
        path="/auth/forgot-password"
        element={
          <AppProvider>
            <ForgotPasswordPage />{" "}
          </AppProvider>
        }
      />

      <Route
        path="/auth/verify/:username"
        element={
          <AppProvider>
            <AccountVerifyPage />{" "}
          </AppProvider>
        }
      />

      <Route
        path="/auth/password-reset/:username"
        element={
          <AppProvider>
            <ChangePasswordPage />{" "}
          </AppProvider>
        }
      />

      <Route
        path="/dashboard/home"
        element={
          <AppProvider>
            <HomeProvider>
              <DashboardHome />
            </HomeProvider>
          </AppProvider>
        }
      />
      <Route
        path="/dashboard/events"
        element={
          <AppProvider>
            <HomeProvider>
              <EventsProvider>
                <Events />
              </EventsProvider>
            </HomeProvider>
          </AppProvider>
        }
      />

      <Route
        path="/dashboard/statistics"
        element={
          <AppProvider>
            <HomeProvider>
              <Statistics />
            </HomeProvider>
          </AppProvider>
        }
      />

      <Route
        path="/dashboard/notes"
        element={
          <AppProvider>
            <HomeProvider>
              <NotesProvider>
                <Notes />
              </NotesProvider>
            </HomeProvider>
          </AppProvider>
        }
      />

      <Route
        path="/dashboard/project-info"
        element={
          <AppProvider>
            <HomeProvider>
              <ProjectInfo />
            </HomeProvider>
          </AppProvider>
        }
      />

      <Route
        path="/dashboard/profile/:username"
        element={
          <AppProvider>
            <HomeProvider>
              <MyProfile />
            </HomeProvider>
          </AppProvider>
        }
      />

      <Route
        path="/dashboard/admin-section"
        element={
          <AppProvider>
            <HomeProvider>
              <Admin />
            </HomeProvider>
          </AppProvider>
        }
      />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
