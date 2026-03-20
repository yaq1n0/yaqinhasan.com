import { githubProjects } from "./githubProjects";
import { projectOverrides } from "./projectOverrides";
import { cvOverrides } from "./cvOverrides";
import type { FullProject, CVProject, GitHubProject } from "@/data/models/Project";

/** Look up a GitHub project by repo name */
function findGitHub(id: string): GitHubProject | undefined {
  return githubProjects.find((p) => p.id === id);
}

/** Resolve a project for the Projects page */
function resolveFullProject(id: string): FullProject | null {
  const gh = findGitHub(id);
  if (!gh) {
    console.warn(`[resolveProjects] Override references unknown repo: "${id}"`);
    return null;
  }

  const override = projectOverrides[id];
  return {
    id,
    name: override.displayName ?? gh.name,
    description: override.description ?? gh.description ?? undefined,
    htmlDescription: override.htmlDescription ?? gh.readmeHtml ?? undefined,
    url: gh.url,
    keywords: override.keywords ?? (gh.topics.length > 0 ? gh.topics : undefined),
    type: override.type,
    status: override.status ?? (gh.archived ? "Archived" : undefined),
    order: override.order ?? 999
  };
}

/** For ProjectsPage.vue — all projects with an entry in projectOverrides, sorted by order within category */
export function getProjectsPageProjects(): FullProject[] {
  return Object.keys(projectOverrides)
    .map(resolveFullProject)
    .filter((p): p is FullProject => p !== null)
    .sort((a, b) => a.order - b.order);
}

/** For CV rendering and cv.json — projects listed in cvOverrides, in array order */
export function getCVProjects(): CVProject[] {
  const results: CVProject[] = [];

  for (const { id, overrides } of cvOverrides) {
    const gh = findGitHub(id);
    if (!gh) {
      console.warn(`[resolveProjects] CV override references unknown repo: "${id}"`);
      continue;
    }

    results.push({
      name: overrides?.name ?? gh.name,
      description: overrides?.description ?? gh.description ?? undefined,
      keywords: overrides?.keywords ?? (gh.topics.length > 0 ? gh.topics : undefined),
      url: gh.url
    });
  }

  return results;
}
