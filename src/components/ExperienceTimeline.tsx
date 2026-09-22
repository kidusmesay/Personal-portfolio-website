import { motion } from "motion/react";
import { jobEntries } from "../data";
import { Briefcase, Calendar } from "lucide-react";

export default function ExperienceTimeline() {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -15, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <section id="experience" className="neu-flat rounded-3xl p-6 sm:p-7 overflow-hidden transition-all duration-300">
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        // Experience History
      </h2>

      {/* Vertical Timeline container */}
      <div className="space-y-6 relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-300/70 dark:bg-slate-800" />
        
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6 text-slate-800 dark:text-slate-100"
        >
          {jobEntries.map((job, index) => (
            <motion.div
              key={job.id}
              id={`job-item-${index}`}
              variants={itemVariants}
              whileHover={{ x: 2 }}
              className="relative pl-8 group"
            >
              {/* Timeline Dot */}
              <div 
                className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                  index === 0 
                  ? "bg-blue-600 dark:bg-blue-500 ring-4 ring-blue-500/20 shadow-sm" 
                  : "bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500"
                }`}
                aria-hidden="true"
              />

              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {job.title}
                </h3>
                <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 neu-pressed-sm px-2.5 py-0.5 rounded-lg whitespace-nowrap">
                  {job.dateRange}
                </span>
              </div>
              
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mb-2">
                {job.company}
              </p>

              {/* Job Bullets */}
              <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {job.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} className="flex gap-1.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold select-none">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
