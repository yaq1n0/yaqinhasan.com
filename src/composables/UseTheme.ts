import { useStorage } from "@vueuse/core";
import { computed, watch } from "vue";
import {
  type ThemeId,
  type ThemeVariant,
  type ThemeMode,
  THEME_REGISTRY,
  AVAILABLE_THEMES,
  AVAILABLE_VARIANTS,
  isValidTheme,
  buildThemeId,
  parseThemeId
} from "./ThemeRegistry";
import { runMigrations } from "./migrations/themeMigrations";

/**
 * A composable for managing theme state with localStorage persistence.
 * Supports multiple theme variants (default, futuristic, pastel) each with light/dark modes.
 *
 * @returns Theme state and management functions
 */
export function useTheme() {
  const applyTheme = (themeId: ThemeId) => {
    // Remove old dark mode class if it exists (cleanup)
    document.documentElement.classList.remove("dark");
    // Apply new theme via data attribute
    document.documentElement.setAttribute("data-theme", themeId);
  };

  // Get system preference and use as default
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme: ThemeId = systemPrefersDark ? "default-dark" : "default-light";

  // Get stored value with validation and migration support
  const getValidatedTheme = (): ThemeId => {
    const stored = localStorage.getItem("theme");

    // Try to migrate legacy theme formats first
    const migrated = runMigrations(stored);
    if (migrated) {
      return migrated;
    }

    // If valid modern theme, use it
    if (isValidTheme(stored)) {
      return stored;
    }

    // Fall back to system preference
    return defaultTheme;
  };

  // Store theme preference in localStorage
  const currentTheme = useStorage<ThemeId>("theme", getValidatedTheme(), localStorage, {
    listenToStorageChanges: true
  });

  // Validate and correct invalid theme on load
  if (!isValidTheme(currentTheme.value)) {
    currentTheme.value = defaultTheme;
  }

  // Apply the initial theme immediately
  applyTheme(currentTheme.value);

  // Watch for theme changes and apply them
  watch(currentTheme, (newTheme, oldTheme) => {
    if (newTheme !== oldTheme) {
      applyTheme(newTheme);
    }
  });

  // Helper computed properties using registry parser
  const currentVariant = computed<ThemeVariant>(() => parseThemeId(currentTheme.value).variant);
  const currentMode = computed<ThemeMode>(() => parseThemeId(currentTheme.value).mode);

  // Helper methods with runtime validation
  const setTheme = (themeId: ThemeId) => {
    if (!isValidTheme(themeId)) {
      console.error(`Invalid theme ID: ${themeId}`);
      return;
    }
    currentTheme.value = themeId;
  };

  const setVariant = (variant: ThemeVariant) => {
    const mode = currentMode.value;
    const themeId = buildThemeId(variant, mode);
    setTheme(themeId);
  };

  const setMode = (mode: ThemeMode) => {
    const variant = currentVariant.value;
    const themeId = buildThemeId(variant, mode);
    setTheme(themeId);
  };

  const toggleMode = () => {
    const mode = currentMode.value;
    setMode(mode === "light" ? "dark" : "light");
  };

  return {
    // Current state
    currentTheme,
    currentVariant,
    currentMode,
    // Registry access
    availableThemes: AVAILABLE_THEMES,
    availableVariants: AVAILABLE_VARIANTS,
    themeRegistry: THEME_REGISTRY,
    // Actions
    setTheme,
    setVariant,
    setMode,
    toggleMode
  };
}
