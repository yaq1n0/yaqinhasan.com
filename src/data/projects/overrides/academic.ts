import { withCategory } from "./withCategory";

export const academicOverrides = withCategory("Academic", {
  ThymPi: {
    description: "Proof-of-concept robotics platform using sensor data to augment visual navigation systems for autonomously navigating robots.",
    status: "Complete",
    keywords: ["Python", "OpenCV", "Machine Vision", "Robotics", "Autonomous Navigation", "Final year project"],
    order: 1
  },
  STQL: {
    status: "Complete",
    keywords: ["Haskell", "Interpreter Design", "Compiler Theory", "Formal Language Theory"],
    order: 2
  },
  RunwayRedeclarationCalculator: {
    status: "Complete",
    keywords: ["Java", "JavaFX", "Software Engineering", "Academic"],
    order: 3
  },
  TetrECS: {
    status: "Complete",
    keywords: ["Java", "JavaFX", "Game Development", "Academic"],
    order: 4
  },
  RotationalDynamicsSimulator: {
    status: "Complete",
    keywords: ["Python", "Tkinter", "Physics Simulation", "Academic"],
    order: 5
  }
});
