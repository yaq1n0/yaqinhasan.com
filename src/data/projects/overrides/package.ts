import { FullProject } from "../../models/Project";

export const packageOverrides: Record<string, Partial<FullProject>> = {
  pwordGen: {
    description: "TypeScript-native password generation npm package for browser and Node.js environments",
    category: "Package",
    status: "Complete",
    keywords: ["TypeScript", "npm", "Package Development"],
    order: 1
  },
  "prompt-as-endpoint": {
    description: "Open source TypeScript library for building AI-powered APIs with runtime schema validation, prompt templating, and output validation.",
    category: "Package",
    status: "In Progress",
    keywords: ["TypeScript", "AI", "LLM", "REST API", "Zod", "npm", "Developer Experience"],
    order: 2
  }
};
