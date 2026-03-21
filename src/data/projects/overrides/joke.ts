import { FullProject } from "../../models/Project";

export const jokeOverrides: Record<string, Partial<FullProject>> = {
  "voidapply.com": {
    description: "Satirical job board with parody ATS interfaces — fill out an application and get rejected immediately.",
    category: "Joke",
    status: "Complete",
    keywords: ["TypeScript", "Web Development"],
    order: 1
  },
  DownloadBetterGPU: {
    description: "Download a better GPU of your choice onto your computer, FREE — a satirical web page.",
    category: "Joke",
    status: "Complete",
    keywords: ["HTML", "CSS", "Web Development"],
    order: 2
  }
};
