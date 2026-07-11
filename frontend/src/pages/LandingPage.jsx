import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { 
  Globe, Zap, Shield, BarChart3, Bell, FileSpreadsheet, 
  PlusCircle, CheckCircle2, Cpu, Activity, Clock, Terminal 
} from "lucide-react";
import Login from "./Login";
import Register from "./Register";

export default function LandingPage() {
  const [authMode, setAuthMode] = useState("login"); 
  const [isScrolled, setIsScrolled] = useState(false);
  const canvasRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 15 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 16000));
    const particles = [];
    const connectionDistance = 120;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10, 
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, "#0b1022");
      gradient.addColorStop(1, "#050816");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = springX.get() * 0.03;
      const my = springY.get() * 0.03;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x + mx, p.y + my, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.45)";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = (pi.x + mx) - (pj.x + mx);
          const dy = (pi.y + my) - (pj.y + my);
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(pi.x + mx, pi.y + my);
            ctx.lineTo(pj.x + mx, pj.y + my);
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [springX, springY]);

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      backgroundColor: "#050816",
      color: "#f1f5f9",
      fontFamily: "system-ui, -apple-system, sans-serif",
      overflowX: "hidden"
    }}>
      
      {/* BACKGROUND FIX: Forces layout isolation under everything */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden"
      }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      </div>

      {/* Navigation Header */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: isScrolled ? "16px 24px" : "24px 24px",
        backgroundColor: isScrolled ? "rgba(5, 8, 22, 0.75)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(6, 182, 212, 0.1)" : "1px solid transparent",
        transition: "all 0.3s ease"
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "between", alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #06b6d4, #2563eb)",
              display: "flex", alignItems: "center", justifyItems: "center", paddingLeft: "8px"
            }}>
              <Activity style={{ width: "20px", height: "20px", color: "#fff" }} />
            </div>
            <span style={{ fontSize: "20px", fontWeight: "700", tracking: "-0.05em", color: "#fff" }}>NetWatch</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "32px", marginLeft: "auto" }}>
            <div className="hidden md:flex" style={{ gap: "24px", display: "flex" }}>
              <a href="#features" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px" }}>Features</a>
              <a href="#how-it-works" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px" }}>How It Works</a>
              <a href="#tech" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px" }}>Technology</a>
            </div>
            <button 
              onClick={() => document.getElementById("auth-card")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "8px 16px", borderRadius: "8px", backgroundColor: "#0f172a",
                border: "1px solid #1e293b", color: "#cbd5e1", fontSize: "13px", fontWeight: "600", cursor: "pointer"
              }}
            >
              Console Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container: Forces layout grid mapping */}
      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "140px 24px 80px 24px",
        display: "grid",
        gridTemplateColumns: "window.innerWidth > 1024 ? 'repeat(12, minmax(0, 1fr))' : '1fr'",
        gap: "48px"
      }} className="grid lg:grid-cols-12 grid-cols-1">
        
        {/* LEFT SECTION (Presentation Columns) */}
        <div className="lg:col-span-7 xl:col-span-8" style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          
          {/* Hero Unit */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "4px 12px", borderRadius: "9999px", backgroundColor: "rgba(6, 182, 212, 0.1)",
              border: "1px solid rgba(6, 182, 212, 0.2)", color: "#22d3ee", fontSize: "12px", width: "fit-content"
            }}>
              <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#06b6d4" }} />
              Engine Matrix Live Verification
            </div>
            
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: "900", color: "#fff", lineHeight: "1.1", margin: 0 }}>
              Monitor Everything. <br />
              <span style={{ background: "linear-gradient(to right, #22d3ee, #3b82f6, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                React Instantly.
              </span>
            </h1>
            
            <p style={{ fontSize: "18px", color: "#94a3b8", lineHeight: "1.6", maxWidth: "600px", margin: 0 }}>
              NetWatch is a real-time website and API monitoring platform that continuously checks service availability, response time, uptime, and system health while providing instant alerts and live dashboards.
            </p>
            
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "8px" }}>
              <button 
                onClick={() => document.getElementById("auth-card")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(to right, #06b6d4, #2563eb)",
                  color: "#fff", fontWeight: "600", border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(6, 182, 212, 0.3)"
                }}
              >
                Get Started Free
              </button>
              <a 
                href="#features"
                style={{
                  padding: "12px 24px", borderRadius: "12px", backgroundColor: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid #1e293b", color: "#cbd5e1", fontWeight: "600", textDecoration: "none", display: "inline-block"
                }}
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Statistics Segment */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "16px", width: "100%" }}>
            {[
              { label: "Target Availability", value: "99.9%" },
              { label: "Avg Response Tracking", value: "<300 ms" },
              { label: "Socket.IO Updates", value: "Real-Time" },
              { label: "Continuous Check", value: "24/7" }
            ].map((stat, idx) => (
              <div key={idx} style={{ backgroundColor: "rgba(2, 6, 23, 0.4)", border: "1px solid #0f172a", borderRadius: "12px", padding: "16px" }}>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>{stat.value}</div>
                <div style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Premium Core Capability Cards */}
          <section id="features" style={{ scrollMarginTop: "110px" }}>
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#fff", margin: 0 }}>Platform Capabilities</h2>
              <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "4px", margin: 0 }}>Enterprise telemetry orchestration metrics dashboard built for DevOps teams.</p>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {[
                { icon: <Globe style={{ color: "#22d3ee" }} />, title: "Real-Time Monitoring", desc: "Continuously monitors websites and APIs with automatic health checks." },
                { icon: <Zap style={{ color: "#fbbf24" }} />, title: "Live Response Time", desc: "Track response time, latency and service availability in real time." },
                { icon: <Shield style={{ color: "#34d399" }} />, title: "Secure Multi-User Platform", desc: "JWT authentication with user-specific dashboards and isolated monitoring." },
                { icon: <BarChart3 style={{ color: "#818cf8" }} />, title: "Analytics Dashboard", desc: "Interactive charts, historical logs, uptime statistics and performance trends." },
                { icon: <Bell style={{ color: "#f87171" }} />, title: "Instant Alerts", desc: "Receive real-time alerts whenever monitored services become unavailable." },
                { icon: <FileSpreadsheet style={{ color: "#2dd4bf" }} />, title: "PDF & CSV Reports", desc: "Export monitoring history and performance reports with one click." }
              ].map((feat, i) => (
                <div 
                  key={i} 
                  style={{ backgroundColor: "rgba(15, 23, 42, 0.2)", border: "1px solid #0f172a", borderRadius: "16px", padding: "20px" }}
                >
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "#020617", border: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {feat.icon}
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#e2e8f0", margin: "0 0 6px 0" }}>{feat.title}</h3>
                  <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sequential Timeline Pipeline Block */}
          <section id="how-it-works" style={{ scrollMarginTop: "110px" }}>
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#fff", margin: 0 }}>The Monitoring Pipeline</h2>
              <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "4px", margin: 0 }}>From endpoint configuration to instant metric dispersion.</p>
            </div>
            
            <div style={{ position: "relative", paddingLeft: "24px", borderLeft: "1px solid #1e293b", display: "flex", flexDirection: "column", gap: "24px", maxWidth: "576px" }}>
              {[
                { title: "User configuration inputs", desc: "Endpoints are added instantly with customized frequency timers.", icon: <PlusCircle style={{ color: "#22d3ee", width: "16px", height: "16px" }} /> },
                { title: "NetWatch core validation", desc: "System engine validates payload structures, standard formatting, and network schemas.", icon: <Terminal style={{ color: "#c084fc", width: "16px", height: "16px" }} /> },
                { title: "Distributed cron pooling", desc: "Cron worker pools execute distributed network pings safely across standard channels.", icon: <Clock style={{ color: "#fbbf24", width: "16px", height: "16px" }} /> },
                { title: "Telemetry engine pipeline", desc: "Response latency calculations and server state weights are structured securely.", icon: <Cpu style={{ color: "#34d399", width: "16px", height: "16px" }} /> },
                { title: "Socket.IO interface push", desc: "Asynchronous active channels broadcast metrics data live to clients without polling delay.", icon: <Zap style={{ color: "#60a5fa", width: "16px", height: "16px" }} /> },
                { title: "Edge notification matrix", desc: "Automated alert dispatches clear workflows immediately during target timeouts.", icon: <CheckCircle2 style={{ color: "#f87171", width: "16px", height: "16px" }} /> },
              ].map((step, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", left: "-33px", top: "2px", width: "16px", height: "16px",
                    borderRadius: "50%", backgroundColor: "#020617", border: "1px solid #1e293b",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#e2e8f0", margin: "0 0 2px 0" }}>{step.title}</h4>
                    <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.5", margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technological Frameworks */}
          <section id="tech" style={{ scrollMarginTop: "110px" }}>
            <h2 style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px", margin: 0 }}>Architecture Stack</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxWidth: "576px" }}>
              {["React", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT", "Axios", "Render", "Vercel", "Styled Components"].map((tech, i) => (
                <span key={i} style={{ padding: "6px 12px", borderRadius: "8px", backgroundColor: "rgba(2, 6, 23, 0.4)", border: "1px solid #0f172a", fontSize: "12px", fontFamily: "monospace", color: "#94a3b8" }}>
                  {tech}
                </span>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT SECTION (Sticky Auth Panel) */}
        <div id="auth-card" className="lg:col-span-5 xl:col-span-4" style={{ position: "sticky", top: "110px", width: "100%", height: "fit-content" }}>
          <div style={{
            position: "relative", borderRadius: "16px", backgroundColor: "rgba(15, 23, 42, 0.4)",
            border: "1px solid #1e293b", padding: "24px", backdropFilter: "blur(24px)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
          }}>
            {/* Panel Tab Navigators */}
            <div style={{ position: "relative", zIndex: 10, width: "100%", marginBottom: "24px", padding: "4px", backgroundColor: "#020617", borderRadius: "12px", display: "flex", alignItems: "center", border: "1px solid #0f172a" }}>
              <button 
                type="button"
                onClick={() => setAuthMode("login")}
                style={{
                  flex: 1, padding: "8px 0", textAlign: "center", fontSize: "12px", fontWeight: "600", border: "none", borderRadius: "8px", cursor: "pointer",
                  backgroundColor: authMode === "login" ? "#1e293b" : "transparent", color: authMode === "login" ? "#fff" : "#64748b", transition: "all 0.2s"
                }}
              >
                Access Platform
              </button>
              <button 
                type="button"
                onClick={() => setAuthMode("register")}
                style={{
                  flex: 1, padding: "8px 0", textAlign: "center", fontSize: "12px", fontWeight: "600", border: "none", borderRadius: "8px", cursor: "pointer",
                  backgroundColor: authMode === "register" ? "#1e293b" : "transparent", color: authMode === "register" ? "#fff" : "#64748b", transition: "all 0.2s"
                }}
              >
                Create Account
              </button>
            </div>

            {/* Injected Active Forms Context */}
            <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
              {authMode === "login" ? (
                <Login switchToRegister={() => setAuthMode("register")} />
              ) : (
                <Register switchToLogin={() => setAuthMode("login")} />
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Footer Interface */}
      <footer style={{
        position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "32px 24px",
        borderTop: "1px solid #0f172a", display: "flex", justifyContent: "between", flexWrap: "wrap", gap: "16px",
        fontSize: "12px", fontFamily: "monospace", color: "#475569"
      }}>
        <div>
          <span>Engine Infrastructure Real-Time Matrix</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginLeft: "auto" }}>
          <a href="#" style={{ color: "#475569", textDecoration: "none" }}>GitHub</a>
          <a href="#" style={{ color: "#475569", textDecoration: "none" }}>LinkedIn</a>
          <span>v2.4.0 Production Matrix</span>
        </div>
      </footer>

    </div>
  );
}