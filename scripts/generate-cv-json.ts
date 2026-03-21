import { cvData } from "../src/data/cvData";
import { CVProjects } from "../src/data/projects/projectHelpers";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cv = { ...cvData, projects: CVProjects };
const outputPath = resolve(__dirname, "../public/cv.json");
writeFileSync(outputPath, JSON.stringify(cv, null, 2));
console.log(`Generated cv.json at ${outputPath}`);
