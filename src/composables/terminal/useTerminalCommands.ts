import { computed, type Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDevMode } from "@/composables/UseDevMode";
import { useTheme } from "@/composables/theme/UseTheme";
import type { Command, AddOutputFn } from "@/data/terminal/Commands";
import { createSimpleCommands } from "@/data/terminal/SimpleCommands";
import { createNavigationCommands } from "@/data/terminal/NavigationCommands";
import { createDevCommands } from "@/data/terminal/DevCommands";
import { createThemeCommands } from "@/data/terminal/ThemeCommands";

export function useTerminalCommands(addOutput: AddOutputFn) {
  const router = useRouter();
  const route = useRoute();
  const { isDevMode, toggleDevMode } = useDevMode();
  const theme = useTheme();

  const commands: Ref<Command[]> = computed(() => [
    ...createSimpleCommands(addOutput, commands),
    ...createNavigationCommands(addOutput, router, route, isDevMode),
    ...createDevCommands(addOutput, isDevMode, toggleDevMode),
    ...createThemeCommands(addOutput, theme)
  ]);

  return { commands, isDevMode };
}
