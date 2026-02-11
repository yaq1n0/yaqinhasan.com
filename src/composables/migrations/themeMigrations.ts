/**
 * Theme Migration System
 * Handles backward-compatible migrations from legacy theme formats
 *
 * Each migration is modular and can be removed once its expiration date passes.
 * This prevents tech debt accumulation while maintaining user experience.
 */

import type { ThemeId } from "../ThemeRegistry";

export interface ThemeMigration {
  /** Unique identifier for this migration */
  readonly id: string;

  /** Whether this migration is active */
  readonly enabled: boolean;

  /** Date after which this migration can be safely removed */
  readonly expiresAt: Date;

  /** Description of what this migration does */
  readonly description: string;

  /** Migration function that returns new ThemeId or null if no migration needed */
  readonly migrate: (stored: string | null) => ThemeId | null;
}

/**
 * Registry of all theme migrations
 * Add new migrations here as needed, remove expired ones
 */
export const THEME_MIGRATIONS: readonly ThemeMigration[] = [
  {
    id: "legacy-dark-light-v1",
    enabled: true,
    expiresAt: new Date("2027-02-10"), // TODO: Remove after this date
    description: "Migrate legacy 'dark'/'light' strings to 'default-dark'/'default-light'",
    migrate: (stored: string | null): ThemeId | null => {
      if (!stored) return null;

      // Map old string-based themes to new IDs
      const legacyMap: Record<string, ThemeId> = {
        dark: "default-dark",
        light: "default-light"
      };

      return legacyMap[stored] || null;
    }
  },
  {
    id: "legacy-class-based-v1",
    enabled: true,
    expiresAt: new Date("2027-02-10"), // TODO: Remove after this date
    description: "Detect legacy class-based dark mode and migrate to default-dark",
    migrate: (stored: string | null): ThemeId | null => {
      // Check if document has legacy dark class (edge case for users with no localStorage)
      if (!stored && typeof document !== "undefined") {
        const hasLegacyDarkClass = document.documentElement.classList.contains("dark");
        if (hasLegacyDarkClass) {
          return "default-dark";
        }
      }
      return null;
    }
  }
] as const;

/**
 * Get currently active migrations (enabled and not expired)
 */
export function getActiveMigrations(): ThemeMigration[] {
  const now = new Date();
  return THEME_MIGRATIONS.filter((m) => m.enabled && m.expiresAt > now);
}

/**
 * Get expired migrations that can be safely removed from codebase
 */
export function getExpiredMigrations(): ThemeMigration[] {
  const now = new Date();
  return THEME_MIGRATIONS.filter((m) => m.expiresAt <= now);
}

/**
 * Run all active migrations on a stored theme value
 * Returns the migrated theme ID or null if no migration was performed
 */
export function runMigrations(stored: string | null): ThemeId | null {
  const activeMigrations = getActiveMigrations();

  for (const migration of activeMigrations) {
    const result = migration.migrate(stored);
    if (result) {
      // Log migration for debugging (only in dev mode)
      if (import.meta.env.DEV) {
        console.info(`🔄 Theme migration: "${stored}" → "${result}"`, `(${migration.id})`);
      }
      return result;
    }
  }

  return null;
}

/**
 * Check if there are any expired migrations that should be cleaned up
 * Useful for CI/CD to remind developers to remove old code
 */
export function hasExpiredMigrations(): boolean {
  return getExpiredMigrations().length > 0;
}
