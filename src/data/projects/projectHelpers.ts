import { githubProjects } from "./githubProjects";
import { projectOverrides } from "./projectOverrides";
import { cvOverrides } from "./cvOverrides";
import type { FullProject, CVProject } from "@/data/models/Project";

// create a map once, so that all subsequent findMatchedRepo by id calls are O(1) instead of O(n)
const githubProjectsById = new Map(githubProjects.map((p) => [p.id, p]));
const findMatchedRepo = (id: string) => githubProjectsById.get(id);

/** Resolve a project for the Projects page */
const resolveFullProject = (id: string): FullProject | undefined => {
  const gh = findMatchedRepo(id);
  if (!gh) {
    console.warn(`[resolveProjects] Override references unknown repo: "${id}"`);
    return undefined;
  }

  const override = projectOverrides[id];
  return {
    id,
    name: override.name ?? gh.name,
    description: override.description ?? gh.description ?? undefined,
    htmlDescription: override.htmlDescription ?? gh.htmlDescription ?? undefined,
    url: gh.url,
    keywords: override.keywords ?? (gh.topics.length > 0 ? gh.topics : undefined),
    type: override.type,
    status: override.status ?? (gh.archived ? "Archived" : undefined),
    order: override.order ?? 999
  };
};

/** For ProjectsPage.vue — all projects with an entry in projectOverrides, sorted by order within category */
const getFullProjects = (): FullProject[] =>
  Object.keys(projectOverrides)
    .map(resolveFullProject)
    .filter((p): p is FullProject => !!p)
    .sort((a, b) => a.order - b.order);

export const fullProjects = getFullProjects();

/** Resolve a project for the CV */
const resolveCVProject = (id: string): CVProject | undefined => {
  const gh = findMatchedRepo(id);
  if (!gh) {
    console.warn(`[resolveProjects] CV override references unknown repo: "${id}"`);
    return undefined;
  }

  const overrides = cvOverrides[id];
  return {
    name: overrides?.name ?? gh.name,
    description: overrides?.description ?? gh.description ?? undefined,
    keywords: overrides?.keywords ?? (gh.topics.length > 0 ? gh.topics : undefined),
    url: gh.url
  };
};

/** For CV rendering and cv.json — projects listed in cvOverrides, in array order */
const getCVProjects = (): CVProject[] =>
  Object.keys(cvOverrides)
    .map(resolveCVProject)
    .filter((p): p is CVProject => !!p);

export const CVProjects = getCVProjects();
