import { useStorage } from "@vueuse/core";
import { computed, watch } from "vue";

export const AVAILABLE_THEMES = ["default-light", "default-dark", "futuristic-light", "futuristic-dark", "pastel-light", "pastel-dark"] as const;

export type ThemeId = (typeof AVAILABLE_THEMES)[number];
export type ThemeVariant = "default" | "futuristic" | "pastel";
export type ThemeMode = "light" | "dark";

/**
 * A composable for managing theme state with localStorage persistence.
 * Supports multiple theme variants (default, futuristic, pastel) each with light/dark modes.
 *
 * @returns Theme state and management functions
 */
export function useTheme() {
  const applyTheme = (themeId: ThemeId) => {
    // Remove old dark mode class if it exists
    document.documentElement.classList.remove("dark");
    // Apply new theme via data attribute
    document.documentElement.setAttribute("data-theme", themeId);
  };

  // Get system preference and use as default
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme: ThemeId = systemPrefersDark ? "default-dark" : "default-light";

  // Migrate old boolean theme value to new format
  const oldThemeValue = localStorage.getItem("theme");
  if (oldThemeValue === "true" || oldThemeValue === "false") {
    const migratedTheme = oldThemeValue === "true" ? "default-dark" : "default-light";
    localStorage.setItem("theme", migratedTheme);
  }

  // Store theme preference in localStorage
  const currentTheme = useStorage<ThemeId>("theme", defaultTheme, localStorage, {
    listenToStorageChanges: true
  });

  // Apply the initial theme immediately
  applyTheme(currentTheme.value);

  // Watch for theme changes and apply them
  watch(currentTheme, (newTheme, oldTheme) => {
    if (newTheme !== oldTheme) {
      applyTheme(newTheme);
    }
  });

  // Helper computed properties
  const currentVariant = computed<ThemeVariant>(() => currentTheme.value.split("-")[0] as ThemeVariant);
  const currentMode = computed<ThemeMode>(() => currentTheme.value.split("-")[1] as ThemeMode);

  // Helper methods
  const setTheme = (themeId: ThemeId) => {
    currentTheme.value = themeId;
  };

  const setVariant = (variant: ThemeVariant) => {
    const mode = currentMode.value;
    setTheme(`${variant}-${mode}` as ThemeId);
  };

  const setMode = (mode: ThemeMode) => {
    const variant = currentVariant.value;
    setTheme(`${variant}-${mode}` as ThemeId);
  };

  const toggleMode = () => {
    const mode = currentMode.value;
    setMode(mode === "light" ? "dark" : "light");
  };

  return {
    currentTheme,
    currentVariant,
    currentMode,
    availableThemes: AVAILABLE_THEMES,
    setTheme,
    setVariant,
    setMode,
    toggleMode
  };
}
