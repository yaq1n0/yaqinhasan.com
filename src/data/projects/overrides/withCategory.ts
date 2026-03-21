import type { FullProject, FullProjectCategory } from "@/data/models/Project";

export type ProjectOverride = Omit<Partial<FullProject>, "category"> & { category: FullProjectCategory };

export const withCategory = (
  category: FullProjectCategory,
  overrides: Record<string, Omit<Partial<FullProject>, "category">>
): Record<string, ProjectOverride> => Object.fromEntries(Object.entries(overrides).map(([id, o]) => [id, { ...o, category }]));
