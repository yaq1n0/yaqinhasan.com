import { ref, nextTick, computed, type Ref } from "vue";
import type { OutputLine, Command } from "@/data/terminal/Commands";

export function useTerminalLogic(commands: Ref<Command[]>, terminalBody: Ref<HTMLElement | null>, isDevMode: Ref<boolean>) {
  const outputLines = ref<OutputLine[]>([]);

  const prompt = computed(() => {
    const mode = isDevMode.value ? "dev" : "user";
    return `guest@yaqin:~/${mode}$`;
  });

  function addOutput(type: OutputLine["type"], content: string) {
    // Handle special clear command
    if (type === "info" && content === "__CLEAR__") {
      outputLines.value = [];
      return;
    }

    outputLines.value.push({ type, content });
    nextTick(() => scrollToBottom());
  }

  function scrollToBottom() {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
    }
  }

  function executeCommand(input: string): void {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    // Add command to output
    addOutput("command", trimmedInput);

    // Parse command and arguments
    const parts = trimmedInput.split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Find and execute command
    const command = commands.value.find((cmd) => cmd.name === cmdName || cmd.aliases?.includes(cmdName));

    if (command) {
      command.execute(args);
    } else {
      addOutput("error", `Command not found: ${cmdName}`);
      addOutput("output", "Type 'help' for available commands");
    }
  }

  function showWelcomeMessage() {
    addOutput("success", "=".repeat(60));
    addOutput("success", "  Welcome to yaqinhasan.com interactive terminal! 🚀");
    addOutput("success", "=".repeat(60));
    addOutput("output", "");
    addOutput("info", "Type <strong>help</strong> to see available commands");
    addOutput("output", "");
  }

  return {
    outputLines,
    prompt,
    addOutput,
    executeCommand,
    showWelcomeMessage,
    scrollToBottom
  };
}
