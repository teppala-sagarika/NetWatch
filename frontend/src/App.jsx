import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "./services/api";

// Page Views
import DashboardPage from "./pages/DashboardPage";
import DeviceDetails from "./pages/DeviceDetails";
import DevicesPage from "./pages/DevicesPage";
import AlertsPage from "./pages/AlertsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import VerifyOTP from "./pages/VerifyOTP";
import LandingPage from "./pages/LandingPage";

// Security Wrappers
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setCheckingAuth(false);
        return;
      }

      try {
        const res = await API.get("/auth/me");
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsAuthenticated(true);
      } catch {
        localStorage.clear();
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyUser();
  }, []);

  if (checkingAuth) {
    // Subtle, styled SaaS loader while analyzing initial session validity
    return (
      <div className="fixed inset-0 bg-[#050816] flex flex-col items-center justify-center gap-3 text-slate-400 font-mono text-xs">
        <div className="w-6 h-6 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
        <span>Verifying Security Context...</span>
      </div>
    );
  }

  return (
    <Routes>
      {/* 
        Landing Hub Strategy:
        If already logged in, seamlessly bypass landing page and jump straight to internal console.
      */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />}
      />

      {/* Two-factor authentication step, if required by system workflow */}
      <Route path="/verify" element={<VerifyOTP />} />

      {/* Internal Protected Engineering Console */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/devices"
        element={
          <ProtectedRoute>
            <DevicesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alerts"
        element={
          <ProtectedRoute>
            <AlertsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/device/:id"
        element={
          <ProtectedRoute>
            <DeviceDetails />
          </ProtectedRoute>
        }
      />

      {/* Catch-all Wildcard Route to prevent dead terminal screens */}
      <Route path="*" replace to={isAuthenticated ? "/dashboard" : "/"} />
    </Routes>
  );
}

export default App;