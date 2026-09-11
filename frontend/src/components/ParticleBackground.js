import React, { useState, useEffect, useRef } from "react";
import { Sprout } from "lucide-react";
import { motion } from "framer-motion";

const ParticleBackground = () => {
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

export default ParticleBackground;
