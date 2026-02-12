/**
 * Theme Registry - Central definition of all available themes
 * Provides type-safe theme management with validation utilities
 */

import { THEME_CONFIG, type ThemeVariant, type ThemeMode } from "./ThemeConfig";

export type { ThemeVariant, ThemeMode };

export type ThemeDefinition = {
  readonly id: string;
  readonly variant: ThemeVariant;
  readonly mode: ThemeMode;
  readonly name: string;
  readonly description: string;
};

/**
 * Central registry of all available themes with metadata
 */
export const THEME_REGISTRY: readonly ThemeDefinition[] = [
  {
    id: "default-light",
    variant: "default",
    mode: "light",
    name: "Default Light",
    description: "Warm, comfortable light theme optimized for readability"
  },
  {
    id: "default-dark",
    variant: "default",
    mode: "dark",
    name: "Default Dark",
    description: "Comfortable dark theme with good contrast"
  },
  {
    id: "futuristic-light",
    variant: "futuristic",
    mode: "light",
    name: "Futuristic Light",
    description: "Clean tech aesthetic with vibrant accents"
  },
  {
    id: "futuristic-dark",
    variant: "futuristic",
    mode: "dark",
    name: "Futuristic Dark",
    description: "Cyberpunk darkness with electric neon glow"
  },
  {
    id: "pastel-light",
    variant: "pastel",
    mode: "light",
    name: "Pastel Light",
    description: "Soft, gentle aesthetic with warm cream tones"
  },
  {
    id: "pastel-dark",
    variant: "pastel",
    mode: "dark",
    name: "Pastel Dark",
    description: "Muted purple-grey with soft pastel accents"
  }
] as const;

// Derive type-safe constants from registry
export type ThemeId = (typeof THEME_REGISTRY)[number]["id"];

export const AVAILABLE_THEMES = THEME_REGISTRY.map((t) => t.id) as readonly ThemeId[];
export const AVAILABLE_VARIANTS = THEME_CONFIG.variants;

/**
 * Type guard to check if a string is a valid ThemeId
 */
export function isValidTheme(value: unknown): value is ThemeId {
  return typeof value === "string" && AVAILABLE_THEMES.includes(value as ThemeId);
}

/**
 * Type guard to check if a string is a valid ThemeVariant
 */
export function isValidVariant(value: unknown): value is ThemeVariant {
  return typeof value === "string" && AVAILABLE_VARIANTS.includes(value as ThemeVariant);
}

/**
 * Type guard to check if a string is a valid ThemeMode
 */
export function isValidMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark";
}

/**
 * Get theme definition by ID
 */
export function getThemeById(themeId: ThemeId): ThemeDefinition {
  const theme = THEME_REGISTRY.find((t) => t.id === themeId);
  if (!theme) {
    throw new Error(`Theme not found: ${themeId}`);
  }
  return theme;
}

/**
 * Build a valid theme ID from variant and mode with runtime validation
 */
export function buildThemeId(variant: ThemeVariant, mode: ThemeMode): ThemeId {
  const themeId = `${variant}-${mode}`;
  if (!isValidTheme(themeId)) {
    throw new Error(`Invalid theme combination: ${variant}-${mode}`);
  }
  return themeId;
}

/**
 * Parse a theme ID into its component parts with validation
 */
export function parseThemeId(themeId: ThemeId): { variant: ThemeVariant; mode: ThemeMode } {
  const theme = getThemeById(themeId);
  return {
    variant: theme.variant,
    mode: theme.mode
  };
}
