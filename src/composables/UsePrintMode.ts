import { computed } from "vue";
import { useRoute } from "vue-router";

/** From the route, are we in print mode? */
export function usePrintMode() {
  const route = useRoute();
  const isPrintMode = computed(() => route.query.print === "true");
  return {
    isPrintMode
  };
}
