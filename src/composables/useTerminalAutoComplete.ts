import type { Command, OutputLine } from "@/data/terminal/Commands";

export function useTerminalAutoComplete(commands: Command[], addOutput: (type: OutputLine["type"], content: string) => void) {
  function autoComplete(input: string): string | null {
    const lowerInput = input.toLowerCase();
    if (!lowerInput) return null;

    const matches = commands.filter((cmd) => cmd.name.startsWith(lowerInput) || cmd.aliases?.some((alias) => alias.startsWith(lowerInput)));

    if (matches.length === 1) {
      return matches[0].name + " ";
    } else if (matches.length > 1) {
      addOutput("info", "Possible commands:");
      matches.forEach((cmd) => {
        addOutput("output", `  ${cmd.name}`);
      });
    }

    return null;
  }

  return {
    autoComplete
  };
}
