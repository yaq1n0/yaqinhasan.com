import { FullProject } from "../../models/Project";

export const desktopOverrides: Record<string, Partial<FullProject>> = {
  CryptIt: {
    category: "Desktop",
    status: "Complete",
    keywords: ["Rust", "Tauri", "Vue", "Cryptography", "Desktop App Development"],
    order: 1
  },
  TrayRunner: {
    category: "Desktop",
    status: "Complete",
    keywords: ["Swift", "SwiftUI", "macOS Development", "Desktop App Development", "Shell Scripting"],
    order: 2
  },
  PythonTrayShortcuts: {
    description: "Windows tray script launcher, Python reimagining of TrayRunner",
    category: "Desktop",
    status: "Complete",
    keywords: ["Python", "Windows", "Desktop App Development", "Shell Scripting"],
    order: 3
  },
  FlutterRoboCopy: {
    description: "Flutter GUI for the Windows robocopy command, built to simplify local NAS backup automation",
    category: "Desktop",
    status: "Complete",
    keywords: ["Flutter", "Dart", "Desktop App Development", "Windows"],
    order: 4
  },
  TranslateApp: {
    description: "Desktop string conversion and translation app with Google Translate API integration, built on DesktopAppTemplate",
    category: "Desktop",
    status: "Complete",
    keywords: ["Python", "Desktop App Development", "API Integration"],
    order: 5
  },
  DesktopAppTemplate: {
    description: "Reusable Python/Tkinter desktop app framework with MVC structure, state persistence and page navigation",
    category: "Desktop",
    status: "Complete",
    keywords: ["Python", "Tkinter", "Desktop App Development", "Template"],
    order: 6
  }
};
