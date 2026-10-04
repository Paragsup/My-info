import React, { useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  type Variants
} from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
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
  Sun,
  Moon,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface SubjectInfo {
  id: string;
  number: string;
  name: string;
  headline: string;
  icon: React.ElementType;
  description: string;
  topics: string[];
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeNav, setActiveNav] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSubjectId, setActiveSubjectId] = useState<string>('physics');

  // Contact form state
  const [selectedTopic, setSelectedTopic] = useState<string>('General Hello');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const emailAddress = "paragpareta@gmail.com";
  const githubAddress = "https://github.com/paragsup";

  // Butter-smooth theme toggle without frame drops
  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transitioning');
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 320);
  };

  // Scroll animations & progress
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001
  });

  // Parallax shifts using transform (GPU accelerated)
  const orbY1 = useTransform(scrollY, [0, 1600], [0, -120]);
  const orbY2 = useTransform(scrollY, [0, 1600], [0, 90]);
  const watermarkX = useTransform(scrollY, [0, 1200], [0, -60]);
  const circleProgressOffset = useTransform(smoothProgress, [0, 1], [125.6, 0]);

  // Track active section and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      const sections = ['home', 'about', 'subjects', 'contact'];
      const scrollPosition = window.scrollY + 220;

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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const navOffset = 80;
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
        `[${selectedTopic}] Message from ${formState.name}`
      )}&body=${encodeURIComponent(
        `Topic: ${selectedTopic}\nName: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  const subjects: SubjectInfo[] = [
    {
      id: 'physics',
      number: '01',
      name: 'Physics',
      headline: 'Mechanics, Electromagnetism & Modern Physics',
      icon: Atom,
      description: 'Strengthening intuition for physical systems through rigorous numerical problem sets, vector mechanics, and calculus formulations.',
      topics: [
        'Kinematics, Newton\'s Laws & Work-Energy',
        'Rotational Dynamics & Moment of Inertia',
        'Gravitation & Simple Harmonic Motion (SHM)',
        'Electrostatics & Current Electricity',
        'Electromagnetic Induction & Alternating Current',
        'Ray & Wave Optics',
        'Modern Physics & Nuclear Structure'
      ]
    },
    {
      id: 'mathematics',
      number: '02',
      name: 'Mathematics',
      headline: 'Calculus, Algebra & Coordinate Geometry',
      icon: Binary,
      description: 'Developing high deductive logic, algebraic dexterity, and multi-step computational stamina across real and complex domains.',
      topics: [
        'Differential & Integral Calculus',
        'Differential Equations & Applications of Derivatives',
        'Coordinate Geometry (Circles, Parabola, Ellipse, Hyperbola)',
        'Vectors & 3D Analytical Geometry',
        'Matrices, Determinants & Linear Systems',
        'Complex Numbers & Quadratic Equations',
        'Permutations, Combinations & Probability'
      ]
    },
    {
      id: 'chemistry',
      number: '03',
      name: 'Chemistry',
      headline: 'Physical, Organic & Inorganic Principles',
      icon: FlaskConical,
      description: 'Balancing mathematical stoichiometry and thermodynamics with electron displacement effects, reaction mechanisms, and periodic bonding trends.',
      topics: [
        'Chemical Energetics & Thermodynamics',
        'Chemical & Ionic Equilibrium',
        'Chemical Kinetics & Electrochemistry',
        'General Organic Chemistry (GOC) Mechanisms',
        'Functional Groups & Hydrocarbon Chemistry',
        'Chemical Bonding & Periodic Table Trends',
        'Coordination Compounds & Metallurgy'
      ]
    }
  ];

  const sectionFadeVariant: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen font-sans antialiased selection:bg-violet-500/30 selection:text-violet-200 flex flex-col relative overflow-x-hidden ${
        isDark ? 'bg-[#08090d] text-zinc-100' : 'bg-[#f8f9fd] text-slate-900'
      }`}
    >
      {/* Background Ambient Orbs (Static background colors with opacity for zero-lag switching) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className={`absolute inset-0 bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] transition-opacity duration-300 ${
            isDark
              ? 'bg-[linear-gradient(to_right,#22233815_1px,transparent_1px),linear-gradient(to_bottom,#22233815_1px,transparent_1px)] opacity-80'
              : 'bg-[linear-gradient(to_right,#cbd5e140_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e140_1px,transparent_1px)] opacity-60'
          }`}
        />

        <motion.div
          style={{ y: orbY1 }}
          className={`absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full blur-[120px] pointer-events-none bg-violet-600 transition-opacity duration-300 ${
            isDark ? 'opacity-15' : 'opacity-10'
          }`}
        />
        <motion.div
          style={{ y: orbY2 }}
          className={`absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none bg-cyan-600 transition-opacity duration-300 ${
            isDark ? 'opacity-10' : 'opacity-8'
          }`}
        />
      </div>

      {/* Sticky Top Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
          isDark
            ? 'bg-[#08090d]/85 border-zinc-800/80 shadow-2xl shadow-black/40'
            : 'bg-[#f8f9fd]/85 border-slate-200/90 shadow-sm shadow-slate-200/40'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between relative z-10">
          {/* Logo Wordmark */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => scrollToSection(e, 'home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm tracking-tight border transition-transform duration-200 group-hover:scale-105 ${
                isDark
                  ? 'bg-zinc-900 border-violet-500/30 text-violet-400'
                  : 'bg-white border-violet-200 text-violet-600 shadow-sm'
              }`}
            >
              PP
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-base leading-tight flex items-center gap-1">
                parag pareta
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              </span>
              <span
                className={`text-[10px] uppercase font-mono tracking-widest ${
                  isDark ? 'text-zinc-500' : 'text-slate-400'
                }`}
              >
                jee aspirant
              </span>
            </div>
          </motion.a>

          {/* Floating Navigation Pill */}
          <nav
            className={`hidden md:flex items-center gap-1 p-1 rounded-full border text-sm font-medium ${
              isDark
                ? 'bg-zinc-900/70 border-zinc-800/80 text-zinc-400 backdrop-blur-md'
                : 'bg-white/80 border-slate-200 text-slate-600 shadow-sm backdrop-blur-md'
            }`}
          >
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'subjects', label: 'Core Subjects' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => {
              const isActive = activeNav === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  whileHover={{ y: -1, scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`relative px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'text-white font-semibold'
                        : 'text-violet-950 font-bold'
                      : isDark
                      ? 'hover:text-zinc-200'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className={`absolute inset-0 rounded-full border ${
                        isDark
                          ? 'bg-zinc-800 border-zinc-700/80'
                          : 'bg-slate-100 border-slate-300'
                      }`}
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.a>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Butter-Smooth Theme Switcher */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border flex items-center justify-center cursor-pointer ${
                isDark
                  ? 'bg-zinc-900/80 border-zinc-800 text-amber-400 hover:border-zinc-700'
                  : 'bg-white border-slate-200 text-violet-600 hover:border-slate-300 shadow-sm'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle color theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, scale: 0.3, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.3, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, scale: 0.3, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0.3, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-violet-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Inexa Style "Say Hello" CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.94 }}
              onClick={(e) => scrollToSection(e, 'contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-md shadow-violet-600/25 group cursor-pointer"
            >
              <span>Say Hello</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            {/* Mobile menu hamburger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl border ${
                isDark
                  ? 'border-zinc-800 text-zinc-400 hover:text-white'
                  : 'border-slate-200 text-slate-600 hover:text-black'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`md:hidden border-b px-6 py-4 space-y-2 overflow-hidden ${
                isDark ? 'bg-[#08090d] border-zinc-800' : 'bg-white border-slate-200'
              }`}
            >
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'subjects', label: 'Core Subjects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`block text-sm font-medium py-1.5 transition-colors ${
                    activeNav === item.id
                      ? 'text-violet-500 font-semibold'
                      : isDark
                      ? 'text-zinc-300 hover:text-white'
                      : 'text-slate-700 hover:text-black'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-32 px-6 max-w-6xl mx-auto w-full overflow-hidden">
        {/* Dynamic Watermark Typographic Stroke */}
        <motion.div
          style={{ x: watermarkX }}
          className={`absolute top-1/2 left-0 -translate-y-1/2 text-[14vw] font-black tracking-tighter uppercase select-none pointer-events-none whitespace-nowrap z-0 ${
            isDark
              ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(139,92,246,0.08)]'
              : 'text-transparent [-webkit-text-stroke:1.5px_rgba(99,102,241,0.08)]'
          }`}
        >
          JEE & IIT ASPIRANT
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            variants={sectionFadeVariant}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Pill */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className={`theme-card inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium tracking-wide shadow-xs cursor-default ${
                isDark
                  ? 'bg-zinc-900/80 border-violet-500/20 text-zinc-300'
                  : 'bg-white border-violet-200 text-violet-950'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400/50" />
              <span>Student · Preparing for JEE (India)</span>
            </motion.div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400">
                  Parag Pareta
                </span>
              </h1>
              <p
                className={`text-xl sm:text-2xl font-semibold leading-snug ${
                  isDark ? 'text-zinc-200' : 'text-slate-800'
                }`}
              >
                Aspirant dedicating full focus to Physics, Chemistry & Mathematics.
              </p>
            </div>

            <p
              className={`text-base sm:text-lg leading-relaxed max-w-xl ${
                isDark ? 'text-zinc-400' : 'text-slate-600'
              }`}
            >
              I am currently preparing for the Joint Entrance Examination (JEE).
              I haven't done technical or engineering projects yet—my priority is building rigorous foundational concepts, mastering multi-step problem solving, and working toward admission into a top engineering institute.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.a
                href="#subjects"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => scrollToSection(e, 'subjects')}
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-violet-600/30 inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>View Core Subjects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => scrollToSection(e, 'contact')}
                className={`theme-card px-6 py-3 text-sm font-semibold rounded-xl border cursor-pointer ${
                  isDark
                    ? 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                    : 'bg-white border-slate-300 text-slate-800 hover:text-black hover:border-slate-400 shadow-sm'
                }`}
              >
                Contact Me
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.93 }}
                onClick={handleCopyEmail}
                className={`theme-card px-4 py-3 text-sm font-medium rounded-xl border inline-flex items-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-semibold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-xs">Copy Email</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Card + Rotating Badge */}
          <motion.div
            variants={sectionFadeVariant}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md animate-float-card">
              {/* Outer Card */}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className={`theme-card relative rounded-3xl p-6 border overflow-hidden ${
                  isDark
                    ? 'bg-[#10121d] border-violet-500/25 shadow-2xl shadow-violet-950/30'
                    : 'bg-white border-slate-200/90 shadow-2xl shadow-indigo-100/70'
                }`}
              >
                {/* Decorative Window Controls */}
                <div className="flex items-center justify-between pb-4 border-b border-violet-500/10 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      isDark ? 'text-zinc-500' : 'text-slate-400'
                    }`}
                  >
                    exam prep · 2026
                  </span>
                </div>

                {/* Profile Card Body */}
                <div className="space-y-4">
                  <div
                    className={`theme-card p-5 rounded-2xl border ${
                      isDark
                        ? 'bg-[#08090f]/90 border-zinc-800/80'
                        : 'bg-slate-50/90 border-slate-200'
                    }`}
                  >
                    <p className="text-xs font-mono text-violet-500 uppercase tracking-wider mb-1 font-semibold">
                      Academic Focus
                    </p>
                    <h3 className="text-lg font-bold">Joint Entrance Examination</h3>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        isDark ? 'text-zinc-400' : 'text-slate-600'
                      }`}
                    >
                      Targeting qualification for premier engineering institutes (IITs / NITs).
                    </p>
                  </div>

                  {/* 3 Subject Meters */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`theme-card p-3 rounded-xl border cursor-default ${
                        isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <Atom className="w-4 h-4 mx-auto text-violet-400 mb-1" />
                      <p className="text-xs font-bold">Physics</p>
                      <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Core</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`theme-card p-3 rounded-xl border cursor-default ${
                        isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <Binary className="w-4 h-4 mx-auto text-cyan-400 mb-1" />
                      <p className="text-xs font-bold">Math</p>
                      <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Core</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`theme-card p-3 rounded-xl border cursor-default ${
                        isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <FlaskConical className="w-4 h-4 mx-auto text-fuchsia-400 mb-1" />
                      <p className="text-xs font-bold">Chemistry</p>
                      <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Core</p>
                    </motion.div>
                  </div>

                  {/* Quote / Dedication */}
                  <div
                    className={`theme-card p-3.5 rounded-xl border text-xs leading-relaxed ${
                      isDark
                        ? 'bg-violet-950/20 border-violet-800/40 text-violet-300'
                        : 'bg-violet-50/80 border-violet-200 text-violet-900'
                    }`}
                  >
                    "Building deep conceptual clarity before building software products. Focused on competitive examination fundamentals."
                  </div>
                </div>
              </motion.div>

              {/* Inexa Rotating Purple Stamp Badge */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 z-30">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center group cursor-pointer"
                >
                  <div className="absolute inset-0 animate-spin-badge">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <path
                        id="heroBadgePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                      />
                      <text
                        className="text-[9.5px] uppercase font-bold tracking-[0.16em] fill-white"
                      >
                        <textPath xlinkHref="#heroBadgePath" startOffset="0%">
                          ✦ PARAG PARETA ✦ JEE ASPIRANT ✦ INDIA ✦
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 shadow-xl shadow-violet-600/40 border-2 border-white/30 flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Horizontal Marquee Track */}
      <div
        className={`theme-card w-full py-4.5 border-y overflow-hidden whitespace-nowrap relative select-none ${
          isDark
            ? 'bg-[#0b0c14]/90 border-zinc-800/80'
            : 'bg-slate-100/90 border-slate-200'
        }`}
      >
        <div className="animate-marquee-track text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-8">
          {[...Array(8)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2">
                <span className="text-violet-500">✦</span> PHYSICS (MECHANICS & OPTICS)
              </span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-500">✦</span> MATHEMATICS (CALCULUS & ALGEBRA)
              </span>
              <span className="flex items-center gap-2">
                <span className="text-fuchsia-500">✦</span> CHEMISTRY (ORGANIC & PHYSICAL)
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✦</span> JEE MAIN & JEE ADVANCED
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* About Section */}
      <motion.section
        id="about"
        variants={sectionFadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/40 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <span
              className={`text-xs font-mono uppercase tracking-wider block mb-2 font-bold ${
                isDark ? 'text-violet-400' : 'text-violet-600'
              }`}
            >
              [ About Me ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              A Dedicated Journey Toward Engineering
            </h2>
          </div>

          <div
            className={`lg:col-span-8 space-y-5 text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-zinc-300' : 'text-slate-700'
            }`}
          >
            <p>
              I am a student currently preparing for the Joint Entrance Examination (JEE).
              My days are devoted to solving complex numerical problems, deriving theorems, and mastering fundamentals across Physics, Chemistry, and Mathematics.
            </p>
            <p className={isDark ? 'text-zinc-400' : 'text-slate-600'}>
              I am not a mentor, teacher, or coach—I am strictly an individual student focused on my own preparation.
              I have not built software projects yet, as my energy is channeled toward competitive entrance examination success and earning an engineering seat.
            </p>

            {/* 3 Subject Percentage Progress Rings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`theme-card p-5 rounded-2xl border cursor-default ${
                  isDark
                    ? 'bg-[#10121d] border-zinc-800/80 hover:border-violet-500/40'
                    : 'bg-white border-slate-200 shadow-sm hover:border-violet-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-bold">Physics</span>
                  <span className="text-xs font-bold font-mono">100%</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`}>
                  <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full w-full" />
                </div>
                <p className={`text-xs mt-3 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Conceptual principles & vector mechanics drills.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`theme-card p-5 rounded-2xl border cursor-default ${
                  isDark
                    ? 'bg-[#10121d] border-zinc-800/80 hover:border-cyan-500/40'
                    : 'bg-white border-slate-200 shadow-sm hover:border-cyan-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">Mathematics</span>
                  <span className="text-xs font-bold font-mono">100%</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`}>
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full w-full" />
                </div>
                <p className={`text-xs mt-3 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Calculus, vectors & multi-step problems.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`theme-card p-5 rounded-2xl border cursor-default ${
                  isDark
                    ? 'bg-[#10121d] border-zinc-800/80 hover:border-fuchsia-500/40'
                    : 'bg-white border-slate-200 shadow-sm hover:border-fuchsia-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-fuchsia-400 font-bold">Chemistry</span>
                  <span className="text-xs font-bold font-mono">100%</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`}>
                  <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full w-full" />
                </div>
                <p className={`text-xs mt-3 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Organic reaction pathways & equilibrium.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Subjects Section */}
      <motion.section
        id="subjects"
        variants={sectionFadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 py-20 px-6 max-w-6xl mx-auto border-b border-zinc-800/40 w-full"
      >
        <div className="mb-12">
          <span
            className={`text-xs font-mono uppercase tracking-wider block mb-2 font-bold ${
              isDark ? 'text-violet-400' : 'text-violet-600'
            }`}
          >
            [ What I'm Studying ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            The Three Academic Pillars
          </h2>
          <p className={`text-base mt-2 max-w-2xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Click through each subject row below to explore the syllabus breakdown and primary chapters.
          </p>
        </div>

        {/* Big Typography Interactive Rows */}
        <div className="space-y-4">
          {subjects.map((sub) => {
            const isSelected = activeSubjectId === sub.id;

            return (
              <motion.div
                key={sub.id}
                whileHover={{ scale: 1.008 }}
                transition={{ duration: 0.2 }}
                className={`theme-card rounded-2xl border overflow-hidden ${
                  isSelected
                    ? isDark
                      ? 'bg-[#10121d] border-violet-500/60 shadow-xl shadow-violet-950/30'
                      : 'bg-white border-violet-400 shadow-lg shadow-violet-100'
                    : isDark
                    ? 'bg-[#0f1019]/60 border-zinc-800/80 hover:border-zinc-700'
                    : 'bg-white/70 border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Row Header Trigger */}
                <motion.button
                  whileTap={{ scale: 0.995 }}
                  onClick={() => setActiveSubjectId(isSelected ? '' : sub.id)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between text-left gap-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-5 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base font-extrabold text-violet-500">
                      {sub.number}
                    </span>
                    <div>
                      <h3
                        className={`text-2xl sm:text-4xl font-black tracking-tight transition-colors ${
                          isSelected
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-400'
                            : isDark
                            ? 'text-white group-hover:text-violet-400'
                            : 'text-slate-900 group-hover:text-violet-600'
                        }`}
                      >
                        {sub.name}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm mt-1 ${
                          isDark ? 'text-zinc-400' : 'text-slate-500'
                        }`}
                      >
                        {sub.headline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-transform duration-200 ${
                        isSelected
                          ? 'rotate-90 bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-400 text-white shadow-md shadow-violet-600/30'
                          : isDark
                          ? 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-white'
                          : 'bg-slate-100 border-slate-200 text-slate-600 group-hover:text-black'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.button>

                {/* Animated Drawer Body */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`px-6 pb-8 sm:px-8 border-t ${
                          isDark
                            ? 'border-violet-500/15 bg-zinc-950/40'
                            : 'border-slate-200/80 bg-slate-50/70'
                        }`}
                      >
                        <p
                          className={`text-sm sm:text-base leading-relaxed pt-5 mb-6 ${
                            isDark ? 'text-zinc-300' : 'text-slate-700'
                          }`}
                        >
                          {sub.description}
                        </p>

                        <div>
                          <p
                            className={`text-xs font-mono uppercase tracking-wider mb-3 font-semibold ${
                              isDark ? 'text-zinc-400' : 'text-slate-500'
                            }`}
                          >
                            Key Syllabus Chapters & Problem Focus:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {sub.topics.map((t, idx) => (
                              <motion.div
                                key={idx}
                                whileHover={{ x: 4, scale: 1.01 }}
                                transition={{ duration: 0.15 }}
                                className={`theme-card p-3.5 rounded-xl border text-xs flex items-center gap-3 cursor-default ${
                                  isDark
                                    ? 'bg-[#10121e]/80 border-zinc-800/80 text-zinc-300 hover:border-violet-500/30'
                                    : 'bg-white border-slate-200 text-slate-800 hover:border-violet-300 shadow-xs'
                                }`}
                              >
                                <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0 shadow-xs shadow-violet-500/50" />
                                <span className="font-medium">{t}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* High-Contrast Highlights Banner */}
      <section
        className={`py-16 px-6 border-b ${
          isDark
            ? 'bg-[#10121d] border-violet-500/20'
            : 'bg-slate-900 text-white border-slate-900 shadow-xl'
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-violet-400 block mb-1 font-bold">
              [ Daily Commitment ]
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Consistent Practice & Conceptual Depth
            </h3>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Dedication to multi-step problem solving, revision drills, and analytical precision for the JEE entrance exam.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-6 py-3 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-violet-600/30 cursor-pointer"
            >
              Get In Touch
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        variants={sectionFadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 py-20 px-6 max-w-6xl mx-auto w-full"
      >
        <div className="mb-12">
          <span
            className={`text-xs font-mono uppercase tracking-wider block mb-2 font-bold ${
              isDark ? 'text-violet-400' : 'text-violet-600'
            }`}
          >
            [ Contact Me ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Have a Question? Get in Touch!
          </h2>
          <p className={`text-base mt-2 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Feel free to connect or say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card */}
            <motion.div
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className={`theme-card p-5 rounded-2xl border flex items-center justify-between ${
                isDark
                  ? 'bg-[#10121d] border-zinc-800/80 shadow-md shadow-black/20 hover:border-violet-500/40'
                  : 'bg-white border-slate-200 shadow-sm hover:border-violet-300'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`theme-card w-11 h-11 rounded-xl border flex items-center justify-center text-violet-500 ${
                    isDark ? 'bg-zinc-800/80 border-zinc-700' : 'bg-violet-50 border-violet-200'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Email Address</p>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-sm font-semibold hover:text-violet-500 transition-colors"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.88 }}
                onClick={handleCopyEmail}
                className={`theme-card p-2.5 rounded-xl border cursor-pointer ${
                  isDark
                    ? 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    : 'border-slate-200 text-slate-500 hover:text-black hover:border-slate-300'
                }`}
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            </motion.div>

            {/* GitHub Card */}
            <motion.a
              href={githubAddress}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`theme-card p-5 rounded-2xl border flex items-center justify-between group cursor-pointer ${
                isDark
                  ? 'bg-[#10121d] border-zinc-800/80 hover:border-violet-500/40 shadow-md shadow-black/20'
                  : 'bg-white border-slate-200 hover:border-violet-300 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`theme-card w-11 h-11 rounded-xl border flex items-center justify-center text-violet-500 ${
                    isDark ? 'bg-zinc-800/80 border-zinc-700' : 'bg-violet-50 border-violet-200'
                  }`}
                >
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>GitHub Profile</p>
                  <p className="text-sm font-semibold group-hover:text-violet-500 transition-colors">
                    github.com/paragsup
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            {/* Giant Inexa Email Highlight Box */}
            <motion.div
              whileHover={{ y: -2 }}
              className={`theme-card p-6 rounded-2xl border text-center ${
                isDark
                  ? 'bg-[#10121d] border-violet-500/25'
                  : 'bg-violet-50/70 border-violet-200'
              }`}
            >
              <p className={`text-xs font-mono uppercase tracking-wider mb-2 font-semibold ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
                Direct Mail
              </p>
              <a
                href={`mailto:${emailAddress}`}
                className="text-lg sm:text-xl font-bold tracking-tight text-violet-500 hover:underline"
              >
                {emailAddress}
              </a>
            </motion.div>
          </div>

          {/* Right: Message Form */}
          <div
            className={`theme-card lg:col-span-7 p-6 sm:p-8 rounded-3xl border ${
              isDark
                ? 'bg-[#10121d] border-zinc-800/80 shadow-2xl shadow-black/30'
                : 'bg-white border-slate-200 shadow-lg shadow-slate-100'
            }`}
          >
            <h3 className="text-base font-bold mb-4">Send a Direct Message</h3>

            {/* Topic Selector Pills */}
            <div className="mb-6">
              <label
                className={`block text-xs font-mono uppercase tracking-wider mb-2.5 font-semibold ${
                  isDark ? 'text-zinc-400' : 'text-slate-500'
                }`}
              >
                Select Topic:
              </label>
              <div className="flex flex-wrap gap-2">
                {['General Hello', 'Study Discussion', 'Academic Query'].map((topic) => {
                  const isSelected = selectedTopic === topic;
                  return (
                    <motion.button
                      key={topic}
                      type="button"
                      whileHover={{ scale: 1.06, y: -1 }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium border cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-500 text-white shadow-md shadow-violet-600/30'
                          : isDark
                          ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                          : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-black hover:border-slate-300'
                      }`}
                    >
                      {topic}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {formStatus === 'success' ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold">Email Client Opening...</h4>
                <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                  Your message was formatted with the topic "[{selectedTopic}]" and transferred to your email application.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormStatus('idle')}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  Send Another Message
                </motion.button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-medium mb-1.5 ${
                        isDark ? 'text-zinc-400' : 'text-slate-600'
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Parag"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all ${
                        isDark
                          ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-xs font-medium mb-1.5 ${
                        isDark ? 'text-zinc-400' : 'text-slate-600'
                      }`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="you@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all ${
                        isDark
                          ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs font-medium mb-1.5 ${
                      isDark ? 'text-zinc-400' : 'text-slate-600'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Your message here..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all resize-none ${
                      isDark
                        ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-[0.99] text-white font-semibold text-xs rounded-xl shadow-md shadow-violet-600/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer group"
                >
                  {formStatus === 'submitting' ? (
                    <span>Opening Mail Client...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer
        className={`theme-card relative z-10 mt-auto py-8 px-6 border-t max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDark ? 'border-zinc-800/60 text-zinc-500' : 'border-slate-200 text-slate-500'
        }`}
      >
        <div>
          <span>© 2026 Parag Pareta · JEE Aspirant · India</span>
        </div>
        <div className="flex items-center gap-6">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href={githubAddress}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-500 transition-colors"
          >
            GitHub
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-violet-500 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </footer>

      {/* Floating Scroll to Top with Circular Progress Indicator */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`relative p-3 rounded-full border shadow-2xl backdrop-blur-md group flex items-center justify-center cursor-pointer ${
                isDark
                  ? 'bg-zinc-900/90 border-violet-500/30 text-violet-400 hover:text-white hover:bg-violet-950/40 shadow-violet-950/50'
                  : 'bg-white/95 border-violet-200 text-violet-600 hover:text-black hover:bg-violet-50 shadow-violet-100'
              }`}
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
                  className={isDark ? 'stroke-zinc-800/60' : 'stroke-slate-200'}
                  strokeWidth="2"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  className="stroke-violet-500"
                  strokeWidth="2.5"
                  strokeDasharray="125.6"
                  style={{
                    strokeDashoffset: circleProgressOffset
                  }}
                  strokeLinecap="round"
                />
              </svg>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  );
}
