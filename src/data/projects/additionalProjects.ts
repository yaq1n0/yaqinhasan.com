import type { FullProject } from "@/data/models/Project";

// Projects not in cv.json that we want on the portfolio website
export const additionalProjects: FullProject[] = [
  {
    name: "VidSrcWrapper • TMDB search and VidSrc streaming web app",
    description: "Self-hostable full-stack web application that searches TMDB and streams content via VidSrc, packaged with Docker.",
    keywords: ["Vue", "Hono", "TypeScript", "Docker", "Full-Stack"],
    type: "Web App",
    status: "Complete",
    url: "https://github.com/yaq1n0/VidSrcWrapper"
  },
  {
    name: "yaqinhasan.com • Portfolio site",
    id: "yaqinhasan.com",
    description: "Portfolio with dynamically rendered CV, terminal UI for interactive navigation and extensive theming system.",
    keywords: ["Vue", "Vite", "TypeScript", "Web Development"],
    type: "Web App"
  },
  {
    name: "pwordgen.com & pwordgen (npm package)",
    description: "Lightweight password generation web utility backed by a published npm package",
    keywords: ["Vue", "Vite", "TypeScript", "npm", "Package Development"],
    type: "Web App"
  }
];
