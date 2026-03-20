export interface CVOverride {
  name?: string; // override display name for CV
  description?: string; // override description for CV (short/professional)
  keywords?: string[]; // override keywords for CV
}

// Array order = CV display order. Each entry's key is the GitHub repo name.
// Only repos listed here appear in the CV.
export const cvOverrides: { id: string; overrides?: CVOverride }[] = [
  {
    id: "CryptIt",
    overrides: {
      name: "CryptIt • Desktop app",
      description: "Cryptographically secure secret splitting & reconstruction desktop app built with Rust & Tauri.",
      keywords: ["Rust", "Tauri", "Vue", "Cryptography", "Desktop App Development"]
    }
  },
  {
    id: "TrayRunner",
    overrides: {
      name: "TrayRunner • macOS app",
      description: "Spotlight-inspired menu bar utility for launching & scheduling local script-based workflows, built with Swift & SwiftUI.",
      keywords: ["Swift", "SwiftUI", "macOS Development", "Desktop App Development", "Shell Scripting"]
    }
  },
  {
    id: "STQL",
    overrides: {
      name: "STQL • Interpreter",
      description: "Interpreter for a custom SQL-inspired RDF querying language, implemented in Haskell",
      keywords: ["Haskell", "Interpreter Design", "Compiler Theory", "Formal Language Theory"]
    }
  },
  {
    id: "opl-py",
    overrides: {
      name: "opl-py • PyPI package",
      description:
        "Open source Python SDK and dockerised web app for querying and analysing OpenPowerlifting data, with performance prediction using machine learning",
      keywords: ["Python", "FastAPI", "React", "Docker", "scikit-learn", "PyTorch", "PyPI", "Machine Learning", "Data analytics"]
    }
  },
  {
    id: "prompt-as-endpoint",
    overrides: {
      name: "prompt-as-endpoint • npm library",
      description: "Open source TypeScript library for building AI-powered APIs with runtime schema validation, prompt templating, and output validation.",
      keywords: ["TypeScript", "AI", "LLM", "REST API", "Zod", "npm", "Developer Experience"]
    }
  },
  {
    id: "ThymPi",
    overrides: {
      name: "ThymPi • Research project",
      description: "Proof-of-concept robotics platform using sensor data to augment visual navigation systems for autonomously navigating robots.",
      keywords: ["Python", "OpenCV", "Machine Vision", "Robotics", "Autonomous Navigation", "Final year project"]
    }
  }
];
