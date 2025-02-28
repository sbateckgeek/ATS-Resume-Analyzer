
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import DashboardPage from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/resume" element={<ResumeAnalyzer />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
