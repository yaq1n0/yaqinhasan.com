import type { useTheme } from "@/composables/theme/UseTheme";
import { isValidVariant, isValidMode, isValidTheme } from "@/composables/theme/ThemeRegistry";
import type { Command, AddOutputFn } from "./Commands";

type ThemeComposable = ReturnType<typeof useTheme>;

function handleThemeStatus(theme: ThemeComposable, addOutput: AddOutputFn): void {
  addOutput("info", `Current theme: <strong>${theme.currentTheme.value}</strong>`);
  addOutput("info", `  Variant: <strong>${theme.currentVariant.value}</strong> | Mode: <strong>${theme.currentMode.value}</strong>`);
  addOutput("output", "");
  addOutput("output", "Usage: theme [list|set|variant|mode]");
}

function handleThemeList(theme: ThemeComposable, addOutput: AddOutputFn): void {
  addOutput("info", "<strong>Available themes:</strong>");
  addOutput("output", "");

  const variants = ["default", "futuristic", "pastel"] as const;
  variants.forEach((variant) => {
    const variantThemes = theme.themeRegistry.filter((t) => t.variant === variant);
    const isCurrent = theme.currentVariant.value === variant;
    const marker = isCurrent ? " <strong style='color: var(--color-accent);'>◄</strong>" : "";

    addOutput("output", `  <strong>${variant}${marker}</strong>`);
    variantThemes.forEach((t) => {
      const current = t.id === theme.currentTheme.value ? " <strong style='color: var(--color-accent);'>(active)</strong>" : "";
      addOutput("output", `    • ${t.name}: ${t.description}${current}`);
    });
    addOutput("output", "");
  });

  addOutput("info", "Use: theme set <theme-id>");
}

function handleThemeSet(args: string[], theme: ThemeComposable, addOutput: AddOutputFn): void {
  if (!args[1]) {
    addOutput("error", "Please specify a theme. Use 'theme list' to see options.");
    return;
  }

  const themeId = args[1];

  if (isValidTheme(themeId)) {
    theme.setTheme(themeId);
    const themeDef = theme.themeRegistry.find((t) => t.id === themeId);
    addOutput("success", `✓ Theme set to: <strong>${themeDef?.name}</strong>`);
  } else {
    addOutput("error", `Invalid theme: ${themeId}`);
    addOutput("info", "Use 'theme list' to see available themes.");
  }
}

function handleThemeVariant(args: string[], theme: ThemeComposable, addOutput: AddOutputFn): void {
  if (!args[1]) {
    const variants = theme.availableVariants.join(", ");
    addOutput("error", `Please specify a variant (${variants}).`);
    return;
  }

  const variant = args[1];
  if (!isValidVariant(variant)) {
    const variants = theme.availableVariants.join(", ");
    addOutput("error", `Invalid variant: ${variant}`);
    addOutput("info", `Valid variants: ${variants}`);
    return;
  }

  theme.setVariant(variant);
  addOutput("success", `✓ Variant changed to: <strong>${variant}</strong>`);
  addOutput("info", `Current theme: ${theme.currentTheme.value}`);
}

function handleThemeMode(args: string[], theme: ThemeComposable, addOutput: AddOutputFn): void {
  if (!args[1]) {
    addOutput("error", "Please specify a mode (light or dark).");
    return;
  }

  const mode = args[1];
  if (!isValidMode(mode)) {
    addOutput("error", `Invalid mode: ${mode}`);
    addOutput("info", "Valid modes: light, dark");
    return;
  }

  theme.setMode(mode);
  addOutput("success", `✓ Mode changed to: <strong>${mode}</strong>`);
  addOutput("info", `Current theme: ${theme.currentTheme.value}`);
}

export function createThemeCommands(addOutput: AddOutputFn, theme: ThemeComposable): Command[] {
  return [
    {
      name: "theme",
      description: "Manage themes (list, set <theme>, variant <name>, mode <light|dark>, toggle)",
      aliases: ["th"],
      execute: (args) => {
        if (args.length === 0) {
          handleThemeStatus(theme, addOutput);
          return;
        }

        const subcommand = args[0].toLowerCase();

        switch (subcommand) {
          case "list":
            handleThemeList(theme, addOutput);
            break;
          case "set":
            handleThemeSet(args, theme, addOutput);
            break;
          case "variant":
            handleThemeVariant(args, theme, addOutput);
            break;
          case "mode":
            handleThemeMode(args, theme, addOutput);
            break;
          default:
            addOutput("error", `Unknown subcommand: ${subcommand}`);
            addOutput("output", "Usage: theme [list|set|variant|mode]");
        }
      }
    }
  ];
}
