"use client";

import { useState } from "react";
import { BookOpen, Calendar, Printer, X, Eye, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Book {
  id: number;
  title: string;
  hindiTitle: string;
  category: string;
  year: string;
  publisher: string;
  description: string;
  coverBg: string; // Tailwind gradient/color class
  coverStyle: string; // Additional style details
  chapters: string[];
  pages: number;
  language: string;
}

const booksList: Book[] = [
  {
    id: 1,
    title: "Chhayavaad Aur Uttar-Chhayavaad Ke Setu",
    hindiTitle: "छायावाद और उत्तर-छायावाद के सेतु",
    category: "Literary Criticism",
    year: "1992",
    publisher: "Rajkamal Prakashan, New Delhi",
    description: "An extensive critical inquiry examining the transition between Chhayavaad and post-Chhayavad poetry in Hindi literature. The monograph focuses on Nirala, Mahadevi Varma, and Prasad, highlighting the sociological shift in poetic consciousness.",
    coverBg: "from-[#601a1a] to-[#401010] text-[#eed090]",
    coverStyle: "border-[#d4af37] border-4",
    chapters: [
      "1. छायावादी चेतना का विकास (Evolution of Chhayavadi Consciousness)",
      "2. वैयक्तिकता से सामाजिकता का संक्रमण (Transition from Self to Society)",
      "3. निराला का काव्य और उत्तर-छायावादी प्रवृत्तियाँ (Nirala and Post-Chhayavadi Trends)",
      "4. नारी अस्मिता और महादेवी वर्मा (Female Identity and Mahadevi Varma)",
      "5. नए मूल्यांकन के आयाम (Dimensions of New Criticisms)",
    ],
    pages: 320,
    language: "Hindi",
  },
  {
    id: 2,
    title: "Cinema Ke Samajshastra Ke Naye Aayaam",
    hindiTitle: "सिनेमा के समाजशास्त्र के नए आयाम",
    category: "Cinema Studies",
    year: "2004",
    publisher: "Radhakrishna Prakashan, New Delhi",
    description: "Deconstructs the relationship between screenplays and changing Indian socio-political structures from post-independence to the liberalized era. It reads parallel cinema as a critical document of class consciousness.",
    coverBg: "from-[#1a3a4b] to-[#0f2330] text-[#eed090]",
    coverStyle: "border-[#d4af37] border-double border-4",
    chapters: [
      "1. सिनेमा और भारतीय समाज का अंतर्संबंध (Cinema and Society)",
      "2. समानांतर सिनेमा: यथार्थवाद का अन्वेषण (Parallel Cinema and Realism)",
      "3. बिमल रॉय से सत्यजीत राय तक का सफ़र (From Bimal Roy to Satyajit Ray)",
      "4. शहरीकरण, मध्यवर्ग और सिनेमा (Urbanization, Middle Class and Cinema)",
      "5. तकनीकी बदलाव और वैचारिक धाराएँ (Technological Shifts & Ideologies)",
    ],
    pages: 280,
    language: "Hindi",
  },
  {
    id: 3,
    title: "Kabir: Srijan, Samaj Aur Sarokar",
    hindiTitle: "कबीर: सृजन, समाज और सरोकार",
    category: "Social Thought",
    year: "1998",
    publisher: "Vani Prakashan, New Delhi",
    description: "A philosophical re-evaluation of Kabir's poetry as a revolutionary social tool rather than merely religious mysticism. This book highlights his rebellion against caste divisions and dogma, relating it to modern humanism.",
    coverBg: "from-[#20402b] to-[#10281a] text-[#eed090]",
    coverStyle: "border-[#d4af37] border-4",
    chapters: [
      "1. कबीर की वाणी में विद्रोही स्वर (The Rebel Voice in Kabir)",
      "2. धार्मिक पाखंड और सामाजिक न्याय (Religious Dogma & Social Justice)",
      "3. लोकभाषा का सौंदर्यशास्त्र (Aesthetics of Folk Dialects)",
      "4. कबीर का मानवतावाद (Kabir's Universal Humanism)",
      "5. आधुनिक विमर्श में कबीर की प्रासंगिकता (Kabir's Modern Relevance)",
    ],
    pages: 240,
    language: "Hindi",
  },
  {
    id: 4,
    title: "Devanagari Lipi: Vikas, Sudhaar Aur Vyaakaran",
    hindiTitle: "देवनागरी लिपि: विकास, सुधार और व्याकरण",
    category: "Language Studies",
    year: "2011",
    publisher: "Bhartiya Jnanpith, New Delhi",
    description: "A comprehensive linguistic study of the Devanagari script. It explores its historical origin, epigraphical evidence, phonetic classification, phonetic efficiency, and spelling reforms proposed in modern typography.",
    coverBg: "from-[#4a3525] to-[#2b1f15] text-[#eed090]",
    coverStyle: "border-[#eed090]/60 border-2",
    chapters: [
      "1. ब्राह्मी से देवनागरी का सफ़र (From Brahmi to Devanagari)",
      "2. देवनागरी की वैज्ञानिकता और ध्वनिविज्ञान (Phonetic Structure)",
      "3. वर्तनी के मानकीकरण की चुनौतियाँ (Challenges of Standardization)",
      "4. कंप्यूटर, इंटरनेट और देवनागरी लिपि (Computers, Internet & Devanagari)",
      "5. व्याकरणिक कोटियाँ और विकास (Grammatical Classifications)",
    ],
    pages: 310,
    language: "Hindi",
  },
  {
    id: 5,
    title: "Samkaaleen Hindi Katha Sahitya Mein Tribal Sarokar",
    hindiTitle: "समकालीन हिंदी कथा साहित्य में ट्राइबल सरोकार",
    category: "Hindi Literature",
    year: "2015",
    publisher: "Anamika Publishers, New Delhi",
    description: "Drawing from his extensive years in Jharkhand, Dr. Kumar reviews the representation of tribal movements, cultural identity, environmental connection, and struggles against displacement in post-1980s Hindi fiction.",
    coverBg: "from-[#4d1f3b] to-[#301025] text-[#eed090]",
    coverStyle: "border-[#d4af37] border-4",
    chapters: [
      "1. हिंदी कथा साहित्य में आदिवासी जीवन (Tribal Life in Hindi Fiction)",
      "2. पर्यावरण, संस्कृति और जल-जंगल-जमीन (Environment & Cultural Heritage)",
      "3. विस्थापन की पीड़ा और संघर्ष (The Agony of Displacement)",
      "4. प्रमुख उपन्यासकारों के विशेष पाठ (Special Readings of Key Novelists)",
      "5. लोक-कथाओं का कथा साहित्य में समावेशन (Integrating Oral Folklore)",
    ],
    pages: 290,
    language: "Hindi",
  },
  {
    id: 6,
    title: "Aadhunik Hindi Sahitya Ka Itihaas Aur Aalochna",
    hindiTitle: "आधुनिक हिंदी साहित्य का इतिहास और आलोचना",
    category: "Literary Criticism",
    year: "1987",
    publisher: "Rajkamal Prakashan, New Delhi",
    description: "Dr. Kumar's early foundational textbook detailing major movements (Bhartendu, Dwivedi, Chhayavaad, Pragativaad) and outlining criticism tools to analyze modern poetry and prose.",
    coverBg: "from-[#2b2b2b] to-[#121212] text-[#eed090]",
    coverStyle: "border-[#d4af37] border-4",
    chapters: [
      "1. आधुनिकता की अवधारणा और नवजागरण (Modernity & Indian Renaissance)",
      "2. गद्य का विकास और भारतेंदु युग (Development of Prose & Bhartendu Era)",
      "3. द्विवेदी युग और काव्य का मानकीकरण (Dwivedi Era and Standardization)",
      "4. प्रगतिशील और प्रयोगवादी आंदोलन (Pragativad & Prayogvad Movements)",
      "5. आलोचना प्रणालियों का तुलनात्मक अध्ययन (Comparative Critique Systems)",
    ],
    pages: 350,
    language: "Hindi",
  },
];

export default function Publications() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [detailBook, setDetailBook] = useState<Book | null>(null);

  const categories = ["All", "Literary Criticism", "Hindi Literature", "Cinema Studies", "Social Thought", "Language Studies"];

  const filteredBooks = booksList.filter(
    (book) => selectedCategory === "All" || book.category === selectedCategory
  );

  return (
    <section id="publications" className="py-24 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden border-b border-gold/15">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/2 rounded-full filter blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold mb-2 block">
            Published Works
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Monographs & Publications
          </h2>
          <div className="w-24 h-[1px] bg-gold/40"></div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-16 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gold text-white font-semibold shadow-sm"
                  : "text-charcoal/70 hover:text-charcoal bg-transparent hover:bg-gold/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center max-w-[280px] w-full"
            >
              {/* 3D Book Container */}
              <div 
                style={{ perspective: "1000px" }}
                className="w-[200px] h-[280px] cursor-pointer group relative mb-6"
                onClick={() => setDetailBook(book)}
              >
                {/* 3D Wrapper */}
                <div 
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full h-full relative transition-transform duration-500 ease-out group-hover:rotate-y-[-24deg]"
                >
                  {/* Front Cover */}
                  <div 
                    style={{ transform: "translateZ(12px)" }}
                    className={`absolute inset-0 bg-gradient-to-br ${book.coverBg} ${book.coverStyle} shadow-lg rounded-r-md p-4 flex flex-col justify-between items-center text-center`}
                  >
                    <div className="absolute inset-1 border border-gold/15 pointer-events-none" />
                    
                    {/* Spine Cover Texture Lines */}
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent" />
                    
                    {/* Header Details */}
                    <span className="font-sans text-[8px] uppercase tracking-widest text-[#eed090]/80">
                      {book.category}
                    </span>

                    {/* Book Cover Titles */}
                    <div className="space-y-3 pt-4">
                      <h3 className="font-serif text-lg font-bold leading-tight px-1">
                        {book.hindiTitle}
                      </h3>
                      <p className="font-sans text-[8px] italic opacity-70 border-t border-[#eed090]/20 pt-2 px-3">
                        {book.title}
                      </p>
                    </div>

                    {/* Footer Author & Publisher */}
                    <div className="space-y-1 pb-1">
                      <p className="font-serif text-xs font-semibold tracking-wide">
                        डॉ. अरुण कुमार
                      </p>
                      <p className="font-sans text-[7px] uppercase tracking-widest opacity-60">
                        {book.publisher.split(",")[0]}
                      </p>
                    </div>
                  </div>

                  {/* 3D Spine effect */}
                  <div 
                    style={{ 
                      transform: "rotateY(-90deg) translateZ(6px)",
                      width: "24px"
                    }}
                    className={`absolute inset-y-0 left-0 bg-gradient-to-b ${book.coverBg} border-r border-[#eed090]/15 flex items-center justify-center`}
                  >
                    {/* Vertical spine title */}
                    <span className="font-serif text-[7px] text-[#eed090]/70 uppercase tracking-widest vertical-text whitespace-nowrap overflow-hidden">
                      {book.title}
                    </span>
                  </div>

                  {/* 3D Book Page Edge effect */}
                  <div 
                    style={{ 
                      transform: "translateZ(-12px)",
                    }}
                    className="absolute inset-0 bg-white shadow-md rounded-r-md border-y border-r border-charcoal/10"
                  />
                </div>
              </div>

              {/* Publication Metadata */}
              <div className="text-center">
                <h4 className="font-serif text-base font-bold text-charcoal leading-tight hover:text-gold transition-colors cursor-pointer" onClick={() => setDetailBook(book)}>
                  {book.hindiTitle}
                </h4>
                <p className="font-sans text-xs text-charcoal/50 mt-1 uppercase tracking-wider">
                  {book.publisher.split(",")[0]} ({book.year})
                </p>
                
                {/* View Details Button */}
                <button
                  onClick={() => setDetailBook(book)}
                  className="mt-3 inline-flex items-center space-x-1.5 text-xs text-gold hover:text-gold-hover uppercase tracking-widest font-semibold transition-colors"
                >
                  <Eye size={12} />
                  <span>Inspect Details</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Overlay / Drawer */}
        <AnimatePresence>
          {detailBook && (
            <div className="fixed inset-0 z-50 flex items-center justify-end">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setDetailBook(null)}
                className="absolute inset-0 bg-black"
              />

              {/* Drawer Content Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-lg h-full glass-panel-dark text-ivory p-8 md:p-12 overflow-y-auto flex flex-col shadow-2xl custom-scrollbar"
              >
                {/* Close Button */}
                <button
                  onClick={() => setDetailBook(null)}
                  className="absolute top-6 right-6 text-ivory/60 hover:text-white transition-colors"
                  aria-label="Close Drawer"
                >
                  <X size={24} />
                </button>

                {/* Details Contents */}
                <div className="space-y-8 mt-6">
                  {/* Category Stamp */}
                  <span className="inline-block text-[10px] uppercase tracking-widest text-gold font-bold border border-gold/30 px-3 py-1 rounded-sm">
                    {detailBook.category}
                  </span>

                  {/* Titles */}
                  <div>
                    <h3 className="font-serif text-3xl font-bold leading-tight text-white mb-2">
                      {detailBook.hindiTitle}
                    </h3>
                    <p className="font-sans text-xs text-ivory/60 italic font-medium">
                      {detailBook.title}
                    </p>
                  </div>

                  {/* Metadata Indicators Grid */}
                  <div className="grid grid-cols-2 gap-4 border-y border-ivory/10 py-4 font-sans text-xs text-ivory/80">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-gold" />
                      <span>Published: {detailBook.year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Printer size={14} className="text-gold" />
                      <span>Pages: {detailBook.pages}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen size={14} className="text-gold" />
                      <span>Language: {detailBook.language}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bookmark size={14} className="text-gold" />
                      <span>Authored Work</span>
                    </div>
                  </div>

                  {/* Synopsis Description */}
                  <div className="space-y-3">
                    <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                      Synopsis & Scope
                    </h4>
                    <p className="font-sans text-sm text-ivory/70 leading-relaxed">
                      {detailBook.description}
                    </p>
                  </div>

                  {/* Chapters Table of Contents */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                      Table of Contents
                    </h4>
                    <ul className="space-y-2.5 font-sans text-xs text-ivory/70">
                      {detailBook.chapters.map((ch, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5 bg-ivory/5 p-2.5 rounded-sm border border-ivory/5">
                          <span className="text-gold font-semibold">{idx + 1}.</span>
                          <span>{ch.replace(/^\d+\.\s*/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Publisher footer metadata */}
                  <div className="border-t border-ivory/10 pt-6 text-[11px] font-sans text-ivory/50">
                    <p>Publisher: {detailBook.publisher}</p>
                    <p className="mt-1">All copies preserved at Ranchi University Central Library.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
