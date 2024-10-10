"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const AuroraBackground = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(30, 41, 59, 0.8)"); // Slate 800
      gradient.addColorStop(0.5, "rgba(15, 23, 42, 0.8)"); // Slate 900
      gradient.addColorStop(1, "rgba(2, 6, 23, 0.8)"); // Slate 950

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const x = Math.sin(time) * 100 + canvas.width / 2;
      const y = Math.cos(time) * 100 + canvas.height / 2;

      const radius = 100 + Math.sin(time) * 20;

      const gradient2 = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient2.addColorStop(0, "rgba(186, 230, 253, 0.3)"); // Sky 200
      gradient2.addColorStop(1, "rgba(186, 230, 253, 0)");

      ctx.fillStyle = gradient2;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={cn("fixed inset-0 z-0", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {children}
    </div>
  );
};