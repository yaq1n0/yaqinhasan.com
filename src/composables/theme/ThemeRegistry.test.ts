/**
 * Theme Registry Tests
 * Basic validation tests for theme system types and utilities
 */

import { describe, it, expect } from "vitest";
import {
  THEME_REGISTRY,
  AVAILABLE_THEMES,
  AVAILABLE_VARIANTS,
  isValidTheme,
  isValidVariant,
  isValidMode,
  buildThemeId,
  parseThemeId,
  getThemeById
} from "./ThemeRegistry";
import { THEME_CONFIG } from "./ThemeConfig";

describe("ThemeRegistry", () => {
  describe("THEME_REGISTRY", () => {
    it("should contain all expected themes", () => {
      expect(THEME_REGISTRY).toHaveLength(6);
    });

    it("should have themes for all variant-mode combinations", () => {
      THEME_CONFIG.variants.forEach((variant) => {
        THEME_CONFIG.modes.forEach((mode) => {
          const expectedId = `${variant}-${mode}`;
          const theme = THEME_REGISTRY.find((t) => t.id === expectedId);
          expect(theme).toBeDefined();
        });
      });
    });

    it("should have no duplicate theme IDs", () => {
      const ids = THEME_REGISTRY.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("Type Guards", () => {
    it("isValidTheme should validate theme IDs correctly", () => {
      expect(isValidTheme("default-light")).toBe(true);
      expect(isValidTheme("default-dark")).toBe(true);
      expect(isValidTheme("invalid-theme")).toBe(false);
      expect(isValidTheme("")).toBe(false);
      expect(isValidTheme(null)).toBe(false);
      expect(isValidTheme(undefined)).toBe(false);
    });

    it("isValidVariant should validate variants correctly", () => {
      expect(isValidVariant("default")).toBe(true);
      expect(isValidVariant("futuristic")).toBe(true);
      expect(isValidVariant("pastel")).toBe(true);
      expect(isValidVariant("invalid")).toBe(false);
      expect(isValidVariant("")).toBe(false);
    });

    it("isValidMode should validate modes correctly", () => {
      expect(isValidMode("light")).toBe(true);
      expect(isValidMode("dark")).toBe(true);
      expect(isValidMode("invalid")).toBe(false);
      expect(isValidMode("")).toBe(false);
    });
  });

  describe("buildThemeId", () => {
    it("should build valid theme IDs", () => {
      expect(buildThemeId("default", "light")).toBe("default-light");
      expect(buildThemeId("futuristic", "dark")).toBe("futuristic-dark");
      expect(buildThemeId("pastel", "light")).toBe("pastel-light");
    });

    it("should throw on invalid combinations", () => {
      expect(() => buildThemeId("invalid" as never, "light")).toThrow();
    });
  });

  describe("parseThemeId", () => {
    it("should parse theme IDs correctly", () => {
      const parsed = parseThemeId("default-light");
      expect(parsed.variant).toBe("default");
      expect(parsed.mode).toBe("light");
    });

    it("should parse all valid theme IDs", () => {
      AVAILABLE_THEMES.forEach((themeId) => {
        const parsed = parseThemeId(themeId);
        expect(parsed.variant).toBeDefined();
        expect(parsed.mode).toBeDefined();
      });
    });
  });

  describe("getThemeById", () => {
    it("should retrieve theme by ID", () => {
      const theme = getThemeById("default-light");
      expect(theme).toBeDefined();
      expect(theme.id).toBe("default-light");
      expect(theme.variant).toBe("default");
      expect(theme.mode).toBe("light");
    });

    it("should throw on invalid theme ID", () => {
      expect(() => getThemeById("invalid" as never)).toThrow();
    });
  });

  describe("AVAILABLE_THEMES and AVAILABLE_VARIANTS", () => {
    it("AVAILABLE_THEMES should match registry", () => {
      expect(AVAILABLE_THEMES).toHaveLength(THEME_REGISTRY.length);
    });

    it("AVAILABLE_VARIANTS should match config", () => {
      expect(AVAILABLE_VARIANTS).toEqual(THEME_CONFIG.variants);
    });
  });
});
