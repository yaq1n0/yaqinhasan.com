import { withCategory } from "./withCategory";

export const desktopOverrides = withCategory("Desktop", {
  CryptIt: {
    status: "Complete",
    keywords: ["Rust", "Tauri", "Vue", "Cryptography", "Desktop App Development"],
    order: 1
  },
  TrayRunner: {
    status: "Complete",
    keywords: ["Swift", "SwiftUI", "macOS Development", "Desktop App Development", "Shell Scripting"],
    order: 2
  },
  DesktopAppTemplate: {
    status: "Complete",
    keywords: ["Python", "Tkinter", "Desktop App Development", "Template"],
    order: 3
  },
  TranslateApp: {
    status: "Complete",
    keywords: ["Python", "Desktop App Development", "API Integration"],
    order: 4
  },
  FlutterRoboCopy: {
    description: "Flutter GUI for the Windows robocopy command, built to simplify local NAS backup automation",
    status: "Complete",
    keywords: ["Flutter", "Dart", "Desktop App Development", "Windows"],
    order: 5
  },
  PythonTrayShortcuts: {
    status: "Complete",
    keywords: ["Python", "Windows", "Desktop App Development", "Shell Scripting"],
    order: 6
  }
});
