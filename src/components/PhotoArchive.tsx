"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: number;
  title: string;
  hindiTitle: string;
  category: "Family" | "Literary Events" | "Conferences" | "Personal Library" | "Publications";
  imagePath: string;
  description: string;
  aspectRatio: string; // Tailwind aspect classes for masonry variation
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Pencil Color Sketch Portrait",
    hindiTitle: "रंगीन पेंसिल रेखाचित्र पोर्ट्रेट",
    category: "Publications",
    imagePath: "/images/arun_kumar_portrait.jpg",
    description: "An artistic colored pencil drawing depicting Dr. Arun Kumar standing in front of his bookshelves, reflecting a life surrounded by books.",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 2,
    title: "Darbhanga Book Release Ceremony",
    hindiTitle: "दरभंगा पुस्तक विमोचन विचार गोष्ठी",
    category: "Literary Events",
    imagePath: "/images/event_darbhanga.jpg",
    description: "Stage view of the Kamleshwari Charan Singh Book Release event in C.M. College, Darbhanga on August 14, 2025.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 3,
    title: "National Seminar Address, Amritsar",
    hindiTitle: "राष्ट्रीय संगोष्ठी संबोधन, अमृतसर",
    category: "Conferences",
    imagePath: "/images/conference_amritsar.jpg",
    description: "A keynote session presentation by chief delegates on Bhakti Mysticism at Guru Nanak Dev University, Amritsar.",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 4,
    title: "Family Gathering in Ranchi Home",
    hindiTitle: "रांची गृह में पारिवारिक मिलन",
    category: "Family",
    imagePath: "/images/family_gathering.jpg",
    description: "A candid snapshot of Dr. Arun Kumar sitting with his wife and family members in his living room, Ranchi.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 5,
    title: "Personal Library Shelves",
    hindiTitle: "निजी पुस्तकालय में पुस्तक चयन",
    category: "Personal Library",
    imagePath: "/images/library_shelf.jpg",
    description: "An archival photo of the custom metal bookshelves filled with thousands of critical texts and journals at Dr. Kumar's study room.",
    aspectRatio: "aspect-[3/4]",
  },
];

export default function PhotoArchive() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const categories = ["All", "Family", "Literary Events", "Conferences", "Personal Library", "Publications"];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const handleNext = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden border-b border-gold/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold mb-2 block">
            Visual Legacy
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Photo Archive & Gallery
          </h2>
          <div className="w-24 h-[1px] bg-gold/40"></div>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
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

        {/* Masonry Columns Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setLightboxIdx(index)}
              className={`break-inside-avoid relative bg-[#FAF6F0] border border-gold/15 p-3 rounded-sm shadow-sm hover:shadow-md cursor-pointer group transition-all duration-300 ${item.aspectRatio}`}
            >
              {/* Internal border styling */}
              <div className="absolute inset-2 border border-gold/5 pointer-events-none z-10" />

              {/* Image Frame Container */}
              <div className="relative w-full h-full overflow-hidden border border-charcoal/5 rounded-sm">
                <Image
                  src={item.imagePath}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover filter sepia-[12%] contrast-[103%] group-hover:scale-102 transition-transform duration-700 ease-out"
                />

                {/* Hover overlay icons */}
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-ivory/80 flex items-center justify-center text-charcoal shadow-lg">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>

              {/* Captions overlay hidden under masonry */}
              <div className="mt-3">
                <span className="font-sans text-[8px] font-bold uppercase tracking-widest text-gold">
                  {item.category}
                </span>
                <h4 className="font-serif text-sm font-bold text-charcoal leading-tight mt-0.5">
                  {item.hindiTitle}
                </h4>
                <p className="font-sans text-[10px] text-charcoal/50 tracking-wider">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cinematic Lightbox Modal */}
        <AnimatePresence>
          {lightboxIdx !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8">
              {/* Close Button */}
              <button
                onClick={() => setLightboxIdx(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
                aria-label="Close Lightbox"
              >
                <X size={28} />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors z-50 bg-white/5 hover:bg-white/10 p-2 rounded-full"
                aria-label="Previous Photo"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors z-50 bg-white/5 hover:bg-white/10 p-2 rounded-full"
                aria-label="Next Photo"
              >
                <ChevronRight size={24} />
              </button>

              {/* Lightbox Content Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-4xl w-full max-h-[80vh] aspect-[4/3] flex flex-col md:flex-row bg-[#FAF6F0] text-charcoal rounded-sm overflow-hidden shadow-2xl p-4 md:p-6"
              >
                {/* Vintage border */}
                <div className="absolute inset-2 border border-gold/15 pointer-events-none" />

                {/* Left side: Styled Image */}
                <div className="relative flex-1 h-64 md:h-full overflow-hidden border border-charcoal/10 rounded-sm">
                  <Image
                    src={filteredItems[lightboxIdx].imagePath}
                    alt={filteredItems[lightboxIdx].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover filter sepia-[8%] contrast-[105%]"
                  />
                </div>

                {/* Right side: Photo details */}
                <div className="w-full md:w-80 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gold/15 bg-[#FDFBF7] z-10">
                  <div className="space-y-4">
                    <span className="inline-flex items-center space-x-1 font-sans text-[9px] uppercase tracking-widest text-gold font-bold">
                      <Camera size={11} />
                      <span>{filteredItems[lightboxIdx].category} Archive</span>
                    </span>

                    <div>
                      <h3 className="font-serif text-xl font-bold leading-tight">
                        {filteredItems[lightboxIdx].hindiTitle}
                      </h3>
                      <h4 className="font-sans text-[11px] text-charcoal/50 italic mt-0.5 leading-none">
                        {filteredItems[lightboxIdx].title}
                      </h4>
                    </div>

                    <p className="font-sans text-xs text-charcoal/70 leading-relaxed pt-2">
                      {filteredItems[lightboxIdx].description}
                    </p>
                  </div>

                  <div className="text-[10px] font-sans text-charcoal/40 border-t border-gold/10 pt-4 flex justify-between items-center">
                    <span>Dr. Arun Kumar Legacy</span>
                    <span>Photo {lightboxIdx + 1} of {filteredItems.length}</span>
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
