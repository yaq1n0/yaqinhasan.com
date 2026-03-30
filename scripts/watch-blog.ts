import { watch } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = resolve(__dirname, "../content/blog");

let running = false;
let queued = false;

function runBuild() {
  if (running) {
    queued = true;
    return;
  }

  running = true;
  console.log(`[watch-blog] change detected — running gen:blog...`);

  const proc = spawn("npm", ["run", "gen:blog"], {
    stdio: "inherit",
    shell: true,
    cwd: resolve(__dirname, "..")
  });

  proc.on("close", (code) => {
    running = false;
    if (code !== 0) {
      console.error(`[watch-blog] gen:blog exited with code ${code}`);
    } else {
      console.log(`[watch-blog] done.`);
    }
    if (queued) {
      queued = false;
      runBuild();
    }
  });
}

console.log(`[watch-blog] watching ${BLOG_DIR}`);
runBuild();

watch(BLOG_DIR, { recursive: true }, (event, filename) => {
  if (!filename?.endsWith(".md")) return;
  console.log(`[watch-blog] ${event}: ${filename}`);
  runBuild();
});
