"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, BookOpen, Quote, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Book {
  id: number;
  title: string;
  hindiTitle: string;
  category: string;
  author: string;
  description: string;
  color: string;
  height: string; // Tailwind height class for varying heights
  width: string;  // Tailwind width class
  influence: string;
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: "Chhayavad Ki Bhoomika",
    hindiTitle: "छायावाद की भूमिका",
    category: "Criticism",
    author: "Dr. Arun Kumar",
    description: "A profound analysis of the Chhayavad movement in Hindi poetry, exploring themes of nature, romanticism, and nationalism.",
    color: "bg-red-950/90 border-red-700/50",
    height: "h-40",
    width: "w-9",
    influence: "Hazari Prasad Dwivedi",
  },
  {
    id: 2,
    title: "Kabir Ka Samajik Darshan",
    hindiTitle: "कबीर का सामाजिक दर्शन",
    category: "Philosophy",
    author: "Dr. Arun Kumar",
    description: "An inquiry into the socio-philosophical ideas of Kabir, explaining how his 15th-century couplets remain critical tools for modern social harmony.",
    color: "bg-blue-950/90 border-blue-700/50",
    height: "h-44",
    width: "w-10",
    influence: "Kabir",
  },
  {
    id: 3,
    title: "Cinema Aur Samaj",
    hindiTitle: "सिनेमा और समाज",
    category: "Cinema",
    author: "Dr. Arun Kumar",
    description: "A critical survey of how early parallel cinema reflected Indian social struggles and class divides, focusing on Satyajit Ray and Bimal Roy.",
    color: "bg-amber-950/90 border-amber-700/50",
    height: "h-36",
    width: "w-8",
    influence: "Bimal Roy & Parallel Cinema",
  },
  {
    id: 4,
    title: "Premchand Ke Upanyaso Mein Janvaad",
    hindiTitle: "प्रेमचंद के उपन्यासों में जनवाद",
    category: "Criticism",
    author: "Dr. Arun Kumar",
    description: "Explores the democratic struggles, peasant revolutions, and human rights issues documented in Munshi Premchand's major novels like Godan.",
    color: "bg-emerald-950/90 border-emerald-700/50",
    height: "h-44",
    width: "w-11",
    influence: "Munshi Premchand",
  },
  {
    id: 5,
    title: "Bhasha Ka Itihas",
    hindiTitle: "भाषा का इतिहास",
    category: "History",
    author: "Dr. Arun Kumar",
    description: "A historical tracing of the development of the Devanagari script, dialect transitions, and the evolution of modern standard Hindi.",
    color: "bg-purple-950/90 border-purple-700/50",
    height: "h-40",
    width: "w-9",
    influence: "Ramchandra Shukla",
  },
  {
    id: 6,
    title: "Srijan Ki Prakriya",
    hindiTitle: "सृजन की प्रक्रिया",
    category: "Poetry",
    author: "Dr. Arun Kumar",
    description: "An aesthetic compilation analyzing how inspiration translates into poetic meters, exploring Hindi and Sanskrit aesthetic theories.",
    color: "bg-stone-950/90 border-stone-700/50",
    height: "h-36",
    width: "w-8",
    influence: "Nirala",
  },
  {
    id: 7,
    title: "Hindi Cinema Ka Swarnim Yug",
    hindiTitle: "हिंदी सिनेमा का स्वर्णिम युग",
    category: "Cinema",
    author: "Dr. Arun Kumar",
    description: "Deconstructs the narrative syntax, musical composition, and social commitment of 1950s Hindi cinema.",
    color: "bg-amber-900/90 border-amber-600/50",
    height: "h-42",
    width: "w-10",
    influence: "Guru Dutt",
  },
  {
    id: 8,
    title: "Alochana Ke Naye Pratimaan",
    hindiTitle: "आलोचना के नए प्रतिमान",
    category: "Criticism",
    author: "Dr. Arun Kumar",
    description: "A textbook-style critical exploration of post-independence literary theory and the emergence of modern criticism.",
    color: "bg-rose-950/90 border-rose-700/50",
    height: "h-44",
    width: "w-11",
    influence: "Namwar Singh",
  },
];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  const categories = ["All", "Criticism", "Poetry", "Cinema", "Philosophy", "History"];

  const filteredBooks = initialBooks.filter((book) => {
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.hindiTitle.includes(searchQuery) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.influence.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="library" className="py-24 px-6 md:px-12 bg-[#FAF6F0] relative overflow-hidden border-b border-gold/15">
      {/* Decorative shelf background arches */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/3 rounded-bl-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold mb-2 block">
            The Sanctuary of Ideas
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Library of Ideas
          </h2>
          <p className="font-serif text-charcoal/60 italic max-w-xl text-sm md:text-base">
            {"\"A personal library is not just a collection of pages, but a physical landscape of one's lifelong conversations with thinkers of the past.\""}
          </p>
          <div className="w-24 h-[1px] bg-gold/40 mt-4"></div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 bg-[#FDFBF7] p-4 rounded-sm border border-gold/15 shadow-sm">
          {/* Categories Tab Bar */}
          <div className="flex flex-wrap gap-2 justify-center">
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

          {/* Search Input Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold w-4 h-4" />
            <input
              type="text"
              placeholder="Search books, theories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gold/30 rounded-sm bg-ivory text-xs text-charcoal focus:outline-none focus:border-gold placeholder:text-charcoal/40 transition-colors"
            />
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Bookshelf Canvas */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="border border-gold/25 p-6 bg-[#FDFBF7] rounded-sm shadow-md relative">
              <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
              <h3 className="font-serif text-lg font-bold text-charcoal mb-4 flex items-center gap-2 border-b border-gold/10 pb-2">
                <Sparkles size={16} className="text-gold" />
                <span>Virtual Study Bookshelf</span>
              </h3>
              
              {/* Virtual Shelf Render */}
              <div className="relative min-h-[300px] flex flex-col justify-end">
                {/* Books Container */}
                <div className="flex items-end justify-start md:justify-center px-4 relative z-10 space-x-1 border-b-[16px] border-amber-950/90 shadow-lg overflow-x-auto flex-nowrap scrollbar-none pb-0.5">
                  {/* Decorative bookend left */}
                  <div className="w-4 h-28 bg-amber-900 border-l border-t border-amber-700/50 rounded-tl-sm skew-x-3" />

                  {/* Dynamic Books Mapping */}
                  <AnimatePresence>
                    {filteredBooks.map((book) => {
                      const isSelected = activeBook?.id === book.id;
                      return (
                        <motion.div
                          key={book.id}
                          layout
                          onClick={() => setActiveBook(isSelected ? null : book)}
                          className={`relative cursor-pointer transition-all duration-300 origin-bottom flex flex-col justify-between items-center text-center py-2 px-1 border-t border-x rounded-t-sm shadow-sm ${book.color} ${book.height} ${book.width} ${
                            isSelected ? "-translate-y-4 scale-105 border-gold shadow-lg" : "hover:-translate-y-2 hover:skew-x-1"
                          }`}
                        >
                          {/* Spin / Gold Bookmark indicator */}
                          <div className="w-[2px] h-4 bg-gold absolute top-0 left-2" />
                          
                          {/* Vertical Title in English & Devnagari characters */}
                          <div className="flex flex-col items-center justify-center h-full select-none">
                            <span className="text-[9px] font-semibold tracking-wider text-ivory/80 uppercase font-sans vertical-text select-none">
                              {book.title.slice(0, 8)}..
                            </span>
                            <span className="text-[10px] font-bold text-gold/90 mt-1 font-serif select-none">
                              {book.hindiTitle[0]}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Decorative bookend right */}
                  <div className="w-4 h-28 bg-amber-900 border-r border-t border-amber-700/50 rounded-tr-sm -skew-x-3" />
                </div>
                {/* Shelf label */}
                <div className="bg-[#B89047]/10 py-1 text-center font-serif text-[10px] font-semibold tracking-widest text-gold uppercase border-b border-x border-gold/15">
                  Section A: Selected Critical Works & Monographs
                </div>
              </div>

              {/* Book Detail Overlay inside Panel */}
              <div className="mt-8 min-h-[140px] border border-gold/20 bg-[#FAF6F0] p-4 rounded-sm relative flex flex-col justify-center">
                {activeBook ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-start border-b border-gold/10 pb-1.5">
                      <div>
                        <h4 className="font-serif text-base font-bold text-charcoal">
                          {activeBook.hindiTitle} ({activeBook.title})
                        </h4>
                        <p className="font-sans text-[10px] text-charcoal/50 uppercase tracking-widest mt-0.5">
                          Category: {activeBook.category} • Author: {activeBook.author}
                        </p>
                      </div>
                      <span className="text-gold text-xs font-semibold uppercase tracking-wider border border-gold/30 px-2 py-0.5 rounded-sm">
                        Selected Book
                      </span>
                    </div>
                    <p className="font-sans text-xs text-charcoal/80 leading-relaxed italic">
                      {"\""}{activeBook.description}{"\""}
                    </p>
                    <div className="flex items-center space-x-1.5 pt-1 text-[11px] text-gold-dark font-medium">
                      <BookOpen size={12} />
                      <span>Literary Influence: {activeBook.influence}</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center text-charcoal/40 font-serif text-xs py-8 italic flex flex-col items-center justify-center space-y-2">
                    <BookOpen size={24} className="text-gold/40" />
                    <span>Click on any book in the bookshelf above to pull it out and read its details.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Library Photograph & Literary Influences */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            {/* Library Photo Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#FDFBF7] p-4 border border-gold/25 rounded-sm shadow-md flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-charcoal/10 rounded-sm">
                <Image
                  src="/images/library_shelf.jpg"
                  alt="Packed bookshelves in Dr. Arun Kumar's library"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover filter sepia-[20%] contrast-[95%]"
                />
              </div>
              <div className="mt-3 flex items-start space-x-2">
                <Quote size={16} className="text-gold mt-1 shrink-0" />
                <p className="font-sans text-[11px] text-charcoal/60 leading-normal italic">
                  {"\"Dr. Arun Kumar's personal archive is housing thousands of books, handwritten drafts, journals, and classical manuscripts in Ranchi.\""}
                </p>
              </div>
            </motion.div>

            {/* Reading Interests & Literary Influences */}
            <div className="bg-[#FDFBF7] p-6 border border-gold/15 rounded-sm shadow-sm">
              <h3 className="font-serif text-base font-bold text-charcoal border-b border-gold/10 pb-2 mb-4">
                Reading Interests & Influences
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-semibold text-charcoal">Classical Criticism</span>
                    <span className="font-sans text-[11px] text-charcoal/60 leading-relaxed">
                      {"Deeply influenced by Acharya Ramchandra Shukla and Acharya Hazari Prasad Dwivedi's methods of historical and aesthetic inquiry."}
                    </span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-semibold text-charcoal">Cinema Criticism</span>
                    <span className="font-sans text-[11px] text-charcoal/60 leading-relaxed">
                      Explores the socio-cultural dynamics in standard cinema, building criticism surrounding screenwriting, narrative styles, and realism.
                    </span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-semibold text-charcoal">Folk & Tribal Orality</span>
                    <span className="font-sans text-[11px] text-charcoal/60 leading-relaxed">
                      {"Collects, catalogs, and critiques Jharkhand's regional dialects, documenting how oral narratives integrate with written standard Hindi."}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
