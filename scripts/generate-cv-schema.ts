import { jsonSchemaToZod } from "json-schema-to-zod";
import { writeFileSync } from "fs";
import { resolve } from "path";

const SCHEMA_URL = "https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json";
const OUTPUT_PATH = resolve(__dirname, "../src/data/models/CV.ts");

async function main() {
  console.log("Fetching JSON Resume schema...");
  const res = await fetch(SCHEMA_URL);
  if (!res.ok) throw new Error(`Failed to fetch schema: ${res.statusText}`);
  const schema = await res.json();

  console.log("Converting to Zod schema...");
  const zodCode = jsonSchemaToZod(schema, {
    name: "cvSchema",
    module: "esm",
    type: "CV"
  });

  writeFileSync(OUTPUT_PATH, zodCode, "utf-8");
  console.log(`Generated Zod schema at ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
