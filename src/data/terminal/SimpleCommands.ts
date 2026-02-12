import type { Command, CommandContext } from "./Commands";
import { createCommands } from "./Commands";

export function createSimpleCommands(context: CommandContext): Command[] {
  const { addOutput } = context;

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
      name: "whoami",
      description: "Display site owner information + contact details",
      execute: () => {
        addOutput("output", "<strong>Yaqin Hasan</strong>");
        addOutput("output", "");
        addOutput("output", "  Email:  yaqin.k.hasan@gmail.com");
        addOutput("output", "  GitHub: github.com/yaq1n0");
        addOutput("output", "  LinkedIn: linkedin.com/in/yaqinhasan");
        addOutput("output", '  CV: <a href="/cv.pdf" style="color: var(--color-accent);">Download CV</a>');
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
    }
  ];
}
