import type { FullProject } from "@/data/models/Project";

// Projects not in cv.json that we want on the portfolio website
export const additionalProjects: FullProject[] = [
  {
    name: "VidSrcWrapper • Self-hostable media site",
    description: "Searches TMDB and stream content via VidSrc (proxied for security), dockerised full stack web app.",
    keywords: ["Vue", "Hono", "TypeScript", "Docker", "Full Stack"],
    type: "Web",
    status: "Complete",
    url: "https://github.com/yaq1n0/VidSrcWrapper"
  },
  {
    name: "yaqinhasan.com • Portfolio site",
    id: "yaqinhasan.com",
    description: "Portfolio with dynamically rendered CV, terminal UI for interactive navigation and extensive theming system.",
    keywords: ["Vue", "Vite", "TypeScript", "Web Development"],
    type: "Web",
    status: "Complete",
    url: "https://github.com/yaq1n0/yaqinhasan.com"
  },
  {
    name: "PwordGen • Lightweight password generator",
    description: "Lightweight password generation web utility at pwordgen.com backed by the pwordgen npm package",
    keywords: ["Vue", "Vite", "TypeScript", "npm", "Package Development"],
    type: "Web",
    status: "Complete",
    url: "https://github.com/yaq1n0/pwordgen.com"
  },
  {
    name: "LinkBlitzer • Link bundler & opener",
    description: "Bundle, save & share links easily, with a browser extension to quickly open multiple links simultaneously.",
    keywords: ["Vue", "Vite", "TypeScript", "Browser Extension", "Web Development"],
    type: "Web",
    status: "In Progress",
    url: "https://github.com/yaq1n0/LinkBlitzer"
  }
];
