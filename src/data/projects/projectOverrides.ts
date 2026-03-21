import { FullProject } from "../models/Project";
import { desktopOverrides } from "./overrides/desktop";
import { webOverrides } from "./overrides/web";
import { packageOverrides } from "./overrides/package";
import { academicOverrides } from "./overrides/academic";
import { otherOverrides } from "./overrides/other";
import { jokeOverrides } from "./overrides/joke";

// Keyed by GitHub repo name (= project ID)
// Category order in the carousel follows spread order: Web → Desktop → Package → Academic → Other → Joke (dev mode only)
export const projectOverrides: Record<string, Partial<FullProject>> = {
  ...webOverrides,
  ...desktopOverrides,
  ...packageOverrides,
  ...academicOverrides,
  ...otherOverrides,
  ...jokeOverrides
};
