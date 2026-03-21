import type { ProjectOverride } from "./overrides/withCategory";
import { desktopOverrides } from "./overrides/desktop";
import { webOverrides } from "./overrides/web";
import { packageOverrides } from "./overrides/package";
import { academicOverrides } from "./overrides/academic";
import { otherOverrides } from "./overrides/other";
import { jokeOverrides } from "./overrides/joke";

// Key is GitHub repo name (= project ID); category is embedded via withCategory
export const projectOverrides: Record<string, ProjectOverride> = {
  ...webOverrides,
  ...desktopOverrides,
  ...packageOverrides,
  ...academicOverrides,
  ...otherOverrides,
  ...jokeOverrides
};
