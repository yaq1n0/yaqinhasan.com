import { ref, nextTick, type Ref } from "vue";
import type { OutputLine } from "@/data/terminal/Commands";

export function useTerminalOutput(terminalBody: Ref<HTMLElement | null>) {
  const outputLines = ref<OutputLine[]>([]);

  function addOutput(type: OutputLine["type"], content: string) {
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
    addOutput,
    scrollToBottom,
    showWelcomeMessage
  };
}
