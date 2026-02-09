<template>
  <div class="terminal">
    <div class="terminal-header">
      <div class="terminal-title"><span class="terminal-icon">$</span><span>yaqinhasan.com/terminal</span></div>
    </div>

    <div ref="terminalBody" class="terminal-body">
      <div class="terminal-output">
        <div v-for="(line, index) in outputLines" :key="index" class="output-line">
          <span v-if="line.type === 'command'" class="prompt">{{ prompt }}</span>

          <!-- Congratulations, you can attack your own browser, big woop -->
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span :class="[`output-${line.type}`]" v-html="line.content"></span>
        </div>
      </div>

      <div class="terminal-input-line">
        <span class="prompt">{{ prompt }}</span>
        <input
          ref="terminalInput"
          v-model="currentInput"
          type="text"
          class="terminal-input"
          placeholder="Type 'help' for available commands..."
          spellcheck="false"
          autocomplete="off"
          @keydown.enter="handleExecuteCommand"
          @keydown.up.prevent="navigateHistory('up')"
          @keydown.down.prevent="navigateHistory('down')"
          @keydown.tab.prevent="handleTab"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDevMode } from "@/composables/UseDevMode";
import { useTerminalLogic } from "@/composables/useTerminalLogic";
import { useTerminalHistory } from "@/composables/useTerminalHistory";
import { useTerminalAutoComplete } from "@/composables/useTerminalAutoComplete";
import { createCommands } from "@/data/terminal/Commands";

defineEmits<{
  close: [];
}>();

const router = useRouter();
const route = useRoute();

const { isDevMode, toggleDevMode } = useDevMode();

const terminalBody = ref<HTMLElement | null>(null);
const terminalInput = ref<HTMLInputElement | null>(null);
const currentInput = ref("");

// Navigation function for commands
const navigate = (path: string) => {
  router.push(path);
};

// Create commands with context
const commands = computed(() =>
  createCommands({
    addOutput,
    isDevMode: isDevMode.value,
    toggleDevMode,
    navigate,
    currentPath: route.path
  })
);

// Core terminal logic
const { outputLines, prompt, addOutput, executeCommand, showWelcomeMessage } = useTerminalLogic(commands, terminalBody, isDevMode);

// History navigation
const { addToHistory, navigateHistory: navigateHistoryFn } = useTerminalHistory();

// Auto-completion
const { autoComplete } = useTerminalAutoComplete(commands.value, addOutput);

function handleExecuteCommand() {
  const input = currentInput.value.trim();

  if (!input) {
    return;
  }

  // Add to history
  addToHistory(input);

  // Execute command
  executeCommand(input);

  // Clear input
  currentInput.value = "";
}

function navigateHistory(direction: "up" | "down") {
  const historyValue = navigateHistoryFn(direction);
  currentInput.value = historyValue;
}

function handleTab() {
  const completion = autoComplete(currentInput.value);
  if (completion) {
    currentInput.value = completion;
  }
}

onMounted(() => {
  // Show welcome message
  showWelcomeMessage();

  // Auto-focus input
  terminalInput.value?.focus();
});

// Focus the terminal input
function focus() {
  terminalInput.value?.focus();
}

// Export for extensibility - other components can add commands
defineExpose({
  addCommand: () => {
    // Note: Since commands is computed, we'd need to handle dynamic registration differently
    // For now, this maintains the API but won't work with the current structure
    console.warn("Dynamic command registration not yet supported with new architecture");
  },
  addOutput,
  executeCommand: (cmd: string) => {
    currentInput.value = cmd;
    handleExecuteCommand();
  },
  focus
});
</script>

<style lang="scss" scoped>
.terminal {
  font-family: var(--font-mono), "Courier New", monospace;
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin: 2rem 0;
  max-width: 100%;
  transition: all 0.3s ease;
}

.terminal-header {
  background: #2d2d2d;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3d3d3d;
  user-select: none;
}

.terminal-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #d4d4d4;
  font-size: 0.875rem;
  font-weight: 500;
}

.terminal-icon {
  color: var(--color-accent, #4ec9b0);
  font-weight: bold;
}

.terminal-controls {
  display: flex;
  gap: 0.5rem;
}

.terminal-btn {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #4d4d4d;
  background: #2d2d2d;
  color: #d4d4d4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background: #3d3d3d;
    border-color: #5d5d5d;
  }

  &.minimize {
    font-size: 1rem;
    padding-bottom: 4px;
  }

  &.close {
    font-size: 1.5rem;
    line-height: 1;
    padding: 0;
  }
}

.terminal-body {
  padding: 1rem;
  max-height: 500px;
  overflow-y: auto;
  background: #1e1e1e;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1e1e1e;
  }

  &::-webkit-scrollbar-thumb {
    background: #3d3d3d;
    border-radius: 4px;

    &:hover {
      background: #4d4d4d;
    }
  }
}

.terminal-output {
  margin-bottom: 0.5rem;
}

.output-line {
  display: flex;
  margin-bottom: 0.25rem;
  line-height: 1.6;
  word-wrap: break-word;
}

.prompt {
  color: var(--color-accent, #4ec9b0);
  margin-right: 0.5rem;
  flex-shrink: 0;
  user-select: none;
}

.output-command {
  color: #d4d4d4;
}

.output-output {
  color: #cccccc;
}

.output-error {
  color: #f48771;
}

.output-success {
  color: #89d185;
}

.output-info {
  color: #569cd6;
}

.terminal-input-line {
  display: flex;
  align-items: center;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #d4d4d4;
  font-family: inherit;
  font-size: 0.9rem;
  caret-color: var(--color-accent, #4ec9b0);

  &::placeholder {
    color: #666;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .terminal {
    margin: 1rem 0;
    border-radius: 4px;
  }

  .terminal-body {
    max-height: 400px;
    padding: 0.75rem;
  }

  .terminal-header {
    padding: 0.5rem 0.75rem;
  }

  .terminal-title {
    font-size: 0.8rem;
  }

  .terminal-input,
  .output-line {
    font-size: 0.85rem;
  }
}
</style>
