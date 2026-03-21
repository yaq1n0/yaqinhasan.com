import { FullProject } from "../../models/Project";

export const webOverrides: Record<string, Partial<FullProject>> = {
  VidSrcWrapper: {
    description: "Searches TMDB and stream content via VidSrc (proxied for security), dockerised full stack web app.",
    category: "Web",
    status: "Complete",
    keywords: ["Vue", "Hono", "TypeScript", "Docker", "Full Stack"],
    order: 1
  },
  "yaqinhasan.com": {
    description: "Portfolio with dynamically rendered CV, terminal UI for interactive navigation and extensive theming system.",
    category: "Web",
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
    description: "Lightweight password generation web utility at pwordgen.com backed by the pwordgen npm package",
    category: "Web",
    status: "Complete",
    keywords: ["Vue", "Vite", "TypeScript", "npm", "Package Development"],
    order: 3
  },
  LinkBlitzer: {
    description: "Bundle, save & share links easily, with a browser extension to quickly open multiple links simultaneously.",
    category: "Web",
    status: "In Progress",
    keywords: ["Vue", "Vite", "TypeScript", "Browser Extension", "Web Development"],
    order: 4
  }
};
