import { useBooleanState } from "./UseBooleanState";

export function useDevMode() {
  const applyDevMode = (value: boolean) => {
    const root = document.documentElement;
    if (value) {
      root.classList.add("dev-mode");
    } else {
      root.classList.remove("dev-mode");
    }
  };

  const { state: isDevMode, toggleState: toggleDevMode } = useBooleanState("devMode", applyDevMode);

  return { isDevMode, toggleDevMode };
}
