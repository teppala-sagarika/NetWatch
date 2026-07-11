import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login({ switchToRegister }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease"
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontFamily: "monospace",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#64748b",
    marginBottom: "6px"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      <div>
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 4px 0" }}>Welcome Back</h3>
        <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
          NetWatch • Real-Time Monitoring Console
        </p>
      </div>

      <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Security Email</label>
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = "#06b6d4"}
            onBlur={(e) => e.target.style.borderColor = "#1e293b"}
            required
          />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={labelStyle}>Access Password</label>
            <a href="#" style={{ fontSize: "11px", color: "#22d3ee", textDecoration: "none", marginBottom: "6px" }}>Forgot?</a>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = "#06b6d4"}
            onBlur={(e) => e.target.style.borderColor = "#1e293b"}
            required
          />
        </div>

        <button 
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "8px",
            padding: "12px",
            borderRadius: "10px",
            background: "linear-gradient(to right, #06b6d4, #2563eb)",
            color: "#fff",
            fontWeight: "600",
            fontSize: "14px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgba(6, 182, 212, 0.15)",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Authenticating Session..." : "Launch Console Dashboard"}
        </button>
      </form>

      <p style={{ fontSize: "13px", color: "#64748b", textAlign: "center", margin: "4px 0 0 0" }}>
        Don't have credentials?{" "}
        <button 
          type="button"
          onClick={switchToRegister} 
          style={{ background: "none", border: "none", color: "#22d3ee", padding: 0, cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
        >
          Register Hub
        </button>
      </p>
    </div>
  );
}

export default Login;