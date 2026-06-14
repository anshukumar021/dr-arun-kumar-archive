"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, BookOpen, User, MessageSquare } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Hindi words related to literature, criticism, culture, etc.
    const hindiWords = [
      "साहित्य",
      "आलोचना",
      "संस्कृति",
      "शोध",
      "विमर्श",
      "सिनेमा",
      "सृजन",
      "इतिहास",
      "भाषा",
      "चिंतन",
      "परम्परा",
      "समीक्षा",
    ];

    interface Particle {
      x: number;
      y: number;
      word: string;
      fontSize: number;
      speed: number;
      opacity: number;
      angle: number;
      spin: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 20;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height + height, // start offscreen or near bottom
        word: hindiWords[Math.floor(Math.random() * hindiWords.length)],
        fontSize: Math.floor(Math.random() * 16) + 16, // 16px to 32px
        speed: Math.random() * 0.4 + 0.2, // very slow drift
        opacity: Math.random() * 0.15 + 0.05, // very faint
        angle: (Math.random() - 0.5) * 0.2,
        spin: (Math.random() - 0.5) * 0.005,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint library shelf lines in background
      ctx.strokeStyle = "rgba(184, 144, 71, 0.04)";
      ctx.lineWidth = 2;
      for (let y = 150; y < height; y += 180) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // Shelf brackets/props
        for (let x = width * 0.15; x < width; x += width * 0.35) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - 10, y + 15);
          ctx.lineTo(x + 10, y + 15);
          ctx.closePath();
          ctx.fillStyle = "rgba(184, 144, 71, 0.03)";
          ctx.fill();
        }
      }

      // Draw floating Hindi script text particles
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.font = `300 ${p.fontSize}px var(--font-cormorant), serif`;
        ctx.fillStyle = `rgba(26, 26, 26, ${p.opacity})`;
        ctx.fillText(p.word, 0, 0);
        ctx.restore();

        // Update positions
        p.y -= p.speed;
        p.angle += p.spin;
        p.x += Math.sin(p.y * 0.002) * 0.15; // slow swaying

        // Wrap around when particle floats off top
        if (p.y < -50) {
          p.y = height + 50;
          p.x = Math.random() * width;
          p.word = hindiWords[Math.floor(Math.random() * hindiWords.length)];
          p.opacity = Math.random() * 0.15 + 0.05;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="top" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden parchment-bg border-b border-gold/15">
      {/* Dynamic script floating layer */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Atmospheric overlay vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/40 via-transparent to-[#FDFBF7]/90 z-0 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FDFBF7]/30 to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FDFBF7]/30 to-transparent z-0 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20 flex flex-col items-center">
        {/* Academic Tagline Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 border-y border-gold/20 py-2.5 px-6"
        >
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold leading-none">
            Ranchi University Department of Hindi Archive
          </span>
        </motion.div>

        {/* Large Scholarly Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-serif text-6xl md:text-8xl font-bold tracking-tight text-charcoal mb-4 relative select-none"
        >
          Dr. Arun Kumar
          <span className="absolute -top-3 -right-3 text-gold text-lg font-normal font-sans">©</span>
        </motion.h1>

        {/* Subtitles / Qualifications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-serif text-lg md:text-xl text-charcoal/80 mb-8 max-w-2xl border-b border-gold/10 pb-6"
        >
          <span>Hindi Scholar</span>
          <span className="text-gold/50">•</span>
          <span>Literary Critic</span>
          <span className="text-gold/50">•</span>
          <span>Author</span>
          <span className="text-gold/50">•</span>
          <span>Researcher</span>
        </motion.div>

        {/* Cinematic Main Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif text-xl md:text-2xl text-charcoal/70 max-w-3xl leading-relaxed mb-12 italic px-4"
        >
          {"\"Five Decades of Literature, Research, and Intellectual Engagement\""}
        </motion.p>

        {/* Call to Actions (CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
        >
          <button
            onClick={() => handleScrollTo("#about")}
            className="w-full sm:w-auto bg-charcoal hover:bg-charcoal/90 text-ivory text-xs uppercase tracking-widest px-8 py-4 rounded-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-md font-medium border border-charcoal hover:border-gold/20"
          >
            <User size={13} className="text-gold" />
            <span>Explore Legacy</span>
          </button>
          
          <button
            onClick={() => handleScrollTo("#publications")}
            className="w-full sm:w-auto bg-[#F9F5EF] hover:bg-[#F0EAE0] text-charcoal border border-gold/40 hover:border-gold text-xs uppercase tracking-widest px-8 py-4 rounded-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-sm font-medium"
          >
            <BookOpen size={13} className="text-gold-dark" />
            <span>Read Publications</span>
          </button>

          <button
            onClick={() => handleScrollTo("#contact")}
            className="w-full sm:w-auto bg-gold hover:bg-gold-hover text-white text-xs uppercase tracking-widest px-8 py-4 rounded-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-md font-semibold"
          >
            <MessageSquare size={13} />
            <span>Contact</span>
          </button>
        </motion.div>
      </div>

      {/* Cinematic scroll down prompt */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => handleScrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer flex flex-col items-center space-y-1 group"
      >
        <span className="font-sans text-[9px] uppercase tracking-widest text-charcoal/40 group-hover:text-gold transition-colors font-semibold">
          Scroll to explore
        </span>
        <ChevronDown size={18} className="text-gold/60 group-hover:text-gold transition-colors" />
      </motion.div>
    </section>
  );
}
