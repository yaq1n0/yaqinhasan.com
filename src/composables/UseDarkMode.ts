import { useBooleanState } from "./UseBooleanState";

export function useDarkMode() {
  const applyDarkMode = (value: boolean) => {
    document.documentElement.classList.toggle("dark", value);
  };

  // Get system preference as default value
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const { state: isDark, toggleState: toggleDarkMode } = useBooleanState(
    "theme",
    applyDarkMode,
    {
      storage: localStorage,
      defaultValue: systemPrefersDark,
    },
  );

  return { isDark, toggleDarkMode };
}
