import type { Ref } from "vue";
import type { Command, AddOutputFn } from "@/data/terminal/Commands";

export function useTerminalLogic(commands: Ref<Command[]>, addOutput: AddOutputFn) {
  function executeCommand(input: string): void {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    addOutput("command", trimmedInput);

    const parts = trimmedInput.split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const command = commands.value.find((cmd) => cmd.name === cmdName || cmd.aliases?.includes(cmdName));

    if (command) {
      command.execute(args);
    } else {
      addOutput("error", `Command not found: ${cmdName}`);
      addOutput("output", "Type 'help' for available commands");
    }
  }

  return { executeCommand };
}
