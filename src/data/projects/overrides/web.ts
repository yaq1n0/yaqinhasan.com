import { withCategory } from "./withCategory";

export const webOverrides = withCategory("Web", {
  VidSrcWrapper: {
    status: "Complete",
    keywords: ["Vue", "Hono", "TypeScript", "Docker", "Full Stack"],
    order: 1
  },
  LinkBlitzer: {
    status: "In Progress",
    keywords: ["Vue", "Vite", "TypeScript", "Browser Extension", "Web Development"],
    order: 2
  },
  "yaqinhasan.com": {
    status: "Complete",
    keywords: ["Vue", "Vite", "TypeScript", "Web Development"],
    order: 3
  },
  "pwordGen.com": {
    status: "Complete",
    keywords: ["Vue", "Vite", "TypeScript", "npm", "Package Development"],
    order: 4
  }
});
