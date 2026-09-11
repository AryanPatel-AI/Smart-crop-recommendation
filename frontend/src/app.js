import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import ParticleBackground from "./components/ParticleBackground";
import { useEffect } from "react";

export default function App() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Hide Navbar and Footer on Dashboard for a cleaner "App" experience if desired,
  // or keep them global. Let's keep them global but maybe Dashboard has its own header.
  const isDashboard = pathname === "/dashboard";

  return (
    <>
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {!isDashboard && <Navbar />}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        {!isDashboard && (
          <footer className="py-16 border-t border-white/5 mt-20 text-center bg-black/20 backdrop-blur-sm">
            <p className="text-slate-400 font-semibold flex items-center justify-center gap-2">
              Made with <span className="text-red-500 animate-pulse">❤️</span> by <span className="text-white">Aryan Patel</span>
            </p>
            <div className="text-sm text-slate-500 mt-3">
              © 2026 Patel & Co. Smart Farming Hub. Building the future of agricultural intelligence.
            </div>
          </footer>
        )}
      </div>
    </>
  );
}
