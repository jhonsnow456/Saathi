import { Navigate, useRoutes, useNavigate } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import TestOnboarding from "./pages/test/TestOnboarding.js";
import SpeechTest from "./pages/test/SpeechTest.js";
import NotFound from './pages/Page404';
import STT from "./components/test/speech-to-text.js";

import TestMaker from './components/testmaker/TestMaker';
import Listening from './components/test/Listening';

import Upload from "./utils/azurefileupload/App.js";
import TEST_LISTENING from './data/TEST_LISTENING';

import Profile from "./pages/profile/Profile";
import { useEffect, useState } from "react";
import swal from 'sweetalert';

// ----------------------------------------------------------------------

export default function Router(props) {

  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout open={true} />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <DashboardApp /> },
        {
          path: "user/:id",
          element: <Profile /> ,
        },
        { path: "test/new", element: <TestOnboarding />},
        { path: "test/speech", element: <SpeechTest />  },
        { path: "test/listening", element: <TestMaker   details={TEST_LISTENING.details} questions={TEST_LISTENING.questions.easy} testComponent={Listening}/> },
        { path: "upload", element: <Upload />  },
        { path: "report/:id", element: <DashboardApp />  },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/app"/> },
      ],
    },
  ]);
}
