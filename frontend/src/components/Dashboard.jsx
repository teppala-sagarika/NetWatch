import { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import MetricsChart from "./MetricsChart";
import socket from "../services/socket";
import { Cpu, HardDrive, Layers, Activity, ShieldCheck } from "lucide-react";

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
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setHistory((prev) => ({
        labels: [...prev.labels.slice(-19), currentTime],
        cpu: [...prev.cpu.slice(-19), Number(data.cpu)],
        memory: [...prev.memory.slice(-19), Number(data.memory)],
        disk: [...prev.disk.slice(-19), Number(data.disk)],
      }));
    });

    return () => {
      socket.off("metrics");
    };
  }, []);

  // Sleek, animated-looking loading state matching landing theme
  if (!metrics) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: "60vh", color: "#94a3b8", gap: "16px", fontFamily: "system-ui, sans-serif"
      }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "50%", 
          border: "3px solid rgba(6, 182, 212, 0.1)", borderTopColor: "#06b6d4",
          animation: "spin 1s linear infinite"
        }} className="animate-spin" />
        <div style={{ fontFamily: "monospace", fontSize: "12px", letterSpacing: "0.1em", uppercase: "true", color: "#22d3ee" }}>
          Establishing Socket.IO Node Handshake...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#f1f5f9",
      padding: "24px",
      maxWidth: "1280px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "32px"
    }}>
      
      {/* Dashboard Section Header */}
      <div style={{
        borderBottom: "1px solid #1e293b",
        paddingBottom: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 12px", borderRadius: "9999px", backgroundColor: "rgba(52, 211, 153, 0.1)",
            border: "1px solid rgba(52, 211, 153, 0.2)", color: "#34d399", fontSize: "11px", fontFamily: "monospace"
          }}>
            <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#34d399" }} />
            CLUSTER ACTIVE
          </div>
        </div>

        <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#fff", margin: 0, tracking: "-0.02em" }}>
          Backend Health Engine
        </h2>
        
        <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", maxWidth: "800px", margin: 0 }}>
              These metrics show the health of the Render-hosted backend responsible for monitoring your services. Website response times and availability are measured independently of these server metrics.
        </p>
      </div>

      {/* Grid Wrapper for Custom Analytics Cards */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
          gap: "20px" 
        }}
      >
        <div style={cardContainerStyle}>
          <div style={iconWrapperStyle("#06b6d4")}><Cpu style={{ width: "20px", height: "20px", color: "#22d3ee" }} /></div>
          <MetricCard title="CPU Utilization" value={`${metrics.cpu}%`} />
        </div>

        <div style={cardContainerStyle}>
          <div style={iconWrapperStyle("#818cf8")}><Layers style={{ width: "20px", height: "20px", color: "#818cf8" }} /></div>
          <MetricCard title="Memory Allocation" value={`${metrics.memory}%`} />
        </div>

        <div style={cardContainerStyle}>
          <div style={iconWrapperStyle("#fbbf24")}><HardDrive style={{ width: "20px", height: "20px", color: "#fbbf24" }} /></div>
          <MetricCard title="Disk Volume Space" value={`${metrics.disk}%`} />
        </div>

        <div style={cardContainerStyle}>
          <div style={iconWrapperStyle("#34d399")}><Activity style={{ width: "20px", height: "20px", color: "#34d399" }} /></div>
          <MetricCard title="System Core Uptime" value={`${Math.floor(metrics.uptime / 3600)} hrs`} />
        </div>
      </div>

      {/* Analytics Chart Block Container */}
      <div style={{
        backgroundColor: "rgba(15, 23, 42, 0.3)",
        border: "1px solid #1e293b",
        borderRadius: "16px",
        padding: "24px",
        backdropFilter: "blur(12px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <ShieldCheck style={{ color: "#06b6d4", width: "18px", height: "18px" }} />
          <h3 style={{ fontSize: "14px", fontWeight: "600", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.05em", color: "#cbd5e1", margin: 0 }}>
            Live Chrono Telemetry Timeline
          </h3>
        </div>
        <MetricsChart history={history} />
      </div>

    </div>
  );
}

/* Styled Objects to bundle MetricCard variables beautifully */
const cardContainerStyle = {
  position: "relative",
  backgroundColor: "rgba(15, 23, 42, 0.4)",
  border: "1px solid #1e293b",
  borderRadius: "16px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.3)",
  overflow: "hidden"
};

const iconWrapperStyle = (glowColor) => ({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  backgroundColor: "#020617",
  border: "1px solid #1e293b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 0 15px -3px ${glowColor}25`
});

export default Dashboard;