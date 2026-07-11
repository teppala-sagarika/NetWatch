import { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import MetricsChart from "./MetricsChart";
import socket from "../services/socket";

function Dashboard() {

  const [metrics, setMetrics] = useState(null);

  const [history, setHistory] = useState({
    labels: [],
    cpu: [],
    memory: [],
    disk: [],
  });

  useEffect(() => {

    socket.on("metrics", (data) => {

      setMetrics(data);

      const currentTime =
        new Date().toLocaleTimeString();

      setHistory((prev) => ({

        labels: [
          ...prev.labels.slice(-19),
          currentTime,
        ],

        cpu: [
          ...prev.cpu.slice(-19),
          Number(data.cpu),
        ],

        memory: [
          ...prev.memory.slice(-19),
          Number(data.memory),
        ],

        disk: [
          ...prev.disk.slice(-19),
          Number(data.disk),
        ],

      }));

    });

    return () => {
      socket.off("metrics");
    };

  }, []);

  if (!metrics) {
    return <h2>Loading Metrics...</h2>;
  }

  return (
    <>

      <div className="section-header">

        <h2>Backend Health</h2>

        <p className="section-description">
          These metrics show the health of the Render-hosted backend responsible for monitoring your services. Website response times and availability are measured independently of these server metrics.
        </p>

      </div>

      <div className="cards">

        <MetricCard
          title="CPU Usage"
          value={`${metrics.cpu}%`}
        />

        <MetricCard
          title="Memory Usage"
          value={`${metrics.memory}%`}
        />

        <MetricCard
          title="Disk Usage"
          value={`${metrics.disk}%`}
        />

        <MetricCard
          title="Uptime"
          value={`${Math.floor(metrics.uptime / 3600)} hrs`}
        />

      </div>

      <MetricsChart
        history={history}
      />

    </>
);
}

export default Dashboard;