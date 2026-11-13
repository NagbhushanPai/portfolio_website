"use client";

import { useEffect, useRef } from "react";
import { getTheme } from "@/lib/theme";
import { isLowPowerDevice } from "@/lib/gsap";

/** Falling streaks drawn on a canvas: light streaks in dark mode, dark streaks in light mode. */
export function HeroRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const lowPower = isLowPowerDevice();
    const drops = Array.from({ length: lowPower ? 60 : 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 25 + 10,
      speed: Math.random() * 20 + 15,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    const angle = 0.05;

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    let frame = 0;
    let last = 0;
    const minFrameMs = lowPower ? 1000 / 30 : 0; // ~30fps on phones
    const draw = (now = 0) => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden || now - last < minFrameMs) return;
      last = now;
      const rgb = getTheme() === "dark" ? "255, 255, 255" : "34, 34, 34";

      // Fade previous frames toward transparent so streaks leave short trails on any background.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      for (const d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + Math.sin(angle) * d.length, d.y + Math.cos(angle) * d.length);
        ctx.strokeStyle = `rgba(${rgb}, ${d.opacity})`;
        ctx.stroke();
        d.y += d.speed * Math.cos(angle);
        d.x += d.speed * Math.sin(angle);
        if (d.y > height) {
          d.y = -d.length;
          d.x = Math.random() * width;
          d.speed = Math.random() * 20 + 15;
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-rain pointer-events-none absolute inset-0 z-0 opacity-60"
    />
  );
}
