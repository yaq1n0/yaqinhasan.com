import { withCategory } from "./withCategory";

export const webOverrides = withCategory("Web", {
  "mikoshidb.net": {
    status: "Complete",
    keywords: ["Vue", "Vite", "TypeScript", "WebLLM", "WebGPU", "RAG"],
    order: 1
  },
  VidSrcWrapper: {
    status: "Complete",
    keywords: ["Vue", "Hono", "TypeScript", "Docker", "Full Stack"],
    order: 2
  },
  LinkBlitzer: {
    status: "In Progress",
    keywords: ["Vue", "Vite", "TypeScript", "Browser Extension", "Web Development"],
    order: 3
  },
  "yaqinhasan.com": {
    status: "Complete",
    keywords: ["Vue", "Vite", "TypeScript", "Web Development"],
    order: 4
  },
  "pwordGen.com": {
    status: "Complete",
    keywords: ["Vue", "Vite", "TypeScript", "npm", "Package Development"],
    order: 5
  },
  TableTopBots: {
    status: "Complete",
    keywords: ["Python", "FastAPI", "React", "Full Stack"],
    order: 6
  },
  "princesstreatment.now": {
    status: "Complete",
    keywords: ["React", "Vite", "TypeScript", "Web Development"],
    order: 7
  }
});
