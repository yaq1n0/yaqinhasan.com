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
}

export function createCommands(context: CommandContext): Command[] {
  const { addOutput, isDevMode, toggleDevMode } = context;

  return [
    {
      name: "help",
      description: "Display available commands",
      aliases: ["man", "?"],
      execute: () => {
        addOutput("info", "<strong>Available Commands:</strong>");
        addOutput("output", "");

        // Get commands dynamically to ensure we show all registered commands
        const commands = createCommands(context);
        commands.forEach((cmd) => {
          const cmdName = cmd.aliases ? `${cmd.name} (${cmd.aliases.join(", ")})` : cmd.name;
          addOutput("output", `  <strong>${cmdName.padEnd(25)}</strong> ${cmd.description}`);
        });

        addOutput("output", "");
        addOutput("info", "Use arrow keys (↑/↓) to navigate command history");
        addOutput("info", "Press TAB for command suggestions");
      }
    },
    {
      name: "clear",
      description: "Clear the terminal screen",
      aliases: ["cls"],
      execute: () => {
        // This will be handled by the composable
        addOutput("info", "__CLEAR__");
      }
    },
    {
      name: "dev",
      description: "Toggle developer mode (use --enable or --disable)",
      execute: (args) => {
        if (args.length === 0) {
          addOutput("info", `Developer mode is currently: <strong>${isDevMode ? "ENABLED" : "DISABLED"}</strong>`);
          addOutput("output", "Usage: dev --enable | dev --disable");
          return;
        }

        const flag = args[0].toLowerCase();

        if (flag === "--enable" || flag === "-e") {
          if (isDevMode) {
            addOutput("info", "Developer mode is already enabled");
          } else {
            toggleDevMode();
            addOutput("success", "✓ Developer mode ENABLED");
            addOutput("info", "Additional developer content is now visible");
          }
        } else if (flag === "--disable" || flag === "-d") {
          if (!isDevMode) {
            addOutput("info", "Developer mode is already disabled");
          } else {
            toggleDevMode();
            addOutput("success", "✓ Developer mode DISABLED");
            addOutput("info", "Developer content hidden");
          }
        } else if (flag === "--status" || flag === "-s") {
          addOutput("info", `Status: ${isDevMode ? "ENABLED" : "DISABLED"}`);
        } else {
          addOutput("error", `Unknown flag: ${flag}`);
          addOutput("output", "Usage: dev --enable | dev --disable | dev --status");
        }
      }
    },
    {
      name: "whoami",
      description: "Display information about the site owner",
      execute: () => {
        addOutput("output", "<strong>Yaqin Hasan</strong>");
        addOutput("output", "Software Engineer | Full-Stack Developer");
        addOutput("output", "TypeScript • React • Node • PostgreSQL • AWS");
        addOutput("output", "");
        addOutput("info", "Based in the UK | Open to Skilled Worker sponsorship");
      }
    },
    {
      name: "contact",
      description: "Display contact information",
      execute: () => {
        addOutput("output", "<strong>Contact Information:</strong>");
        addOutput("output", "");
        addOutput("output", "  Email:  yaqinhasan@outlook.com");
        addOutput("output", "  GitHub: github.com/yaqinhasan");
        addOutput("output", '  CV:     <a href="/cv.pdf" style="color: var(--color-accent);">Download CV</a>');
      }
    },
    {
      name: "echo",
      description: "Print arguments to the terminal",
      execute: (args) => {
        addOutput("output", args.join(" "));
      }
    },
    {
      name: "date",
      description: "Display current date and time",
      execute: () => {
        const now = new Date();
        addOutput(
          "output",
          now.toLocaleString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })
        );
      }
    },
    {
      name: "theme",
      description: "Display current theme (future: toggle theme)",
      execute: () => {
        const isDark = document.documentElement.classList.contains("dark");
        addOutput("info", `Current theme: ${isDark ? "Dark" : "Light"}`);
        addOutput("output", "Theme switching coming soon...");
      }
    },
    {
      name: "easteregg",
      description: "You found it! 🎉",
      aliases: ["secret", "surprise"],
      execute: () => {
        addOutput("success", "🎉 Congratulations! You found the easter egg!");
        addOutput("output", "");
        addOutput("output", "You're clearly someone who likes to explore.");
        addOutput("output", "I appreciate your curiosity! 🕵️");
        addOutput("output", "");
        addOutput("info", "Pro tip: Check out the source code on GitHub 😉");
      }
    }
  ];
}
