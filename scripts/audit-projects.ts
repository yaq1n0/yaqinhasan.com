#!/usr/bin/env tsx
/**
 * Project Audit Script
 * Shows all GitHub projects and whether they appear on the Projects page and/or CV
 * Run via: npm run audit:projects
 */

import { githubProjects } from "../src/data/projects/githubProjects";
import { projectOverrides } from "../src/data/projects/projectOverrides";
import { cvOverrides } from "../src/data/projects/cvOverrides";

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const GRAY = "\x1b[90m";

const check = `${GREEN}✓${RESET}`;
const dash = `${GRAY}–${RESET}`;

const projectIds = new Set(Object.keys(projectOverrides));
const cvIds = new Set(Object.keys(cvOverrides));

// Collect all unique IDs across all three sources
const allIds = new Set([...githubProjects.map((p) => p.id), ...projectIds, ...cvIds]);

// Separate GitHub projects from overrides-only entries
const githubIds = new Set(githubProjects.map((p) => p.id));

const rows = Array.from(allIds).map((id) => ({
  id,
  onGitHub: githubIds.has(id),
  onProjects: projectIds.has(id),
  onCV: cvIds.has(id),
  category: projectOverrides[id]?.category ?? null
}));

// Sort: github projects first (alphabetical), then override-only entries
rows.sort((a, b) => {
  if (a.onGitHub !== b.onGitHub) return a.onGitHub ? -1 : 1;
  return a.id.localeCompare(b.id);
});

// Column widths
const idWidth = Math.max(12, ...rows.map((r) => r.id.length)) + 2;
const catWidth = 12;

const pad = (s: string, w: number) => s.padEnd(w);
const center = (s: string, w: number) => {
  const raw = s.replace(/\x1b\[[0-9;]*m/g, ""); // strip ANSI for length calc
  const pad = Math.max(0, w - raw.length);
  const left = Math.floor(pad / 2);
  const right = pad - left;
  return " ".repeat(left) + s + " ".repeat(right);
};

const colW = { projects: 10, cv: 6 };

// Header
console.log();
console.log(`${BOLD}${pad("Project", idWidth)}${pad("Category", catWidth)}${center("Projects", colW.projects)}${center("CV", colW.cv)}${RESET}`);
console.log("─".repeat(idWidth + catWidth + colW.projects + colW.cv));

let githubCount = 0;
let projectsCount = 0;
let cvCount = 0;

for (const row of rows) {
  if (row.onGitHub) githubCount++;
  if (row.onProjects) projectsCount++;
  if (row.onCV) cvCount++;

  const idColor = row.onGitHub ? CYAN : YELLOW;
  const idStr = `${idColor}${pad(row.id, idWidth)}${RESET}`;
  const catStr = `${DIM}${pad(row.category ?? "", catWidth)}${RESET}`;
  const projStr = center(row.onProjects ? check : dash, colW.projects);
  const cvStr = center(row.onCV ? check : dash, colW.cv);
  const suffix = !row.onGitHub ? ` ${YELLOW}(override only)${RESET}` : "";

  console.log(`${idStr}${catStr}${projStr}${cvStr}${suffix}`);
}

// Footer summary
console.log("─".repeat(idWidth + catWidth + colW.projects + colW.cv));
console.log(
  `${BOLD}${pad(`${allIds.size} total`, idWidth)}${pad("", catWidth)}${center(`${projectsCount}`, colW.projects)}${center(`${cvCount}`, colW.cv)}${RESET}`
);

// Orphan warnings
const orphanedOverrides = rows.filter((r) => r.onProjects && !r.onGitHub);
const missingOverrides = rows.filter((r) => r.onGitHub && !r.onProjects && !r.onCV);

if (orphanedOverrides.length > 0) {
  console.log();
  console.log(`${YELLOW}⚠ projectOverrides entries with no matching GitHub project:${RESET}`);
  orphanedOverrides.forEach((r) => console.log(`  ${GRAY}→${RESET} ${r.id}`));
}

if (missingOverrides.length > 0) {
  console.log();
  console.log(`${GRAY}● GitHub projects not on Projects page or CV:${RESET}`);
  missingOverrides.forEach((r) => console.log(`  ${GRAY}→${RESET} ${r.id}`));
}

console.log();
console.log(`${DIM}GitHub: ${githubCount}  Projects page: ${projectsCount}  CV: ${cvCount}${RESET}`);
console.log();
