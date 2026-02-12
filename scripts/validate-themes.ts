#!/usr/bin/env tsx
/**
 * Theme System Validation Script
 * Validates theme registry, SCSS files, and configuration consistency
 * Run via: npm run validate:themes
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { THEME_REGISTRY, buildThemeId, type ThemeId } from "../src/composables/ThemeRegistry";
import { THEME_CONFIG } from "../src/composables/themes.config";

// Get project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, "..");

type ThemeValidationResult = {
  success: boolean;
  errors: string[];
  warnings: string[];
};

/**
 * Validate theme registry structure and consistency
 */
function validateThemeRegistry(): ThemeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log("📋 Validating theme registry...");

  // 1. Check for duplicate theme IDs
  const ids = THEME_REGISTRY.map((t) => t.id);
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicates.length > 0) {
    errors.push(`Duplicate theme IDs found: ${duplicates.join(", ")}`);
  }

  // 2. Validate each theme's ID matches expected variant-mode format
  THEME_REGISTRY.forEach((theme) => {
    try {
      const expected = buildThemeId(theme.variant, theme.mode);
      if (theme.id !== expected) {
        errors.push(`Theme ID "${theme.id}" doesn't match expected format "${expected}"`);
      }
    } catch (error) {
      errors.push(`Invalid theme combination in registry: ${theme.id}`);
    }
  });

  // 3. Verify all variants from config have corresponding themes
  THEME_CONFIG.variants.forEach((variant) => {
    THEME_CONFIG.modes.forEach((mode) => {
      const expectedId = `${variant}-${mode}` as ThemeId;
      const exists = THEME_REGISTRY.some((t) => t.id === expectedId);
      if (!exists) {
        errors.push(`Missing theme in registry: ${expectedId} (variant: ${variant}, mode: ${mode})`);
      }
    });
  });

  // 4. Check that all themes have required metadata
  THEME_REGISTRY.forEach((theme) => {
    if (!theme.name || theme.name.trim() === "") {
      errors.push(`Theme "${theme.id}" is missing a name`);
    }
    if (!theme.description || theme.description.trim() === "") {
      warnings.push(`Theme "${theme.id}" is missing a description`);
    }
  });

  console.log(`   ✓ Checked ${THEME_REGISTRY.length} theme definitions`);

  return { success: errors.length === 0, errors, warnings };
}

/**
 * Validate SCSS theme files exist and contain required selectors
 */
function validateScssFiles(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log("🎨 Validating SCSS theme files...");

  const themesDir = join(PROJECT_ROOT, "src/styles/themes");
  const variants = new Set(THEME_REGISTRY.map((t) => t.variant));

  // 1. Check each variant has a corresponding SCSS file
  variants.forEach((variant) => {
    const scssPath = join(themesDir, `_${variant}.scss`);

    if (!existsSync(scssPath)) {
      errors.push(`Missing SCSS file for variant "${variant}": ${scssPath}`);
      return;
    }

    console.log(`   📄 Checking _${variant}.scss...`);

    const content = readFileSync(scssPath, "utf-8");

    // 2. Verify all theme IDs for this variant have selectors
    const variantThemes = THEME_REGISTRY.filter((t) => t.variant === variant);

    variantThemes.forEach((theme) => {
      const selector = `[data-theme="${theme.id}"]`;
      if (!content.includes(selector)) {
        errors.push(`SCSS file "_${variant}.scss" missing selector: ${selector}`);
      }
    });

    // 3. Check for required CSS variables in each theme
    variantThemes.forEach((theme) => {
      const themeBlockRegex = new RegExp(`\\[data-theme="${theme.id}"\\]\\s*\\{([^}]+)\\}`, "s");
      const match = content.match(themeBlockRegex);

      if (match) {
        const themeBlock = match[1];

        THEME_CONFIG.requiredVars.forEach((cssVar) => {
          if (!themeBlock.includes(cssVar)) {
            warnings.push(`Theme "${theme.id}" might be missing CSS variable: ${cssVar}`);
          }
        });
      }
    });
  });

  console.log(`   ✓ Validated ${variants.size} SCSS files`);

  return { success: errors.length === 0, errors, warnings };
}

/**
 * Validate main.scss imports theme files
 */
function validateMainScss(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log("📦 Validating main.scss imports...");

  const mainScssPath = join(PROJECT_ROOT, "src/styles/main.scss");

  if (!existsSync(mainScssPath)) {
    errors.push("main.scss not found at expected location");
    return { success: false, errors, warnings };
  }

  const content = readFileSync(mainScssPath, "utf-8");
  const variants = new Set(THEME_REGISTRY.map((t) => t.variant));

  variants.forEach((variant) => {
    const useStatement = `@use "themes/${variant}";`;
    if (!content.includes(useStatement)) {
      errors.push(`main.scss missing import for theme variant "${variant}": ${useStatement}`);
    }
  });

  console.log(`   ✓ Verified theme imports in main.scss`);

  return { success: errors.length === 0, errors, warnings };
}

/**
 * Main validation runner
 */
function main() {
  console.log("🎨 Theme System Validation\n");
  console.log("=".repeat(50) + "\n");

  const results: ValidationResult[] = [validateThemeRegistry(), validateScssFiles(), validateMigrations(), validateMainScss()];

  console.log("\n" + "=".repeat(50) + "\n");

  // Collect all warnings
  const allWarnings = results.flatMap((r) => r.warnings);
  if (allWarnings.length > 0) {
    console.log("⚠️  Warnings:\n");
    allWarnings.forEach((w) => console.log(`   ${w}`));
    console.log("");
  }

  // Collect all errors
  const allErrors = results.flatMap((r) => r.errors);
  if (allErrors.length > 0) {
    console.log("❌ Validation Failed:\n");
    allErrors.forEach((e) => console.log(`   ${e}`));
    console.log("");
    process.exit(1);
  }

  // Success summary
  console.log("✅ All theme validations passed!\n");
  console.log(`   📊 Summary:`);
  console.log(`   - ${THEME_REGISTRY.length} themes registered`);
  console.log(`   - ${new Set(THEME_REGISTRY.map((t) => t.variant)).size} variants (${Array.from(new Set(THEME_REGISTRY.map((t) => t.variant))).join(", ")})`);
  console.log(`   - ${THEME_CONFIG.requiredVars.length} required CSS variables`);
  console.log(`   - ${THEME_MIGRATIONS.length} migrations configured`);
  console.log("");

  process.exit(0);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
