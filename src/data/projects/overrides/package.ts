import { withCategory } from "./withCategory";

export const packageOverrides = withCategory("Package", {
  "opl-py": {
    status: "In Progress",
    keywords: ["Python", "FastAPI", "React", "Docker", "scikit-learn", "PyTorch", "PyPI", "Machine Learning", "Data analytics"],
    order: 2
  },
  "prompt-as-endpoint": {
    status: "In Progress",
    keywords: ["TypeScript", "AI", "LLM", "REST API", "Zod", "npm", "Developer Experience"],
    order: 3
  },
  pwordGen: {
    status: "Complete",
    keywords: ["TypeScript", "npm", "Package Development"],
    order: 4
  }
});
