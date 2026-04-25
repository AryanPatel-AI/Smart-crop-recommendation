import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Sprout,
  Info,
  Calendar,
  FlaskConical,
  TrendingUp,
  Droplets,
  RotateCcw,
  Wind,
  Thermometer,
  CloudRain,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Database,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

/* ─────────────────────────────────────────
   GLOBAL STYLES (injected once)
───────────────────────────────────────── */
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
      :root {
        --font-display: Georgia, 'Times New Roman', 'Palatino Linotype', Palatino, serif;
        --font-body: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;
        --green-50: #f0fdf4; --green-100: #dcfce7; --green-200: #bbf7d0;
        --green-300: #86efac; --green-400: #4ade80; --green-500: #22c55e;
        --green-600: #16a34a; --green-700: #15803d; --green-800: #166534;
        --green-900: #14532d; --green-950: #052e16;
        --earth-800: #006054; --earth-900: #00453d; --earth-950: #00231f;
        --mint: #10b981;
      }
 
      html { scroll-behavior: smooth; }
 
      body {
        font-family: var(--font-body);
        background: #001a18;
        color: #f5f5f0;
        overflow-x: hidden;
      }
 
      /* Custom Scrollbar */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
      ::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.4); border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.6); }
 
      /* Animations */
      @keyframes ripple {
        0% { transform: scale(1); opacity: 0.3; }
        100% { transform: scale(1.5); opacity: 0; }
      }
      @keyframes noise {
        0%, 100% { transform: translate(0,0); }
        10% { transform: translate(-5%,-10%); }
        20% { transform: translate(-15%,5%); }
        30% { transform: translate(7%,-25%); }
        40% { transform: translate(-5%,25%); }
        50% { transform: translate(-15%,10%); }
        60% { transform: translate(15%,0%); }
        70% { transform: translate(0%,15%); }
        80% { transform: translate(3%,35%); }
        90% { transform: translate(-10%,10%); }
      }
 
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }

      .glow-text {
        text-shadow: 0 0 20px rgba(74, 222, 128, 0.5), 0 0 40px rgba(74, 222, 128, 0.3);
      }

      .glass-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      }
      .glass-card:hover {
        border-color: rgba(16, 185, 129, 0.3);
        box-shadow: 0 0 30px rgba(16, 185, 129, 0.1);
      }

      .btn-glow {
        position: relative;
        overflow: hidden;
      }
      .btn-glow::after {
        content: '';
        position: absolute;
        top: -50%; left: -50%;
        width: 200%; height: 200%;
        background: radial-gradient(circle, rgba(74, 222, 128, 0.2) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
      }
      .btn-glow:hover::after { opacity: 1; }

      /* Responsive Utils */
      @media (max-width: 768px) {
        .hide-mobile { display: none !important; }
        .grid-mobile-stack { grid-template-columns: 1fr !important; }
        .input-grid { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 480px) {
        .input-grid { grid-template-columns: 1fr !important; }
      }

      /* Requested Component Styles */
      .input-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .input-group label {
        font-size: 0.9rem;
        font-weight: 600;
        color: rgba(255,255,255,0.7);
      }
      .input-group input {
        background: rgba(0,0,0,0.2);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 12px 16px;
        color: white;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.2s;
      }
      .input-group input:focus {
        border-color: #10b981;
      }
      .btn-predict {
        width: 100%;
        padding: 1rem;
        background: #10b981;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
      }
      .btn-predict:hover {
        background: #059669;
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
      }

      .result-container {
        margin-top: 3rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 2.5rem;
      }
      .crop-result-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2.5rem;
      }
      .crop-icon {
        font-size: 3.5rem;
        background: rgba(16, 185, 129, 0.1);
        padding: 1rem;
        border-radius: 20px;
      }
      .meta-label {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #10b981;
        font-weight: 700;
        display: block;
        margin-bottom: 0.5rem;
      }
      .meta-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
      }
      .meta-item {
        background: rgba(255,255,255,0.02);
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.05);
      }
      .meta-value {
        font-size: 1rem;
        color: rgba(255,255,255,0.8);
        line-height: 1.6;
      }
      .rec-list {
        margin-top: 1rem;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
      }
      .rec-list li {
        font-size: 0.9rem;
        color: rgba(255,255,255,0.6);
        display: flex;
        gap: 0.8rem;
      }
      .rec-list li::before {
        content: '•';
        color: #10b981;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

/* ─────────────────────────────────────────
   ANIMATED BACKGROUND COMPONENT
───────────────────────────────────────── */
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      type: Math.random() > 0.8 ? "leaf" : "dot",
      pulse: Math.random() * 0.02,
      pulseDir: 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.opacity += p.pulse * p.pulseDir;
        if (p.opacity > 0.6 || p.opacity < 0.1) p.pulseDir *= -1;

        ctx.beginPath();
        ctx.globalAlpha = p.opacity;

        if (p.type === "leaf") {
          ctx.fillStyle = "#10b981";
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.atan2(p.speedY, p.speedX));
          ctx.ellipse(0, 0, p.size * 3, p.size, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fillStyle = "#4ade80";
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: -10, pointerEvents: "none",
      background: "linear-gradient(135deg, #001a18 0%, #00231f 40%, #004d40 70%, #001a18 100%)",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: "20%", right: "10%",
        width: "60vw", height: "60vw",
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
        filter: "blur(80px)"
      }} />

      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 400, height: 400, borderRadius: "50%",
        border: "1px solid rgba(16, 185, 129, 0.1)",
        transform: "translate(-50%, -50%)",
        animation: "ripple 8s infinite ease-out"
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 600, height: 600, borderRadius: "50%",
        border: "1px solid rgba(16, 185, 129, 0.05)",
        transform: "translate(-50%, -50%)",
        animation: "ripple 12s infinite ease-out 2s"
      }} />

      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

      <div style={{
        position: "absolute",
        left: mouse.x - 150,
        top: mouse.y - 150,
        width: 300, height: 300,
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 1
      }} />

      <div style={{
        position: "absolute", inset: "-100%", zIndex: 5,
        backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
        opacity: 0.05,
        animation: "noise 0.2s steps(2) infinite",
        pointerEvents: "none"
      }} />

      <div style={{
        position: "absolute", inset: 0,
        boxShadow: "inset 0 0 150px rgba(0,0,0,0.6)",
        pointerEvents: "none"
      }} />
    </div>
  );
};

/* ─────────────────────────────────────────
   TYPING ANIMATION HOOK
───────────────────────────────────────── */
const useTypingAnimation = () => {
  const sequences = [
    { text: "Patel & Co. Smart Farming Hub", pause: 2000 },
    { text: "Patel & Co. Limited", pause: 2000 },
  ];
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = sequences[phase];
    const next = sequences[(phase + 1) % sequences.length];
    let timeout;

    if (!isDeleting && display === current.text) {
      timeout = setTimeout(() => setIsDeleting(true), current.pause);
    } else if (isDeleting) {
      const longestCommonPrefix = (a, b) => {
        let i = 0;
        while (i < a.length && i < b.length && a[i] === b[i]) i++;
        return i;
      };
      const common = longestCommonPrefix(current.text, next.text);
      if (display.length > common) {
        timeout = setTimeout(() => setDisplay(d => d.slice(0, -1)), 40);
      } else {
        setIsDeleting(false);
        setPhase(p => (p + 1) % sequences.length);
      }
    } else {
      if (display.length < current.text.length) {
        timeout = setTimeout(() => setDisplay(current.text.slice(0, display.length + 1)), 75);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, isDeleting]);

  return display;
};

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
const Navbar = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", transition: "all 0.3s ease",
      background: scrolled ? "rgba(0, 26, 24, 0.8)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => onNavigate("landing")}>
        <div style={{
          width: 36, height: 36, borderRadius: "10px",
          background: "linear-gradient(135deg, #10b981, #059669)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "white"
        }}>
          <Sprout size={22} />
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "white", letterSpacing: "-0.5px" }}>
          Patel & Co.
        </span>
      </div>

      <div className="hide-mobile" style={{ display: "flex", gap: 32 }}>
        {["Features", "Dashboard", "About", "Contact"].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{
            color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500, textDecoration: "none",
            transition: "color 0.2s"
          }} onMouseEnter={e => e.target.style.color = "#10b981"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>
            {item}
          </a>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate("dashboard")}
        className="btn-glow"
        style={{
          padding: "10px 24px", borderRadius: "50px", background: "#10b981", color: "white",
          border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer"
        }}>
        Get Started
      </motion.button>
    </nav>
  );
};

/* ─────────────────────────────────────────
   DASHBOARD PANEL (The AI Hub)
───────────────────────────────────────── */
const CropAdvisor = () => {
  const [form, setForm] = useState({ N: "90", P: "42", K: "43", temperature: "20.8", humidity: "82.3", ph: "6.5", rainfall: "202.9" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);

  const handleRecommend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("http://localhost:5005/api/recommend", {
        N: parseFloat(form.N),
        P: parseFloat(form.P),
        K: parseFloat(form.K),
        temperature: parseFloat(form.temperature),
        humidity: parseFloat(form.humidity),
        ph: parseFloat(form.ph),
        rainfall: parseFloat(form.rainfall)
      });
      setResult(res.data.data);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: "N", label: "Nitrogen (N)", placeholder: "e.g. 90", value: form.N },
    { id: "P", label: "Phosphorus (P)", placeholder: "e.g. 42", value: form.P },
    { id: "K", label: "Potassium (K)", placeholder: "e.g. 43", value: form.K },
    { id: "temperature", label: "Temperature (°C)", placeholder: "e.g. 20.8", value: form.temperature },
    { id: "humidity", label: "Humidity (%)", placeholder: "e.g. 82.3", value: form.humidity },
    { id: "ph", label: "pH Level", placeholder: "e.g. 6.5", value: form.ph, min: "0", max: "14" },
    { id: "rainfall", label: "Rainfall (mm)", placeholder: "e.g. 202.9", value: form.rainfall },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 14, fontWeight: 700, color: "#10b981", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
          Agricultural Intelligence
        </motion.div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 900, marginBottom: 16 }}>Smart Crop Recommendation</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card" style={{ padding: "48px", maxWidth: 900, margin: "0 auto" }}>

        <h2 style={{ marginBottom: "2rem", fontFamily: "var(--font-display)", fontSize: "1.8rem" }}>Soil & Climate Parameters</h2>

        <form onSubmit={handleRecommend}>
          <div className="input-grid">
            {fields.map(f => (
              <div className="input-group" key={f.id}>
                <label htmlFor={f.id}>{f.label}</label>
                <input
                  id={f.id}
                  name={f.id}
                  placeholder={f.placeholder}
                  step="0.01"
                  required
                  type="number"
                  min={f.min}
                  max={f.max}
                  value={f.value}
                  onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <button type="submit" className="btn-predict" disabled={loading}>
            {loading ? "Analyzing..." : "Generate Recommendation"}
          </button>
        </form>

        {loading && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
              <RotateCcw size={40} color="#10b981" />
            </motion.div>
          </div>
        )}

        <div ref={resultsRef}>
          <AnimatePresence>
            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="result-container"
              >
                <div className="crop-result-header">
                  <div className="crop-icon">🌾</div>
                  <div>
                    <span className="meta-label">Recommended Crop</span>
                    <h2 style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "white" }}>{result.crop}</h2>
                  </div>
                </div>

                <div className="meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Description</span>
                    <p className="meta-value">{result.description}</p>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Ideal Season</span>
                    <p className="meta-value">{result.season}</p>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Fertilizer Guide (NPK)</span>
                    <p className="meta-value" style={{ fontWeight: 600, color: "white", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{result.npk}</p>
                    <ul className="rec-list">
                      {result.fertilizer_tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Market Info</span>
                    <p className="meta-value" style={{ marginBottom: "0.5rem" }}>
                      <strong style={{ color: "white" }}>Price:</strong> {result.market.price}
                    </p>
                    <p className="meta-value">
                      <strong style={{ color: "white" }}>Trend:</strong>
                      <span style={{ color: "#10b981", marginLeft: "8px", fontWeight: 700 }}>{result.market.trend}</span>
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "3rem" }}>
                  <button onClick={() => { setResult(null); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                    style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", padding: "10px 24px", borderRadius: "50px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                    <RotateCcw size={14} /> Try Another Prediction
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────
   LANDING PAGE
───────────────────────────────────────── */
const LandingPage = ({ onNavigate }) => {
  const typedText = useTypingAnimation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", paddingTop: 80 }}>
      <div style={{ maxWidth: 900, textAlign: "center", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 16px", borderRadius: "50px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#10b981", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 32 }}>
          <AlertCircle size={14} /> Next-Gen Agri-Tech Platform
        </motion.div>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "4.5rem", fontWeight: 900, lineHeight: 1.1, color: "white", marginBottom: 24, minHeight: "12rem" }}>
          {typedText.startsWith("Patel & Co. ") ? (
            <>
              Patel & Co. <br />
              <span style={{ color: "#10b981" }}>
                {typedText.slice("Patel & Co. ".length)}
              </span>
            </>
          ) : (
            typedText
          )}
          <span className="cursor-blink" style={{ color: "#10b981" }}>|</span>
        </h1>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 20, lineHeight: 1.6, maxWidth: 650, margin: "0 auto 48px" }}>
          Harness the power of machine learning to optimize your crop yields, monitor weather patterns, and manage soil health with scientific accuracy.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("dashboard")}
            style={{ padding: "18px 48px", borderRadius: "50px", background: "#10b981", color: "white", border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 20px 40px rgba(16, 185, 129, 0.2)" }}>
            Launch Dashboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.05)" }} whileTap={{ scale: 0.95 }}
            style={{ padding: "18px 48px", borderRadius: "50px", background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.1)", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            Watch Demo
          </motion.button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN APP COMPONENT
───────────────────────────────────────── */
export default function App() {
  const [view, setView] = useState("landing");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <>
      <GlobalStyles />
      <AnimatedBackground />

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <Navbar onNavigate={setView} />

        <main>
          {view === "landing" ? (
            <LandingPage onNavigate={setView} />
          ) : (
            <div style={{ paddingTop: 100 }}>
              <CropAdvisor />
            </div>
          )}
        </main>

        <footer style={{ padding: "60px 40px", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 100, textAlign: "center" }}>
          <p style={{ fontSize: "16px", fontWeight: "600", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            Made with <span className="heart" style={{ color: "#ef4444", animation: "pulse 1.5s infinite" }}>❤️</span> by <span>Aryan Patel</span>
          </p>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginTop: 12 }}>
            © 2026 Patel & Co. Smart Farming Hub. Building the future of agricultural intelligence.
          </div>
        </footer>
      </div>
    </>
  );
}
