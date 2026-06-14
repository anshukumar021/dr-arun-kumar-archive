import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Quotes from "@/components/Quotes";
import Publications from "@/components/Publications";
import Library from "@/components/Library";
import Writings from "@/components/Writings";
import Speaking from "@/components/Speaking";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import PhotoArchive from "@/components/PhotoArchive";
import AudioNarration from "@/components/AudioNarration";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory text-charcoal parchment-bg selection:bg-gold/25 selection:text-gold-dark overflow-x-hidden antialiased">
      {/* Fixed Navigation Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Full-Screen Entrance with Floating Devnagari Scripts */}
        <Hero />

        {/* Storytelling Timeline & Portrait Sketch Frame */}
        <About />

        {/* Handwritten Ink-on-Parchment Fading Quotes */}
        <Quotes />

        {/* 3D Rotating Book Showcase & Details Drawers */}
        <Publications />

        {/* Interactive Virtual Bookshelf & Reading Interests */}
        <Library />

        {/* Digital Journal Archives with Smart Filtering */}
        <Writings />

        {/* Timelines of Conferences & Events */}
        <Speaking />

        {/* Responsive HTML5 Canvas Spring Node Relationship Graph */}
        <KnowledgeGraph />

        {/* Masonry Image Gallery with Cinema Zoom Lightbox */}
        <PhotoArchive />

        {/* Audio Guide Player with SpeechSynthesis & waveform */}
        <AudioNarration />

        {/* Suggested Queries Conversational Chat panel */}
        <AIAssistant />
      </main>

      {/* Academic Signature Footer */}
      <Footer />
    </div>
  );
}
