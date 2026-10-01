import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Cpu,
  GraduationCap,
  Layers,
  Copy,
  Check,
  Send,
  Menu,
  X,
  ArrowUpRight,
  FileText,
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
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
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
        'Clean formatted print PDF export and real-time statistics HUD',
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
      icon: Code2,
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

  // Scroll progress animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  
  
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
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsResumeModalOpen(true);
                }}
                className="w-full py-2 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-700 rounded-lg text-center"
              >
                View Resume
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
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Hi, I'm Parag Pareta
          </h1>
            <p className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-5">
              Computer Science Student & Aspiring Software Engineer
            </p>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8 max-w-2xl text-balance">
              Computer Science student building full-stack web applications, algorithms, and performant developer tooling.
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
      </motion.section>

      {/* About Section - Minimalist & Short */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">About Me</h2>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              I am an undergraduate student pursuing my Bachelor of Technology in Computer Science & Engineering (Class of 2031). My core focus lies in full-stack web engineering, distributed systems, and algorithmic problem-solving.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              I enjoy translating foundational computer science concepts into production-ready software—building clean, responsive user interfaces in React & TypeScript and designing reliable, performant backends.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Education Section - Minimalist */}
      <motion.section
        id="education"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="mb-6">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Academics</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Education</h2>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800/80">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/50 border border-indigo-800/60 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Bachelor of Technology (B.Tech)</h3>
                <p className="text-indigo-400 font-medium text-xs sm:text-sm">Computer Science & Engineering</p>
              </div>
            </div>

            <span className="self-start sm:self-auto px-3 py-1 text-xs font-mono text-zinc-300 bg-zinc-800/80 border border-zinc-700/60 rounded-md">
              Graduation: 2031
            </span>
          </div>

          <div className="pt-5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              Core Coursework
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Data Structures & Algorithms',
                'Object-Oriented Programming (OOP)',
                'Database Management Systems (DBMS)',
                'Operating Systems',
                'Computer Networks',
                'Software Engineering'
              ].map((course, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-zinc-950/70 border border-zinc-800 text-zinc-300 rounded-lg hover:border-zinc-700 transition-colors"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Technical Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">Technical Proficiency</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Skills & Toolkit</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillsData.map((group, idx) => {
            const IconComponent = group.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700/80 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-indigo-400">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{group.category}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-xs font-medium text-zinc-200 bg-zinc-800/70 border border-zinc-700/70 rounded-lg hover:border-zinc-600 transition-colors"
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
    </div>
  );
}
