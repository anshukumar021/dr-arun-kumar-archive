"use client";

import { Mail, MapPin, Award, BookOpen, Phone } from "lucide-react";

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-[#FAF6F0] border-t border-gold/20 pt-16 pb-8 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Academic Affiliation & Bio */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-2xl font-bold tracking-widest text-charcoal border border-gold px-2.5 py-0.5 rounded-sm">
              AK
            </span>
            <span className="font-serif text-xl font-bold text-charcoal">
              Dr. Arun Kumar
            </span>
          </div>
          <p className="font-sans text-xs text-charcoal/70 leading-relaxed max-w-sm">
            Distinguished Hindi scholar, literary critic, author, and researcher. Former Head of the Department of Hindi, Ranchi University (Retired 2018). Dedicated to five decades of cultural thought and academic excellence.
          </p>
          <div className="flex flex-col space-y-2 pt-2">
            <div className="flex items-center space-x-2 text-xs text-charcoal/80">
              <MapPin size={14} className="text-gold shrink-0" />
              <span>Ranchi, Jharkhand, India</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-charcoal/80">
              <Mail size={14} className="text-gold shrink-0" />
              <div className="flex flex-col">
                <a href="mailto:arunkumar010@gmail.com" className="hover:text-gold transition-colors">
                  arunkumar010@gmail.com
                </a>
                <a href="mailto:contact@drarunkumar.in" className="hover:text-gold transition-colors text-[10px] text-charcoal/50">
                  contact@drarunkumar.in
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-2 text-xs text-charcoal/80">
              <Phone size={14} className="text-gold shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <a href="tel:+918595770079" className="hover:text-gold transition-colors">
                  +91 85957 70079
                </a>
                <a href="tel:+918235488045" className="hover:text-gold transition-colors">
                  +91 82354 88045
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Archive Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-md font-bold uppercase tracking-wider text-charcoal border-b border-gold/10 pb-2">
            Digital Archive
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="font-sans text-xs text-charcoal/70 hover:text-gold transition-colors py-1">About Legacy</a>
            <a href="#publications" onClick={(e) => handleScrollTo(e, "#publications")} className="font-sans text-xs text-charcoal/70 hover:text-gold transition-colors py-1">3D Publications</a>
            <a href="#library" onClick={(e) => handleScrollTo(e, "#library")} className="font-sans text-xs text-charcoal/70 hover:text-gold transition-colors py-1">Library of Ideas</a>
            <a href="#writings" onClick={(e) => handleScrollTo(e, "#writings")} className="font-sans text-xs text-charcoal/70 hover:text-gold transition-colors py-1">Research Essays</a>
            <a href="#speaking" onClick={(e) => handleScrollTo(e, "#speaking")} className="font-sans text-xs text-charcoal/70 hover:text-gold transition-colors py-1">Lectures & Speeches</a>
            <a href="#gallery" onClick={(e) => handleScrollTo(e, "#gallery")} className="font-sans text-xs text-charcoal/70 hover:text-gold transition-colors py-1">Photo Archive</a>
            <a href="#graph" onClick={(e) => handleScrollTo(e, "#graph")} className="font-sans text-xs text-charcoal/70 hover:text-gold transition-colors py-1">Knowledge Graph</a>
          </div>
        </div>

        {/* Legacy Statement & Accolades */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-md font-bold uppercase tracking-wider text-charcoal border-b border-gold/10 pb-2">
            Academic Legacy
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-2.5">
              <Award size={15} className="text-gold shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-sans text-xs font-semibold text-charcoal">Head of Department</span>
                <span className="font-sans text-[11px] text-charcoal/60">Department of Hindi, Ranchi University</span>
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <BookOpen size={15} className="text-gold shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-sans text-xs font-semibold text-charcoal">Research & Criticism</span>
                <span className="font-sans text-[11px] text-charcoal/60">Interdisciplinary Studies, Cinema Studies, and Cultural Critique</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright and signature */}
      <div className="max-w-7xl mx-auto border-t border-gold/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-charcoal/50 font-sans">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          © {new Date().getFullYear()} Dr. Arun Kumar Archive. Preserving five decades of literary contributions.
        </div>
        <div className="flex items-center space-x-4">
          <span className="italic font-serif">{"\"साहित्य ही संस्कृति की आत्मा है\""}</span>
          <span className="text-gold/60">•</span>
          <span>Designed with Academic Excellence</span>
        </div>
      </div>
    </footer>
  );
}
