"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About & Journey", href: "#about" },
  { name: "Publications", href: "#publications" },
  { name: "Library", href: "#library" },
  { name: "Research & Writings", href: "#writings" },
  { name: "Speaking & Events", href: "#speaking" },
  { name: "Photo Gallery", href: "#gallery" },
  { name: "Knowledge Graph", href: "#graph" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-panel shadow-sm border-b border-gold/15 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Monogram */}
          <a
            href="#"
            onClick={(e) => handleScrollTo(e, "#top")}
            className="flex items-center space-x-3 group"
          >
            <span className="font-serif text-2xl font-bold tracking-widest text-charcoal border border-gold px-2.5 py-0.5 rounded-sm group-hover:border-gold-hover transition-colors">
              AK
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wide text-charcoal leading-none">
                Dr. Arun Kumar
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold mt-1 leading-none font-medium">
                Hindi Scholar & Author
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="font-sans text-xs uppercase tracking-widest text-charcoal/80 hover:text-gold transition-colors relative py-1 group font-medium"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="bg-gold hover:bg-gold-hover text-white text-xs uppercase tracking-widest px-4 py-2 rounded-sm transition-colors shadow-sm font-semibold"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-charcoal hover:text-gold transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-45 glass-panel pt-24 px-8 pb-8 flex flex-col justify-between lg:hidden border-b border-gold/20"
          >
            <nav className="flex flex-col space-y-6 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="font-serif text-2xl font-medium text-charcoal hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="w-full bg-gold hover:bg-gold-hover text-white text-center py-3 rounded-sm uppercase tracking-widest text-sm font-bold transition-colors shadow-md mt-4"
              >
                Contact
              </a>
            </nav>
            <div className="text-center font-sans text-xs text-charcoal/50 border-t border-gold/10 pt-4">
              © {new Date().getFullYear()} Dr. Arun Kumar Legacy. All rights reserved.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
