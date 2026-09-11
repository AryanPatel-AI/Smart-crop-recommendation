import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  AlertCircle,
  Sprout,
  Cpu,
  CloudRain,
  Thermometer,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Users,
  ShieldCheck,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────
   TYPING ANIMATION HOOK
───────────────────────────────────────── */
const useTypingAnimation = () => {
  const sequences = [
    { text: "Smart Farming Hub", pause: 2000 },
    { text: "Predicting Future Yields", pause: 2000 },
    { text: "Next-Gen Agri Intelligence", pause: 2000 },
    { text: "Limited", pause: 2000 }
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
        timeout = setTimeout(() => setDisplay(d => d.slice(0, -1)), 30);
      } else {
        setIsDeleting(false);
        setPhase(p => (p + 1) % sequences.length);
      }
    } else {
      if (display.length < current.text.length) {
        timeout = setTimeout(() => setDisplay(current.text.slice(0, display.length + 1)), 60);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, isDeleting]);

  return display;
};

/* ─────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────── */

const SectionTitle = ({ subtitle, title, description }) => (
  <div style={{ textAlign: "center", marginBottom: 64 }}>
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ color: "#10b981", fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 800, color: "white", marginTop: 12, marginBottom: 24 }}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, maxWidth: 700, margin: "0 auto" }}
      >
        {description}
      </motion.p>
    )}
  </div>
);

const LandingPage = () => {
  const typedText = useTypingAnimation();
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const features = [
    {
      icon: <Cpu size={32} />,
      title: "ML Recommendation",
      desc: "Advanced neural networks analyze soil and climate data to suggest the optimal crop for your land."
    },
    {
      icon: <CloudRain size={32} />,
      title: "Weather Integration",
      desc: "Real-time synchronization with global meteorological stations for precise local forecasts."
    },
    {
      icon: <Thermometer size={32} />,
      title: "Soil Intelligence",
      desc: "Deep analysis of Nitrogen, Phosphorus, Potassium and pH levels to maximize nutrient efficiency."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Yield Forecasting",
      desc: "Historical data modeling to predict harvest volume and potential market value."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Risk Mitigation",
      desc: "Identify potential pests and diseases before they affect your crops through early warning signs."
    },
    {
      icon: <Zap size={32} />,
      title: "Instant Results",
      desc: "Cloud-native infrastructure delivers high-precision insights in milliseconds, not hours."
    }
  ];

  const steps = [
    { number: "01", title: "Input Parameters", desc: "Enter your soil composition and regional climate data." },
    { number: "02", title: "Run ML Engine", desc: "Our proprietary algorithm processes thousands of data points." },
    { number: "03", title: "Get Insights", desc: "Receive comprehensive recommendations and management plans." }
  ];

  return (
    <div style={{ color: "white" }}>

      {/* HERO SECTION */}
      <motion.section
        style={{
          opacity, scale, minHeight: "100vh", display: "flex",
          alignItems: "center", justifyContent: "center",
          padding: "140px 24px 100px", position: "relative",
          backgroundImage: 'linear-gradient(rgba(2, 26, 22, 0.78), rgba(4, 47, 46, 0.95)), url("/hero-bg.png")',
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
        }}
      >
        <div style={{ maxWidth: 860, textAlign: "center", zIndex: 1, width: "100%" }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 18px", borderRadius: "50px",
              background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34d399", fontSize: 12, fontWeight: 700, letterSpacing: 2,
              textTransform: "uppercase", marginBottom: 40
            }}>
            <AlertCircle size={12} /> The Future of Agriculture is Here
          </motion.div>

          {/* Brand name — big, bright, prominent */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ marginBottom: 24 }}>
            <span style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: 3,
              background: "linear-gradient(135deg, #ffffff, #a7f3d0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>Patel & Co.</span>
          </motion.div>

          {/* Static main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 900, lineHeight: 1.05, color: "white",
              letterSpacing: "-2px", marginBottom: 24
            }}>
            Smart Farming,{" "}
            <span style={{
              background: "linear-gradient(135deg, #10b981, #34d399)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>Powered by AI</span>
          </motion.h1>

          {/* Typing line — smaller, subtitle role */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 500,
              color: "rgba(52, 211, 153, 0.7)", marginBottom: 32, minHeight: "1.8em"
            }}>
            {typedText}<span style={{ color: "#10b981" }}>|</span>
          </motion.div>

          {/* Sub-description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{
              color: "rgba(255,255,255,0.5)", fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.8, maxWidth: 580, margin: "0 auto 52px", fontWeight: 400
            }}>
            Maximize your farm's productivity with our enterprise-grade AI engine.
            Data-driven decisions for modern agricultural excellence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 16px 40px rgba(16, 185, 129, 0.45)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "15px 36px", borderRadius: "12px", background: "#10b981",
                color: "white", border: "none", fontSize: 16, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 10
              }}>
              Start Your Analysis <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "15px 36px", borderRadius: "12px", background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)", fontSize: 16,
                fontWeight: 600, cursor: "pointer", backdropFilter: "blur(10px)"
              }}>
              View Platform Demo
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* STATS BAR — its own clean section below the hero fold */}
      <div style={{ background: "#031f1f", borderTop: "1px solid rgba(16,185,129,0.12)", borderBottom: "1px solid rgba(16,185,129,0.08)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{
            maxWidth: 1000, margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
          }}>
          {[
            { label: "Predictive Accuracy", val: "98.4%" },
            { label: "Active Farmers", val: "12,000+" },
            { label: "Crops Supported", val: "22+" },
            { label: "Data Points Analyzed", val: "1.2M+" }
          ].map((stat, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "40px 20px",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none"
            }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: "white", letterSpacing: "-1px" }}>{stat.val}</div>
              <div style={{ fontSize: 11, color: "#10b981", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginTop: 8 }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* FEATURES SECTION */}
      <section id="features" style={{ padding: "160px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle
          subtitle="Enterprise Features"
          title="Precision Ag-Tech Architecture"
          description="We provide the most comprehensive suite of tools for the modern farmer, powered by cutting-edge research and industrial machine learning."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
              style={{ padding: 40, display: "flex", flexDirection: "column", gap: 20 }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 16, background: "rgba(16, 185, 129, 0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981"
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 700 }}>{f.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section style={{ padding: "100px 24px", background: "rgba(16, 185, 129, 0.02)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 80, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <SectionTitle
                subtitle="The Workflow"
                title="Simplified Success"
                description="Our platform takes the complexity out of agricultural science. Follow three simple steps to unlock your farm's true potential."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 40, marginTop: 40 }}>
                {steps.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    style={{ display: "flex", gap: 24 }}
                  >
                    <div style={{
                      fontSize: 48, fontWeight: 900, color: "rgba(16, 185, 129, 0.2)",
                      lineHeight: 1, fontFamily: "var(--font-display)"
                    }}>
                      {s.number}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{s.title}</h4>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual/Mockup side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ flex: 1, position: "relative" }}
            >
              <div style={{
                width: "100%", aspectRatio: "1/1", maxWidth: 500, borderRadius: 32,
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))",
                border: "1px solid rgba(16, 185, 129, 0.1)", padding: 40, position: "relative",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Sprout size={200} color="#10b981" style={{ opacity: 0.1, position: "absolute" }} />
                <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                  <div style={{
                    background: "rgba(0, 26, 24, 0.8)", backdropFilter: "blur(10px)",
                    padding: 32, borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.5)"
                  }}>
                    <CheckCircle2 size={48} color="#10b981" style={{ margin: "0 auto 20px" }} />
                    <h5 style={{ fontSize: 20, fontWeight: 700 }}>Analysis Complete</h5>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 10 }}>Optimal Crop: Rice (Basmati)</p>
                    <div style={{ height: 2, width: "100%", background: "rgba(255,255,255,0.05)", margin: "20px 0" }} />
                    <button style={{
                      background: "#10b981", border: "none", color: "white",
                      padding: "10px 20px", borderRadius: 8, fontSize: 12, fontWeight: 600
                    }}>
                      Download Report
                    </button>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    position: "absolute", top: -20, right: 20, padding: "12px 20px",
                    background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
                    borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <div style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>SOIL pH: 6.5</div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  style={{
                    position: "absolute", bottom: 20, left: -20, padding: "12px 20px",
                    background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
                    borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <div style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>NITROGEN: 90%</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BRAND TRUST BANNER */}
      <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(4, 47, 46, 0.6))",
            padding: "60px 80px", borderRadius: 40,
            border: "1px solid rgba(16,185,129,0.15)",
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24
          }}>
          <div style={{
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900,
            background: "linear-gradient(135deg, #ffffff, #a7f3d0, #10b981)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-1px"
          }}>Patel & Co.</div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, maxWidth: 600, lineHeight: 1.7 }}>
            Trusted by thousands of farmers across India. Built on cutting-edge research and powered by machine learning to deliver real agricultural outcomes.
          </p>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center", marginTop: 16 }}>
            {["🌾 Pan-India Coverage", "🤖 98.4% ML Accuracy", "🏆 Award-Winning Platform", "📊 Real-Time Analytics"].map((badge, i) => (
              <div key={i} style={{
                padding: "10px 22px", borderRadius: 50,
                background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
                color: "#6ee7b7", fontSize: 14, fontWeight: 600
              }}>{badge}</div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CONTACT/NEWSLETTER SECTION */}
      <section id="contact" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="glass-card flex flex-col md:flex-row items-center justify-between gap-10" style={{ padding: "60px 40px" }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Stay Updated</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>
              Get the latest insights on agricultural technology and platform updates delivered to your inbox.
            </p>
          </div>
          <div style={{ flex: 1, width: "100%", display: "flex", gap: 12 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                flex: 1, padding: "16px 24px", borderRadius: 12, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none"
              }}
            />
            <button
              onClick={() => setSubscribed(true)}
              style={{
                padding: "16px 32px", borderRadius: 12, background: subscribed ? "transparent" : "#10b981",
                color: subscribed ? "#10b981" : "white",
                border: subscribed ? "1px solid #10b981" : "none", fontWeight: 700, cursor: "pointer",
                transition: "all 0.3s ease"
              }}>
              {subscribed ? "Subscribed!" : "Join Now"}
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section style={{ padding: "100px 24px 200px" }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto", textAlign: "center",
          padding: "100px 40px", borderRadius: 48, position: "relative", overflow: "hidden",
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.4)"
        }}>
          {/* Decorative background circle */}
          <div style={{
            position: "absolute", top: "-50%", left: "-20%", width: "100%", height: "200%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: 24, position: "relative", zIndex: 1 }}>
              Ready to Transform Your Yield?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 20, maxWidth: 600, margin: "0 auto 48px", position: "relative", zIndex: 1 }}>
              Join the agricultural revolution today. Access precision insights and machine learning recommendations for free.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "20px 64px", borderRadius: "16px", background: "white",
                color: "#064e3b", border: "none", fontSize: 20, fontWeight: 800,
                cursor: "pointer", position: "relative", zIndex: 1,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
              }}>
              Access Dashboard Now
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;

