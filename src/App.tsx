
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import DashboardPage from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/resume" element={<ResumeAnalyzer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
