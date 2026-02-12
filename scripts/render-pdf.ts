import { chromium } from "playwright";
import { createServer, type ViteDevServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.join(projectRoot, "public", "cv.pdf");

async function renderPDF() {
  let server: ViteDevServer | null = null;

  try {
    console.log("Starting Vite dev server...");

    // Start Vite dev server
    server = await createServer({
      root: projectRoot,
      server: {
        port: 5174, // Use different port to avoid conflicts
        strictPort: true
      },
      logLevel: "warn"
    });

    await server.listen();
    const serverUrl = `http://localhost:5174`;

    console.log(`Vite server running at ${serverUrl}`);
    console.log("Launching Playwright...");

    const browser = await chromium.launch();

    const page = await browser.newPage();

    const cvUrl = `${serverUrl}/cv`;
    console.log(`Navigating to ${cvUrl}...`);

    await page.goto(cvUrl, {
      waitUntil: "networkidle",
      timeout: 30000
    });

    await page.waitForSelector(".cv-container", { timeout: 10000 });

    // Generate PDF
    console.log(`Generating PDF at ${outputPath}...`);

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm"
      }
    });

    console.log("PDF generated successfully!");

    await browser.close();
  } catch (error) {
    console.error("Error generating PDF:", error);
    process.exit(1);
  } finally {
    if (server) {
      await server.close();
      console.log("Vite server closed.");
    }
  }
}

renderPDF();
