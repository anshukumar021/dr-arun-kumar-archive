"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, User, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

const suggestedPrompts = [
  "Tell me about Dr. Arun Kumar",
  "What are his major books and publications?",
  "Tell me about his cinema studies",
  "What are his academic connections (RU, JNU)?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Namaste. I am Dr. Arun Kumar's Digital Archive Assistant. Ask me about his biography, 3D publications, research, cinema studies, and historical lectures.",
      timestamp: new Date(),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes("about") || q.includes("who is") || q.includes("biography") || q.includes("arun kumar")) {
      return "Dr. Arun Kumar (born March 5, 1953) is a distinguished Hindi scholar, author, and literary critic who served as the Head of the Department of Hindi at Ranchi University until his retirement in 2018. Over five decades, he has published extensive critical works on Chhayavaad poetry, parallel cinema, and tribal folklore.";
    }
    
    if (q.includes("book") || q.includes("publication") || q.includes("published") || q.includes("writings")) {
      return "Dr. Arun Kumar has authored several seminal books, including:\n1. 'छायावाद और उत्तर-छायावाद के सेतु' (1992, Rajkamal)\n2. 'सिनेमा के समाजशास्त्र के नए आयाम' (2004, Radhakrishna)\n3. 'कबीर: सृजन, समाज और सरोकार' (1998, Vani)\n4. 'देवनागरी लिपि: विकास, सुधार और व्याकरण' (2011, Jnanpith)\n5. 'समकालीन हिंदी कथा साहित्य में ट्राइबल सरोकार' (2015, Anamika).\nCheck out the 'Publications' section above to inspect them in 3D.";
    }

    if (q.includes("cinema") || q.includes("film") || q.includes("satyajit") || q.includes("bimal")) {
      return "Dr. Kumar is a pioneer in Hindi Cinema Studies. In his book 'Cinema Ke Samajshastra Ke Naye Aayaam', he conducts a sociopolitical reading of mid-20th-century Indian cinema, analyzing the realism of Satyajit Ray, Bimal Roy, and Guru Dutt, and studying how film syntax mirrors post-independence class struggles.";
    }

    if (q.includes("ranchi") || q.includes("jnu") || q.includes("university") || q.includes("patna") || q.includes("academic")) {
      return "Dr. Kumar's academic path began at Patna University where he completed his B.A. and M.A. in Hindi. He later moved to Jawaharlal Nehru University (JNU) for advanced research, before joining Ranchi University as faculty. He guided dozens of Ph.D. dissertations and served as Head of the Hindi Department before retiring in 2018.";
    }

    if (q.includes("contribution") || q.includes("achievements") || q.includes("legacy")) {
      return "His major contributions lie in three domains:\n1. Re-framing post-Chhayavad poetic criticism.\n2. Pioneering Hindi Cinema Sociology as an academic discipline.\n3. Preserving Jharkhand's tribal oral folk literature within modern written grammar systems.";
    }

    return "Thank you for your inquiry. While I parse your request, you can explore Dr. Arun Kumar's legacy sections. I recommend reading about his books (Publications), listening to his bio (Audio Narration), or checking out the Interactive Knowledge Graph.";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // User Message
    const userMsg: Message = {
      id: messages.length + 1,
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulated AI Typing delay
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: messages.length + 2,
        sender: "ai",
        text: getAIResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FAF6F0] relative overflow-hidden border-b border-gold/15">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold mb-2 block">
            Interactive Agent
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
            AI Literary Assistant
          </h2>
          <div className="w-24 h-[1px] bg-gold/40"></div>
        </div>

        {/* Chat Widget Panel */}
        <div className="glass-panel-dark text-white rounded-sm shadow-xl overflow-hidden flex flex-col border border-gold/20 min-h-[500px]">
          {/* Header Bar */}
          <div className="bg-[#121212]/90 px-6 py-4 flex items-center justify-between border-b border-gold/15">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold flex items-center justify-center text-gold">
                <Cpu size={16} />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold leading-none">Legacy Chatbot</h4>
                <span className="font-sans text-[9px] uppercase tracking-widest text-gold mt-1 leading-none block font-semibold">
                  Online • Simulated Knowledge Agent
                </span>
              </div>
            </div>
            <span className="text-[10px] bg-ivory/5 text-ivory/60 border border-ivory/10 px-2.5 py-0.5 rounded-sm font-sans">
              v1.0.2
            </span>
          </div>

          {/* Messages Window */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[300px] custom-scrollbar bg-black/10">
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start space-x-3 ${isUser ? "justify-end space-x-reverse" : "justify-start"}`}
                  >
                    {/* Icon */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                      isUser 
                        ? "bg-gold text-white border-gold-hover" 
                        : "bg-charcoal text-gold border-gold/30"
                    }`}>
                      {isUser ? <User size={13} /> : <MessageSquare size={13} />}
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[75%] p-3 rounded-sm text-xs md:text-sm font-sans leading-relaxed ${
                      isUser
                        ? "bg-gold/90 text-white border border-gold-hover"
                        : "bg-white/5 text-ivory border border-white/10"
                    }`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span className="block text-[8px] opacity-40 text-right mt-1.5">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-7 h-7 rounded-full bg-charcoal border border-gold/30 flex items-center justify-center text-gold">
                    <MessageSquare size={13} />
                  </div>
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-sm flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Suggested Prompts Grid */}
          <div className="px-6 py-4 bg-white/5 border-t border-white/5">
            <span className="block font-sans text-[10px] text-ivory/40 uppercase tracking-widest mb-2 font-semibold">
              Suggested Questions:
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="text-[10px] md:text-xs text-gold border border-gold/25 hover:border-gold hover:bg-gold/5 px-3 py-1.5 rounded-sm transition-all duration-300 font-medium"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="p-4 bg-[#121212]/90 border-t border-gold/15 flex gap-3 items-center"
          >
            <input
              type="text"
              placeholder="Ask a question about Dr. Arun Kumar's literary legacy..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-xs md:text-sm text-ivory focus:outline-none focus:border-gold placeholder:text-ivory/30 transition-colors"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-hover text-white p-3 rounded-sm shadow-md transition-colors"
              aria-label="Send Message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
