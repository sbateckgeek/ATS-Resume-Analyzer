import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import JobAnalysis from "./pages/JobAnalysis";
import LinkedInSync from "./pages/LinkedInSync";
import CoverLetterGenerator from "./pages/CoverLetterGenerator";
import SettingsLayout from "./pages/Settings";
import AccountSettings from "./pages/settings/AccountSettings";
import AppearanceSettings from "./pages/settings/AppearanceSettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Navigate to="resume" />,
      },
      {
        path: "resume",
        element: <ResumeAnalyzer />,
      },
      {
        path: "job-analysis",
        element: <JobAnalysis />,
      },
      {
        path: "linkedin",
        element: <LinkedInSync />,
      },
      {
        path: "cover-letter",
        element: <CoverLetterGenerator />,
      },
    ],
  },
  {
    path: "/dashboard/settings",
    element: <SettingsLayout />,
    children: [
      { path: "", element: <AccountSettings /> },
      { path: "account", element: <AccountSettings /> },
      { path: "appearance", element: <AppearanceSettings /> },
      { path: "notifications", element: <NotificationSettings /> },
    ],
  },
]);

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
