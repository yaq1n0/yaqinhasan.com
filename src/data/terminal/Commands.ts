import type { useTheme } from "@/composables/theme/UseTheme";
import { createSimpleCommands } from "./SimpleCommands";
import { createNavigationCommands } from "./NavigationCommands";
import { createDevCommand } from "./DevCommands";
import { executeThemeCommand } from "./ThemeCommands";

export interface OutputLine {
  type: "command" | "output" | "error" | "success" | "info";
  content: string;
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[]) => void;
}

export interface CommandContext {
  addOutput: (type: OutputLine["type"], content: string) => void;
  isDevMode: boolean;
  toggleDevMode: () => void;
  navigate?: (path: string) => void;
  currentPath?: string;
  theme?: ReturnType<typeof useTheme>;
}

export function createCommands(context: CommandContext): Command[] {
  const { addOutput, theme } = context;

  const themeCommand: Command = {
    name: "theme",
    description: "Manage themes (list, set <theme>, variant <name>, mode <light|dark>, toggle)",
    aliases: ["th"],
    execute: (args) => {
      if (!theme) {
        addOutput("error", "Theme management not available");
        return;
      }
      executeThemeCommand(args, theme, addOutput);
    }
  };

  return [...createSimpleCommands(context), ...createNavigationCommands(context), createDevCommand(context), themeCommand];
}
