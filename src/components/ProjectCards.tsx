import { motion } from "motion/react";
import { projectEntries, currentlyBuildingProject } from "../data";
import { ExternalLink, Github, Terminal } from "lucide-react";

interface ProjectCardsProps {
  onViewProjects?: () => void;
}

export default function ProjectCards({ onViewProjects: _onViewProjects }: ProjectCardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Extract separate projects for precise placement
  const firstProject = projectEntries[0];
  const secondProject = projectEntries[1];
  const thirdProject = projectEntries[2];

  return (
    <section id="projects" className="transition-all duration-300">
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        // Projects & Active Builds
      </h2>

      {/* Grid of 2 columns */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Project 1 Card */}
        {firstProject && (
          <motion.div
            id="project-card-0"
            variants={cardVariants}
            whileHover={{ y: -2 }}
            className="neu-flat rounded-3xl p-6 flex flex-col justify-between transition-all duration-200"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 leading-tight text-sm">
                  {firstProject.title}
                </h3>
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 neu-pressed-sm px-2.5 py-0.5 rounded-lg">
                  {firstProject.tags[0]}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {firstProject.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {firstProject.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    #{tag.toLowerCase().replace(" ", "")}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200/40 dark:border-slate-800/40">
              <a
                href={firstProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center neu-btn text-blue-600 dark:text-blue-400 text-[11px] font-mono font-bold rounded-xl uppercase tracking-wider transition-all"
              >
                Live Demo
              </a>
              <a
                href={firstProject.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center neu-btn text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-[11px] font-mono font-bold rounded-xl uppercase tracking-wider transition-all"
              >
                Code
              </a>
            </div>
          </motion.div>
        )}

        {/* Project WIP Card (Under Construction Status with Progress Bar) */}
        <motion.div
          id="currently-building"
          variants={cardVariants}
          whileHover={{ y: -2 }}
          className="neu-flat rounded-3xl p-6 flex flex-col justify-between transition-all duration-200"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">🚧</span>
              <h3 className="text-slate-900 dark:text-slate-100 font-bold text-sm tracking-tight">{currentlyBuildingProject.title}</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4">
              {currentlyBuildingProject.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {currentlyBuildingProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-medium neu-pressed-sm text-blue-600 dark:text-blue-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-auto pt-2">
            <div className="flex justify-between text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase mb-2">
              <span>{currentlyBuildingProject.status}</span>
              <span>{currentlyBuildingProject.progress}%</span>
            </div>
            <div className="h-2 neu-pressed-sm rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${currentlyBuildingProject.progress}%` }}
                role="progressbar"
                aria-valuenow={currentlyBuildingProject.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </motion.div>

        {/* Project 2 Card */}
        {secondProject && (
          <motion.div
            id="project-card-1"
            variants={cardVariants}
            whileHover={{ y: -2 }}
            className="neu-flat rounded-3xl p-6 flex flex-col justify-between transition-all duration-200"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 leading-tight text-sm">
                  {secondProject.title}
                </h3>
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 neu-pressed-sm px-2.5 py-0.5 rounded-lg">
                  {secondProject.tags[0]}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {secondProject.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {secondProject.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    #{tag.toLowerCase().replace(" ", "")}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200/40 dark:border-slate-800/40">
              <a
                href={secondProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center neu-btn text-blue-600 dark:text-blue-400 text-[11px] font-mono font-bold rounded-xl uppercase tracking-wider transition-all"
              >
                Live Demo
              </a>
              <a
                href={secondProject.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center neu-btn text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-[11px] font-mono font-bold rounded-xl uppercase tracking-wider transition-all"
              >
                Code
              </a>
            </div>
          </motion.div>
        )}

        {/* Project 3 Card - Spanning 2 columns on desktop styled elegantly with a horizontal view */}
        {thirdProject && (
          <motion.div
            id="project-card-2"
            variants={cardVariants}
            whileHover={{ y: -2 }}
            className="neu-flat rounded-3xl p-6 col-span-1 md:col-span-2 transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
              <div className="w-14 h-14 neu-pressed rounded-2xl flex items-center justify-center shrink-0">
                <Terminal className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-grow flex flex-col justify-between w-full">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {thirdProject.title}
                    </h3>
                    <div className="flex gap-2">
                      {thirdProject.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 neu-pressed-sm px-2.5 py-0.5 rounded-lg uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {thirdProject.description}
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href={thirdProject.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neu-btn px-4 py-2 rounded-xl text-xs font-mono font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    View Source
                  </a>
                  <a
                    href={thirdProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neu-btn px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-800 dark:text-slate-200 inline-flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Docs & Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
