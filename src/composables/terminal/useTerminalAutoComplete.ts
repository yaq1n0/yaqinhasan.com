import type { Ref } from "vue";
import type { Command, AddOutputFn } from "@/data/terminal/Commands";

export function useTerminalAutoComplete(commands: Ref<Command[]>, addOutput: AddOutputFn) {
  function autoComplete(input: string): string | null {
    const lowerInput = input.toLowerCase();
    if (!lowerInput) return null;

    const matches = commands.value.filter((cmd) => cmd.name.startsWith(lowerInput) || cmd.aliases?.some((alias) => alias.startsWith(lowerInput)));

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

  return { autoComplete };
}
