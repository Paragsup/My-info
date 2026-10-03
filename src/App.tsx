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
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  Target,
  BookOpen
} from 'lucide-react';

interface SubjectInfo {
  id: string;
  number: string;
  name: string;
  headline: string;
  icon: React.ElementType;
  description: string;
  weight: number;
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

  // Scroll animations & progress
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  // Top level transforms for animations
  const orbY1 = useTransform(scrollY, [0, 1500], [0, -120]);
  const orbY2 = useTransform(scrollY, [0, 1500], [0, 100]);
  const circleProgressOffset = useTransform(smoothProgress, [0, 1], [125.6, 0]);
  const marqueeX = useTransform(scrollY, [0, 2000], [0, -250]);

  // Track active section and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320);
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
      description: 'Strengthening intuition for physical systems through rigorous numericals and calculus-based formulations.',
      weight: 100,
      topics: [
        'Kinematics & Newton\'s Laws of Motion',
        'Rotational Dynamics & Moment of Inertia',
        'Work, Energy & Power Theorem',
        'Electrostatics & Current Electricity',
        'Electromagnetic Induction & Alternating Currents',
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
      description: 'Developing deductive rigor and multi-step computational stamina across pure and analytical mathematics.',
      weight: 100,
      topics: [
        'Differential & Integral Calculus',
        'Differential Equations & Applications',
        'Coordinate Geometry & Conic Sections',
        'Vectors & 3D Spatial Geometry',
        'Matrices, Determinants & System of Equations',
        'Complex Numbers & Quadratic Theory',
        'Permutations, Combinations & Probability'
      ]
    },
    {
      id: 'chemistry',
      number: '03',
      name: 'Chemistry',
      headline: 'Physical, Organic & Inorganic Principles',
      icon: FlaskConical,
      description: 'Balancing mathematical stoichiometry with molecular orbital logic and systematic reaction mechanisms.',
      weight: 100,
      topics: [
        'Chemical Energetics & Thermodynamics',
        'Chemical & Ionic Equilibrium',
        'Chemical Kinetics & Electrochemistry',
        'General Organic Chemistry (GOC) Mechanisms',
        'Functional Groups & Hydrocarbon Chemistry',
        'Periodic Trends & Chemical Bonding Models',
        'Coordination Compounds & Metallurgy'
      ]
    }
  ];

  const sectionFadeVariant: Variants = {
    hidden: { opacity: 0, y: 28 },
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
      className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col relative overflow-x-hidden ${
        isDark ? 'bg-[#0f0f11] text-zinc-100' : 'bg-[#fafaf8] text-zinc-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle dot matrix grid */}
        <div
          className={`absolute inset-0 bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] ${
            isDark
              ? 'bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] opacity-70'
              : 'bg-[linear-gradient(to_right,#e4e4e760_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e760_1px,transparent_1px)] opacity-60'
          }`}
        />

        <motion.div
          style={{ y: orbY1 }}
          className={`absolute -top-40 -left-20 w-[450px] h-[450px] rounded-full blur-[100px] pointer-events-none ${
            isDark ? 'bg-indigo-600/12' : 'bg-indigo-400/15'
          }`}
        />
        <motion.div
          style={{ y: orbY2 }}
          className={`absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${
            isDark ? 'bg-sky-600/10' : 'bg-sky-400/15'
          }`}
        />
      </div>

      {/* Sticky Top Header with Inexa-style aesthetic */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
          isDark
            ? 'bg-[#0f0f11]/85 border-zinc-800/80'
            : 'bg-[#fafaf8]/85 border-zinc-200/80 shadow-xs'
        }`}
      >
        {/* Animated Top Reading Progress Bar */}
        <motion.div
          style={{ scaleX: smoothProgress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-400 origin-left z-50 pointer-events-none"
        />

        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between relative z-10">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="flex items-center gap-2 group"
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm tracking-tight border transition-transform group-hover:scale-105 ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-indigo-400 shadow-sm'
                  : 'bg-white border-zinc-200 text-indigo-600 shadow-xs'
              }`}
            >
              PP
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-base leading-tight">
                parag pareta<span className="text-indigo-500">.</span>
              </span>
              <span
                className={`text-[10px] uppercase font-mono tracking-widest ${
                  isDark ? 'text-zinc-500' : 'text-zinc-400'
                }`}
              >
                jee aspirant
              </span>
            </div>
          </a>

          {/* Desktop Navigation with Animated Pill */}
          <nav
            className={`hidden md:flex items-center gap-1 p-1 rounded-full border text-sm font-medium transition-colors ${
              isDark
                ? 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400'
                : 'bg-zinc-100/90 border-zinc-200 text-zinc-600'
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
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`relative px-4 py-1.5 rounded-full transition-colors ${
                    isActive
                      ? isDark
                        ? 'text-white'
                        : 'text-zinc-950 font-semibold'
                      : isDark
                      ? 'hover:text-zinc-200'
                      : 'hover:text-zinc-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className={`absolute inset-0 rounded-full border shadow-xs ${
                        isDark
                          ? 'bg-zinc-800 border-zinc-700/60'
                          : 'bg-white border-zinc-300'
                      }`}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Header Actions: Theme Switcher & Let's Talk CTA */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-xl border transition-all active:scale-90 flex items-center justify-center ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                  : 'bg-white border-zinc-200 text-zinc-700 hover:text-black hover:border-zinc-300 shadow-xs'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle color theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Inexa Style "Let's Talk" CTA */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 active:scale-95 transition-all shadow-sm"
            >
              <span>Say Hello</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl border transition-colors ${
                isDark
                  ? 'border-zinc-800 text-zinc-400 hover:text-white'
                  : 'border-zinc-200 text-zinc-600 hover:text-black'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`md:hidden border-b px-6 py-4 space-y-2 overflow-hidden ${
                isDark ? 'bg-[#0f0f11] border-zinc-800' : 'bg-white border-zinc-200'
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
                      ? 'text-indigo-500 font-semibold'
                      : isDark
                      ? 'text-zinc-300 hover:text-white'
                      : 'text-zinc-700 hover:text-black'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section with Inexa Layout: Giant Outline Watermark + Rotating Badge */}
      <section id="home" className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-32 px-6 max-w-6xl mx-auto w-full overflow-hidden">
        {/* Giant Inexa-style Outline Typographic Watermark in Background */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black tracking-tighter uppercase select-none pointer-events-none whitespace-nowrap z-0 ${
            isDark
              ? 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.04)]'
              : 'text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.04)]'
          }`}
        >
          JEE & ENGINEERING
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Introductions & Content */}
          <motion.div
            variants={sectionFadeVariant}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                Student · Preparing for JEE (India)
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-400">
                  Parag Pareta
                </span>
              </h1>
              <p
                className={`text-xl sm:text-2xl font-semibold leading-snug ${
                  isDark ? 'text-zinc-300' : 'text-zinc-800'
                }`}
              >
                Aspirant dedicating full focus to Physics, Chemistry & Mathematics.
              </p>
            </div>

            <p
              className={`text-base sm:text-lg leading-relaxed max-w-xl ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              I am currently a student preparing for the Joint Entrance Examination (JEE).
              I haven't done technical or engineering projects yet—my daily priority is building solid conceptual roots, solving multi-step problems, and working toward admission into a top engineering institute.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#subjects"
                onClick={(e) => scrollToSection(e, 'subjects')}
                className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 active:scale-95 transition-all shadow-md shadow-indigo-600/20 inline-flex items-center gap-2 group"
              >
                <span>View Core Subjects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className={`px-6 py-3 text-sm font-semibold rounded-xl border active:scale-95 transition-all ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                    : 'bg-white border-zinc-300 text-zinc-800 hover:text-black hover:border-zinc-400 shadow-xs'
                }`}
              >
                Contact Me
              </a>

              <button
                onClick={handleCopyEmail}
                className={`px-4 py-3 text-sm font-medium rounded-xl border active:scale-95 transition-all inline-flex items-center gap-2 ${
                  isDark
                    ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500 text-xs font-semibold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-xs">Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase with Rotating Badge (Inexa signature) */}
          <motion.div
            variants={sectionFadeVariant}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Main Card Frame */}
              <div
                className={`relative rounded-3xl p-6 border shadow-2xl overflow-hidden ${
                  isDark
                    ? 'bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border-zinc-800'
                    : 'bg-white border-zinc-200 shadow-xl'
                }`}
              >
                {/* Inner Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/40 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      isDark ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  >
                    exam prep · 2026
                  </span>
                </div>

                {/* Profile Card Body */}
                <div className="space-y-4">
                  <div
                    className={`p-5 rounded-2xl border ${
                      isDark ? 'bg-zinc-950/80 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
                    }`}
                  >
                    <p className="text-xs font-mono text-indigo-500 uppercase tracking-wider mb-1">
                      Academic Focus
                    </p>
                    <h3 className="text-lg font-bold">Joint Entrance Examination</h3>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    >
                      Targeting qualification for premier engineering colleges (IITs / NITs).
                    </p>
                  </div>

                  {/* 3 Quick Stat Meters inspired by Inexa */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div
                      className={`p-3 rounded-xl border ${
                        isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <Atom className="w-4 h-4 mx-auto text-indigo-400 mb-1" />
                      <p className="text-sm font-bold">Physics</p>
                      <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Core</p>
                    </div>
                    <div
                      className={`p-3 rounded-xl border ${
                        isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <Binary className="w-4 h-4 mx-auto text-sky-400 mb-1" />
                      <p className="text-sm font-bold">Math</p>
                      <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Core</p>
                    </div>
                    <div
                      className={`p-3 rounded-xl border ${
                        isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <FlaskConical className="w-4 h-4 mx-auto text-purple-400 mb-1" />
                      <p className="text-sm font-bold">Chemistry</p>
                      <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Core</p>
                    </div>
                  </div>

                  {/* Quote / Note */}
                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                      isDark
                        ? 'bg-indigo-950/20 border-indigo-800/40 text-indigo-300'
                        : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                    }`}
                  >
                    "Building deep mastery before building products. Every equation solved today forms tomorrow's engineering foundation."
                  </div>
                </div>
              </div>

              {/* Inexa Signature Rotating Circular Stamp / Badge */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 z-20">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                  {/* Rotating SVG circular text */}
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                  >
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text
                      className={`text-[9.2px] uppercase font-bold tracking-[0.16em] ${
                        isDark ? 'fill-zinc-300' : 'fill-zinc-800'
                      }`}
                    >
                      <textPath xlinkHref="#circlePath" startOffset="0%">
                        ✦ PARAG PARETA ✦ JEE ASPIRANT ✦ INDIA ✦
                      </textPath>
                    </text>
                  </motion.svg>

                  {/* Center Icon Badge */}
                  <div
                    className={`w-12 h-12 rounded-full border shadow-lg flex items-center justify-center ${
                      isDark
                        ? 'bg-zinc-900 border-zinc-700 text-indigo-400'
                        : 'bg-white border-zinc-300 text-indigo-600 shadow-md'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Horizontal Marquee Ticker (Inexa signature feature) */}
      <div
        className={`w-full py-4 border-y overflow-hidden whitespace-nowrap relative select-none ${
          isDark ? 'bg-zinc-950/80 border-zinc-800/80' : 'bg-zinc-100 border-zinc-200'
        }`}
      >
        <motion.div
          style={{ x: marqueeX }}
          className="inline-flex items-center gap-8 text-xs font-mono uppercase tracking-widest font-semibold"
        >
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2">
                <span className="text-indigo-500">✦</span> PHYSICS (MECHANICS & OPTICS)
              </span>
              <span className="flex items-center gap-2">
                <span className="text-sky-500">✦</span> MATHEMATICS (CALCULUS & ALGEBRA)
              </span>
              <span className="flex items-center gap-2">
                <span className="text-purple-500">✦</span> CHEMISTRY (ORGANIC & PHYSICAL)
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-500">✦</span> JEE MAIN & JEE ADVANCED
              </span>
            </React.Fragment>
          ))}
        </motion.div>
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
              className={`text-xs font-mono uppercase tracking-wider block mb-2 ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            >
              [ About Me ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              A Dedicated Journey Toward Engineering
            </h2>
          </div>

          <div
            className={`lg:col-span-8 space-y-5 text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-zinc-300' : 'text-zinc-700'
            }`}
          >
            <p>
              I am a student preparing for the Joint Entrance Examination (JEE).
              Currently, my day revolves around solving numerical problems, studying scientific concepts, and revising chapters across Physics, Chemistry, and Mathematics.
            </p>
            <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>
              I am not a mentor, teacher, or coach—I am strictly an individual student working on my own preparation.
              I haven't built coding projects yet, as my full focus is directed toward cracking the competitive entrance exam and earning a place in an engineering college.
            </p>

            {/* Three Pillar Progress Rings inspired by Inexa (Design / Consultancy / Support -> Subjects) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Physics</span>
                  <span className="text-xs font-bold font-mono">100%</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                  <div className="h-full bg-indigo-500 rounded-full w-full" />
                </div>
                <p className={`text-xs mt-3 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Conceptual principles & mechanics drills.
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Mathematics</span>
                  <span className="text-xs font-bold font-mono">100%</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                  <div className="h-full bg-sky-500 rounded-full w-full" />
                </div>
                <p className={`text-xs mt-3 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Calculus, vectors & multi-step problems.
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-400">Chemistry</span>
                  <span className="text-xs font-bold font-mono">100%</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                  <div className="h-full bg-purple-500 rounded-full w-full" />
                </div>
                <p className={`text-xs mt-3 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Organic reaction pathways & equilibrium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Subjects Section with Big Typography & Interactive Accordion (Inexa style) */}
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
            className={`text-xs font-mono uppercase tracking-wider block mb-2 ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          >
            [ What I'm Studying ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            The Three Academic Pillars
          </h2>
          <p className={`text-base mt-2 max-w-2xl ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Click through each subject below to view the syllabus breakdown and primary chapters.
          </p>
        </div>

        {/* Inexa-style Big Typography Interactive Rows */}
        <div className="space-y-4">
          {subjects.map((sub) => {
            const isSelected = activeSubjectId === sub.id;
            const Icon = sub.icon;

            return (
              <div
                key={sub.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isSelected
                    ? isDark
                      ? 'bg-zinc-900/80 border-indigo-500/60 shadow-lg shadow-indigo-950/20'
                      : 'bg-white border-indigo-400 shadow-md'
                    : isDark
                    ? 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'
                    : 'bg-white/60 border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {/* Row Header Trigger */}
                <button
                  onClick={() => setActiveSubjectId(isSelected ? '' : sub.id)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between text-left gap-4 group"
                >
                  <div className="flex items-center gap-5 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base font-bold text-indigo-500">
                      {sub.number}
                    </span>
                    <div>
                      <h3
                        className={`text-2xl sm:text-4xl font-extrabold tracking-tight transition-colors ${
                          isSelected
                            ? 'text-indigo-500'
                            : isDark
                            ? 'text-white group-hover:text-indigo-400'
                            : 'text-zinc-900 group-hover:text-indigo-600'
                        }`}
                      >
                        {sub.name}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm mt-1 ${
                          isDark ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        {sub.headline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform ${
                        isSelected
                          ? 'rotate-90 bg-indigo-600 border-indigo-500 text-white'
                          : isDark
                          ? 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-white'
                          : 'bg-zinc-100 border-zinc-200 text-zinc-600 group-hover:text-black'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </button>

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
                          isDark ? 'border-zinc-800/80 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50/50'
                        }`}
                      >
                        <p
                          className={`text-sm sm:text-base leading-relaxed pt-5 mb-6 ${
                            isDark ? 'text-zinc-300' : 'text-zinc-700'
                          }`}
                        >
                          {sub.description}
                        </p>

                        <div>
                          <p
                            className={`text-xs font-mono uppercase tracking-wider mb-3 ${
                              isDark ? 'text-zinc-400' : 'text-zinc-500'
                            }`}
                          >
                            Key Syllabus Chapters & Problem Focus:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {sub.topics.map((t, idx) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                                  isDark
                                    ? 'bg-zinc-900/60 border-zinc-800/80 text-zinc-300'
                                    : 'bg-white border-zinc-200 text-zinc-800'
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                <span>{t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* High-Contrast Section (Inexa "Rewards / Highlights" inspiration) */}
      <section
        className={`py-16 px-6 border-b transition-colors ${
          isDark
            ? 'bg-zinc-900/40 border-zinc-800/60'
            : 'bg-zinc-900 text-white border-zinc-900'
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block mb-1">
              [ Daily Commitment ]
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Consistent Practice & Conceptual Depth
            </h3>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Dedication to problem-solving, timed practice papers, and strengthening analytical thinking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-6 py-3 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 active:scale-95 transition-all shadow-md"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section with Topic Selector Pills (Inexa style) */}
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
            className={`text-xs font-mono uppercase tracking-wider block mb-2 ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          >
            [ Contact Me ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Have a Question? Get in Touch!
          </h2>
          <p className={`text-base mt-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Feel free to connect or say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card */}
            <div
              className={`p-5 rounded-2xl border flex items-center justify-between ${
                isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center text-indigo-500 ${
                    isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-indigo-50 border-indigo-100'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Email Address</p>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-sm font-semibold hover:text-indigo-500 transition-colors"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isDark
                    ? 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    : 'border-zinc-200 text-zinc-500 hover:text-black'
                }`}
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* GitHub Profile Card */}
            <a
              href={githubAddress}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-5 rounded-2xl border flex items-center justify-between transition-all group ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center text-indigo-500 ${
                    isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-indigo-50 border-indigo-100'
                  }`}
                >
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>GitHub Profile</p>
                  <p className="text-sm font-semibold group-hover:text-indigo-500 transition-colors">
                    github.com/paragsup
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
            </a>

            {/* Inexa Style Giant Email Highlight */}
            <div
              className={`p-6 rounded-2xl border text-center ${
                isDark
                  ? 'bg-gradient-to-b from-zinc-900/40 to-zinc-950 border-zinc-800/80'
                  : 'bg-indigo-50/60 border-indigo-100'
              }`}
            >
              <p className={`text-xs font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Direct Mailto
              </p>
              <a
                href={`mailto:${emailAddress}`}
                className="text-lg sm:text-xl font-bold tracking-tight text-indigo-500 hover:underline"
              >
                {emailAddress}
              </a>
            </div>
          </div>

          {/* Right: Message Form with Inexa-style Topic Selector Pills */}
          <div
            className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border ${
              isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}
          >
            <h3 className="text-base font-bold mb-4">Send a Direct Message</h3>

            {/* Inexa Style Selector Pills (Budget / Topic pills) */}
            <div className="mb-6">
              <label
                className={`block text-xs font-mono uppercase tracking-wider mb-2.5 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                Select Topic:
              </label>
              <div className="flex flex-wrap gap-2">
                {['General Hello', 'Study Discussion', 'Academic Query'].map((topic) => {
                  const isSelected = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-xs'
                          : isDark
                          ? 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                          : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black hover:border-zinc-300'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            {formStatus === 'success' ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-500">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold">Email Client Opening...</h4>
                <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Your message was prepared with the topic "[{selectedTopic}]" and transferred to your email application.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-medium mb-1.5 ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600'
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
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-indigo-500 transition-colors ${
                        isDark
                          ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
                          : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-xs font-medium mb-1.5 ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600'
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
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-indigo-500 transition-colors ${
                        isDark
                          ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
                          : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs font-medium mb-1.5 ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
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
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-indigo-500 transition-colors resize-none ${
                      isDark
                        ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
                        : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? (
                    <span>Opening Mail Client...</span>
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

      {/* Footer with Inexa-style details */}
      <footer
        className={`relative z-10 mt-auto py-8 px-6 border-t max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDark ? 'border-zinc-800/60 text-zinc-500' : 'border-zinc-200 text-zinc-500'
        }`}
      >
        <div>
          <span>© 2026 Parag Pareta · JEE Aspirant · India</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={githubAddress}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 transition-colors"
          >
            GitHub
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-indigo-500 transition-colors flex items-center gap-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
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
              className={`relative p-3 rounded-full border shadow-2xl backdrop-blur-md transition-all active:scale-95 group flex items-center justify-center ${
                isDark
                  ? 'bg-zinc-900/90 border-zinc-700/80 text-indigo-400 hover:text-white hover:bg-zinc-800'
                  : 'bg-white/90 border-zinc-300 text-indigo-600 hover:text-black hover:bg-zinc-50'
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
                  className={isDark ? 'stroke-zinc-800/60' : 'stroke-zinc-200'}
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
