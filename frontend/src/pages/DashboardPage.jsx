import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import HealthScore from "../components/HealthScore";
import SummaryCards
from "../components/SummaryCards";
function DashboardPage() {

  const [devices, setDevices] =
    useState([]);
    const [alerts,
setAlerts] =
useState([]);

  const loadDevices = async () => {

    const res =
      await API.get("/devices");

    setDevices(res.data);
  };
  const loadAlerts =
async () => {

  const res =
  await API.get(
    "/alerts"
  );

  setAlerts(
    res.data
  );

};

useEffect(() => {

  loadDevices();

  loadAlerts();

  const interval =
    setInterval(() => {

      loadDevices();

      loadAlerts();

    }, 5000);

  return () =>
    clearInterval(interval);

}, []);

  return (

    <div className="layout">

      <Sidebar />

      <div className="main-content">

        <h1>Dashboard</h1>
        <SummaryCards
  devices={devices}
  alerts={alerts}
/>

        <HealthScore
          devices={devices}
        />

        <Dashboard />

      </div>

    </div>

  );
}



export default DashboardPage;