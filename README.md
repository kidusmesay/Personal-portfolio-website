# Kidus Mesay — Software Engineer Portfolio

A minimalist, neumorphic developer portfolio and case-study explorer showcasing full-stack engineering work, system architecture breakdowns, and technical history.

---

## ✨ Features

- **Tactile Neumorphic Design**: Custom dual-shadow light and dark surface tokens (`neu-flat`, `neu-pressed`, `neu-btn`) creating organic, soft depth without visual clutter.
- **Theme Toggle**: Seamless switching between soft stone light mode (`#eef2f6`) and matte obsidian dark mode (`#12151c`).
- **Deep Architecture Case Studies**: Interactive deep-dives into project architectures, technical bottlenecks, system blueprints, and metric benchmarks.
- **Interactive Tech Stack**: Filterable and animated badges highlighting core frontend, backend, database, and devops capabilities.
- **Experience Timeline**: Career history covering full-stack, backend, and engineering roles.
- **Responsive & Accessible**: Mobile-friendly layout with fluid typography, proper contrast, and keyboard navigation.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `bun`

### Installation

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite development server on port `3000` |
| `npm run build` | Compiles TypeScript and creates an optimized production bundle in `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Removes `dist/` build artifacts |

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── ExperienceTimeline.tsx  # Work history & career milestone timeline
│   │   ├── ProjectCards.tsx        # Overview cards for highlighted builds
│   │   ├── ProjectsPage.tsx        # Case study explorer & architecture modal
│   │   └── TechStack.tsx           # Visual grid of technical skills & tools
│   ├── App.tsx                     # Main application layout & hero profile
│   ├── data.ts                     # Portfolio data (projects, experience, skills)
│   ├── index.css                   # Global Tailwind imports & neumorphic tokens
│   ├── main.tsx                    # React DOM entry point
│   └── types.ts                    # Shared TypeScript types & interfaces
├── index.html                      # HTML entry template & SEO meta tags
├── metadata.json                   # AI Studio app metadata
├── package.json                    # Project scripts & dependencies
└── tsconfig.json                   # TypeScript configuration
```

---

## 📬 Contact & Links

- **Name**: Kidus Mesay
- **Role**: Software Engineer
- **Email**: [kidusmesayt@gmail.com](mailto:kidusmesayt@gmail.com)
- **LinkedIn**: [linkedin.com/in/kidusmesay](https://linkedin.com)
- **GitHub**: [github.com](https://github.com)
