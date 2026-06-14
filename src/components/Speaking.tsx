"use client";

import Image from "next/image";
import { MapPin, Calendar, Award, Mic } from "lucide-react";
import { motion } from "framer-motion";

interface EventItem {
  id: number;
  title: string;
  hindiTitle: string;
  category: "Conferences" | "Keynotes" | "Book Launches" | "Academic Seminars";
  date: string;
  venue: string;
  description: string;
  imagePath?: string;
  role: string;
}

const events: EventItem[] = [
  {
    id: 1,
    title: "Kamleshwari Charan Singh Book Launch Seminar",
    hindiTitle: "कमलेश्वरी चरण सिंह जयंती समारोह एवं पुस्तक लोकार्पण",
    category: "Book Launches",
    date: "August 14, 2025",
    venue: "Chandradhari Mithila Mahavidyalaya, Kila Ghat, Darbhanga",
    description: "Invited as the Guest Speaker and Chief Literary Critic to release the commemorative volume. Addressed the audience on the intersections of freedom struggle and local literature in Mithilanchal.",
    imagePath: "/images/event_darbhanga.jpg",
    role: "Chief Speaker & Book Releasing Officer",
  },
  {
    id: 2,
    title: "National Seminar on Sufi & Bhakti Mysticism",
    hindiTitle: "सूफी एवं भक्ति रहस्यवाद राष्ट्रीय संगोष्ठी",
    category: "Conferences",
    date: "October 2024",
    venue: "Guru Nanak Dev University, Amritsar",
    description: "Delivered a presentation comparing the linguistic expressions of Guru Nanak's verses and Kabir's couplets. Highlighted how local idioms were deployed to unite diverse social strata.",
    imagePath: "/images/conference_amritsar.jpg",
    role: "Invited Keynote Speaker",
  },
  {
    id: 3,
    title: "Ranchi University Hindi Department Annual Symposium",
    hindiTitle: "रांची विश्वविद्यालय हिंदी विभाग वार्षिक संगोष्ठी",
    category: "Academic Seminars",
    date: "November 2018",
    venue: "Ranchi University Senate Hall, Ranchi",
    description: "Chaired the final valedictory session of the national seminar on 'Modernism and Tribal Narratives in Eastern India'. Formulated the concluding guidelines for curriculum developments.",
    role: "Session Chairperson & Head of Department",
  },
  {
    id: 4,
    title: "Patna University Centenary Lecture Series",
    hindiTitle: "पटना विश्वविद्यालय शताब्दी व्याख्यानमाला",
    category: "Keynotes",
    date: "July 2017",
    venue: "Wheeler Senate Hall, Patna University",
    description: "Delivered the honorary centenary lecture on the historical transition of Hindi prose. Explored the contribution of early 20th-century journals like 'Saraswati' in cementing grammatical standards.",
    role: "Centenary Keynote Speaker",
  },
];

export default function Speaking() {
  return (
    <section id="speaking" className="py-24 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden border-b border-gold/15">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold mb-2 block">
            Academic Engagements
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Lectures & Speaking Events
          </h2>
          <div className="w-24 h-[1px] bg-gold/40"></div>
        </div>

        {/* Timeline Layout */}
        <div className="space-y-20 relative">
          {events.map((event, index) => {
            const isImageLeft = index % 2 === 0;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Event Image / Photograph */}
                <div
                  className={`lg:col-span-5 flex justify-center ${
                    isImageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {event.imagePath ? (
                    <div className="relative p-3 bg-[#FAF6F0] border border-gold/20 shadow-md w-full max-w-md aspect-[4/3] rounded-sm group">
                      <div className="absolute inset-1.5 border border-gold/5 pointer-events-none" />
                      <div className="relative w-full h-full overflow-hidden border border-charcoal/10 rounded-sm">
                        <Image
                          src={event.imagePath}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover filter sepia-[10%] contrast-[105%] group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative p-6 bg-[#FAF6F0] border border-gold/20 shadow-sm w-full max-w-md aspect-[4/3] rounded-sm flex flex-col items-center justify-center text-center space-y-3">
                      <div className="absolute inset-1.5 border border-gold/5 pointer-events-none" />
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                        <Mic size={24} />
                      </div>
                      <h4 className="font-serif text-sm font-bold text-charcoal">{event.hindiTitle}</h4>
                      <p className="font-sans text-[11px] text-charcoal/50 uppercase tracking-widest">{event.category}</p>
                    </div>
                  )}
                </div>

                {/* Event Details Description */}
                <div
                  className={`lg:col-span-7 flex flex-col space-y-4 ${
                    isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {/* Category Stamp & Date */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold bg-[#FAF6F0] border border-gold/25 px-3 py-1 rounded-sm shadow-sm">
                      {event.category}
                    </span>
                    <div className="flex items-center space-x-1.5 text-xs text-charcoal/50 font-sans">
                      <Calendar size={13} className="text-gold/60" />
                      <span>{event.date}</span>
                    </div>
                  </div>

                  {/* Heading Titles */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-charcoal leading-tight">
                      {event.hindiTitle}
                    </h3>
                    <p className="font-sans text-xs text-charcoal/50 italic font-semibold mt-1">
                      {event.title}
                    </p>
                  </div>

                  {/* Metadata role & Venue */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-y border-gold/10 py-3 text-xs text-charcoal/80 font-sans">
                    <div className="flex items-start space-x-2">
                      <Award size={14} className="text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-semibold">Scholarly Role:</span>
                        <span className="text-charcoal/60">{event.role}</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-semibold">Venue:</span>
                        <span className="text-charcoal/60 leading-tight block">{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Paragraph text */}
                  <p className="font-sans text-xs md:text-sm text-charcoal/70 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
