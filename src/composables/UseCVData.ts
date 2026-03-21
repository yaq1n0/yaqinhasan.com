import { ref, onMounted } from "vue";
import type { CV } from "@/data/models/CV";

/**
 * Composable for loading and managing CV data.
 * Loads CV data on mount from typed sources.
 */
export function useCVData() {
  const cvData = ref<CV>();
  const isLoaded = ref(false);
  const error = ref<Error | null>(null);

  onMounted(async () => {
    try {
      const { cvData: data } = await import("../data/cvData");
      const { getCVProjects } = await import("../data/projects/projectHelpers");
      cvData.value = { ...data, projects: getCVProjects() } as CV;
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
