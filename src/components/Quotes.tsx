"use client";

import { useState, useEffect } from "react";
import { Quote, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteItem {
  text: string;
  englishText: string;
  source: string;
  context: string;
}

const quotes: QuoteItem[] = [
  {
    text: "साहित्य केवल मनोरंजन नहीं है, बल्कि यह वह शक्ति है जो समाज के संशय और अवसाद को दूर कर उसकी आत्मा को झंकृत करती है।",
    englishText: "Literature is not mere entertainment, but the force that dispels doubt and despair from society, striking a chord in its soul.",
    source: "डॉ. अरुण कुमार",
    context: "Ranchi University Valedictory Address, 2015",
  },
  {
    text: "एक आलोचक का कार्य लेखक के दोष ढूँढ़ना नहीं, बल्कि उसके सृजन के पीछे छिपी हुई सामाजिक छटपटाहट को पाठकों के समक्ष उजागर करना है।",
    englishText: "A critic's task is not to locate the author's faults, but to lay bare the hidden socio-cultural anxieties that drive the act of creation.",
    source: "डॉ. अरुण कुमार",
    context: "Chhayavaad Aur Uttar-Chhayavaad Ke Setu",
  },
  {
    text: "सिनेमा आधुनिक लोक-कथा है। जो काम सदियों पहले कबीर और सूरदास के गीतों ने किया, वही काम आज सिनेमाई बिम्ब कर रहे हैं।",
    englishText: "Cinema is modern folklore. What the songs of Kabir and Surdas did centuries ago, cinematic imagery accomplishes for today's collective consciousness.",
    source: "डॉ. अरुण कुमार",
    context: "Cinema Ke Samajshastra Ke Naye Aayaam",
  },
  {
    text: "भाषा बहती नदी की तरह है। व्याकरण उसे तटबंध देता है, लेकिन जन-चेतना उसे अपनी स्वच्छंद धारा चुनने की स्वतंत्रता देती है।",
    englishText: "Language is like a flowing river. Grammar gives it embankments, but collective human consciousness grants it the freedom to carve its own natural course.",
    source: "डॉ. अरुण कुमार",
    context: "Devanagari Lipi: Vikas, Sudhaar Aur Vyaakaran",
  },
];

export default function Quotes() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % quotes.length);
    }, 8000); // 8 seconds per quote
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FAF6F0] relative overflow-hidden border-b border-gold/15">
      {/* Texture Details */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/3 via-transparent to-gold/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Quote Monogram Symbol */}
        <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold mb-8 bg-[#FDFBF7] shadow-sm">
          <Quote size={20} className="fill-gold/10" />
        </div>

        {/* Fading parchment quote box */}
        <div className="w-full relative min-h-[300px] flex flex-col justify-center text-center p-8 md:p-12 border border-gold/25 bg-[#FDFBF7] shadow-lg rounded-sm">
          {/* Internal Vintage Border */}
          <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Devnagari Calligraphy Quote */}
              <blockquote className="font-serif text-2xl md:text-3xl text-charcoal leading-relaxed font-semibold italic select-none">
                {"\""}{quotes[currentIdx].text}{"\""}
              </blockquote>

              {/* English Translation */}
              <p className="font-sans text-xs md:text-sm text-charcoal/60 max-w-2xl mx-auto italic leading-relaxed">
                {"\""}{quotes[currentIdx].englishText}{"\""}
              </p>

              {/* Citation Source & Context */}
              <div className="pt-6 border-t border-gold/15 max-w-xs mx-auto flex flex-col items-center">
                <span className="font-serif text-sm font-bold text-charcoal flex items-center gap-1.5">
                  <Sparkles size={11} className="text-gold" />
                  {quotes[currentIdx].source}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-gold mt-1 font-semibold">
                  {quotes[currentIdx].context}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Indicators */}
        <div className="flex space-x-2.5 mt-8 z-10">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIdx === idx ? "bg-gold w-6" : "bg-gold/25 hover:bg-gold/55"
              }`}
              aria-label={`Show quote ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
