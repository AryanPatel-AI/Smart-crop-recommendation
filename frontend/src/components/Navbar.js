import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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
      <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => navigate("/")}>
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
        {["Features", "Dashboard", "Contact"].map(item => (
          <a key={item} href={item === "Dashboard" ? "/dashboard" : `#${item.toLowerCase()}`} 
            onClick={(e) => {
              if (item === "Dashboard") {
                e.preventDefault();
                navigate("/dashboard");
              } else {
                e.preventDefault();
                const element = document.getElementById(item.toLowerCase());
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            style={{
              color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500, textDecoration: "none",
              transition: "all 0.2s"
          }} onMouseEnter={e => e.target.style.color = "#10b981"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>
            {item}
          </a>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/dashboard")}
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

export default Navbar;
