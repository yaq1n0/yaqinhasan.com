import { useStorage } from "@vueuse/core";
import { watch } from "vue";

export type UseBooleanStateOptions = {
  storage: Storage;
  defaultValue: boolean;
};

export const defaultOptions: UseBooleanStateOptions = {
  storage: sessionStorage,
  defaultValue: false
};

/**
 * A composable for managing a boolean state with storage and event emission.
 *
 * @param key - The key to use for the state in storage.
 * @param onChange - A function to call when the state changes.
 * @param options - The options for the state.
 */
export function useBooleanState(key: string, onChange: (value: boolean) => void, { storage, defaultValue }: UseBooleanStateOptions = defaultOptions) {
  const state = useStorage(key, defaultValue, storage);

  const toggleState = () => (state.value = !state.value);

  // Apply the initial state immediately
  onChange(state.value);

  watch(state, (newValue, oldValue) => {
    if (newValue !== oldValue) onChange(newValue);
  });

  return { state, toggleState };
}
