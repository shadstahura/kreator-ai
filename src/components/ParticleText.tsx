"use client";
import { useEffect, useRef, useState } from "react";

export default function ParticleText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<{ x: number; y: number; origX: number; origY: number; vx: number; vy: number; size: number; color: string }[]>([]);
  const scrollProgressRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function createParticles() {
      if (!ctx) return;
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      const fontSize = Math.min(width * 0.17, 190);
      offCtx.fillStyle = "#000";
      offCtx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText("KREATE", width / 2, height / 2);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      const particles: typeof particlesRef.current = [];
      const gap = 3;

      const colors = [
        "#7c3aed", "#a855f7", "#c026d3", "#8b5cf6",
        "#6d28d9", "#9333ea", "#d946ef", "#1a1a1a",
      ];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const i = (y * width + x) * 4;
          if (pixels[i + 3] > 128) {
            particles.push({
              x, y,
              origX: x,
              origY: y,
              vx: (Math.random() - 0.5) * 15,
              vy: (Math.random() - 0.5) * 15 - Math.random() * 8,
              size: Math.random() * 2 + 1,
              color: colors[Math.floor(Math.random() * colors.length)],
            });
          }
        }
      }

      particlesRef.current = particles;
    }

    createParticles();

    function handleScroll() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      // progress goes from 0 (top of section visible) to 1 (scrolled past it)
      const scrolled = -rect.top;
      scrollProgressRef.current = Math.max(0, Math.min(1, scrolled / (sectionHeight * 0.6)));
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const progress = scrollProgressRef.current;
      const particles = particlesRef.current;

      for (const p of particles) {
        const scatter = Math.pow(progress, 1.5);
        const dx = p.vx * scatter * 40;
        const dy = p.vy * scatter * 40;

        const currentX = p.origX + dx;
        const currentY = p.origY + dy + (scatter * p.vy * 20);
        const currentOpacity = Math.max(0, 1 - scatter * 1.3);
        const currentSize = p.size * (1 + scatter * 2);

        if (currentOpacity <= 0) continue;

        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = progress > 0.1 ? p.color : "#1a1a1a";
        ctx.beginPath();
        ctx.arc(currentX, currentY, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener("scroll", handleScroll, { passive: true });

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
      createParticles();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (!show) return null;

  return (
    <section ref={sectionRef} className="relative h-[150vh] bg-white">
      {/* Sticky canvas that stays pinned while scrolling through this section */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        {/* Subtle tagline below the text */}
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center transition-opacity duration-500"
          style={{ opacity: Math.max(0, 1 - scrollProgressRef.current * 5) }}
        >
          <p className="text-gray-400 text-xs uppercase tracking-[0.3em] font-mono mb-4">Custom AI Systems</p>
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <div className="w-[1px] h-10 bg-gradient-to-b from-gray-300 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
