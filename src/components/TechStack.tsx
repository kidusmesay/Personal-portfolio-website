import React from "react";
import { motion } from "motion/react";
import { techSkills } from "../data";

// Beautiful SVG paths for standard technologies to give that "senior staff engineer / GitHub meets Notion" visual polish.
const techIcons: Record<string, React.ReactNode> = {
  React: (
    <svg className="w-10 h-10" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>React</title>
      <circle cx="0" cy="0" r="2.05" fill="#2563EB" />
      <g stroke="#2563EB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  /*
  "Next.js": (
    <svg className="w-10 h-10" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Next.js</title>
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="90" cy="90" r="90" fill="currentColor" className="text-slate-900 dark:text-white" />
        <path d="M149.508 157.52L86.24 71.3216H71.3216V108.681H81.2586V83.9936L138.868 162.77C142.6 161.218 146.166 159.458 149.508 157.52Z" fill="white" />
        <path d="M115 62V118H125V62H115Z" fill="url(#paint0_linear)" />
      </g>
      <defs>
        <linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),*/

  "Node.js": (
    <svg className="w-10 h-10" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>Node.js</title>
      <path d="M128 0L32 55.4v110.8l96 55.4 96-55.4V55.4L128 0zm73.9 148.5L128 191l-73.9-42.5V70.6L128 28.1l73.9 42.5v77.9z" fill="#15803d" />
      <path d="M128 42.2L66.1 77.9v71.4l61.9 35.7 61.9-35.7V77.9L128 42.2zm48 100.8l-48 27.7-48-27.7V86.7l48-27.7 48 27.7v56.3z" fill="#22c55e" />
    </svg>
  ),
  Python: (
    <svg className="w-10 h-10" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Python</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M55.0003 10C29.6206 10 31.311 20.9701 31.311 20.9701L31.3283 32.2223H55.3341C68.4965 32.2223 72.8223 37.1979 72.8223 50.1973V53.6491C72.8223 53.6491 83.4716 53.2504 90.7258 45.421C97.9801 37.5916 97.433 21.0354 97.433 21.0354C97.433 21.0354 94.6148 10 55.0003 10ZM41.0113 21.0505C43.7663 21.0505 45.9996 23.2831 45.9996 26.0381C45.9996 28.7931 43.7663 31.0264 41.0113 31.0264C38.2563 31.0264 36.0229 28.7931 36.0229 26.0381C36.0229 23.2831 38.2563 21.0505 41.0113 21.0505Z" fill="#2563EB" />
      <path fillRule="evenodd" clipRule="evenodd" d="M54.9997 100C80.3794 100 78.689 89.0299 78.689 89.0299L78.6717 77.7777H54.6659C41.5035 77.7777 37.1777 72.8021 37.1777 59.8027V56.3509C37.1777 56.3509 26.5284 56.7496 19.2742 64.579C12.0199 72.4084 12.567 88.9646 12.567 88.9646C12.567 88.9646 15.3852 100 54.9997 100ZM68.9887 88.9495C66.2337 88.9495 64.0004 86.7169 64.0004 83.9619C64.0004 81.2069 66.2337 78.9736 68.9887 78.9736C71.7437 78.9736 73.9771 81.2069 73.9771 83.9619C73.9771 86.7169 71.7437 88.9495 68.9887 88.9495Z" fill="#F59E0B" />
    </svg>
  ),
  TypeScript: (
    <svg className="w-10 h-10 rounded" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>TypeScript</title>
      <rect width="100" height="100" rx="12" fill="#2563EB" />
      <text x="85" y="85" fill="white" fontFamily="Inter, sans-serif" fontWeight="bold" fontSize="42" textAnchor="end">TS</text>
    </svg>
  ),
  Java: (
    <svg className="w-10 h-10" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Java</title>
      <path d="M41.7 106.2c-5-1.5-8.5-4.1-10-8-.8-2-1.1-4.7-.5-6.6a19 19 0 014.2-7c3-3.1 7-5.5 14-8 17-6 29-7 44.4-3.5 13 3 16.5 5.5 18 11.5 1 4.5.3 8.3-2.5 12-4 5.3-12.8 8.4-23.7 8.4a71 71 0 01-18.7-2.6 15 15 0 01-1.3-.3 18.2 18.2 0 01-2 1.3c-2.4 1-5.3 2-8.3 2.7-3.6.7-10.4 1-13.6.6v-.1zm3-6.4c5.1 2.3 21 3.5 30 2.2 4.1-.6 7-.1 9-.6 1.4-.4 2.8-.7 4.1-1a37 37 0 00-11-1.4c-15.6 0-31 3.7-32.1.8zm36.5-17.5c-15-5-31.5-4.5-41.2-.5-3.3 1.3-4.1 2.1-4 3.7 0 1.2 1 2.3 3.3 3 10.3 3 25-1.1 41.9-6.2z" fill="#EF4444" />
      <path d="M86.6 44a99.4 99.4 0 015 18.4c-4.4.2-12-1-20.7-3.1-13.8-3.4-22.5-4.1-30.8-.2a13 13 0 00-6.1 6.3c-1.3 3.6-.1 7.2 3.4 9.4 5.2 3.3 13.9 4.1 24.2 2.3 12.3-2.1 27.2.3 34.3 5.4 1 1 2.4 1.4 3.6 2.4l1-1.3c-2-3-4.5-5.3-7.6-7.1h-.2a43.6 43.6 0 0113.6-1.5c4 .4 5.6.2 5.5-1.1a15.7 15.7 0 00-1.8-6.4 55 55 0 00-19.4-26c-1.8-1.5-3.6-3.1-5-7.4z" fill="#EF4444" />
      <path d="M72 1c-1-1 3.8 11.2-.8 18.6a24.1 24.1 0 01-11.8 9.3c-2 .8-5 .4-5-.6 0-3 3.7-7.7 5.6-10 4-4.8 11-15.1 12-17.3z" fill="#3B82F6" />
    </svg>
  ),
  /*
  AWS: (
    <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>AWS</title>
      <path d="M125.7 184.2c-15.1 0-26.6-4.5-34.6-13.4-6.3-7.1-9.5-16.7-9.5-28.9s3.2-22.2 9.6-29.3c8.1-9 19.3-13.5 33.6-13.5 13.7 0 24.3 4 31.9 12.1v-8.8c0-11-2.9-19-8.7-24-5.8-5-15.2-7.5-28.2-7.5-11.8 0-23.7 2.3-35.6 7l-5.4-15c13.7-5.5 28.5-8.2 44.3-8.2 20.3 0 35.3 4.5 45.1 13.5s14.7 22.8 14.7 41.5v72.5c0 5 .8 11 2.4 18h-18.4a57.2 57.2 0 01-2-12c-7.9 9-19.1 13.5-33.5 13.5zM128 116.5c-9 0-15.8 2.5-20.2 7.4-4.5 4.9-6.7 11.5-6.7 19.6 0 8.3 2.1 14.7 6.3 19.3s10.3 6.9 18.1 6.9c7.6 0 14-2.6 19-7.8s7.6-12 7.6-20.2v-11.1c-5.8-9.1-13.9-14.1-24.1-14.1z" fill="currentColor" className="text-slate-900 dark:text-white" />
      <path d="M44 200c50.8 33.4 117.2 44 168 28.8a183.8 183.8 0 0028.4-11l3.6 11.5c-11.5 5.2-24.3 9.4-38.6 12.5a208 208 0 01-163.6-28.4L44 200z" fill="#F59E0B" />
      <path d="M22.5 186.2l12-3.4 12.5 27.2c.8 1.9.4 3-1.2 2.6l-28.5-17c-1.3-.8-1.1-2 .8-2.3l4.4-.3" fill="#F59E0B" />
    </svg>
  ),
  Docker: (
    <svg className="w-10 h-10" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>Docker</title>
      <path d="M246 109.5c-5-19.3-21.5-30-41.5-30-2 0-4 .1-6 .4C190.4 56.4 167 43 140 43c-3 0-5 2-5 5v52H99V81c0-3-2-5-5-5H75v24H39v-7c0-3-2-5-5-5H15v13c0 9.8 1.8 19.3 5 28.3C11.5 134 3 145.4 3 158.5c0 35.8 37.8 49.5 96 49.5 73.2 0 115.5-22.6 137.4-60 9.1-2.9 14.2-12.2 16.6-19.5 2.6-7.8 2.2-12-.4-19zM55 95h14v14H55V95zm0 19h14v14H55v-14zm-20 0h14v14H35v-14zm0-19h14v14H35V95zm40 38H61v-14h14v14zm0-19v-14h14v14H75zm20 19H81v-14h14v14zm0-19v-14h14v14H95zm20-19h14v14h-14V76zm0 19h14v14h-14V95zm0 19h14v14h-14v-14zM81 76h14v14H81V76z" fill="#0EA5E9" />
    </svg>
  ),
  */
  PostgreSQL: (
    <svg className="w-10 h-10" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>PostgreSQL</title>
      <path d="M129.1 40c-26.6 0-48.2 14.6-56.1 35.1-.3.8-.5 1.7-.5 2.6V88v1.3c0 7.4 3 14.6 8.3 19.9s12.5 8.3 19.9 8.3h3.5v3.1c0 6.6-4 12.3-9.9 14.1-.7.2-1.3.4-2 .4h-.5V147c0 4.1 1.6 8 4.6 10.9s6.8 4.6 10.9 4.6h38a42.4 42.4 0 0042.4-42.4v-43a1.4 1.4 0 00-.1-.5 56.5 56.5 0 00-11-20.1C164.2 48.6 148 40 129.1 40zm14.1 36.6H129c-5.8 0-11.3-2.3-15.4-6.4S107.2 61 107.2 55a22.1 22.1 0 0144.2 0c0 5-5.3 16.6-8.2 21.6zm23.6 51.5c-4.4 0-8.6-1.7-11.7-4.8a16.5 16.5 0 010-23.4l1.3-1.3c4.4 3.7 9.9 5.8 15.6 5.8s11.2-2.1 15.6-5.8l1.3 1.3c3.1 3.1 4.8 7.3 4.8 11.7s-1.7 8.6-4.8 11.7a16.5 16.5 0 01-22.1 4.8z" fill="#334155" className="text-slate-700 dark:text-slate-200" />
      <path d="M128 0a128 128 0 110 256 128 128 0 010-256zm-17.5 97.4a43.5 43.5 0 0021.7 10c14.6-.9 28.1-10 32-23.5V60.6c-4-4.8-11.3-7.7-18-7.7-27.1 0-41.2 24.3-41.2 46.5 0 14 3 24.7 5.5 24.7s3.1-13.6 0-26.7z" fill="#0284C7" />
    </svg>
  ),
  /*
  MongoDB: (
    <svg className="w-10 h-10" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>MongoDB</title>
      <path d="M117.2 11.2c2.1-4.2 5.8-7.6 10.3-9.4 4.5 1.8 8.2 5.2 10.3 9.4C179 93.6 179.8 150 162.1 190.3a246 246 0 01-34.1 54.4 246 246 0 01-34.1-54.4C76.2 150 77 93.6 117.2 11.2z" fill="#10B981" />
      <path d="M117.2 11.2c2.1-4.2 5.8-7.6 10.3-9.4v238.4a246 246 0 01-34.1-54.4C76.2 150 77 93.6 117.2 11.2z" fill="#047857" />
      <path d="M125 44a95 95 0 00-11.3 54c-1.3 19 6.2 38.3 11.3 53 1.3.1 3 .1 4.5 0a95 95 0 0011.3-54c1.3-19-6.2-38.3-11.3-53H125z" fill="#34D399" />
    </svg>
  ),
  GraphQL: (
    <svg className="w-10 h-10" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>GraphQL</title>
      <path d="M50 1.7L7.8 26v48L50 98.3l42.2-24.3v-48L50 1.7zm33.5 69.1l-33.5 19.3-33.5-19.3V31.2l33.5-19.3 33.5 19.3v39.6z" fill="#E10098" />
      <circle cx="50" cy="11.7" r="9" fill="#E10098" />
      <circle cx="16.7" cy="69.4" r="9" fill="#E10098" />
      <circle cx="83.3" cy="69.4" r="9" fill="#E10098" />
      <path d="M50 22v56M25.7 35.7l48.6 28.6M74.3 35.7L25.7 64.3" stroke="#E10098" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  */
  Git: (
    <svg className="w-10 h-10" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>Git</title>
      <path d="M96.3 46L54 3.7c-2-2-5.3-2-7.3 0L38.4 12l10.9 10.9c2-.5 4.5.1 6.2 1.8 1.8 1.8 2.3 4.4 1.8 6.5l10.9 10.9c2.1-.5 4.7 0 6.5 1.8 2.5 2.5 2.5 6.5 0 9s-6.5 2.5-9 0c-1.8-1.8-2.3-4.4-1.8-6.5L53 35.6c-.5.1-.9.2-1.4.2V62c1.4.7 2.4 2.2 2.4 3.9 0 2.5-2 4.5-4.5 4.5S45 68.4 45 65.9c0-1.7 1-3.2 2.4-3.9v-26c-1.4-.7-2.4-2.2-2.4-3.9 0-1.2.5-2.3 1.3-3.1l-10.9-10.9L3.7 46c-2 2-2 5.3 0 7.3L46 96.3c2 2 5.3 2 7.3 0L96.3 53.3c2-2 2-5.3 0-7.3z" fill="#F05032" />
    </svg>
  )
};

export default function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills" className="neu-flat text-slate-800 dark:text-slate-100 rounded-3xl p-6 sm:p-7 transition-all duration-300">
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        // Core Tech Stack
      </h2>

      <motion.div
        className="grid grid-cols-4 sm:grid-cols-6 gap-5 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {techSkills.map((skill) => (
          <motion.div
            key={skill.name}
            id={`tech-skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl neu-btn flex items-center justify-center transition-all duration-200">
              <div className="flex items-center justify-center h-8 w-8 transition-transform duration-200 group-hover:scale-110">
                {techIcons[skill.name] || (
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-mono font-bold">
                    {skill.name.slice(0, 3)}
                  </div>
                )}
              </div>
            </div>
            <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight truncate max-w-full group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
