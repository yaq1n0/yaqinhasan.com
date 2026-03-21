import { CVProject } from "../models/Project";

// Array order = CV display order. Each entry's key is the GitHub repo name.
// Only repos listed here appear in the CV.
export const cvOverrides: Record<string, Partial<CVProject>> = {
  CryptIt: {
    name: "CryptIt • Desktop app",
    description: "Cryptographically secure secret splitting & reconstruction desktop app built with Rust & Tauri.",
    keywords: ["Rust", "Tauri", "Vue", "Cryptography", "Desktop App Development"]
  },
  TrayRunner: {
    name: "TrayRunner • macOS app",
    description: "Spotlight-inspired menu bar utility for launching & scheduling local script-based workflows, built with Swift & SwiftUI.",
    keywords: ["Swift", "SwiftUI", "macOS Development", "Desktop App Development", "Shell Scripting"]
  },
  "opl-py": {
    name: "opl-py • PyPI package",
    description:
      "Open source Python SDK and dockerised web app for querying and analysing OpenPowerlifting data, with performance prediction using machine learning",
    keywords: ["Python", "FastAPI", "React", "Docker", "scikit-learn", "PyTorch", "PyPI", "Machine Learning", "Data analytics"]
  },
  "prompt-as-endpoint": {
    name: "prompt-as-endpoint • npm library",
    description: "Open source TypeScript library for building AI-powered APIs with runtime schema validation, prompt templating, and output validation.",
    keywords: ["TypeScript", "AI", "LLM", "REST API", "Zod", "npm", "Developer Experience"]
  },
  STQL: {
    name: "STQL • Interpreter",
    description: "Interpreter for a custom SQL-inspired RDF querying language, implemented in Haskell",
    keywords: ["Haskell", "Interpreter Design", "Compiler Theory", "Formal Language Theory"]
  },
  ThymPi: {
    name: "ThymPi • Research project",
    description: "Proof-of-concept robotics platform using sensor data to augment visual navigation systems for autonomously navigating robots.",
    keywords: ["Python", "OpenCV", "Machine Vision", "Robotics", "Autonomous Navigation", "Final year project"]
  }
};
