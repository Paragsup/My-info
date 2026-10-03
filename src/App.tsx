import React, { useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  type Variants
} from 'motion/react';
import {
  Mail,
  Copy,
  Check,
  Send,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
  Atom,
  Binary,
  FlaskConical,
  Github,
  ChevronDown,
  BookOpen
} from 'lucide-react';

interface SubjectDetails {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  summary: string;
  syllabus: string[];
}

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState<string | null>('physics');

  // Contact form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const emailAddress = "paragpareta@gmail.com";
  const githubAddress = "https://github.com/paragsup";

  // Scroll animations & progress
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  // Parallax shifts for subtle background ambient orbs
  const orbY1 = useTransform(scrollY, [0, 1200], [0, -90]);
  const orbY2 = useTransform(scrollY, [0, 1200], [0, 70]);
  const circleProgressOffset = useTransform(smoothProgress, [0, 1], [125.6, 0]);

  // Track active section and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 280);
      const sections = ['home', 'about', 'studies', 'contact'];
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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const navOffset = 76;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
        formState.subject || `Message from ${formState.name}`
      )}&body=${encodeURIComponent(
        `From: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  const subjects: SubjectDetails[] = [
    {
      id: 'physics',
      name: 'Physics',
      icon: Atom,
      tagline: 'Laws of motion & fundamental forces',
      summary: 'Focusing on conceptual depth and mathematical analysis across mechanics, electricity, and wave theory.',
      syllabus: [
        'Kinematics, Newton\'s Laws & Work-Energy Theorem',
        'System of Particles & Rotational Dynamics',
        'Gravitation & Simple Harmonic Motion (SHM)',
        'Fluid Mechanics & Thermal Properties of Matter',
        'Electrostatics, Current Electricity & Magnetism',
        'Electromagnetic Induction & Alternating Current',
        'Ray & Wave Optics',
        'Modern Physics, Atoms & Nuclei'
      ]
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: Binary,
      tagline: 'Logical reasoning & problem synthesis',
      summary: 'Practicing calculus, algebraic methods, and multi-dimensional coordinate geometry to build problem-solving fluency.',
      syllabus: [
        'Differential Calculus (Limits, Continuity & Derivatives)',
        'Integral Calculus (Definite & Indefinite Integrals, Differential Equations)',
        'Coordinate Geometry (Straight Lines, Circles, Parabola, Ellipse, Hyperbola)',
        'Vectors and 3D Analytic Geometry',
        'Complex Numbers & Quadratic Equations',
        'Matrices, Determinants & System of Linear Equations',
        'Permutations, Combinations & Probability',
        'Trigonometric Functions & Inverse Trigonometry'
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: FlaskConical,
      tagline: 'Molecular principles, reactions & structures',
      summary: 'Studying physical chemistry calculations, organic reaction pathways, and systematic inorganic properties.',
      syllabus: [
        'Some Basic Concepts of Chemistry (Mole Concept & Stoichiometry)',
        'Thermodynamics, Thermochemistry & Chemical Energetics',
        'Chemical Equilibrium & Ionic Equilibrium',
        'Chemical Kinetics & Electrochemistry',
        'General Organic Chemistry (GOC) & Reaction Mechanisms',
        'Hydrocarbons (Alkanes, Alkenes, Alkynes & Aromatics)',
        'Organic Compounds containing Oxygen, Nitrogen & Halogens',
        'Chemical Bonding, Periodic Table Trends & Coordination Compounds'
      ]
    }
  ];

  const sectionFadeVariant: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  const containerStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col font-sans relative overflow-x-hidden">
      {/* Background ambient glow with smooth parallax scroll transforms */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle dot matrix grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />

        <motion.div
          style={{ y: orbY1 }}
          className="absolute -top-40 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-sky-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* Sticky Header with Scroll Indicator */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-zinc-950/85 border-b border-zinc-800/80 relative transition-all">
        {/* Smooth scroll progress bar */}
        <motion.div
          style={{ scaleX: smoothProgress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 origin-left z-50 pointer-events-none"
        />

        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between relative z-10">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors flex items-center gap-2 group"
          >
            <span className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-xs font-mono text-indigo-400 font-bold group-hover:border-indigo-500/60 transition-colors">
              PP
            </span>
            <span>parag pareta</span>
            <span className="text-indigo-500">.</span>
          </a>

          {/* Desktop Navigation with Animated Active Indicator */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-zinc-900/60 border border-zinc-800/80 rounded-full text-sm font-medium text-zinc-400">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'studies', label: "What I'm Studying" },
              { id: 'contact', label: 'Contact' }
            ].map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`relative px-4 py-1.5 rounded-full transition-colors ${
                    isActive ? 'text-white' : 'hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-zinc-800 rounded-full border border-zinc-700/60 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 active:scale-95 transition-all shadow-sm"
            >
              Say Hello
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Smooth Animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-zinc-950/95 border-b border-zinc-800 px-6 py-4 space-y-2 overflow-hidden"
            >
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'studies', label: "What I'm Studying" },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`block text-sm font-medium py-1.5 transition-colors ${
                    activeNav === item.id ? 'text-indigo-400 font-semibold' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section with Staggered Scroll Animation */}
      <motion.section
        id="home"
        variants={containerStagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 py-20 md:py-28 px-6 max-w-5xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="max-w-2xl">
          <motion.div variants={sectionFadeVariant} className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              Student · JEE Aspirant · India
            </p>
          </motion.div>

          <motion.h1
            variants={sectionFadeVariant}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight"
          >
            Hi, I'm Parag Pareta
          </motion.h1>

          <motion.p
            variants={sectionFadeVariant}
            className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-5"
          >
            Preparing for the Joint Entrance Examination (JEE).
          </motion.p>

          <motion.p
            variants={sectionFadeVariant}
            className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8"
          >
            I am currently focusing completely on my studies in Physics, Chemistry, and Mathematics for the JEE entrance exam.
            I haven't done technical or engineering projects yet—I am simply a student preparing for upcoming exams and working toward college admissions.
          </motion.p>

          <motion.div variants={sectionFadeVariant} className="flex flex-wrap items-center gap-4">
            <a
              href="#studies"
              onClick={(e) => scrollToSection(e, 'studies')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 active:scale-95 transition-all shadow-sm inline-flex items-center gap-2 group"
            >
              <span>View What I'm Studying</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-5 py-2.5 text-sm font-semibold text-zinc-300 bg-zinc-900 border border-zinc-700/80 rounded-lg hover:bg-zinc-800 hover:text-white active:scale-95 transition-all"
            >
              Contact Me
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-4 py-2.5 text-sm font-medium text-zinc-400 bg-zinc-900/60 border border-zinc-800 rounded-lg hover:border-zinc-700 hover:text-zinc-200 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-xs">Copy Email</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section with Smooth Scroll-In */}
      <motion.section
        id="about"
        variants={sectionFadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 py-16 md:py-20 px-6 max-w-5xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1">Background</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">About Me</h2>
          </div>

          <div className="lg:col-span-8 space-y-4 text-zinc-300 leading-relaxed text-sm sm:text-base">
            <p>
              I am a student currently preparing for JEE. Right now, most of my time is spent solving numerical problems, studying theory, and revising subjects.
            </p>
            <p className="text-zinc-400">
              I am not a teacher, mentor, or professional—I'm just working on my own preparation and aiming to get into a good engineering college where I can eventually study engineering.
            </p>
          </div>
        </div>
      </motion.section>

      {/* What I'm Studying Section with Interactive Accordion Cards */}
      <motion.section
        id="studies"
        variants={sectionFadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 py-16 md:py-20 px-6 max-w-5xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1">Syllabus & Core Subjects</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">What I'm Studying</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Click on any subject below to see the specific topics and chapters I am focusing on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((sub, idx) => {
            const Icon = sub.icon;
            const isExpanded = expandedSubject === sub.id;

            return (
              <motion.div
                key={sub.id}
                variants={sectionFadeVariant}
                custom={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`bg-zinc-900/40 border rounded-xl p-5 transition-all flex flex-col justify-between ${
                  isExpanded ? 'border-indigo-500/60 shadow-lg shadow-indigo-950/20' : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{sub.name}</h3>
                      <p className="text-[11px] text-zinc-400">{sub.tagline}</p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    {sub.summary}
                  </p>
                </div>

                <div>
                  {/* Expandable Syllabus Toggle */}
                  <button
                    onClick={() => setExpandedSubject(isExpanded ? null : sub.id)}
                    className="w-full mt-2 py-2 px-3 text-xs font-medium text-zinc-300 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:text-white rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{isExpanded ? 'Hide Syllabus Topics' : 'View Syllabus Topics'}</span>
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-zinc-800/80 mt-3">
                          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                            Key Chapters
                          </p>
                          <ul className="space-y-1.5 text-xs text-zinc-400">
                            {sub.syllabus.map((topic, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2">
                                <span className="text-indigo-400 select-none font-bold">·</span>
                                <span className="leading-snug">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Contact Section with Smooth Scroll-In */}
      <motion.section
        id="contact"
        variants={sectionFadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 py-16 md:py-20 px-6 max-w-5xl mx-auto w-full"
      >
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1">Get In Touch</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Contact</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Feel free to send a message or say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct channels */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-indigo-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Email</p>
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
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <a
              href={githubAddress}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between hover:border-zinc-700 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-indigo-400">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">GitHub</p>
                  <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                    github.com/paragsup
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Simple Message Form */}
          <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Send a Message</h3>

            {formStatus === 'success' ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-9 h-9 rounded-full bg-emerald-950/60 border border-emerald-800 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Opening Email Client...</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Your message was formatted and directed to your email client.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-3 px-3 py-1.5 text-xs font-semibold text-zinc-300 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Subject</label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Hello / General"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Your message..."
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-semibold text-xs rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? (
                    <span>Opening mail...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-8 px-6 border-t border-zinc-800/60 max-w-5xl mx-auto w-full flex items-center justify-between text-xs text-zinc-500">
        <div>
          <span>© 2026 Parag Pareta · Student</span>
        </div>
        <div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors"
          >
            Back to top
          </button>
        </div>
      </footer>

      {/* Floating Scroll to Top Button with Dynamic Circular Progress Indicator */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-40"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative p-3 bg-zinc-900/90 border border-zinc-700/80 rounded-full text-indigo-400 hover:text-white hover:bg-zinc-800 shadow-2xl backdrop-blur-md transition-all active:scale-95 group flex items-center justify-center"
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              {/* Circular SVG Scroll Progress Ring */}
              <svg className="absolute -inset-1 w-12 h-12 -rotate-90 pointer-events-none" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  className="stroke-zinc-800/60"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  className="stroke-indigo-500"
                  strokeWidth="2.5"
                  strokeDasharray="125.6"
                  style={{
                    strokeDashoffset: circleProgressOffset
                  }}
                  strokeLinecap="round"
                />
              </svg>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
