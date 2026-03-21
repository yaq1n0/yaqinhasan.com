import { FullProject } from "../models/Project";

// Keyed by GitHub repo name (= project ID)
export const projectOverrides: Record<string, Partial<FullProject>> = {
  // ── Desktop ────────────────────────────────────────────────
  CryptIt: {
    name: "CryptIt • Desktop app",
    type: "Desktop",
    status: "Complete",
    keywords: ["Rust", "Tauri", "Vue", "Cryptography", "Desktop App Development"],
    order: 1
  },
  TrayRunner: {
    name: "TrayRunner • macOS app",
    type: "Desktop",
    status: "Complete",
    keywords: ["Swift", "SwiftUI", "macOS Development", "Desktop App Development", "Shell Scripting"],
    order: 2
  },

  // ── Web ────────────────────────────────────────────────────
  VidSrcWrapper: {
    name: "VidSrcWrapper • Self-hostable media site",
    description: "Searches TMDB and stream content via VidSrc (proxied for security), dockerised full stack web app.",
    type: "Web",
    status: "Complete",
    keywords: ["Vue", "Hono", "TypeScript", "Docker", "Full Stack"],
    htmlDescription: `<p>I wanted an application that can search TMDB then pass the id to VidSrc embed, which would allow me to watch movies and shows from it easily, without the manual lookup.</p>`,
    order: 1
  },
  "yaqinhasan.com": {
    name: "yaqinhasan.com • Portfolio site",
    description: "Portfolio with dynamically rendered CV, terminal UI for interactive navigation and extensive theming system.",
    type: "Web",
    status: "Complete",
    keywords: ["Vue", "Vite", "TypeScript", "Web Development"],
    htmlDescription: `
    <p>I wanted a personal portfolio website to showcase and document my projects, most developers have one so I asked myself "how hard could it be?".</p>
    <h4>Initial Research, Abandoned Approaches</h4>
    <p>
      I thought about using React or Flutter to make the site, but I wanted to challenge myself to make something that looks and functions like a modern
      site, using nothing but raw HTML, CSS and JS. I initially tried to use a HTML template I found online, but it was terribly written and a nightmare to
      work with, so I decided to go even more RAW and write everything from scratch. As a result, all the code for this site is written by yours truly (me)
      from scratch!
    </p>
    <h4>A Minimalist Approach Begins</h4>
    <p>
      Writing everything from scratch meant learning the responsive CSS from scratch and developing a deep understanding of the responsive and adaptive
      layout tools. The initial versions of the site were made responsive using purely clever HTML and CSS. However, as I added more features to the site, I
      ended up using some plain ol' JavaScript. Such as for the mobile navigation bar overflow menu, carousel layout navigation logic and developer mode. I
      also took the liberty of splitting the files into more manageable sections and components, simplifying my workflow dramatically.
    </p>`,
    order: 2
  },
  "pwordGen.com": {
    name: "PwordGen • Lightweight password generator",
    description: "Lightweight password generation web utility at pwordgen.com backed by the pwordgen npm package",
    type: "Web",
    status: "Complete",
    keywords: ["Vue", "Vite", "TypeScript", "npm", "Package Development"],
    order: 3
  },
  LinkBlitzer: {
    name: "LinkBlitzer • Link bundler & opener",
    description: "Bundle, save & share links easily, with a browser extension to quickly open multiple links simultaneously.",
    type: "Web",
    status: "In Progress",
    keywords: ["Vue", "Vite", "TypeScript", "Browser Extension", "Web Development"],
    order: 4
  },

  // ── Other ──────────────────────────────────────────────────
  STQL: {
    name: "STQL • Interpreter",
    description: "Interpreter for a custom SQL-inspired RDF querying language, implemented in Haskell",
    type: "Other",
    status: "Complete",
    keywords: ["Haskell", "Interpreter Design", "Compiler Theory", "Formal Language Theory"],
    order: 1
  },
  "opl-py": {
    name: "opl-py • PyPI package",
    description:
      "Open source Python SDK and dockerised web app for querying and analysing OpenPowerlifting data, with performance prediction using machine learning",
    type: "Other",
    status: "In Progress",
    keywords: ["Python", "FastAPI", "React", "Docker", "scikit-learn", "PyTorch", "PyPI", "Machine Learning", "Data analytics"],
    order: 2
  },
  "prompt-as-endpoint": {
    name: "prompt-as-endpoint • npm library",
    description: "Open source TypeScript library for building AI-powered APIs with runtime schema validation, prompt templating, and output validation.",
    type: "Other",
    status: "In Progress",
    keywords: ["TypeScript", "AI", "LLM", "REST API", "Zod", "npm", "Developer Experience"],
    order: 3
  },
  ThymPi: {
    name: "ThymPi • Research project",
    description: "Proof-of-concept robotics platform using sensor data to augment visual navigation systems for autonomously navigating robots.",
    type: "Other",
    status: "Complete",
    keywords: ["Python", "OpenCV", "Machine Vision", "Robotics", "Autonomous Navigation", "Final year project"],
    htmlDescription: `
    <h4>Project Definition</h4>
    <p>
      The official title of my dissertation was "An Intelligent Approach to Navigating Environments With Compliant Obstacles". Like most academic titles, it
      likely means very little to you. The gist of it is that obstacles fall on a spectrum of compliance, which is a fancy way of saying how easy they are
      to move aside or get through.
    </p>
    <p>
      Essentially, if you have a robot that is navigating solely visually, it has no context for what an obstacle's compliance is. You would have to
      manually add compliance context to the object detection and classification model. This is suboptimal for many reasons, which is why you'd probably
      want to have the robot to be able to do this on its own.
    </p>
    <p>
      A side note, with recent advancements in AI, training a model with a limited set of known object/compliance pairs and having it extrapolate the data
      is a lot more realistic and robust of a solution.
    </p>
    <h4>Summary of Final Prototype</h4>
    <p>
      The goal of my project was to design, implement and test a prototype robotics platform to demonstrate "An Intelligent Approach to Navigating
      Environments With Compliant Obstacles".
    </p>
    <p>
      I had a Raspberry Pi 3 running the OpenCV object classification model, compliance testing logic and Thymio control program (asebamedulla). Everything
      was written in Python with the Pi 3 was connected to a Pi camera, the MPU6050 inertial measurement unit (accelerometer and gyroscope) and the Thymio
      robot.
    </p>
    <p>
      The final prototype was able to identify and classify obstacles, then it would decide to test the compliance of the obstacle if it was unknown to it.
      In theory, this would then be coupled with a navigation algorithm, using the compliance values to augment the different path "weights" to come up with
      the most efficient real-life path.
    </p>`,
    order: 4
  }
};
