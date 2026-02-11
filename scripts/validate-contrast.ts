#!/usr/bin/env tsx
/**
 * WCAG Contrast Validation Script
 * Validates color contrast ratios for accessibility compliance
 * Run via: npm run validate:contrast
 */

import { readFileSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { getLuminance } from "polished";
import { THEME_REGISTRY } from "../src/composables/ThemeRegistry";
import { THEME_CONFIG } from "../src/composables/themes.config";

// Get project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, "..");

interface ContrastCheck {
  theme: string;
  context: string;
  foreground: string;
  foregroundColor: string;
  background: string;
  backgroundColor: string;
  ratio: number;
  passes: {
    aa: boolean;
    aaLarge: boolean;
    aaa: boolean;
    aaaLarge: boolean;
  };
}

/**
 * Calculate contrast ratio between two colors
 * Based on WCAG 2.1 formula: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
function calculateContrastRatio(fg: string, bg: string): number {
  try {
    const fgLum = getLuminance(fg);
    const bgLum = getLuminance(bg);
    const lighter = Math.max(fgLum, bgLum);
    const darker = Math.min(fgLum, bgLum);
    return (lighter + 0.05) / (darker + 0.05);
  } catch (error) {
    console.error(`Failed to calculate contrast for ${fg} / ${bg}:`, error);
    return 0;
  }
}

/**
 * Parse color value from CSS (supports hex, rgb, rgba)
 */
function parseColor(value: string): string {
  // Remove whitespace and semicolons
  let cleaned = value.trim().replace(/;$/, "");

  // Handle rgba with transparency - convert to solid color approximation
  if (cleaned.startsWith("rgba(")) {
    const match = cleaned.match(/rgba\(([^)]+)\)/);
    if (match) {
      const parts = match[1].split(",").map((p) => p.trim());
      if (parts.length === 4) {
        // Convert to rgb, ignoring alpha for contrast calculation
        cleaned = `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`;
      }
    }
  }

  return cleaned;
}

/**
 * Extract CSS variable values from SCSS content
 */
function extractColors(scssContent: string, themeId: string): Map<string, string> {
  const colors = new Map<string, string>();

  // Find the theme block
  const themeBlockRegex = new RegExp(`\\[data-theme="${themeId}"\\]\\s*\\{([^}]+)\\}`, "s");
  const match = scssContent.match(themeBlockRegex);

  if (!match) {
    console.warn(`⚠️  Could not find theme block for: ${themeId}`);
    return colors;
  }

  const themeBlock = match[1];

  // Match CSS variable definitions: --var-name: value;
  const varRegex = /--(color-[a-z-]+):\s*([^;]+);/g;
  let varMatch;

  while ((varMatch = varRegex.exec(themeBlock)) !== null) {
    const [, varName, value] = varMatch;
    colors.set(varName, parseColor(value));
  }

  return colors;
}

/**
 * Validate contrast ratios for a single theme
 */
function validateThemeContrast(themeId: string, colors: Map<string, string>): ContrastCheck[] {
  const results: ContrastCheck[] = [];

  // Use contrast pairs from centralized config
  THEME_CONFIG.contrastPairs.forEach(({ foreground, background, context }) => {
    const fgColor = colors.get(foreground);
    const bgColor = colors.get(background);

    if (!fgColor || !bgColor) {
      console.warn(`⚠️  ${themeId}: Missing colors for ${context} (${foreground}/${background})`);
      return;
    }

    const ratio = calculateContrastRatio(fgColor, bgColor);

    results.push({
      theme: themeId,
      context,
      foreground,
      foregroundColor: fgColor,
      background,
      backgroundColor: bgColor,
      ratio: Math.round(ratio * 100) / 100,
      passes: {
        aa: ratio >= THEME_CONFIG.wcag.aa.normal,
        aaLarge: ratio >= THEME_CONFIG.wcag.aa.large,
        aaa: ratio >= THEME_CONFIG.wcag.aaa.normal,
        aaaLarge: ratio >= THEME_CONFIG.wcag.aaa.large
      }
    });
  });

  return results;
}

/**
 * Format contrast check result as a string
 */
function formatCheckResult(check: ContrastCheck): string {
  const status = check.passes.aa ? "✅" : "❌";
  const level = check.passes.aaa ? "AAA" : check.passes.aa ? "AA" : "FAIL";
  return `   ${status} ${check.ratio.toFixed(2)}:1 [${level}] - ${check.context}`;
}

/**
 * Main validation function
 */
function main() {
  console.log("🎨 WCAG Contrast Ratio Validation\n");
  console.log("=".repeat(50) + "\n");

  const themesDir = join(PROJECT_ROOT, "src/styles/themes");

  if (!existsSync(themesDir)) {
    console.error(`❌ Themes directory not found: ${themesDir}`);
    process.exit(1);
  }

  const scssFiles = readdirSync(themesDir).filter((f) => f.endsWith(".scss"));

  let totalChecks = 0;
  let failedChecks = 0;
  const failures: string[] = [];
  const allResults: ContrastCheck[] = [];

  // Process each SCSS file
  scssFiles.forEach((file) => {
    const variantName = file.replace(/^_|\.scss$/g, "");
    const filePath = join(themesDir, file);
    const content = readFileSync(filePath, "utf-8");

    // Get all themes for this variant
    const variantThemes = THEME_REGISTRY.filter((t) => t.variant === variantName);

    variantThemes.forEach((theme) => {
      console.log(`📋 ${theme.name} (${theme.id}):`);

      const colors = extractColors(content, theme.id);

      if (colors.size === 0) {
        console.log(`   ⚠️  No colors extracted - check SCSS format\n`);
        return;
      }

      const results = validateThemeContrast(theme.id, colors);

      results.forEach((check) => {
        totalChecks++;
        console.log(formatCheckResult(check));
        allResults.push(check);

        if (!check.passes.aa) {
          failedChecks++;
          failures.push(`${theme.name}: ${check.context} (${check.ratio.toFixed(2)}:1, needs ${THEME_CONFIG.wcag.aa.normal}:1)`);
        }
      });

      console.log("");
    });
  });

  console.log("=".repeat(50) + "\n");

  // Summary statistics
  const aaPassCount = allResults.filter((r) => r.passes.aa).length;
  const aaaPassCount = allResults.filter((r) => r.passes.aaa).length;

  console.log(`📊 Summary:`);
  console.log(`   Total checks: ${totalChecks}`);
  console.log(`   AA compliance: ${aaPassCount}/${totalChecks} (${Math.round((aaPassCount / totalChecks) * 100)}%)`);
  console.log(`   AAA compliance: ${aaaPassCount}/${totalChecks} (${Math.round((aaaPassCount / totalChecks) * 100)}%)`);
  console.log("");

  // Report failures
  if (failedChecks > 0) {
    console.log("❌ WCAG AA Contrast Failures:\n");
    failures.forEach((f) => console.log(`   ${f}`));
    console.log("");
    console.log(`💡 Tip: Normal text needs ${THEME_CONFIG.wcag.aa.normal}:1 contrast ratio`);
    console.log(`   Large text needs ${THEME_CONFIG.wcag.aa.large}:1 contrast ratio`);
    console.log(`   Learn more: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html`);
    console.log("");
    process.exit(1);
  }

  // Success
  console.log("✅ All themes pass WCAG AA contrast requirements!\n");

  if (aaaPassCount === totalChecks) {
    console.log("🏆 Bonus: All themes also pass AAA (enhanced) requirements!\n");
  }

  process.exit(0);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
