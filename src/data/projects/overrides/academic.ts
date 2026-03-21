import { FullProject } from "../../models/Project";

export const academicOverrides: Record<string, Partial<FullProject>> = {
  STQL: {
    description: "Interpreter for a custom SQL-inspired RDF querying language, implemented in Haskell",
    category: "Academic",
    status: "Complete",
    keywords: ["Haskell", "Interpreter Design", "Compiler Theory", "Formal Language Theory"],
    order: 1
  },
  DegreeArchive: {
    description: "A curated archive of notable university coursework projects from the BSc Computer Science degree",
    category: "Academic",
    status: "Complete",
    keywords: ["Java", "Academic", "University"],
    order: 2
  },
  RotationalDynamicsSimulator: {
    description: "Rotational dynamics (angular momentum and inertia) calculator and visualizer, university software engineering group project",
    category: "Academic",
    status: "Complete",
    keywords: ["Python", "Tkinter", "Physics Simulation", "Academic"],
    order: 3
  },
  RunwayRedeclarationCalculator: {
    description: "Runway redeclaration calculation desktop app, software engineering group project using Java/JavaFX and AGILE",
    category: "Academic",
    status: "Complete",
    keywords: ["Java", "JavaFX", "Software Engineering", "Academic"],
    order: 4
  },
  TetrECS: {
    description: "JavaFX Tetris clone with networked multiplayer highscores, Programming 2 university coursework",
    category: "Academic",
    status: "Complete",
    keywords: ["Java", "JavaFX", "Game Development", "Academic"],
    order: 5
  },
  EloSimulator: {
    description: "Implementation and simulation environment for the Elo algorithm and similar ranking algorithms",
    category: "Academic",
    status: "Complete",
    keywords: ["Java", "Algorithms", "Simulation", "Academic"],
    order: 6
  }
};
