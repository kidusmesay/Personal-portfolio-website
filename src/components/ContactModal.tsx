import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Send, 
  Linkedin, 
  Github, 
  MapPin, 
  Clock, 
  Sparkles,
  MessageSquare
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full-Time Opportunity",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const emailAddress = "kidusmesayt@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format mailto link with encoded parameters
    const subjectLine = encodeURIComponent(`[Portfolio Contact] ${formData.subject} - from ${formData.name || "Colleague"}`);
    const bodyContent = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      window.location.href = `mailto:${emailAddress}?subject=${subjectLine}&body=${bodyContent}`;
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="contact-modal-portal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm transition-all"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto neu-flat rounded-3xl p-6 sm:p-8 z-10 shadow-2xl"
          >
            {/* Header: Title and Close button */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    Direct Channel
                  </span>
                </div>
                <h2 
                  id="contact-modal-title" 
                  className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
                >
                  Let's Connect & Build
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Have a role, consulting inquiry, or technical system to discuss? Reach out below.
                </p>
              </div>

              <motion.button
                id="contact-modal-close-btn"
                onClick={onClose}
                whileTap={{ scale: 0.92 }}
                className="p-2.5 rounded-2xl neu-btn text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors cursor-pointer shrink-0"
                aria-label="Close contact modal"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Quick Action Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {/* Email Direct & Copy */}
              <div className="neu-pressed-sm p-3.5 rounded-2xl flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 block uppercase">
                    Direct Email
                  </span>
                  <a 
                    href={`mailto:${emailAddress}`}
                    className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline truncate block"
                    title={emailAddress}
                  >
                    {emailAddress}
                  </a>
                </div>
                <motion.button
                  onClick={handleCopyEmail}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl neu-btn text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer shrink-0"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </motion.button>
              </div>

              {/* Status / Location Tag */}
              <div className="neu-pressed-sm p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 block uppercase">
                    Availability
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Available for Roles
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 block uppercase">
                    Location
                  </span>
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1 justify-end">
                    <MapPin className="w-3 h-3 text-blue-500" /> Addis Ababa
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Send Message Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="contact-name" className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Chen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neu-pressed-sm text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neu-pressed-sm text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject / Topic
                </label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl neu-pressed-sm text-xs text-slate-800 dark:text-slate-100 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  <option value="Full-Time Opportunity" className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">Full-Time Software Engineer Opportunity</option>
                  <option value="Contract / Freelance" className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">Contract / Freelance Project</option>
                  <option value="Technical Collaboration" className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">Technical Collaboration / Architecture</option>
                  <option value="General Inquiry" className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Tell me about your project, team, or role details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl neu-pressed-sm text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                {submitSuccess ? (
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    <Check className="w-4 h-4" /> Opening email client...
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    Quick response guaranteed
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 neu-btn text-xs font-mono font-bold text-blue-600 dark:text-blue-400 rounded-xl inline-flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? "Routing..." : "Send Message"}
                </motion.button>
              </div>
            </form>

            {/* Social Channels footer */}
            <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Find Me On
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl neu-btn text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors inline-flex items-center gap-1.5 text-xs font-mono"
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl neu-btn text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 text-xs font-mono"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
