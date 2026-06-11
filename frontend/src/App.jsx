import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import DeviceDetails from "./pages/DeviceDetails";
import DevicesPage from "./pages/DevicesPage";
import AlertsPage from "./pages/AlertsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<DashboardPage />}
      />
      <Route
  path="/devices"
  element={<DevicesPage />}
/>

<Route
  path="/alerts"
  element={<AlertsPage />}
/>

<Route
  path="/analytics"
  element={<AnalyticsPage />}
/>
      <Route
        path="/device/:id"
        element={<DeviceDetails />}
      />

    </Routes>
  );
}

export default App;