import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
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
  Linkedin
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      const sections = ['home', 'about', 'studies', 'contact'];
      const scrollPosition = window.scrollY + 180;

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
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
        formState.subject || `Message from ${formState.name}`
      )}&body=${encodeURIComponent(
        `From: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 700);
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80 relative">
        <motion.div
          style={{ scaleX }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 origin-left z-50 pointer-events-none"
        />
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
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
              href="#studies"
              className={`hover:text-white transition-colors ${
                activeNav === 'studies' ? 'text-indigo-400' : ''
              }`}
            >
              What I'm Studying
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

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm"
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
              href="#studies"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-300 hover:text-indigo-400 py-1"
            >
              What I'm Studying
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-300 hover:text-indigo-400 py-1"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 md:py-28 px-6 max-w-5xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-3">
            Student · India
          </p>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Hi, I'm Parag Pareta
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-5">
            Student preparing for JEE (Joint Entrance Examination).
          </p>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
            I am currently focusing completely on my studies in Physics, Chemistry, and Mathematics for the JEE entrance exam.
            I haven't done technical or engineering projects yet—I am simply a student preparing for upcoming exams and working toward college admissions.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#studies"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>My Subjects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-semibold text-zinc-300 bg-zinc-900 border border-zinc-700/80 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Contact Me
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-4 py-2.5 text-sm font-medium text-zinc-400 bg-zinc-900/60 border border-zinc-800 rounded-lg hover:border-zinc-700 hover:text-zinc-200 transition-colors inline-flex items-center gap-2"
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
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-20 px-6 max-w-5xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
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

      {/* What I'm Studying Section */}
      <motion.section
        id="studies"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-20 px-6 max-w-5xl mx-auto border-b border-zinc-800/60 w-full"
      >
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1">Subjects</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">What I'm Studying</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Physics */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-indigo-400">
                <Atom className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Physics</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Mechanics, Kinematics, Laws of Motion, Rotational Dynamics, Electromagnetism, Optics, and Thermodynamics.
            </p>
          </div>

          {/* Mathematics */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-indigo-400">
                <Binary className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Mathematics</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Calculus (Differential & Integral), Coordinate Geometry, Vectors & 3D, Matrices, and Algebra.
            </p>
          </div>

          {/* Chemistry */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-indigo-400">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Chemistry</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Physical Chemistry (Equilibrium, Kinetics, Thermodynamics), Organic Reaction Mechanisms, and Inorganic Chemistry.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-20 px-6 max-w-5xl mx-auto w-full"
      >
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1">Contact</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Get In Touch</h2>
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
                    github.com/paragpareta
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

            <a
              href={linkedinAddress}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between hover:border-zinc-700 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-indigo-400">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">LinkedIn</p>
                  <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                    linkedin.com/in/paragpareta
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
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
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
      <footer className="mt-auto py-8 px-6 border-t border-zinc-800/60 max-w-5xl mx-auto w-full flex items-center justify-between text-xs text-zinc-500">
        <div>
          <span>© 2026 Parag Pareta · Student</span>
        </div>
        <div>
          <a href="#home" className="hover:text-white transition-colors">Back to top</a>
        </div>
      </footer>

      {/* Floating Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-2.5 bg-zinc-900/90 border border-zinc-700/80 rounded-full text-indigo-400 hover:text-white hover:bg-zinc-800 shadow-xl backdrop-blur-md transition-colors"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
