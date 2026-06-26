import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import GovNavbar from "./components/layout/GovNavbar";
import {
  RequireAdmin,
  RequireVerifiedVoter,
} from "./components/guards/WorkflowGuards";
import Home from "./pages/home";
import RegisterVoter from "./pages/RegisterVoter";
import Verification from "./pages/Verification";
import Vote from "./pages/vote";
import VoteSuccess from "./pages/VoteSuccess";
import Results from "./pages/Results";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/Admin";

function App() {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashScreen onDone={() => setSplashDone(true)} />;
  }

  return (
    <BrowserRouter>
      <GovNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-voter" element={<RegisterVoter />} />
        <Route path="/login-vote" element={<Verification />} />
        <Route path="/results" element={<Results />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/verification" element={<Navigate to="/login-vote" replace />} />
        <Route path="/election-status" element={<Navigate to="/login-vote" replace />} />

        <Route element={<RequireVerifiedVoter />}>
          <Route path="/vote" element={<Vote />} />
        </Route>

        <Route path="/vote-success" element={<VoteSuccess />} />

        <Route element={<RequireAdmin />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/register-candidate" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
