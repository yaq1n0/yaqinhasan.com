import type { Ref } from "vue";
import type { Command, AddOutputFn } from "./Command";
import { CVLink } from "../ExternalLinks";

export function createSimpleCommands(addOutput: AddOutputFn, allCommands: Ref<Command[]>): Command[] {
  return [
    {
      name: "help",
      description: "Display available commands",
      aliases: ["man", "?"],
      execute: () => {
        addOutput("info", "<strong>Available Commands:</strong>");
        addOutput("output", "");

        allCommands.value.forEach((cmd) => {
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
        addOutput("info", "__CLEAR__");
      }
    },
    {
      name: "whoami",
      description: "Display site owner information + contact details",
      execute: () => {
        addOutput("output", "<strong>Yaqin Hasan</strong>");
        addOutput("output", "");
        addOutput("output", `  Email:    <a href="mailto:yaqin.k.hasan@gmail.com" style="color: var(--color-accent);">yaqin.k.hasan@gmail.com</a>`);
        addOutput("output", `  GitHub:   <a href="https://github.com/yaq1n0" style="color: var(--color-accent);">github.com/yaq1n0</a>`);
        addOutput("output", `  LinkedIn: <a href="https://linkedin.com/in/yaqinhasan" style="color: var(--color-accent);">linkedin.com/in/yaqinhasan</a>`);
        addOutput("output", `  CV: <a href="${CVLink}" style="color: var(--color-accent);">Download CV</a>`);
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
