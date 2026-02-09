import { ref } from "vue";

export function useTerminalHistory() {
  const commandHistory = ref<string[]>([]);
  const historyIndex = ref(-1);

  function addToHistory(command: string) {
    commandHistory.value.push(command);
    historyIndex.value = commandHistory.value.length;
  }

  function navigateHistory(direction: "up" | "down"): string {
    if (commandHistory.value.length === 0) return "";

    if (direction === "up") {
      if (historyIndex.value > 0) {
        historyIndex.value--;
        return commandHistory.value[historyIndex.value];
      }
    } else {
      if (historyIndex.value < commandHistory.value.length - 1) {
        historyIndex.value++;
        return commandHistory.value[historyIndex.value];
      } else {
        historyIndex.value = commandHistory.value.length;
        return "";
      }
    }

    return commandHistory.value[historyIndex.value] || "";
  }

  return {
    commandHistory,
    historyIndex,
    addToHistory,
    navigateHistory
  };
}
