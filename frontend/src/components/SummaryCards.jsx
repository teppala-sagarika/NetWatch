import React from "react";
import { Server, Wifi, WifiOff, BellRing } from "lucide-react";

function SummaryCards({ devices = [], alerts = [] }) {
  const online = devices.filter((d) => d.status === "Online").length;
  const offline = devices.filter((d) => d.status === "Offline").length;

  // Shared structural card style
  const cardStyle = {
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    border: "1px solid #1e293b",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.3)",
    fontFamily: "system-ui, -apple-system, sans-serif"
  };

  const labelStyle = {
    fontSize: "11px",
    fontFamily: "monospace",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#64748b",
    margin: 0
  };

  const valueStyle = {
    fontSize: "32px",
    fontWeight: "800",
    color: "#fff",
    margin: 0,
    fontFamily: "monospace",
    lineHeight: 1
  };

  const iconWrapperStyle = (glowColor) => ({
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    backgroundColor: "#020617",
    border: "1px solid #1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 0 12px -3px ${glowColor}`
  });

  return (
    <div 
      style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "16px",
        width: "100%"
      }}
    >
      {/* Total Devices Card */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={labelStyle}>Total Nodes</h3>
          <div style={iconWrapperStyle("rgba(6, 182, 212, 0.25)")}>
            <Server style={{ width: "18px", height: "18px", color: "#22d3ee" }} />
          </div>
        </div>
        <h2 style={valueStyle}>{devices.length}</h2>
      </div>

      {/* Online Card */}
      <div style={{ ...cardStyle, borderLeft: "3px solid #22c55e" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={labelStyle}>Online</h3>
          <div style={iconWrapperStyle("rgba(34, 197, 94, 0.25)")}>
            <Wifi style={{ width: "18px", height: "18px", color: "#22c55e" }} />
          </div>
        </div>
        <h2 style={{ ...valueStyle, color: "#22c55e" }}>{online}</h2>
      </div>

      {/* Offline Card */}
      <div style={{ ...cardStyle, borderLeft: offline > 0 ? "3px solid #ef4444" : "1px solid #1e293b" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={labelStyle}>Offline</h3>
          <div style={iconWrapperStyle(offline > 0 ? "rgba(239, 68, 68, 0.25)" : "transparent")}>
            <WifiOff style={{ width: "18px", height: "18px", color: offline > 0 ? "#ef4444" : "#475569" }} />
          </div>
        </div>
        <h2 style={{ ...valueStyle, color: offline > 0 ? "#ef4444" : "#475569" }}>{offline}</h2>
      </div>

      {/* Active Alerts Card */}
      <div style={{ ...cardStyle, borderLeft: alerts.length > 0 ? "3px solid #f59e0b" : "1px solid #1e293b" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={labelStyle}>Active Alerts</h3>
          <div style={iconWrapperStyle(alerts.length > 0 ? "rgba(245, 158, 11, 0.25)" : "transparent")}>
            <BellRing style={{ 
              width: "18px", 
              height: "18px", 
              color: alerts.length > 0 ? "#f59e0b" : "#475569",
              animation: alerts.length > 0 ? "pulse 2s infinite" : "none"
            }} />
          </div>
        </div>
        <h2 style={{ ...valueStyle, color: alerts.length > 0 ? "#f59e0b" : "#475569" }}>{alerts.length}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;