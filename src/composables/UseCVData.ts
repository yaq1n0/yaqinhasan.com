import { ref, onMounted } from "vue";
import { type CV, cvSchema } from "@/data/models/CV";

/**
 * Composable for loading and managing CV data.
 * Loads CV JSON data on mount and validates it against the schema.
 */
export function useCVData() {
  const cvData = ref<CV>();
  const isLoaded = ref(false);
  const error = ref<Error | null>(null);

  onMounted(async () => {
    try {
      const cvJson = await import("../data/cv.json");
      cvData.value = cvSchema.parse(cvJson.default);
      isLoaded.value = true;
    } catch (e) {
      error.value = e as Error;
      console.error("Failed to load CV data:", e);
    }
  });

  return {
    cvData,
    isLoaded,
    error
  };
}
