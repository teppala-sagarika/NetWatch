import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import DeviceDetails from "./pages/DeviceDetails";
import DevicesPage from "./pages/DevicesPage";
import AlertsPage from "./pages/AlertsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import Login from "./pages/Login";

import { useEffect } from "react";
import API from "./services/api";

import ProtectedRoute
from "./components/ProtectedRoute";
function App() {
useEffect(() => {

    const verifyUser = async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        if (!token)
            return;

        try {

            const res =
                await API.get(
                    "/auth/me"
                );

            localStorage.setItem(

                "user",

                JSON.stringify(
                    res.data
                )

            );

        }

        catch {

            localStorage.clear();

            window.location.href =
                "/login";

        }

    };

    verifyUser();

}, []);
  return (
    <Routes>

      <Route

    path="/"

    element={

        <ProtectedRoute>

            <DashboardPage/>

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
  path="/alerts"
  element={

        <ProtectedRoute>

            <AlertsPage />

        </ProtectedRoute>

    }
/>

<Route
    path="/login"
    element={<Login />}
/>

<Route
    path="/register"
    element={<Register />}
/>
<Route

    path="/verify"

    element={<VerifyOTP/>}

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
        path="/device/:id"
        element={

        <ProtectedRoute>

           <DeviceDetails />

        </ProtectedRoute>

    }
      />

    </Routes>
  );
}

export default App;