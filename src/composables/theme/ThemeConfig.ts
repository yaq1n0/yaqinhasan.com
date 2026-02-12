/**
 * Central theme configuration
 * Single source of truth for theme system constants and validation rules
 */

export const THEME_CONFIG = {
  /**
   * Available theme variants
   */
  variants: ["default", "futuristic", "pastel"] as const,

  /**
   * Available theme modes (light/dark)
   */
  modes: ["light", "dark"] as const,

  /**
   * Required CSS variables that must be present in all themes
   */
  requiredVars: [
    "--color-bg-primary",
    "--color-bg-secondary",
    "--color-bg-tertiary",
    "--color-text-primary",
    "--color-text-secondary",
    "--color-accent",
    "--color-accent-light",
    "--color-accent-dark",
    "--color-accent-translucent",
    "--color-border"
  ] as const,

  /**
   * Critical color combinations that must pass WCAG AA contrast (4.5:1 for normal text)
   */
  contrastPairs: [
    {
      foreground: "color-text-primary",
      background: "color-bg-primary",
      context: "Body text on primary background"
    },
    {
      foreground: "color-text-secondary",
      background: "color-bg-primary",
      context: "Secondary text on primary background"
    },
    {
      foreground: "color-text-primary",
      background: "color-bg-secondary",
      context: "Text on cards/sections"
    },
    {
      foreground: "color-accent",
      background: "color-bg-primary",
      context: "Links and interactive elements"
    }
  ] as const,

  /**
   * WCAG contrast ratio requirements
   */
  wcag: {
    aa: {
      normal: 4.5, // Normal text (< 18pt or < 14pt bold)
      large: 3.0 // Large text (>= 18pt or >= 14pt bold)
    },
    aaa: {
      normal: 7.0,
      large: 4.5
    }
  } as const
} as const;

// Type exports derived from config
export type ThemeVariant = (typeof THEME_CONFIG.variants)[number];
export type ThemeMode = (typeof THEME_CONFIG.modes)[number];
export type RequiredCSSVar = (typeof THEME_CONFIG.requiredVars)[number];
