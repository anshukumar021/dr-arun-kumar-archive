"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Volume2, Music, Sparkles } from "lucide-react";


interface Track {
  id: number;
  title: string;
  hindiTitle: string;
  duration: string;
  text: string;
}

const narrationTracks: Track[] = [
  {
    id: 1,
    title: "Biography of Dr. Arun Kumar",
    hindiTitle: "डॉ. अरुण कुमार का जीवन परिचय",
    duration: "1:30",
    text: "Dr. Arun Kumar, born March 5, 1953, is a distinguished Hindi scholar, author, and researcher. Former Head of Hindi Department, Ranchi University. Educated at Patna University and JNU, his legacy spans five decades of literary criticism, cinema studies, and folk culture preservation. He retired from formal roles in 2018.",
  },
  {
    id: 2,
    title: "Snippet from Chhayavad Critique",
    hindiTitle: "छायावाद आलोचना प्रलेख खंड",
    duration: "1:15",
    text: "साहित्य केवल मनोरंजन नहीं है, बल्कि यह वह शक्ति है जो समाज के संशय और अवसाद को दूर कर उसकी आत्मा को झंकृत करती है। सूर्यकांत त्रिपाठी निराला रचित राम की शक्ति पूजा केवल राम-रावण युद्ध का पौराणिक आख्यान नहीं है, बल्कि वह आधुनिक मनुष्य के गहरे अस्तित्ववादी संकट की कविता है।",
  },
];

export default function AudioNarration() {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(0); // 0 to 100
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Soundwave canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 80);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 400;
      height = canvas.height = 80;
    };
    window.addEventListener("resize", handleResize);

    let phase = 0;
    const drawWave = () => {
      ctx.clearRect(0, 0, width, height);

      const numBars = 45;
      const barWidth = 3;
      const gap = 4;
      const startX = (width - (numBars * (barWidth + gap))) / 2;

      ctx.fillStyle = "#B89047"; // Gold color

      for (let i = 0; i < numBars; i++) {
        // Calculate height based on sine wave and active play status
        const x = startX + i * (barWidth + gap);
        let amplitude = isPlaying ? (Math.sin(phase + i * 0.25) * 20 + 25) : 3;

        // Add some noise simulation if playing
        if (isPlaying) {
          amplitude += (Math.random() - 0.5) * 8;
        }

        const barHeight = Math.max(3, amplitude);
        const y = (height - barHeight) / 2;

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      phase += 0.08;
      animationId = requestAnimationFrame(drawWave);
    };

    drawWave();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isPlaying]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const startSpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("Speech synthesis is not supported on this browser.");
      return;
    }

    // Cancel existing
    window.speechSynthesis.cancel();

    const track = narrationTracks[currentTrackIdx];
    const utterance = new SpeechSynthesisUtterance(track.text);
    
    // Choose appropriate voice characteristics
    utterance.lang = currentTrackIdx === 0 ? "en-IN" : "hi-IN"; // English for bio, Hindi for script
    utterance.rate = 0.82; // Slow, scholarly academic pacing
    utterance.pitch = 0.95;

    utterance.onend = () => {
      setIsPlaying(false);
      setSpeechProgress(100);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    // Simulate progress tracking (approximate based on duration)
    const startTime = Date.now();
    const estDuration = currentTrackIdx === 0 ? 12000 : 8000; // estimated ms

    const progressTimer = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(progressTimer);
        return;
      }
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / estDuration) * 100, 95);
      setSpeechProgress(progress);
    }, 250);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setSpeechProgress(0);
  };

  const handlePlayPause = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        startSpeech();
      }
    }
  };

  const handleStop = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setSpeechProgress(0);
  };

  const selectTrack = (idx: number) => {
    handleStop();
    setCurrentTrackIdx(idx);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden border-b border-gold/15">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold mb-2 block">
            Archival Voice Guide
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Digital Audio Guide
          </h2>
          <div className="w-24 h-[1px] bg-gold/40"></div>
        </div>

        {/* Audio Player Container */}
        <div className="bg-[#FAF6F0] border border-gold/25 p-6 md:p-8 shadow-lg rounded-sm relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Inner border */}
          <div className="absolute inset-2 border border-gold/5 pointer-events-none" />

          {/* Left Column: Track Selector */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-sm font-bold text-charcoal flex items-center gap-1.5 uppercase tracking-wide border-b border-gold/10 pb-2">
              <Music size={14} className="text-gold" />
              <span>Select Narration Guide</span>
            </h3>

            <div className="flex flex-col space-y-2">
              {narrationTracks.map((track, idx) => {
                const isCurrent = currentTrackIdx === idx;
                return (
                  <button
                    key={track.id}
                    onClick={() => selectTrack(idx)}
                    className={`text-left p-3.5 rounded-sm border transition-all duration-300 flex flex-col justify-between ${
                      isCurrent
                        ? "bg-[#FDFBF7] border-gold shadow-sm"
                        : "bg-transparent border-charcoal/10 hover:border-gold/30 hover:bg-gold/5"
                    }`}
                  >
                    <span className="font-serif text-xs font-bold text-charcoal">
                      {track.hindiTitle}
                    </span>
                    <span className="font-sans text-[10px] text-charcoal/50 uppercase tracking-widest mt-1">
                      {track.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Waveform & Playback Controls */}
          <div className="md:col-span-7 flex flex-col items-center justify-center space-y-6">
            {/* Waveform Canvas */}
            <div className="w-full bg-[#FDFBF7] border border-gold/15 p-4 rounded-sm shadow-inner relative flex justify-center">
              <canvas ref={canvasRef} className="block max-w-full" />
              {/* Audio guide label stamp */}
              <span className="absolute top-2 left-3 font-sans text-[8px] uppercase tracking-widest text-gold font-semibold flex items-center gap-1">
                <Sparkles size={10} />
                <span>Speech Synthesizer Visualizer</span>
              </span>
            </div>

            {/* Controls panel */}
            <div className="flex flex-col items-center w-full space-y-3">
              {/* Scrub Bar Progress indicator */}
              <div className="w-full bg-gold/15 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-gold h-full transition-all duration-300"
                  style={{ width: `${speechProgress}%` }}
                />
              </div>

              {/* Action Buttons Panel */}
              <div className="flex justify-between items-center w-full px-2 text-xs font-sans text-charcoal/50">
                <span>0:00</span>
                
                {/* Control Buttons Group */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleStop}
                    disabled={!isPlaying && speechProgress === 0}
                    className="w-10 h-10 rounded-full border border-gold/20 hover:border-gold/50 flex items-center justify-center text-charcoal hover:text-gold transition-all duration-300 bg-[#FDFBF7] shadow-sm disabled:opacity-40"
                    aria-label="Stop Narration"
                  >
                    <Square size={14} className="fill-charcoal/10" />
                  </button>

                  <button
                    onClick={handlePlayPause}
                    className="w-14 h-14 rounded-full bg-gold hover:bg-gold-hover text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-103"
                    aria-label={isPlaying ? "Pause Narration" : "Play Narration"}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                  </button>

                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold bg-[#FDFBF7] shadow-sm">
                    <Volume2 size={15} />
                  </div>
                </div>

                <span>{narrationTracks[currentTrackIdx].duration}</span>
              </div>
            </div>

            {/* Note about technology fallback */}
            <p className="font-sans text-[10px] text-charcoal/40 text-center leading-normal max-w-sm flex items-center justify-center gap-1">
              <Volume2 size={11} className="text-gold" />
              <span>Uses browser SpeechSynthesis API with slow, academic vocal settings.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
