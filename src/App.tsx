import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  GraduationCap,
  Layers,
  FolderGit2,
  Copy,
  Check,
  Send,
  Download,
  Menu,
  X,
  ArrowUpRight,
  FileText,
  Clock,
  Sparkles,
  Search,
  BookOpen,
  Eye,
  CheckCircle2,
  ArrowRight,
  ArrowUp
} from 'lucide-react';

// Project type definition
interface Project {
  id: string;
  title: string;
  category: 'Full Stack' | 'Systems & Algorithms' | 'Web Tools';
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  metrics: string;
  githubUrl: string;
  liveUrl?: string;
  codeSnippet?: string;
}

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Contact form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const emailAddress = "paragpareta@gmail.com";
  const githubAddress = "https://github.com/paragpareta";
  const linkedinAddress = "https://linkedin.com/in/paragpareta";

  // Track active scroll section and scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 380);
      const sections = ['home', 'about', 'education', 'skills', 'learning', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      // Create mailto link as fallback option
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
        formState.subject || `Message from ${formState.name}`
      )}&body=${encodeURIComponent(
        `From: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`
      )}`;
      // Open mail client or save message
      window.location.href = mailtoUrl;
    }, 800);
  };

  const projects: Project[] = [
    {
      id: 'algo-visualizer',
      title: 'AlgoVisualizer',
      category: 'Systems & Algorithms',
      description: 'Interactive visualization engine for sorting and graph pathfinding algorithms with real-time state control.',
      longDescription: 'A high-performance algorithmic visualizer built to demystify complex computer science concepts. It features step-by-step playback, customizable array generation, velocity throttles, and visual comparison between QuickSort, MergeSort, Dijkstra, and A* search.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5 Canvas', 'Web Workers'],
      features: [
        'Real-time visualization of 6 sorting algorithms & 3 pathfinding algorithms',
        'Custom dataset generator with random, sorted, and reversed distributions',
        'Time & space complexity HUD with active loop counter',
        'Frame-by-frame pause, rewind, and speed acceleration controls'
      ],
      metrics: '60 FPS canvas rendering · Sub-10ms state transitions',
      githubUrl: 'https://github.com/paragpareta/algo-visualizer',
      liveUrl: 'https://algo-visualizer-demo.vercel.app',
      codeSnippet: `// Pathfinding Dijkstra loop step
function stepDijkstra(grid, unvisitedNodes) {
  sortNodesByDistance(unvisitedNodes);
  const closestNode = unvisitedNodes.shift();
  if (closestNode.isWall) return;
  closestNode.isVisited = true;
  updateUnvisitedNeighbors(closestNode, grid);
}`
    },
    {
      id: 'clouddesk',
      title: 'CloudDesk Productivity Hub',
      category: 'Full Stack',
      description: 'Personal developer workspace organizer with drag-and-drop Kanban, markdown notes, and local-first offline sync.',
      longDescription: 'A modern productivity platform engineered for developers. Integrates agile sprint tracking, distraction-free markdown documentation, task prioritization matrices, and local storage fallback with cloud backup syncing.',
      techStack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'SQLite', 'REST API'],
      features: [
        'Dynamic Kanban board with drag-and-drop column reordering',
        'Markdown note editor with syntax highlighting & auto-save',
        'Pomodoro focus timer with session analytics',
        'Offline-first synchronization using IndexedDB and Express backend'
      ],
      metrics: '99.8% offline availability · <100ms API response',
      githubUrl: 'https://github.com/paragpareta/clouddesk-workspace',
      liveUrl: 'https://clouddesk-preview.vercel.app',
      codeSnippet: `// REST endpoint for syncing sprint items
app.post('/api/tasks/sync', async (req, res) => {
  const { batch, lastModified } = req.body;
  const synchronized = await db.syncBatch(batch, lastModified);
  res.json({ status: 'ok', updated: synchronized.length });
});`
    },
    {
      id: 'devconnect',
      title: 'DevConnect Social Network',
      category: 'Full Stack',
      description: 'Community platform for developers to share verified code snippets, collaborate, and exchange peer code reviews.',
      longDescription: 'A developer-first social network allowing engineers to publish syntax-highlighted code snippets, solicit structured peer feedback, bookmark solutions by tech stack, and build their programming portfolio profile.',
      techStack: ['Python', 'Flask', 'SQLite', 'JavaScript', 'Tailwind CSS'],
      features: [
        'Multi-language syntax highlighting with PrismJS engine',
        'Threaded peer review comments with inline code annotations',
        'Tag-based discovery filtering across 20+ programming languages',
        'Session-based authentication and user profile management'
      ],
      metrics: 'Over 20+ supported languages · Instant search index',
      githubUrl: 'https://github.com/paragpareta/devconnect-platform',
      liveUrl: 'https://devconnect-demo.vercel.app',
      codeSnippet: `@app.route('/api/snippets', methods=['POST'])
def create_snippet():
    data = request.get_json()
    snippet = Snippet(title=data['title'], code=data['code'], lang=data['lang'])
    db.session.add(snippet)
    db.session.commit()
    return jsonify(snippet.serialize()), 201`
    },
    {
      id: 'quickdoc',
      title: 'QuickDoc Markdown Studio',
      category: 'Web Tools',
      description: 'Minimalist browser-based markdown editor with instant dual-pane preview, statistics, and clean PDF export.',
      longDescription: 'A lightweight, zero-dependency browser markdown studio tailored for technical writers and students. Offers immediate real-time rendering, word and reading-time metrics, GitHub-flavored markdown styling, and seamless export.',
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Web APIs'],
      features: [
        'Synchronized split-pane scrolling between editor and preview',
        'GitHub-flavored markdown support (tables, task lists, code blocks)',
        'One-click export to standalone HTML and formatted print PDF',
        'Zero remote trackers; 100% client-side privacy preservation'
      ],
      metrics: '< 15KB bundle footprint · Instant initial load',
      githubUrl: 'https://github.com/paragpareta/quickdoc-editor',
      liveUrl: 'https://quickdoc-preview.vercel.app',
      codeSnippet: `// Instant live markdown renderer with debounce
function renderMarkdown(rawText) {
  const parsedHTML = marked.parse(rawText, { gfm: true, breaks: true });
  previewContainer.innerHTML = DOMPurify.sanitize(parsedHTML);
  updateWordMetrics(rawText);
}`
    }
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const skillsData = [
    {
      category: 'Programming Languages',
      icon: Terminal,
      skills: ['C++', 'Python', 'JavaScript (ES6+)', 'TypeScript', 'SQL', 'HTML5 / CSS3']
    },
    {
      category: 'Web & Frameworks',
      icon: Code2,
      skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'RESTful APIs']
    },
    {
      category: 'Developer Tools',
      icon: Cpu,
      skills: ['Git & GitHub', 'VS Code', 'Linux / Bash', 'Docker', 'Postman', 'Vite']
    },
    {
      category: 'Core Computer Science',
      icon: Layers,
      skills: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'Database Management (DBMS)', 'Operating Systems', 'Computer Networks']
    }
  ];

  // Standalone HTML template for export
  const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Parag Pareta | Aspiring Software Engineer & CS Student</title>
  <meta name="description" content="Portfolio of Parag Pareta, Computer Science Student and Aspiring Software Engineer.">
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons via CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    code, pre { font-family: 'JetBrains Mono', monospace; }
    .scroll-reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .scroll-reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    .delay-75 { transition-delay: 75ms; }
    .delay-100 { transition-delay: 100ms; }
    .delay-150 { transition-delay: 150ms; }
    .delay-200 { transition-delay: 200ms; }
    .delay-250 { transition-delay: 250ms; }
  </style>
</head>
<body class="bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">

  <!-- Fixed Top Scroll Progress Bar -->
  <div id="scroll-progress-bar" class="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 z-50 transition-all duration-75 origin-left" style="width: 0%"></div>

  <!-- Sticky Top Navigation -->
  <header class="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/85 border-b border-zinc-800/80">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#home" class="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors">
        parag pareta<span class="text-indigo-500">.</span>
      </a>
      <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
        <a href="#about" class="hover:text-white transition-colors">About</a>
        <a href="#education" class="hover:text-white transition-colors">Education</a>
        <a href="#skills" class="hover:text-white transition-colors">Skills</a>
        <a href="#learning" class="hover:text-white transition-colors">Learning</a>
        <a href="#projects" class="hover:text-white transition-colors">Projects</a>
        <a href="#contact" class="hover:text-white transition-colors">Contact</a>
      </nav>
      <div class="flex items-center gap-3">
        <a href="#contact" class="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm">
          Get in Touch
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="home" class="scroll-reveal py-24 md:py-32 px-6 max-w-6xl mx-auto border-b border-zinc-800/60">
    <div class="max-w-3xl">
      <div class="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-indigo-400 bg-indigo-950/40 border border-indigo-800/60 rounded-full mb-6">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Available for internships & collaborations
      </div>
      <h1 class="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
        Hi, I'm Parag Pareta
      </h1>
      <p class="text-xl sm:text-2xl font-semibold text-zinc-300 mb-4">
        Computer Science Student & Aspiring Software Engineer
      </p>
      <p class="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8 max-w-2xl">
        Passionate about crafting scalable full-stack applications, distributed algorithms, and exploring modern web and AI technologies. Focused on turning complex challenges into clean, resilient code.
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <a href="#projects" class="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20">
          View Projects
        </a>
        <a href="#contact" class="px-6 py-3 text-sm font-semibold text-zinc-300 bg-zinc-900 border border-zinc-700/80 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors">
          Contact Me
        </a>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="scroll-reveal py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60">
    <h2 class="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Background</h2>
    <h3 class="text-2xl sm:text-3xl font-bold text-white mb-6">About Me</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-zinc-300 leading-relaxed text-sm sm:text-base">
      <div class="space-y-4">
        <p>
          I am a dedicated Computer Science undergraduate with a deep curiosity for how software systems operate under the hood. From low-level memory efficiency in C++ to building responsive modern web applications in React and TypeScript, I enjoy the full spectrum of software creation.
        </p>
        <p>
          My focus revolves around writing readable, maintainable, and mathematically sound code. Whether analyzing asymptotic complexities in algorithmic puzzles or engineering reliable client-server workflows, I treat software engineering as both a craft and a discipline.
        </p>
      </div>
      <div class="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h4 class="text-base font-semibold text-white">Engineering Values</h4>
        <ul class="space-y-3 text-sm text-zinc-400">
          <li class="flex items-start gap-2">
            <span class="text-indigo-400 font-bold">01.</span>
            <span><strong class="text-zinc-200">First-Principles Problem Solving:</strong> Breaking down requirements into core algorithmic primitives before writing code.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-indigo-400 font-bold">02.</span>
            <span><strong class="text-zinc-200">Clean Architecture:</strong> Modularity, readable variable naming, and strict type safety over clever hacks.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-indigo-400 font-bold">03.</span>
            <span><strong class="text-zinc-200">Continuous Growth:</strong> Actively solving Data Structures & Algorithms challenges and learning modern toolsets.</span>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Education Section -->
  <section id="education" class="scroll-reveal py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60">
    <h2 class="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Academic Journey</h2>
    <h3 class="text-2xl sm:text-3xl font-bold text-white mb-8">Education</h3>
    <div class="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6 sm:p-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h4 class="text-xl font-bold text-white">Bachelor of Technology (B.Tech)</h4>
          <p class="text-indigo-400 font-medium text-sm">Computer Science & Engineering</p>
        </div>
        <span class="text-xs font-mono text-zinc-400 px-3 py-1 bg-zinc-800/80 border border-zinc-700/60 rounded-md self-start sm:self-auto">
          Expected Graduation: 2031
        </span>
      </div>
      <p class="text-sm text-zinc-400 leading-relaxed mb-6">
        Undergraduate education covering core computer science principles, computational complexity, modern software design, and scalable systems development.
      </p>
      <div>
        <h5 class="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">Key Coursework</h5>
        <div class="flex flex-wrap gap-2 text-xs text-zinc-300">
          <span class="px-3 py-1 bg-zinc-800 border border-zinc-700/60 rounded-md">Data Structures & Algorithms</span>
          <span class="px-3 py-1 bg-zinc-800 border border-zinc-700/60 rounded-md">Object-Oriented Programming (OOP)</span>
          <span class="px-3 py-1 bg-zinc-800 border border-zinc-700/60 rounded-md">Database Management Systems (DBMS)</span>
          <span class="px-3 py-1 bg-zinc-800 border border-zinc-700/60 rounded-md">Operating Systems</span>
          <span class="px-3 py-1 bg-zinc-800 border border-zinc-700/60 rounded-md">Computer Networks</span>
          <span class="px-3 py-1 bg-zinc-800 border border-zinc-700/60 rounded-md">Software Engineering Principles</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Technical Skills Section -->
  <section id="skills" class="scroll-reveal py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60">
    <h2 class="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Capabilities</h2>
    <h3 class="text-2xl sm:text-3xl font-bold text-white mb-8">Technical Skills</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Languages -->
      <div class="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl">
        <h4 class="text-base font-semibold text-white mb-4">Programming Languages</h4>
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">C++</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Python</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">JavaScript (ES6+)</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">TypeScript</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">SQL</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">HTML5 / CSS3</span>
        </div>
      </div>
      <!-- Web / Frameworks -->
      <div class="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl">
        <h4 class="text-base font-semibold text-white mb-4">Web & Frameworks</h4>
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">React.js</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Next.js</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Node.js</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Express.js</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Tailwind CSS</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">REST APIs</span>
        </div>
      </div>
      <!-- Tools -->
      <div class="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl">
        <h4 class="text-base font-semibold text-white mb-4">Developer Tools</h4>
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Git & GitHub</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">VS Code</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Linux / Bash</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Docker</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Postman</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Vite</span>
        </div>
      </div>
      <!-- Core Concepts -->
      <div class="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl">
        <h4 class="text-base font-semibold text-white mb-4">Core Concepts</h4>
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Data Structures & Algorithms</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Object-Oriented Programming (OOP)</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">DBMS & Relational Modeling</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Operating Systems Basics</span>
          <span class="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700/70 rounded-lg">Computer Networks</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Currently Learning Section -->
  <section id="learning" class="scroll-reveal py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60">
    <div class="mb-10">
      <h2 class="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Growth & Exploration</h2>
      <h3 class="text-2xl sm:text-3xl font-bold text-white mb-3">Currently Learning</h3>
      <p class="text-sm text-zinc-400 max-w-2xl leading-relaxed">
        Engineering is an evolving discipline. Here are the core architectures and systems technologies I am actively studying and prototyping with to expand my algorithmic and engineering depth.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Item 1: Distributed Systems -->
      <div class="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6 sm:p-7 hover:border-zinc-700 transition-colors flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-zinc-400 mb-3">
            <span class="inline-flex items-center gap-1.5 text-indigo-400 font-medium">
              <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              Active Deep Dive
            </span>
            <span class="font-mono text-zinc-500">Go · gRPC · Raft</span>
          </div>
          <h4 class="text-xl font-bold text-white mb-3">Distributed Systems & Consensus</h4>
          <p class="text-sm text-zinc-300 leading-relaxed mb-4">
            Studying how planetary-scale systems maintain fault tolerance, linearizability, and state replication across unreliable networks. Focus areas include the Raft consensus protocol, log replication, partition tolerance (CAP theorem), and low-latency binary serialization using gRPC and Protocol Buffers.
          </p>
          <div class="bg-zinc-950/60 border border-zinc-800/70 rounded-lg p-3.5 mb-5 text-xs text-zinc-400 leading-relaxed">
            <strong class="text-zinc-200 block mb-1">Relevance to my aspirations:</strong>
            As an aspiring software engineer focused on building resilient backend services, mastering distributed coordination and partition tolerance (CAP theorem) is foundational for designing systems that reliably survive node and network failures.
          </div>
        </div>
        <div class="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/60 text-xs text-zinc-400">
          <span class="px-2.5 py-1 bg-zinc-800/70 border border-zinc-700/60 rounded">Raft Protocol</span>
          <span class="px-2.5 py-1 bg-zinc-800/70 border border-zinc-700/60 rounded">gRPC & Protobuf</span>
          <span class="px-2.5 py-1 bg-zinc-800/70 border border-zinc-700/60 rounded">CAP Theorem</span>
        </div>
      </div>

      <!-- Item 2: Rust & WebAssembly -->
      <div class="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6 sm:p-7 hover:border-zinc-700 transition-colors flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-zinc-400 mb-3">
            <span class="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Hands-on Exploration
            </span>
            <span class="font-mono text-zinc-500">Rust · Wasm · Memory Safety</span>
          </div>
          <h4 class="text-xl font-bold text-white mb-3">Rust & WebAssembly (Wasm)</h4>
          <p class="text-sm text-zinc-300 leading-relaxed mb-4">
            Exploring compile-time memory safety, affine type systems, and borrow semantics to achieve bare-metal computational efficiency without a garbage collector. Compiling compute-heavy data structures and graph algorithms into WebAssembly modules for instant, sandboxed browser execution.
          </p>
          <div class="bg-zinc-950/60 border border-zinc-800/70 rounded-lg p-3.5 mb-5 text-xs text-zinc-400 leading-relaxed">
            <strong class="text-zinc-200 block mb-1">Relevance to my aspirations:</strong>
            Rust combines the low-level mechanical sympathy of C++ with modern memory guarantees. Integrating WebAssembly into full-stack web applications unlocks high-performance algorithms directly in client viewports.
          </div>
        </div>
        <div class="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/60 text-xs text-zinc-400">
          <span class="px-2.5 py-1 bg-zinc-800/70 border border-zinc-700/60 rounded">Borrow Checker</span>
          <span class="px-2.5 py-1 bg-zinc-800/70 border border-zinc-700/60 rounded">Wasm Compilation</span>
          <span class="px-2.5 py-1 bg-zinc-800/70 border border-zinc-700/60 rounded">Zero-Cost Abstractions</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="scroll-reveal py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <h2 class="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Featured Work</h2>
        <h3 class="text-2xl sm:text-3xl font-bold text-white">Projects</h3>
      </div>
      <p class="text-xs text-zinc-400">Selected personal & academic software projects</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Project 1 -->
      <div class="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
        <div>
          <div class="flex items-center justify-between text-xs text-zinc-400 mb-3">
            <span>Systems & Algorithms</span>
            <span class="text-indigo-400 font-mono">React · TypeScript</span>
          </div>
          <h4 class="text-xl font-bold text-white mb-2">AlgoVisualizer</h4>
          <p class="text-sm text-zinc-400 leading-relaxed mb-4">
            Interactive sorting and pathfinding visualizer with real-time speed adjustments, custom array distributions, and step-by-step state playback.
          </p>
        </div>
        <div>
          <div class="flex flex-wrap gap-1.5 mb-5 text-xs text-zinc-300">
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">React</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">TypeScript</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">Tailwind CSS</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">Canvas API</span>
          </div>
          <div class="flex items-center gap-3 pt-3 border-t border-zinc-800/60">
            <a href="https://github.com/paragpareta" target="_blank" rel="noopener noreferrer" class="text-xs font-medium text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors">
              <i data-lucide="github" class="w-3.5 h-3.5"></i> Source Code
            </a>
          </div>
        </div>
      </div>

      <!-- Project 2 -->
      <div class="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
        <div>
          <div class="flex items-center justify-between text-xs text-zinc-400 mb-3">
            <span>Full Stack</span>
            <span class="text-indigo-400 font-mono">React · Node.js</span>
          </div>
          <h4 class="text-xl font-bold text-white mb-2">CloudDesk Productivity Hub</h4>
          <p class="text-sm text-zinc-400 leading-relaxed mb-4">
            Full-stack workspace organizer featuring Kanban boards, markdown notes, deadline tracking, and local-first data caching.
          </p>
        </div>
        <div>
          <div class="flex flex-wrap gap-1.5 mb-5 text-xs text-zinc-300">
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">React</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">Node.js</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">Express</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">SQLite</span>
          </div>
          <div class="flex items-center gap-3 pt-3 border-t border-zinc-800/60">
            <a href="https://github.com/paragpareta" target="_blank" rel="noopener noreferrer" class="text-xs font-medium text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors">
              <i data-lucide="github" class="w-3.5 h-3.5"></i> Source Code
            </a>
          </div>
        </div>
      </div>

      <!-- Project 3 -->
      <div class="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
        <div>
          <div class="flex items-center justify-between text-xs text-zinc-400 mb-3">
            <span>Full Stack</span>
            <span class="text-indigo-400 font-mono">Python · Flask</span>
          </div>
          <h4 class="text-xl font-bold text-white mb-2">DevConnect</h4>
          <p class="text-sm text-zinc-400 leading-relaxed mb-4">
            Developer platform for sharing syntax-highlighted code snippets, peer reviews, and interactive programming discussions.
          </p>
        </div>
        <div>
          <div class="flex flex-wrap gap-1.5 mb-5 text-xs text-zinc-300">
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">Python</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">Flask</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">SQLite</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">JavaScript</span>
          </div>
          <div class="flex items-center gap-3 pt-3 border-t border-zinc-800/60">
            <a href="https://github.com/paragpareta" target="_blank" rel="noopener noreferrer" class="text-xs font-medium text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors">
              <i data-lucide="github" class="w-3.5 h-3.5"></i> Source Code
            </a>
          </div>
        </div>
      </div>

      <!-- Project 4 -->
      <div class="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
        <div>
          <div class="flex items-center justify-between text-xs text-zinc-400 mb-3">
            <span>Web Tools</span>
            <span class="text-indigo-400 font-mono">JavaScript · Web APIs</span>
          </div>
          <h4 class="text-xl font-bold text-white mb-2">QuickDoc Editor</h4>
          <p class="text-sm text-zinc-400 leading-relaxed mb-4">
            Fast, browser-based markdown editor with synchronized dual-pane preview, statistics counter, and PDF/HTML export.
          </p>
        </div>
        <div>
          <div class="flex flex-wrap gap-1.5 mb-5 text-xs text-zinc-300">
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">JavaScript</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">HTML5</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">Tailwind CSS</span>
            <span class="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/50">Web APIs</span>
          </div>
          <div class="flex items-center gap-3 pt-3 border-t border-zinc-800/60">
            <a href="https://github.com/paragpareta" target="_blank" rel="noopener noreferrer" class="text-xs font-medium text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors">
              <i data-lucide="github" class="w-3.5 h-3.5"></i> Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-20 px-6 max-w-6xl mx-auto">
    <h2 class="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Get In Touch</h2>
    <h3 class="text-2xl sm:text-3xl font-bold text-white mb-8">Contact</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- Contact Info -->
      <div class="space-y-6">
        <p class="text-zinc-300 leading-relaxed text-sm sm:text-base">
          I am actively seeking internship opportunities, collaborative open-source projects, and engineering conversations. Feel free to reach out directly via email or connect through my profiles.
        </p>

        <div class="space-y-3">
          <!-- Email link -->
          <a href="mailto:paragpareta@gmail.com" class="flex items-center gap-3 p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors group">
            <i data-lucide="mail" class="w-5 h-5 text-indigo-400"></i>
            <div>
              <p class="text-xs text-zinc-400">Email Address</p>
              <p class="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">paragpareta@gmail.com</p>
            </div>
          </a>

          <!-- GitHub link -->
          <a href="https://github.com/paragpareta" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors group">
            <i data-lucide="github" class="w-5 h-5 text-indigo-400"></i>
            <div>
              <p class="text-xs text-zinc-400">GitHub Profile</p>
              <p class="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">github.com/paragpareta</p>
            </div>
          </a>

          <!-- LinkedIn link -->
          <a href="https://linkedin.com/in/paragpareta" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors group">
            <i data-lucide="linkedin" class="w-5 h-5 text-indigo-400"></i>
            <div>
              <p class="text-xs text-zinc-400">LinkedIn Profile</p>
              <p class="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">linkedin.com/in/paragpareta</p>
            </div>
          </a>
        </div>
      </div>

      <!-- Message Form UI -->
      <div class="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8">
        <h4 class="text-lg font-bold text-white mb-4">Send a Message</h4>
        <form onsubmit="event.preventDefault(); window.location.href='mailto:paragpareta@gmail.com?subject=' + encodeURIComponent(document.getElementById('form-subject').value || 'Hello Parag') + '&body=' + encodeURIComponent('From: ' + document.getElementById('form-name').value + ' (' + document.getElementById('form-email').value + ')\\n\\n' + document.getElementById('form-msg').value);" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-zinc-400 mb-1.5" for="form-name">Your Name</label>
            <input required id="form-name" type="text" placeholder="John Doe" class="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-medium text-zinc-400 mb-1.5" for="form-email">Your Email</label>
            <input required id="form-email" type="email" placeholder="john@example.com" class="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-medium text-zinc-400 mb-1.5" for="form-subject">Subject</label>
            <input id="form-subject" type="text" placeholder="Internship opportunity / Collaboration" class="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-medium text-zinc-400 mb-1.5" for="form-msg">Message</label>
            <textarea required id="form-msg" rows="4" placeholder="Hi Parag, let's connect regarding..." class="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none"></textarea>
          </div>
          <button type="submit" class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2">
            <span>Send via Email Client</span>
            <i data-lucide="send" class="w-4 h-4"></i>
          </button>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-8 px-6 border-t border-zinc-800/60 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
    <p>© 2026 Parag Pareta. All rights reserved.</p>
    <p>Designed with dark mode aesthetics & Tailwind CSS.</p>
  </footer>

  <!-- Floating Scroll To Top Button -->
  <button id="scroll-to-top-btn" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })" class="fixed bottom-6 right-6 z-40 p-3 bg-zinc-900/90 border border-zinc-700/80 rounded-full text-indigo-400 hover:text-white hover:bg-zinc-800 shadow-2xl backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300 group" aria-label="Scroll to top">
    <i data-lucide="arrow-up" class="w-4 h-4 group-hover:-translate-y-0.5 transition-transform"></i>
  </button>

  <script>
    // Initialize Lucide icons
    lucide.createIcons();

    // Scroll progress bar and scroll to top button
    const topBtn = document.getElementById('scroll-to-top-btn');
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      const bar = document.getElementById('scroll-progress-bar');
      if (bar) bar.style.width = scrolled + '%';

      if (topBtn) {
        if (winScroll > 380) {
          topBtn.classList.remove('opacity-0', 'pointer-events-none');
          topBtn.classList.add('opacity-100', 'pointer-events-auto');
        } else {
          topBtn.classList.remove('opacity-100', 'pointer-events-auto');
          topBtn.classList.add('opacity-0', 'pointer-events-none');
        }
      }
    }, { passive: true });

    // IntersectionObserver for scroll animations
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
  </script>
</body>
</html>`;

  const [copiedCodeToast, setCopiedCodeToast] = useState(false);

  // Scroll progress animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  const handleDownloadStandaloneHtml = () => {
    const blob = new Blob([standaloneHtmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(standaloneHtmlCode);
    setCopiedCodeToast(true);
    setTimeout(() => setCopiedCodeToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col">
      {/* Sticky Top Bar Contract: 3 zones */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80 relative">
        {/* Animated Scroll Progress Bar */}
        <motion.div
          style={{ scaleX }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 origin-left z-50 pointer-events-none"
        />
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single Brand Wordmark */}
          <a
            href="#home"
            className="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors flex items-center gap-2"
          >
            <span className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-xs font-mono text-indigo-400 font-bold">
              PP
            </span>
            <span>parag pareta</span>
            <span className="text-indigo-500">.</span>
          </a>

          {/* Zone 2: Clean Navigation Links (no pills, subtle hover states) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
            <a
              href="#about"
              className={`hover:text-white transition-colors ${
                activeNav === 'about' ? 'text-indigo-400' : ''
              }`}
            >
              About
            </a>
            <a
              href="#education"
              className={`hover:text-white transition-colors ${
                activeNav === 'education' ? 'text-indigo-400' : ''
              }`}
            >
              Education
            </a>
            <a
              href="#skills"
              className={`hover:text-white transition-colors ${
                activeNav === 'skills' ? 'text-indigo-400' : ''
              }`}
            >
              Skills
            </a>
            <a
              href="#learning"
              className={`hover:text-white transition-colors ${
                activeNav === 'learning' ? 'text-indigo-400' : ''
              }`}
            >
              Learning
            </a>
            <a
              href="#projects"
              className={`hover:text-white transition-colors ${
                activeNav === 'projects' ? 'text-indigo-400' : ''
              }`}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={`hover:text-white transition-colors ${
                activeNav === 'contact' ? 'text-indigo-400' : ''
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-700/80 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-800/60 rounded-lg hover:bg-emerald-900/40 transition-colors"
              title="Download or copy the requested self-contained single HTML file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export index.html</span>
              <span className="sm:hidden">Export</span>
            </button>

            <a
              href="#contact"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm"
            >
              Hire Me
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-zinc-950/95 border-b border-zinc-800 px-6 py-4 space-y-3">
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-300 hover:text-indigo-400 py-1"
            >
              About
            </a>
            <a
              href="#education"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-300 hover:text-indigo-400 py-1"
            >
              Education
            </a>
            <a
              href="#skills"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-300 hover:text-indigo-400 py-1"
            >
              Skills
            </a>
            <a
              href="#learning"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-300 hover:text-indigo-400 py-1"
            >
              Currently Learning
            </a>
            <a
              href="#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-300 hover:text-indigo-400 py-1"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-300 hover:text-indigo-400 py-1"
            >
              Contact
            </a>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsResumeModalOpen(true);
                }}
                className="w-full py-2 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-700 rounded-lg text-center"
              >
                View Resume
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsExportModalOpen(true);
                }}
                className="w-full py-2 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800 rounded-lg text-center"
              >
                Export HTML
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 md:py-28 px-6 max-w-6xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-indigo-400 bg-indigo-950/40 border border-indigo-800/60 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Available for internships & collaborations
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Hi, I'm Parag Pareta
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-5">
              Computer Science Student & Aspiring Software Engineer
            </p>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8 max-w-2xl text-balance">
              Passionate about building scalable full-stack applications, distributed algorithms, and exploring modern web and AI technologies. Constantly learning and turning theoretical ideas into clean, functional code.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 inline-flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3 text-sm font-semibold text-zinc-300 bg-zinc-900 border border-zinc-700/80 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Contact Me
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-3 text-sm font-medium text-zinc-400 bg-zinc-900/60 border border-zinc-800 rounded-lg hover:border-zinc-700 hover:text-zinc-200 transition-colors inline-flex items-center gap-2"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-xs">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-xs">Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80">
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">4+</p>
                <p className="text-xs text-zinc-400">Featured Projects</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">15+</p>
                <p className="text-xs text-zinc-400">Tech & Frameworks</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">250+</p>
                <p className="text-xs text-zinc-400">DSA Problems Solved</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-indigo-400 tabular-nums">2031</p>
                <p className="text-xs text-zinc-400">Graduation Class</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Terminal Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className="text-xs font-mono text-zinc-500">engineer@parag:~</span>
              </div>

              <div className="space-y-3 font-mono text-xs text-zinc-300">
                <p className="text-zinc-500">$ cat profile.json</p>
                <div className="p-3 bg-zinc-950/80 rounded-lg border border-zinc-800/60 leading-relaxed text-zinc-400">
                  <p><span className="text-indigo-400">"name"</span>: <span className="text-emerald-300">"Parag Pareta"</span>,</p>
                  <p><span className="text-indigo-400">"role"</span>: <span className="text-emerald-300">"Software Engineer"</span>,</p>
                  <p><span className="text-indigo-400">"education"</span>: <span className="text-emerald-300">"B.Tech CSE '31"</span>,</p>
                  <p><span className="text-indigo-400">"focus"</span>: [<span className="text-amber-200">"Full-Stack"</span>, <span className="text-amber-200">"Algorithms"</span>],</p>
                  <p><span className="text-indigo-400">"status"</span>: <span className="text-emerald-300">"Open to Internships"</span></p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Terminal active
                  </span>
                  <a
                    href="https://github.com/paragpareta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
                  >
                    <span>github/paragpareta</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Background & Philosophy</p>
          <h2 className="text-3xl font-bold text-white">About Me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5 text-zinc-300 leading-relaxed text-base"
          >
            <p>
              I am an aspiring software engineer and undergraduate student pursuing my Bachelor of Technology in Computer Science & Engineering. My journey in tech started with a passion for logic, mathematics, and building things from scratch.
            </p>
            <p>
              I believe great software is born at the intersection of robust computer science fundamentals and disciplined engineering practices. From deep-diving into Data Structures & Algorithms to building responsive, accessible user interfaces with React and Tailwind, I continuously challenge myself to understand both the high-level architecture and low-level performance considerations.
            </p>
            <p>
              When I'm not writing code or debugging test cases, you will find me participating in competitive programming challenges, exploring open-source repositories, and keeping up with advancements in systems engineering and distributed web architecture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-5"
          >
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Core Engineering Principles</span>
            </h3>

            <div className="space-y-4 text-sm">
              <div className="p-3 bg-zinc-950/60 rounded-lg border border-zinc-800/70 hover:border-zinc-700 transition-colors">
                <p className="font-semibold text-zinc-200 mb-1">01. Algorithmic Rigor</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Carefully analyzing asymptotic time and space complexities before implementing solutions.
                </p>
              </div>

              <div className="p-3 bg-zinc-950/60 rounded-lg border border-zinc-800/70 hover:border-zinc-700 transition-colors">
                <p className="font-semibold text-zinc-200 mb-1">02. Clean Code & Modularity</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Writing clean, self-documenting code with clear abstractions, type safety, and minimal side effects.
                </p>
              </div>

              <div className="p-3 bg-zinc-950/60 rounded-lg border border-zinc-800/70 hover:border-zinc-700 transition-colors">
                <p className="font-semibold text-zinc-200 mb-1">03. Practical Product Delivery</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Focusing on user experience, responsive layouts, intuitive flows, and robust error resilience.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Academics</p>
          <h2 className="text-3xl font-bold text-white">Education & Timeline</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-950/50 border border-indigo-800/60 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Bachelor of Technology (B.Tech)</h3>
                <p className="text-indigo-400 font-medium text-sm">Computer Science & Engineering</p>
                <p className="text-xs text-zinc-400 mt-0.5">Undergraduate Degree Program</p>
              </div>
            </div>

            <div className="self-start sm:self-auto text-right">
              <span className="inline-block px-3 py-1 text-xs font-mono text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-md">
                Graduation: 2031
              </span>
              <p className="text-xs text-emerald-400 mt-1.5 flex items-center sm:justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                In Good Standing
              </p>
            </div>
          </div>

          <div className="py-6 border-b border-zinc-800/80">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Key Academic Coursework & Disciplines
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: 'Data Structures & Algorithms', desc: 'Trees, Graphs, DP, Heaps, Complexity Analysis' },
                { name: 'Object-Oriented Programming', desc: 'Encapsulation, Polymorphism, Inheritance, C++ Design' },
                { name: 'Database Management (DBMS)', desc: 'Relational Schema, SQL, Indexing, Transactions' },
                { name: 'Operating Systems', desc: 'Processes, Threads, Concurrency, Memory Management' },
                { name: 'Computer Networks', desc: 'TCP/IP, OSI Stack, Routing, HTTP Protocols' },
                { name: 'Software Engineering', desc: 'SDLC, Agile Methodologies, Version Control, Testing' }
              ].map((course, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  className="p-3 bg-zinc-950/50 border border-zinc-800/60 rounded-lg hover:border-zinc-700 transition-colors"
                >
                  <p className="text-sm font-semibold text-zinc-200">{course.name}</p>
                  <p className="text-xs text-zinc-500 mt-1">{course.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-400">
            <p>
              Strong focus on theoretical foundations combined with practical lab projects and algorithmic problem solving.
            </p>
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-medium transition-colors"
            >
              <span>View Academic Credential Highlights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </motion.section>

      {/* Technical Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Technical Proficiency</p>
          <h2 className="text-3xl font-bold text-white">Skills & Toolkit</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((group, idx) => {
            const IconComponent = group.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700/80 transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-indigo-400">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">{group.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/70 border border-zinc-700/70 rounded-lg hover:border-zinc-600 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Currently Learning Section */}
      <motion.section
        id="learning"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Growth & Exploration</p>
          <h2 className="text-3xl font-bold text-white mb-3">Currently Learning</h2>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Engineering is an evolving discipline. Here are the core architectures and systems technologies I am actively studying and prototyping with to expand my algorithmic and engineering depth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Distributed Systems */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 sm:p-7 hover:border-zinc-700/80 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
                <span className="inline-flex items-center gap-1.5 text-indigo-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                  Active Deep Dive
                </span>
                <span className="font-mono text-zinc-500">Go · gRPC · Raft</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-indigo-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-white">Distributed Systems & Consensus</h3>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                Studying how planetary-scale systems maintain fault tolerance, linearizability, and state replication across unreliable networks. Deepening understanding of the Raft consensus protocol, leader election, log replication, and low-latency binary serialization using gRPC and Protocol Buffers.
              </p>

              <div className="p-3.5 bg-zinc-950/70 border border-zinc-800/80 rounded-lg text-xs text-zinc-400 leading-relaxed mb-6">
                <strong className="text-zinc-200 block mb-1">Relevance to my aspirations:</strong>
                As an aspiring software engineer focused on building resilient backend services, mastering distributed coordination and partition tolerance (CAP theorem) is foundational for designing systems that reliably survive node and network failures.
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/80 text-xs">
              <span className="px-2.5 py-1 bg-zinc-800/80 text-zinc-300 rounded border border-zinc-700/60 font-mono">Raft Protocol</span>
              <span className="px-2.5 py-1 bg-zinc-800/80 text-zinc-300 rounded border border-zinc-700/60 font-mono">gRPC & Protobuf</span>
              <span className="px-2.5 py-1 bg-zinc-800/80 text-zinc-300 rounded border border-zinc-700/60 font-mono">CAP Theorem</span>
            </div>
          </motion.div>

          {/* Card 2: Rust & WebAssembly */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 sm:p-7 hover:border-zinc-700/80 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Hands-on Exploration
                </span>
                <span className="font-mono text-zinc-500">Rust · Wasm · Memory Safety</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-white">Rust & WebAssembly (Wasm)</h3>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                Exploring compile-time memory safety, affine type systems, and borrow semantics to achieve bare-metal computational efficiency without a garbage collector. Compiling compute-heavy data structures and graph algorithms into WebAssembly modules for instant, sandboxed browser execution.
              </p>

              <div className="p-3.5 bg-zinc-950/70 border border-zinc-800/80 rounded-lg text-xs text-zinc-400 leading-relaxed mb-6">
                <strong className="text-zinc-200 block mb-1">Relevance to my aspirations:</strong>
                Rust combines the low-level mechanical sympathy of C++ with modern memory guarantees. Integrating WebAssembly into full-stack web applications unlocks high-performance algorithms directly in client viewports.
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/80 text-xs">
              <span className="px-2.5 py-1 bg-zinc-800/80 text-zinc-300 rounded border border-zinc-700/60 font-mono">Borrow Checker</span>
              <span className="px-2.5 py-1 bg-zinc-800/80 text-zinc-300 rounded border border-zinc-700/60 font-mono">Wasm Compilation</span>
              <span className="px-2.5 py-1 bg-zinc-800/80 text-zinc-300 rounded border border-zinc-700/60 font-mono">Zero-Cost Abstractions</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Portfolio</p>
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg self-start sm:self-auto">
            {['All', 'Full Stack', 'Systems & Algorithms', 'Web Tools'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid with Layout Animations */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, pIdx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: pIdx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                    <span>{project.category}</span>
                    <span className="font-mono text-zinc-500">{project.metrics}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-zinc-500 hover:text-white transition-colors"
                      title="View project details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-xs font-mono text-zinc-300 bg-zinc-800/90 border border-zinc-700/60 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links / Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-medium text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Architecture Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                      {project.liveUrl && (
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-xs font-medium text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 px-6 max-w-6xl mx-auto w-full"
      >
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Connect</p>
          <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Direct Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              I am actively seeking software engineering internship roles, project collaborations, and technical discussions. Whether you have an opportunity or want to discuss computer science, feel free to drop a message!
            </p>

            <div className="space-y-3">
              {/* Email direct */}
              <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Direct Email</p>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="text-sm font-medium text-zinc-200 hover:text-indigo-400 transition-colors"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* GitHub */}
              <a
                href={githubAddress}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between hover:border-zinc-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-indigo-400">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">GitHub Profile</p>
                    <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                      github.com/paragpareta
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinAddress}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between hover:border-zinc-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-indigo-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">LinkedIn Profile</p>
                    <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                      linkedin.com/in/paragpareta
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-lg font-bold text-white mb-2">Send a Direct Message</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Fill out the form below to initiate an email conversation directly.
            </p>

            {formStatus === 'success' ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-800 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Opening Email Client...</h4>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  Your message has been formatted and redirected to your default email client. You can also write directly to{' '}
                  <span className="text-indigo-400 font-mono">{emailAddress}</span>.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-zinc-300 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Subject</label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Internship opportunity / Collaboration"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hi Parag, I came across your portfolio and wanted to discuss..."
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? (
                    <span>Formatting message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-6 border-t border-zinc-800/60 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span>© 2026 Parag Pareta. Built with passion & precision.</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <a href="#home" className="hover:text-white transition-colors">Back to top</a>
          <span>·</span>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="hover:text-indigo-400 transition-colors"
          >
            Standalone HTML File
          </button>
        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 bg-zinc-900/90 border border-zinc-700/80 rounded-full text-indigo-400 hover:text-white hover:bg-zinc-800 shadow-2xl backdrop-blur-md transition-colors group"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-mono text-indigo-400">{selectedProject.category}</span>
              <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.title}</h3>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              {selectedProject.longDescription}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Key Features</h4>
              <ul className="space-y-2 text-sm text-zinc-300">
                {selectedProject.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedProject.codeSnippet && (
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Code Blueprint</h4>
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800/80 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <pre>{selectedProject.codeSnippet}</pre>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
              <div className="flex flex-wrap gap-1.5 text-xs">
                {selectedProject.techStack.map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded border border-zinc-700/60 font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors inline-flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Visit Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Resume Modal */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsResumeModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-center text-indigo-400 font-bold font-mono">
                PP
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Parag Pareta</h3>
                <p className="text-xs text-zinc-400">Software Engineer & CS Undergraduate</p>
              </div>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="text-xs font-mono uppercase text-indigo-400 mb-2">Education</h4>
                <div className="p-3 bg-zinc-950/60 border border-zinc-800 rounded-lg">
                  <p className="font-semibold text-white">Bachelor of Technology in Computer Science</p>
                  <p className="text-xs text-zinc-400">Expected Graduation: 2031</p>
                  <p className="text-xs text-zinc-500 mt-1">Focus on Algorithms, Systems & Full-Stack Development</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-indigo-400 mb-2">Technical Competencies</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white">Languages:</strong> C++, Python, JavaScript (ES6+), TypeScript, SQL, HTML/CSS<br />
                  <strong className="text-white">Frameworks:</strong> React.js, Next.js, Node.js, Express, Tailwind CSS<br />
                  <strong className="text-white">Tools:</strong> Git, GitHub, VS Code, Linux/Bash, Docker, Postman
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-indigo-400 mb-2">Key Achievements</h4>
                <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
                  <li>Solved 250+ algorithmic questions on LeetCode & competitive platforms.</li>
                  <li>Architected 4 complete software solutions covering systems, web apps, and productivity.</li>
                  <li>Collaborated on open-source repositories and maintain clean documentation standards.</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
                <a
                  href={`mailto:${emailAddress}?subject=Interview%20Inquiry%20-%20Parag%20Pareta`}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
                >
                  Schedule Interview
                </a>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-medium text-zinc-300 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Standalone HTML Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsExportModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Standalone Single HTML File</h3>
                <p className="text-xs text-zinc-400">Self-contained portfolio with Tailwind CSS CDN & Lucide Icons</p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              As requested, here is your complete, self-contained single-file HTML code with zero local build steps needed. You can download it directly as an <span className="font-mono text-indigo-400">index.html</span> file or copy the raw code to deploy anywhere (GitHub Pages, Vercel, Netlify, or open directly in any web browser).
            </p>

            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={handleDownloadStandaloneHtml}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download index.html</span>
              </button>

              <button
                onClick={handleCopyCode}
                className="px-4 py-2.5 text-xs font-medium text-zinc-200 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition-colors inline-flex items-center gap-2"
              >
                {copiedCodeToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Full HTML Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 font-mono text-xs text-zinc-400 max-h-56 overflow-y-auto">
              <pre>{standaloneHtmlCode.slice(0, 1000)}... [complete file ready for download]</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
