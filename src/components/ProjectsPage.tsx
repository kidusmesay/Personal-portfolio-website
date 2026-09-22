import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Zap, 
  Compass, 
  Activity, 
  FileCode, 
  Terminal, 
  LineChart, 
  Sparkles, 
  Bookmark, 
  CheckCircle2, 
  BadgeAlert 
} from "lucide-react";
import { projectEntries, currentlyBuildingProject } from "../data";

interface ProjectDetailContent {
  id: string;
  title: string;
  subtitle: string;
  extendedDescription: string;
  metrics: { label: string; value: string; color: string }[];
  architecture: { step: string; desc: string }[];
  challenges: { problem: string; solution: string }[];
  codeSnippet: { filename: string; language: string; code: string };
  highlights: string[];
}

const detailedProjectsData: Record<string, ProjectDetailContent> = {
  "currently-building": {
    id: "active-aura",
    title: "Aura — Visual Layout Graph engine",
    subtitle: "High-Performance Stateful Dependency Visualizer",
    extendedDescription: "Aura is a specialized canvas-based layout graph compiler built to parse complex software module hierarchies and output zero-overhead dynamic layouts. Designed specifically for enterprise dashboard layouts, it replaces sluggish DOM nodes with optimized WebGL structures to handle tens of thousands of component states cleanly.",
    metrics: [
      { label: "Rendering Latency", value: "< 2.8ms", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
      { label: "Node Capacity", value: "50,000+", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
      { label: "Bundle Overhead", value: "14.2 KB", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30" },
      { label: "Performance Score", value: "99.8%", color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" }
    ],
    architecture: [
      { step: "Graph Compiler", desc: "Transforms raw JSON dependencies into flat adjacency matrices optimized for rendering loops." },
      { step: "Quadtree Spatial Index", desc: "Divides 2D canvas workspace mathematically into nodes for instant point-collision queries and hover triggers." },
      { step: "Animation Tick Dispatcher", desc: "Drives force-directed layout algorithms on a requestAnimationFrame tick with elastic damping formulas." }
    ],
    challenges: [
      { 
        problem: "Rendering multi-thousand nodes in legacy DOM caused frame rates to plunge, causing UI lockouts during drag gestures.", 
        solution: "Pivoted entirely to HTML5 Canvas context. Written custom pointer position matrices paired with screen-space viewport clipping so the GPU only draws nodes actively in view." 
      },
      { 
        problem: "Simultaneous physics calculations for node connections caused massive CPU main-thread bottlenecks.", 
        solution: "Offloaded heaviest geometric repulsion math to simple Web Workers, posting array buffers back only on critical update intervals." 
      }
    ],
    codeSnippet: {
      filename: "GraphRenderer.ts",
      language: "typescript",
      code: `// Quadtree boundary containment test for rapid coordinate lookup
export class Quadtree {
  bounds: { x: number; y: number; w: number; h: number };
  capacity: number = 4;
  points: { x: number; y: number; data: any }[] = [];
  subdivided: boolean = false;
  
  nw?: Quadtree; ne?: Quadtree; sw?: Quadtree; se?: Quadtree;

  contains(p: { x: number; y: number }): boolean {
    return (
      p.x >= this.bounds.x - this.bounds.w &&
      p.x <= this.bounds.x + this.bounds.w &&
      p.y >= this.bounds.y - this.bounds.h &&
      p.y <= this.bounds.y + this.bounds.h
    );
  }

  insert(point: { x: number; y: number; data: any }): boolean {
    if (!this.contains(point)) return false;
    if (this.points.length < this.capacity && !this.subdivided) {
      this.points.push(point);
      return true;
    }
    if (!this.subdivided) this.subdivide();
    return (
      this.nw!.insert(point) ||
      this.ne!.insert(point) ||
      this.sw!.insert(point) ||
      this.se!.insert(point)
    );
  }
}`
    },
    highlights: [
      "Custom viewport camera mechanics supporting fluid free-pan, infinite zoom, and smart fitting bounds.",
      "Optimized spring-tension layout model avoiding localized overlapping nodes.",
      "Lightweight declarative event listening overlay supporting drag-and-drop hierarchy alterations."
    ]
  },
  "proj-1": {
    id: "proj-1",
    title: "Scribe — Collaborative Notebook",
    subtitle: "Privacy-First Markdown Workspace & Documentation Sync",
    extendedDescription: "Scribe is a clean, developer-centric markdown platform emphasizing zero-server offline-first workflows. It combines structural sidebar notebook trees with localized search speeds, storing all dynamic entries safely inside indexedDB while providing elegant, clean compilation engines.",
    metrics: [
      { label: "Search Indexing", value: "0.4ms", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
      { label: "Storage Limit", value: "Unlimited (Local)", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
      { label: "Startup speed", value: "instant", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30" },
      { label: "Lighthouse SEO", value: "100%", color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" }
    ],
    architecture: [
      { step: "Virtual Filesystem Tree", desc: "Builds a reactive directory object parsed into sorted subfolders via high-performance tree structures." },
      { step: "Compiler Parser Pipeline", desc: "Validates string tokens on-the-fly, producing HTML representations while keeping cursors aligned." },
      { step: "Local IndexedDB Daemon", desc: "Saves structural checkpoints in the browser sandbox, recovering active notes across system restarts." }
    ],
    challenges: [
      { 
        problem: "Simultaneous parsing of huge markdown documents on every keypress key led to stuttering keystrokes.", 
        solution: "Implemented a debounced requestIdleCallback parser that scans only altered paragraph tokens rather than refreshing the whole tree." 
      },
      { 
        problem: "Representing hierarchical folders reactively in light/dark DOM required costly recursive loops.", 
        solution: "Flat-mapped the directory nodes inside indexedDB with an ID/Parent key index, executing single-pass assemblies on layout render." 
      }
    ],
    codeSnippet: {
      filename: "IndexedDBSync.ts",
      language: "typescript",
      code: `// Offline-first checkpoint saver syncing markdown state gracefully
export async function saveDocument(docId: string, markdown: string): Promise<boolean> {
  const dbRequest = window.indexedDB.open("ScribeStore", 1);
  
  return new Promise((resolve, reject) => {
    dbRequest.onsuccess = (e: any) => {
      const db = e.target.result;
      const tx = db.transaction("documents", "readwrite");
      const store = tx.objectStore("documents");
      
      const payload = {
        id: docId,
        content: markdown,
        updatedAt: Date.now()
      };
      
      const updateReq = store.put(payload);
      updateReq.onsuccess = () => resolve(true);
      updateReq.onerror = () => reject(false);
    };
  });
}`
    },
    highlights: [
      "Intuitive keyboard-only navigation supporting speed-dial command-palette prompts.",
      "Custom drag-and-drop workspace columns supporting split preview structures.",
      "Polished CSS print overlays allowing neat PDF exports."
    ]
  },
  "proj-2": {
    id: "proj-2",
    title: "Beacon — Live Telemetry Analyzer",
    subtitle: "High-Frequency System Metric Logging Engine",
    extendedDescription: "Beacon bridges the gap between complex network operations and developers. Operating as a performance parser, it tracks incoming container traces, computes system latency distributions, and maps live database query bottlenecks over lightweight vectors.",
    metrics: [
      { label: "Message Rate", value: "1.2k req/s", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
      { label: "Engine overhead", value: "0.2% CPU", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
      { label: "Visual Latency", value: "Refresh: 16ms", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30" },
      { label: "Metric Precision", value: "Sub-millisecond", color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" }
    ],
    architecture: [
      { step: "Metric Intake Server", desc: "Accepts streaming system payloads with compact schemas avoiding memory allocations." },
      { step: "Aggregation Window Engine", desc: "Maintains moving average grids of packet headers sorted into historic arrays." },
      { step: "Canvas Telemetry Vector Plotter", desc: "Draws real-time area charts and performance graphs, adjusting heights automatically on window resize." }
    ],
    challenges: [
      { 
        problem: "Incoming metrics arriving at high rates caused continuous React re-renders, crashing the page within seconds.", 
        solution: "Created an out-of-react buffer ref array. React components only query this buffer at a fixed 60Hz loop to repaint the Canvas graph directly." 
      },
      { 
        problem: "Calculating complex percentiles (p50, p90, p99) over millions of records created high garbage collection freezes.", 
        solution: "Implemented a sliding ring buffer with a fixed pre-allocated Float32Array to reuse memory addresses continuously." 
      }
    ],
    codeSnippet: {
      filename: "RingBufferMetrics.ts",
      language: "typescript",
      code: `// Garbage-free telemetry ring buffer for real-time aggregation
export class RingBuffer {
  buffer: Float32Array;
  head: number = 0;
  size: number;
  count: number = 0;

  constructor(size: number) {
    this.size = size;
    this.buffer = new Float32Array(size);
  }

  push(val: number) {
    this.buffer[this.head] = val;
    this.head = (this.head + 1) % this.size;
    if (this.count < this.size) this.count++;
  }

  getPercentile(pct: number): number {
    if (this.count === 0) return 0;
    const sorted = new Float32Array(this.buffer.subarray(0, this.count));
    sorted.sort();
    const idx = Math.floor((pct / 100) * (this.count - 1));
    return sorted[idx];
  }
}`
    },
    highlights: [
      "Custom modular system dashboards supporting fluid widget positioning structures.",
      "Custom alarm trigger thresholds with visual banner and sounds integrations.",
      "Dynamic search engine allowing query pattern matching."
    ]
  },
  "proj-3": {
    id: "proj-3",
    title: "Pulse — Core Orchestration Agent",
    subtitle: "Lightweight Container Resource Monitor & Autoscale Daemon",
    extendedDescription: "Pulse provides real-time infrastructure heartbeat checks across container pods. Connecting directly, it collects docker vital statistics, monitors runtime variables, executes system diagnostics, and launches automatic recovery triggers on anomaly detections.",
    metrics: [
      { label: "Memory Footprint", value: "3.8 MB", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
      { label: "Ping Threshold", value: "15ms", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
      { label: "Autoscale Delay", value: "< 500ms", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30" },
      { label: "Availability", value: "99.999%", color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" }
    ],
    architecture: [
      { step: "Kernel Daemon Socket", desc: "Subscribes directly to kernel system files parsing active raw statistics with minimal impact." },
      { step: "Heuristic Anomaly Engine", desc: "Watches for steep gradients indicating resource exhaustion or runaway memory leaks." },
      { step: "Graceful Command Scripting", desc: "Launches microservices, performs connection resets, or dispatches secure alerts." }
    ],
    challenges: [
      { 
        problem: "Traditional Docker socket polling led to CPU overhead under dense container topologies.", 
        solution: "Switched to listening to system filesystem updates directly, reducing read requests from thousands down to event-driven sockets." 
      },
      { 
        problem: "Ensuring zero-downtime restarts without losing log traces on heavy host crashes.", 
        solution: "Designed a secure file-append buffer system storing status caches right below standard host memory spaces." 
      }
    ],
    codeSnippet: {
      filename: "ContainerDaemon.ts",
      language: "typescript",
      code: `// Lightweight docker telemetry parse loop
import { spawn } from "child_process";

export function streamContainerStats(onStats: (cpu: number, ram: number) => void) {
  const daemon = spawn("docker", ["stats", "--no-stream", "--format", "{{.CPUPerc}},{{.MemUsage}}"]);
  
  daemon.stdout.on("data", (data) => {
    const raw = data.toString().trim();
    const parts = raw.split(",");
    if (parts.length >= 2) {
      const cpu = parseFloat(parts[0].replace("%", ""));
      const ramStr = parts[1].split("/")[0].trim();
      const ram = parseFloat(ramStr.replace("MiB", "").replace("GiB", "000"));
      onStats(cpu, ram);
    }
  });
}`
    },
    highlights: [
      "Fully structured logging parser supporting detailed system timeline trace exports.",
      "Resource allocation throttling prevent runaway container cascades.",
      "Slick, clean terminal interface visual rendering engine."
    ]
  }
};

interface ProjectsPageProps {
  onBack: () => void;
  isDark: boolean;
}

export default function ProjectsPage({ onBack, isDark }: ProjectsPageProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  // Safe selected details lookup
  const selectedDetails = selectedProjectId ? detailedProjectsData[selectedProjectId] : null;

  return (
    <div id="projects-page-container" className="pt-2">
      <AnimatePresence mode="wait">
        {!selectedProjectId ? (
          /* PROJECTS INDEX PAGE */
          <motion.div
            key="index"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-8"
          >
            {/* Header toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
              <div>
                <button
                  onClick={onBack}
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mb-2 group cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  Back to Profile
                </button>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Projects & Case Studies
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Explore full system blueprints, technical challenges, and structural solutions.
                </p>
              </div>

              {/* Quick statistics tag */}
              <div className="flex items-center gap-2 neu-pressed-sm px-4 py-2.5 rounded-2xl self-start sm:self-center">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300">
                  Active Daemons: 3 Online
                </span>
              </div>
            </div>

            {/* PROJECTS DIRECTORY GRID */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* 1. Aura — The Active WIP (Featured) */}
              <motion.div
                id="feat-project-aura"
                variants={itemVariants}
                className="col-span-1 md:col-span-2 neu-flat rounded-3xl p-6 sm:p-7 flex flex-col justify-between group overflow-hidden relative"
              >
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider font-bold neu-pressed-sm text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
                      <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Active Build (70%)
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 neu-pressed-sm px-2.5 py-0.5 rounded-lg">
                      WebGL & CanvasAPI
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    {currentlyBuildingProject.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mb-4">
                    {currentlyBuildingProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentlyBuildingProject.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg neu-pressed-sm text-slate-600 dark:text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mt-auto pt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-grow max-w-sm">
                    <div className="flex justify-between text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1.5">
                      <span>Graph layout optimization</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{currentlyBuildingProject.progress}%</span>
                    </div>
                    <div className="h-2 neu-pressed-sm rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${currentlyBuildingProject.progress}%` }} />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedProjectId("currently-building")}
                    className="self-end sm:self-center px-4 py-2.5 neu-btn text-blue-600 dark:text-blue-400 text-xs font-mono font-bold rounded-xl cursor-pointer"
                  >
                    View System Case Study
                  </button>
                </div>
              </motion.div>

              {/* Map of Completed Projects */}
              {projectEntries.map((project) => {
                return (
                  <motion.div
                    key={project.id}
                    id={`projects-grid-${project.id}`}
                    variants={itemVariants}
                    className="neu-flat rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 neu-pressed-sm px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                          {project.tags[0]}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                          Complete & Stable
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                            #{tag.toLowerCase().replace(" ", "")}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between gap-3">
                      <div className="flex gap-2">
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 neu-btn rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                          title="View Source"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 neu-btn rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                          title="Live Playground"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <button
                        onClick={() => setSelectedProjectId(project.id)}
                        className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Deep Architecture Study
                        <ArrowLeft className="w-3 h-3 rotate-180" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        ) : (
          /* DETAILED PROJECT CASE STUDY VIEW */
          <motion.div
            key="details"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col gap-6"
          >
            {/* Header Action Row */}
            <div className="flex justify-between items-center pb-4">
              <button
                onClick={() => setSelectedProjectId(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Projects
              </button>
              
              <div className="flex items-center gap-3">
                <a
                  href={selectedProjectId === "currently-building" ? "https://github.com" : projectEntries.find(p => p.id === selectedProjectId)?.sourceUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-btn px-3 py-2 rounded-xl text-xs font-mono font-bold text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5 transition-all"
                >
                  <Github className="w-4 h-4" />
                  Codebase
                </a>
                <a
                  href={selectedProjectId === "currently-building" ? "https://demo.example.com" : projectEntries.find(p => p.id === selectedProjectId)?.liveUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-btn px-4 py-2 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold rounded-xl inline-flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Platform
                </a>
              </div>
            </div>

            {/* Title / Hero Summary */}
            <div className="p-6 sm:p-8 rounded-3xl neu-flat">
              <div className="flex items-center gap-2 mb-3">
                {selectedProjectId === "currently-building" ? (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 neu-pressed-sm text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-mono font-bold">
                    <BadgeAlert className="w-3 h-3" /> Active Construction
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 neu-pressed-sm text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-mono font-bold">
                    <CheckCircle2 className="w-3 h-3" /> Verified Core Stable
                  </span>
                )}
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Engineering Case Study
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight mb-2">
                {selectedDetails?.title}
              </h1>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4 font-mono">
                {selectedDetails?.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                {selectedDetails?.extendedDescription}
              </p>
            </div>

            {/* Performance metric blocks */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                <LineChart className="w-3.5 h-3.5 text-blue-600" />
                System Metric Benchmarks
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {selectedDetails?.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl neu-flat">
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider font-mono">
                      {m.label}
                    </span>
                    <span className="inline-block px-2.5 py-1 text-sm font-bold font-mono neu-pressed-sm rounded-lg text-blue-600 dark:text-blue-400">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Split layout (Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Architecture Blueprint & Challenges */}
              <div className="md:col-span-7 flex flex-col gap-6">
                
                {/* 1. Architecture Flowchart */}
                <div className="p-6 rounded-3xl neu-flat">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    System Architecture Blueprint
                  </h3>

                  <div className="flex flex-col gap-3 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                    {selectedDetails?.architecture.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start relative z-10">
                        <div className="shrink-0 w-10 h-10 rounded-xl neu-pressed-sm flex items-center justify-center font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">
                          {idx + 1}
                        </div>
                        <div className="pt-0.5">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                            {step.step}
                          </h4>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Tactical Dilemmas & Solutions */}
                <div className="p-6 rounded-3xl neu-flat">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    Solved Engineering Hurdles
                  </h3>

                  <div className="flex flex-col gap-5">
                    {selectedDetails?.challenges.map((c, idx) => (
                      <div key={idx} className="flex gap-3 items-start border-l-2 border-slate-300 dark:border-slate-700 pl-4 py-0.5">
                        <div className="flex flex-col gap-2.5">
                          <div>
                            <span className="text-[10px] font-bold font-mono text-red-500 neu-pressed-sm px-2.5 py-0.5 rounded-lg uppercase tracking-widest">
                              Bottleneck
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1.5 leading-normal">
                              {c.problem}
                            </h4>
                          </div>

                          <div className="neu-pressed-sm p-3.5 rounded-xl">
                            <span className="text-[10px] font-bold font-mono text-emerald-600 dark:text-emerald-400 neu-pressed-sm px-2.5 py-0.5 rounded-lg uppercase tracking-widest">
                              Resolution
                            </span>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                              {c.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Highlights list */}
              <div className="md:col-span-5 flex flex-col gap-6">
                {/* Highlight Bullets */}
                <div className="p-6 rounded-3xl neu-flat">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                    Structural Highlights
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {selectedDetails?.highlights.map((bullet, idx) => (
                      <li key={idx} className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed flex gap-2 items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Back action foot bar */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setSelectedProjectId(null)}
                className="px-6 py-2.5 neu-btn text-slate-700 dark:text-slate-300 rounded-xl text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Projects Directory
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
