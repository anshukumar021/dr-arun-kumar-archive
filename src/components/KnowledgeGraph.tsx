"use client";

import { useEffect, useRef, useState } from "react";
import { Network, HelpCircle, RefreshCw } from "lucide-react";

interface Node {
  id: string;
  label: string;
  category: "Scholar" | "University" | "Topic" | "Book" | "Event";
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  radius: number;
  color: string;
  description: string;
}

interface Edge {
  source: string;
  target: string;
  label: string;
}

const initialNodes: Node[] = [
  {
    id: "center",
    label: "Dr. Arun Kumar",
    category: "Scholar",
    x: 350,
    y: 200,
    originalX: 350,
    originalY: 200,
    radius: 40,
    color: "#B89047", // Gold
    description: "The primary scholar, Head of Hindi Department, Ranchi University (RU), and literary critic.",
  },
  {
    id: "patna",
    label: "Patna University",
    category: "University",
    x: 150,
    y: 100,
    originalX: 150,
    originalY: 100,
    radius: 28,
    color: "#1a3a4b", // Deep Navy
    description: "Alma Mater where Dr. Kumar completed his B.A. and M.A. in Hindi Literature during the early 1970s.",
  },
  {
    id: "jnu",
    label: "Jawaharlal Nehru University",
    category: "University",
    x: 130,
    y: 280,
    originalX: 130,
    originalY: 280,
    radius: 28,
    color: "#1a3a4b",
    description: "The research institute where Dr. Kumar pursued advanced critique methodologies and prepared his research papers.",
  },
  {
    id: "ranchi",
    label: "Ranchi University",
    category: "University",
    x: 550,
    y: 200,
    originalX: 550,
    originalY: 200,
    radius: 32,
    color: "#1a3a4b",
    description: "The institution where Dr. Kumar spent 33 years teaching, researching, and serving as the Department Head until 2018.",
  },
  {
    id: "cinema_studies",
    label: "Cinema Studies",
    category: "Topic",
    x: 350,
    y: 60,
    originalX: 350,
    originalY: 60,
    radius: 26,
    color: "#601a1a", // Deep Red
    description: "Interdisciplinary study domain examining how Indian cinema mirrors society, class divide, and changing values.",
  },
  {
    id: "folklore",
    label: "Tribal Folklore",
    category: "Topic",
    x: 520,
    y: 80,
    originalX: 520,
    originalY: 80,
    radius: 26,
    color: "#601a1a",
    description: "Focus area evaluating Jharkhand's oral literature and folk songs, integrating them with Hindi critical theories.",
  },
  {
    id: "book_chhayavad",
    label: "Chhayavad Monograph",
    category: "Book",
    x: 570,
    y: 320,
    originalX: 570,
    originalY: 320,
    radius: 24,
    color: "#20402b", // Deep Green
    description: "Seminal book 'Chhayavaad Aur Uttar-Chhayavaad Ke Setu' exploring transitions in romantic poetry.",
  },
  {
    id: "book_cinema",
    label: "Cinema Sociology Book",
    category: "Book",
    x: 310,
    y: 350,
    originalX: 310,
    originalY: 350,
    radius: 24,
    color: "#20402b",
    description: "Published book 'Cinema Ke Samajshastra Ke Naye Aayaam' reviewing parallel cinema scripts.",
  },
  {
    id: "event_amritsar",
    label: "Amritsar Seminar",
    category: "Event",
    x: 230,
    y: 220,
    originalX: 230,
    originalY: 220,
    radius: 24,
    color: "#4a3525", // Brown
    description: "GNDU Amritsar National Seminar keynote event evaluating Sufi poetry and Kabir couplets.",
  },
];

const initialEdges: Edge[] = [
  { source: "center", target: "patna", label: "Alumnus" },
  { source: "center", target: "jnu", label: "Ph.D. Scholar" },
  { source: "center", target: "ranchi", label: "HOD & Professor" },
  { source: "center", target: "cinema_studies", label: "Pioneered" },
  { source: "center", target: "folklore", label: "Researched" },
  { source: "ranchi", target: "book_chhayavad", label: "Published at RU" },
  { source: "cinema_studies", target: "book_cinema", label: "Primary Topic" },
  { source: "center", target: "book_cinema", label: "Author" },
  { source: "jnu", target: "event_amritsar", label: "Academic paper source" },
  { source: "center", target: "event_amritsar", label: "Keynote Speaker" },
];

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<Node | null>(initialNodes[0]);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [draggedNode, setDraggedNode] = useState<Node | null>(null);

  // Responsive scaling offset
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 700, height: 420 });

  useEffect(() => {
    const handleResize = () => {
      const parent = canvasRef.current?.parentElement;
      if (parent) {
        const width = parent.clientWidth;
        setCanvasDimensions({ width, height: 420 });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;

    let animationId: number;

    // Physics parameters
    const damping = 0.85;
    const springStiffness = 0.08;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw connection lines (Edges)
      initialEdges.forEach((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);

        if (sourceNode && targetNode) {
          const isHighlighted =
            (selectedNode && (selectedNode.id === sourceNode.id || selectedNode.id === targetNode.id)) ||
            (hoveredNode && (hoveredNode.id === sourceNode.id || hoveredNode.id === targetNode.id));

          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          
          if (isHighlighted) {
            ctx.strokeStyle = "rgba(184, 144, 71, 0.8)";
            ctx.lineWidth = 2.5;
            
            // Draw little moving connection dot
            const time = Date.now() * 0.003;
            const t = (Math.sin(time) + 1) / 2;
            const dotX = sourceNode.x + (targetNode.x - sourceNode.x) * t;
            const dotY = sourceNode.y + (targetNode.y - sourceNode.y) * t;
            ctx.fillStyle = "#B89047";
            ctx.beginPath();
            ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.strokeStyle = "rgba(26, 26, 26, 0.12)";
            ctx.lineWidth = 1.2;
          }
          ctx.stroke();
        }
      });

      // 2. Draw nodes and physics step
      const nextNodes = nodes.map((node) => {
        let vx = 0;
        let vy = 0;

        if (draggedNode && draggedNode.id === node.id) {
          // Keep node pinned to mouse during drag
          return node;
        }

        // Return node back to its original coordinate using springs
        const dx = node.originalX - node.x;
        const dy = node.originalY - node.y;

        vx += dx * springStiffness;
        vy += dy * springStiffness;

        // Apply velocity & decay friction
        return {
          ...node,
          x: node.x + vx * damping,
          y: node.y + vy * damping,
        };
      });

      setNodes(nextNodes);

      // Draw the circles
      nextNodes.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;

        // Glowing outer circle on active state
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(184, 144, 71, 0.15)";
          ctx.fill();
        }

        // Inner solid node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node text label
        ctx.fillStyle = node.category === "Scholar" ? "#FAF6F0" : "#ffffff";
        ctx.font = `semibold ${node.radius > 26 ? 11 : 9}px var(--font-sans), sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Handle multiline labels
        const words = node.label.split(" ");
        if (words.length > 1) {
          ctx.fillText(words[0], node.x, node.y - 6);
          ctx.fillText(words.slice(1).join(" "), node.x, node.y + 6);
        } else {
          ctx.fillText(node.label, node.x, node.y);
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [nodes, canvasDimensions, selectedNode, hoveredNode, draggedNode]);

  // Mouse Handlers for Interactivity
  const getMouseCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMouseCoords(e);
    const clicked = nodes.find(
      (n) => Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < n.radius
    );
    if (clicked) {
      setDraggedNode(clicked);
      setSelectedNode(clicked);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMouseCoords(e);

    if (draggedNode) {
      setNodes((prev) =>
        prev.map((n) => (n.id === draggedNode.id ? { ...n, x, y } : n))
      );
    } else {
      const hover = nodes.find(
        (n) => Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < n.radius
      );
      setHoveredNode(hover || null);
    }
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const handleReset = () => {
    setNodes(initialNodes.map(n => ({ ...n, x: n.originalX, y: n.originalY })));
    setSelectedNode(initialNodes[0]);
  };

  return (
    <section id="graph" className="py-24 px-6 md:px-12 bg-[#FAF6F0] relative overflow-hidden border-b border-gold/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-gold mb-2 block">
            Intellectual Legacy Network
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
            Interactive Knowledge Graph
          </h2>
          <div className="w-24 h-[1px] bg-gold/40"></div>
        </div>

        {/* Content Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Canvas Graph visualizer */}
          <div className="lg:col-span-8 bg-[#FDFBF7] p-6 border border-gold/20 rounded-sm shadow-md flex flex-col relative">
            <div className="absolute inset-2 border border-gold/5 pointer-events-none" />

            {/* Instruction tooltip banner */}
            <div className="flex justify-between items-center mb-4 z-10 font-sans text-xs text-charcoal/50 border-b border-gold/10 pb-2">
              <span className="flex items-center gap-1">
                <HelpCircle size={13} className="text-gold" />
                <span>Interact: Click to inspect, drag nodes to manipulate springs.</span>
              </span>
              <button
                onClick={handleReset}
                className="text-gold hover:text-gold-hover font-semibold uppercase tracking-widest flex items-center space-x-1 transition-colors"
              >
                <RefreshCw size={12} />
                <span>Reset Coordinates</span>
              </button>
            </div>

            {/* Interactive Canvas container */}
            <div className="relative border border-charcoal/10 rounded-sm bg-ivory overflow-hidden cursor-grab active:cursor-grabbing">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="block w-full h-[420px]"
              />
            </div>
          </div>

          {/* Node Connection description panel */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="bg-[#FDFBF7] p-6 border border-gold/25 rounded-sm shadow-md relative min-h-[220px]">
              <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
              
              {selectedNode ? (
                <div className="space-y-4">
                  <span className="inline-flex items-center space-x-1.5 font-sans text-[10px] uppercase tracking-widest text-gold font-bold">
                    <Network size={12} />
                    <span>Connection Inspected: {selectedNode.category}</span>
                  </span>

                  <h3 className="font-serif text-xl font-bold text-charcoal">
                    {selectedNode.label}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-charcoal/70 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-charcoal/40 font-serif text-xs italic py-12 space-y-2">
                  <Network size={28} className="text-gold/40" />
                  <span>Click on any node in the graph network to see details.</span>
                </div>
              )}
            </div>

            {/* Connection Key legend */}
            <div className="bg-[#FDFBF7] p-6 border border-gold/15 rounded-sm shadow-sm">
              <h4 className="font-serif text-sm font-bold text-charcoal mb-4 border-b border-gold/10 pb-2">
                Graph Categories Key
              </h4>
              <ul className="space-y-3 font-sans text-[11px] text-charcoal/70">
                <li className="flex items-center space-x-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#B89047] border border-gold" />
                  <span>Scholar Node (Dr. Arun Kumar)</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1a3a4b]" />
                  <span>Affiliated Universities (Patna, RU, JNU)</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#601a1a]" />
                  <span>Key Literary Topics & Research Fields</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#20402b]" />
                  <span>Authored Academic Publications</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#4a3525]" />
                  <span>Speaking Seminars & Book Releases</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
