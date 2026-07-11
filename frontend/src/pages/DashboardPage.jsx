import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import HealthScore from "../components/HealthScore";
import SummaryCards
  from "../components/SummaryCards";
import DeviceTable from "../components/DeviceTable";
import Alerts from "../components/Alerts";

import socket
  from "../services/socket";
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

    socket.on(
      "deviceUpdated",
      (devices) => {

        console.log("Received from socket:", devices);

        setDevices(devices);

      }
    );
    socket.on(

    "alertsUpdated",

    (alerts)=>{

        setAlerts(alerts);

    }

);

    return () => {

      socket.off(

        "deviceUpdated"

      );

      socket.off(
    "alertsUpdated"
);

    };

  }, []);

  return (

    <div className="layout">

      <Sidebar />

      <div className="main-content">

        <h1>Dashboard</h1>

        {/* Add a wrapper container with margin-bottom to create space below them */}
<div style={{ marginBottom: "32px" }}>
  <SummaryCards devices={devices} alerts={alerts} />
</div>

<div style={{ marginBottom: "40px" }}>
  <HealthScore devices={devices} />
</div>
        <DeviceTable
          devices={devices}
          refresh={loadDevices}
        />

        <Dashboard />

        <Alerts />

      </div>

    </div>

  );
}



export default DashboardPage;