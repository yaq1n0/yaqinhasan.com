import type { Ref } from "vue";
import type { Command, AddOutputFn } from "./Commands";

export function createDevCommands(addOutput: AddOutputFn, isDevMode: Ref<boolean>, toggleDevMode: () => void): Command[] {
  return [
    {
      name: "dev",
      description: "Toggle developer mode (use --enable or --disable)",
      execute: (args) => {
        if (args.length === 0) {
          addOutput("info", `Developer mode is currently: <strong>${isDevMode.value ? "ENABLED" : "DISABLED"}</strong>`);
          addOutput("output", "Usage: dev --enable | dev --disable");
          return;
        }

        const flag = args[0].toLowerCase();

        if (flag === "--enable" || flag === "-e") {
          if (isDevMode.value) {
            addOutput("info", "Developer mode is already enabled");
          } else {
            toggleDevMode();
            addOutput("success", "✓ Developer mode ENABLED");
            addOutput("info", "Additional developer content is now visible");
          }
        } else if (flag === "--disable" || flag === "-d") {
          if (!isDevMode.value) {
            addOutput("info", "Developer mode is already disabled");
          } else {
            toggleDevMode();
            addOutput("success", "✓ Developer mode DISABLED");
            addOutput("info", "Developer content hidden");
          }
        } else if (flag === "--status" || flag === "-s") {
          addOutput("info", `Status: ${isDevMode.value ? "ENABLED" : "DISABLED"}`);
        } else {
          addOutput("error", `Unknown flag: ${flag}`);
          addOutput("output", "Usage: dev --enable | dev --disable | dev --status");
        }
      }
    }
  ];
}
