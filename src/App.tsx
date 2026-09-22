/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Sun, 
  Moon, 
  ChevronRight,
  Terminal,
  MapPin,
  ExternalLink,
  Menu,
  X
} from "lucide-react";

import TechStack from "./components/TechStack";
import ExperienceTimeline from "./components/ExperienceTimeline";
import CollegeProjectCards from "./components/ProjectCards";
import ProjectsPage from "./components/ProjectsPage";
import ContactModal from "./components/ContactModal";

export default function App() {
  // Simple, clean light/dark theme synced with localStorage
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Track active section for Scroll Spy
  const [activeTab, setActiveTab] = useState<string>("about");
  const [viewMode, setViewMode] = useState<"home" | "projects">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ];

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScrollClose = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScrollClose, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollClose);
  }, [mobileMenuOpen]);

  // Sync theme to HTML document classes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("theme-cyber", "theme-emerald", "theme-sunset", "theme-porcelain");
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Console Greeting
  useEffect(() => {
    console.log(
      `%cHey there! 👋 Thanks for inspecting. Check out my code on GitHub.`,
      "color: #2563eb; font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: bold; padding: 8px;"
    );
  }, []);

  // Active scroll spy setup
  useEffect(() => {
    if (viewMode !== "home") {
      setActiveTab("projects");
      return;
    }
    const sections = ["about", "skills", "experience", "projects", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [viewMode]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setViewMode("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (tabId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (tabId === "contact") {
      setIsContactModalOpen(true);
      return;
    }
    if (tabId === "projects") {
      setViewMode("projects");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setViewMode("home");
      setTimeout(() => {
        const el = document.getElementById(tabId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 60);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* 1. Navigation (Fixed Neumorphic Bar) */}
      <nav 
        id="navbar-root"
        className="fixed top-0 left-0 right-0 z-50 pt-3 px-4 transition-all duration-300"
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-14 neu-flat-sm rounded-2xl flex items-center justify-between backdrop-blur-md">
          {/* Logo / Title */}
          <motion.a 
            href="#about" 
            onClick={handleLogoClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 font-mono font-bold text-sm tracking-tight text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold font-mono">
              KM
            </div>
            <span className="font-semibold text-xs tracking-tight truncate max-w-[130px] sm:max-w-none">kidus_mesayt.json</span>
          </motion.a>
 
          {/* Desktop Anchor Links */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-wide">
            {navItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  onClick={(e) => handleNavClick(tab.id, e)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive 
                      ? "neu-pressed-sm text-blue-600 dark:text-blue-400 font-bold" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </a>
              );
            })}
          </div>

          {/* Right menu side - Clean Theme Toggler & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <motion.button
              id="theme-toggler"
              onClick={toggleTheme}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl neu-btn text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              aria-label="Toggle dark/light mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-xl neu-btn text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              ) : (
                <Menu className="w-4 h-4 text-slate-700 dark:text-slate-200" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-dropdown"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="md:hidden max-w-[1100px] mx-auto mt-2 p-2.5 neu-flat rounded-2xl flex flex-col gap-1.5 backdrop-blur-md"
            >
              {navItems.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <a
                    key={tab.id}
                    href={`#${tab.id}`}
                    onClick={(e) => handleNavClick(tab.id, e)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? "neu-pressed-sm text-blue-600 dark:text-blue-400 font-bold"
                        : "neu-btn text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    )}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className={`relative z-10 max-w-[1100px] mx-auto px-4 md:px-6 pt-24 pb-12 ${viewMode === "home" ? "grid grid-cols-12 gap-6" : ""}`}>
        {viewMode === "home" ? (
          <>
            {/* Left Column (Sidebar / Aside) */}
            <aside className="col-span-12 md:col-span-4 flex flex-col gap-6">
              
              {/* About / Hero Card */}
              <motion.section 
                id="about" 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="neu-flat p-6 sm:p-7 rounded-3xl transition-all duration-300"
              >
                {/* Availability Tag with dual pulsing ring */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 neu-pressed-sm rounded-full text-[11px] font-mono font-semibold mb-6 text-blue-600 dark:text-blue-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  Available for Work
                </div>

                {/* Profile Avatar / Title Pair */}
                <div className="flex gap-4 items-center mb-6">
                  <div className="shrink-0 w-14 h-14 rounded-2xl neu-pressed p-1 flex items-center justify-center">
                    <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                      <Terminal className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                      Kidus Mesay
                    </h1>
                    <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                      Software Engineer
                    </p>
                  </div>
                </div>

                {/* Bio description */}
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 mb-6 font-normal">
                  I'm a Software Engineer with a passion for crafting robust, user-focused applications across the stack. I thrive on solving complex problems, optimizing system performance, and writing maintainable code. To stay ahead, I actively integrate AI-assisted development tools into my workflow—not to replace good engineering, but to enhance it. Whether I'm designing APIs, debugging legacy systems, or exploring new technologies, I'm driven by one goal: <strong className="font-bold text-blue-600 dark:text-blue-400">building software that makes a real difference</strong>.
                </p>

                {/* BADGES & SOCIAL LINKS */}
                <div className="flex flex-col gap-2.5 mb-6">
                  <motion.a
                    id="hero-github-link"
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="neu-btn flex items-center justify-between p-3 rounded-2xl text-xs text-slate-700 dark:text-slate-300 font-medium transition duration-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      <span>GitHub Profile</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">github.com</span>
                  </motion.a>
                  
                  <motion.a
                    id="hero-linkedin-link"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="neu-btn flex items-center justify-between p-3 rounded-2xl text-xs text-slate-700 dark:text-slate-300 font-medium transition duration-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin className="w-4 h-4 text-blue-500" />
                      <span>LinkedIn Sync</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">linkedin.com</span>
                  </motion.a>

                  <motion.button
                    id="hero-email-link"
                    onClick={() => setIsContactModalOpen(true)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="neu-btn flex items-center justify-between p-3 rounded-2xl text-xs text-blue-600 dark:text-blue-400 font-medium transition duration-200 cursor-pointer w-full text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Contact Directly</span>
                    </div>
                    <span className="text-[10px] font-mono">Open Pop-up</span>
                  </motion.button>
                </div>

                {/* Quick stats board integrated in sidebar bio */}
                <div className="pt-2 grid grid-cols-2 gap-2.5">
                  <div className="neu-pressed-sm p-3 rounded-xl">
                    <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 block uppercase mb-0.5">
                      Coding Since
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">3+ Years</span>
                  </div>
                  <div className="neu-pressed-sm p-3 rounded-xl">
                    <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 block uppercase mb-0.5">
                      Location
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-600" /> Addis Ababa
                    </span>
                  </div>
                  <div className="neu-pressed-sm p-3 rounded-xl">
                    <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 block uppercase mb-0.5">
                      Prime Focus
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Fullstack Dev</span>
                  </div>
                  <div className="neu-pressed-sm p-3 rounded-xl">
                    <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 block uppercase mb-0.5">
                      Status
                    </span>
                    <span className="text-xs font-semibold font-mono text-emerald-600 dark:text-emerald-400">Active Engineer</span>
                  </div>
                </div>
              </motion.section>

              {/* Timeline Experience block */}
              <ExperienceTimeline />
            </aside>

            {/* Right Column (Main content elements) */}
            <div className="col-span-12 md:col-span-8 flex flex-col gap-6">

              {/* Core tech stack card */}
              <TechStack />

              {/* Unified Project and Build Cards Grid Section */}
              <CollegeProjectCards onViewProjects={() => { setViewMode("projects"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />

              {/* Contact Prompt Section (Triggers Popup) */}
              <motion.section 
                id="contact" 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="neu-flat rounded-3xl p-6 sm:p-7 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      // Direct Connect
                    </h2>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-1">
                      Let's Build Something Together
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                      Interested in software engineering roles, fullstack systems, or technical architecture. Click to launch the contact modal.
                    </p>
                  </div>

                  <motion.button
                    id="open-contact-popup-btn"
                    onClick={() => setIsContactModalOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-3 rounded-2xl neu-btn text-xs font-mono font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2 cursor-pointer self-start sm:self-center shrink-0 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Contact Pop-up</span>
                  </motion.button>
                </div>
              </motion.section>
            </div>
          </>
        ) : (
          <div className="w-full">
            <ProjectsPage 
              onBack={() => { setViewMode("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
              isDark={isDark} 
              onOpenContact={() => setIsContactModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* 8. Footer */}
      <footer className="relative z-10 py-10 transition-colors duration-300">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col items-center justify-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 text-center">
          <div>
            &copy; {currentYear} Kidus Mesay. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Contact Pop-up Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
