# These are standalone scripts that you run, separate from the main vite/vue app, which perform related functions.

- render-pdf.ts: renders the cv pdf using playwright, using the /cv?print=true route with the print param passed through to the vite app to make it display the cv in print mode in CVPage.vue

- validate-themes: makes sure that the themes are setup properly

- validate-contrast: makes sure that the themes are WCAG compliant

- generate-cv-schema: generates CV.ts based on the jsonresume.org jsonschema, using jsonSchemaToZod.
