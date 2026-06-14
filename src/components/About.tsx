"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Award, Heart } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  institution: string;
  description: string;
  icon: React.ReactNode;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1953",
    title: "Birth & Early Life",
    institution: "March 5, 1953",
    description: "Born into a family that fostered a deep appreciation for language, culture, and folklore, setting the stage for a life of scholarly dedication.",
    icon: <Heart className="w-5 h-5 text-white" />,
  },
  {
    year: "1970s",
    title: "Academic Beginnings (Patna University)",
    institution: "Patna University",
    description: "Completed undergraduate and postgraduate studies in Hindi Literature, graduating with honors. Published first criticism essays in local literary journals.",
    icon: <GraduationCap className="w-5 h-5 text-white" />,
  },
  {
    year: "1980s",
    title: "Advanced Research & Ph.D.",
    institution: "Jawaharlal Nehru University (JNU)",
    description: "Conducted advanced doctoral research at JNU, focusing on modern Hindi literary criticism and socio-cultural interfaces. Understood Hindi's evolving role in public discourse.",
    icon: <BookOpen className="w-5 h-5 text-white" />,
  },
  {
    year: "1985 - 2018",
    title: "Academic Career & Ranchi University",
    institution: "Ranchi University",
    description: "Joined Ranchi University as a faculty member. Mentored dozens of doctoral candidates, published pioneering criticism books, and conducted interdisciplinary research in Cinema Studies and Social Thought.",
    icon: <Award className="w-5 h-5 text-white" />,
  },
  {
    year: "2015 - 2018",
    title: "Head of the Hindi Department",
    institution: "Ranchi University",
    description: "Appointed Head of the Hindi Department. Spearheaded curriculum reforms, hosted national conferences, and established the department as a major research center in eastern India.",
    icon: <Award className="w-5 h-5 text-white" />,
  },
  {
    year: "2018 - Present",
    title: "Retirement & Continuous Engagement",
    institution: "Active Scholar & Public Intellectual",
    description: "Retired from formal academic roles in 2018. Continues to write critique essays, give keynote speeches across the country, publish books, and guide cultural thinkers.",
    icon: <BookOpen className="w-5 h-5 text-white" />,
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-gold/3 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/4 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold mb-2 block">
            {"The Scholar's Chronicle"}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Biography & Academic Journey
          </h2>
          <div className="w-24 h-[1px] bg-gold/40"></div>
        </div>

        {/* Narrative & Portrait Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          {/* Portrait Framed Canvas */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative p-4 md:p-6 bg-[#FAF6F0] border border-gold/25 shadow-xl max-w-sm rounded-sm group"
            >
              {/* Photo Frame Styling */}
              <div className="absolute inset-2 border border-gold/10 pointer-events-none" />
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-charcoal/10 rounded-sm">
                <Image
                  src="/images/arun_kumar_portrait.jpg"
                  alt="Dr. Arun Kumar standing in his library"
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  priority
                  className="object-cover filter sepia-[15%] contrast-[105%] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="mt-4 text-center">
                <p className="font-serif text-lg font-bold text-charcoal">Dr. Arun Kumar</p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-gold mt-1 font-medium">
                  Portrait in Personal Library, Ranchi
                </p>
              </div>
            </motion.div>
          </div>

          {/* Biography Text Details */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <span className="font-serif text-2xl md:text-3xl font-medium italic text-charcoal border-l-2 border-gold pl-4 leading-normal">
              {"\"Literature is not merely a reflection of society, but the critical lens through which we envision its transformation.\""}
            </span>
            <div className="font-sans text-sm md:text-base text-charcoal/80 space-y-4 leading-relaxed">
              <p>
                Dr. Arun Kumar is a pillar of Hindi scholarship, whose academic contributions span over five decades of research, teaching, and cultural critiques. As the retired Head of the Hindi Department at Ranchi University, his leadership nurtured hundreds of postgraduate students and doctoral candidates, directing the path of modern literature studies in eastern India.
              </p>
              <p>
                Educated at <strong>Patna University</strong> and <strong>Jawaharlal Nehru University (JNU)</strong>, his formative academic years were spent in centers of intellectual revolution. This background helped him develop a distinct analytical voice, combining strict textual criticism with socio-political inquiry. His research is notable for examining local folk history and analyzing modern Hindi cinema.
              </p>
              <p>
                His retirement from Ranchi University in 2018 did not signal an end to his work, but rather the start of a new phase as a public intellectual. Today, he remains active in national literary conferences, publishing critiques, and writing cultural reflections that connect classic literature with {"today's"} digital media landscape.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="relative max-w-4xl mx-auto pt-10">
          {/* Vertical line connector */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-gold/20 -translate-x-1/2" />

          <div className="space-y-12">
            {timelineEvents.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col md:flex-row relative items-start"
                >
                  {/* Timeline Badge */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-charcoal border border-gold z-10 shadow-md">
                    {event.icon}
                  </div>

                  {/* Left spacing for desktop */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 text-left md:text-right ${isEven ? "md:block" : "md:hidden"}`}>
                    <span className="inline-block font-sans text-xs font-bold uppercase tracking-widest text-gold border border-gold/30 px-3 py-1 rounded-full bg-[#FAF6F0] mb-2">
                      {event.year}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal">{event.title}</h3>
                    <h4 className="font-serif text-sm font-semibold italic text-gold-dark mt-0.5">{event.institution}</h4>
                    <p className="font-sans text-xs text-charcoal/70 mt-2 leading-relaxed max-w-md md:ml-auto">
                      {event.description}
                    </p>
                  </div>

                  {/* Spacer for desktop layout alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Right layout for odd entries */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-12 text-left ${!isEven ? "md:block" : "md:hidden"}`}>
                    <span className="inline-block font-sans text-xs font-bold uppercase tracking-widest text-gold border border-gold/30 px-3 py-1 rounded-full bg-[#FAF6F0] mb-2">
                      {event.year}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal">{event.title}</h3>
                    <h4 className="font-serif text-sm font-semibold italic text-gold-dark mt-0.5">{event.institution}</h4>
                    <p className="font-sans text-xs text-charcoal/70 mt-2 leading-relaxed max-w-md">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
