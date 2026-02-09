export interface OutputLine {
  type: "command" | "output" | "error" | "success" | "info";
  content: string;
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[]) => void;
}

export interface CommandContext {
  addOutput: (type: OutputLine["type"], content: string) => void;
  isDevMode: boolean;
  toggleDevMode: () => void;
  navigate?: (path: string) => void;
  currentPath?: string;
}

export function createCommands(context: CommandContext): Command[] {
  const { addOutput, isDevMode, toggleDevMode, navigate, currentPath } = context;

  return [
    {
      name: "help",
      description: "Display available commands",
      aliases: ["man", "?"],
      execute: () => {
        addOutput("info", "<strong>Available Commands:</strong>");
        addOutput("output", "");

        // Get commands dynamically to ensure we show all registered commands
        const commands = createCommands(context);
        commands.forEach((cmd) => {
          const cmdName = cmd.aliases ? `${cmd.name} (${cmd.aliases.join(", ")})` : cmd.name;
          addOutput("output", `  <strong>${cmdName.padEnd(25)}</strong> ${cmd.description}`);
        });

        addOutput("output", "");
        addOutput("info", "Use arrow keys (↑/↓) to navigate command history");
        addOutput("info", "Press TAB for command suggestions");
      }
    },
    {
      name: "clear",
      description: "Clear the terminal screen",
      aliases: ["cls"],
      execute: () => {
        // This will be handled by the composable
        addOutput("info", "__CLEAR__");
      }
    },
    {
      name: "dev",
      description: "Toggle developer mode (use --enable or --disable)",
      execute: (args) => {
        if (args.length === 0) {
          addOutput("info", `Developer mode is currently: <strong>${isDevMode ? "ENABLED" : "DISABLED"}</strong>`);
          addOutput("output", "Usage: dev --enable | dev --disable");
          return;
        }

        const flag = args[0].toLowerCase();

        if (flag === "--enable" || flag === "-e") {
          if (isDevMode) {
            addOutput("info", "Developer mode is already enabled");
          } else {
            toggleDevMode();
            addOutput("success", "✓ Developer mode ENABLED");
            addOutput("info", "Additional developer content is now visible");
          }
        } else if (flag === "--disable" || flag === "-d") {
          if (!isDevMode) {
            addOutput("info", "Developer mode is already disabled");
          } else {
            toggleDevMode();
            addOutput("success", "✓ Developer mode DISABLED");
            addOutput("info", "Developer content hidden");
          }
        } else if (flag === "--status" || flag === "-s") {
          addOutput("info", `Status: ${isDevMode ? "ENABLED" : "DISABLED"}`);
        } else {
          addOutput("error", `Unknown flag: ${flag}`);
          addOutput("output", "Usage: dev --enable | dev --disable | dev --status");
        }
      }
    },
    {
      name: "whoami",
      description: "Display information about the site owner",
      execute: () => {
        addOutput("output", "<strong>Yaqin Hasan</strong>");
        addOutput("output", "Software Engineer | Full-Stack Developer");
        addOutput("output", "TypeScript • React • Node • PostgreSQL • AWS");
        addOutput("output", "");
        addOutput("info", "Based in the UK | Open to Skilled Worker sponsorship");
      }
    },
    {
      name: "contact",
      description: "Display contact information",
      execute: () => {
        addOutput("output", "<strong>Contact Information:</strong>");
        addOutput("output", "");
        addOutput("output", "  Email:  yaqinhasan@outlook.com");
        addOutput("output", "  GitHub: github.com/yaqinhasan");
        addOutput("output", '  CV:     <a href="/cv.pdf" style="color: var(--color-accent);">Download CV</a>');
      }
    },
    {
      name: "echo",
      description: "Print arguments to the terminal",
      execute: (args) => {
        addOutput("output", args.join(" "));
      }
    },
    {
      name: "date",
      description: "Display current date and time",
      execute: () => {
        const now = new Date();
        addOutput(
          "output",
          now.toLocaleString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })
        );
      }
    },
    {
      name: "theme",
      description: "Display current theme (future: toggle theme)",
      execute: () => {
        const isDark = document.documentElement.classList.contains("dark");
        addOutput("info", `Current theme: ${isDark ? "Dark" : "Light"}`);
        addOutput("output", "Theme switching coming soon...");
      }
    },
    {
      name: "tree",
      description: "Display the site structure (sitemap)",
      execute: () => {
        addOutput("output", "<strong>yaqinhasan.com</strong>");
        addOutput("output", "│");
        addOutput("output", "├── <a href='/' style='color: var(--color-accent);'>/</a> (home)");
        addOutput("output", "├── <a href='/about' style='color: var(--color-accent);'>/about</a>");
        addOutput("output", "├── <a href='/experience' style='color: var(--color-accent);'>/experience</a>");
        addOutput("output", "├── <a href='/projects' style='color: var(--color-accent);'>/projects</a>");
        addOutput("output", "├── <a href='/interests' style='color: var(--color-accent);'>/interests</a>");
        addOutput("output", "├── <a href='/cv' style='color: var(--color-accent);'>/cv</a>");

        if (isDevMode) {
          addOutput("output", "├── <a href='/debug' style='color: var(--color-dev);'>/debug</a> <span style='color: var(--color-dev);'>[dev]</span>");
          addOutput(
            "output",
            "└── <a href='/debug-carousel' style='color: var(--color-dev);'>/debug-carousel</a> <span style='color: var(--color-dev);'>[dev]</span>"
          );
        } else {
          addOutput("output", "└── <span style='opacity: 0.5;'>... (enable dev mode to see more)</span>");
        }
      }
    },
    {
      name: "cd",
      description: "Navigate to a page (e.g., cd /about)",
      execute: (args) => {
        if (!navigate) {
          addOutput("error", "Navigation not available");
          return;
        }

        if (args.length === 0) {
          navigate("/");
          addOutput("success", "Navigating to home...");
          return;
        }

        let path = args[0].toLowerCase();

        // Handle relative paths
        if (!path.startsWith("/")) {
          path = "/" + path;
        }

        // Valid paths
        const validPaths = ["/", "/home", "/about", "/experience", "/projects", "/interests", "/cv"];

        // Add dev paths if in dev mode
        if (isDevMode) {
          validPaths.push("/debug", "/debug-carousel");
        }

        // Normalize path
        if (path === "/home") {
          path = "/";
        }

        if (validPaths.includes(path)) {
          navigate(path);
          addOutput("success", `Navigating to ${path}...`);
        } else {
          addOutput("error", `cd: ${path}: No such page`);
          addOutput("info", "Try 'tree' to see available pages");
        }
      }
    },
    {
      name: "ls",
      description: "List available pages",
      execute: () => {
        addOutput("output", "<strong>Available pages:</strong>");
        addOutput("output", "");
        addOutput("output", "  <span style='color: var(--color-accent);'>home</span>         Landing page");
        addOutput("output", "  <span style='color: var(--color-accent);'>about</span>        Skills & education");
        addOutput("output", "  <span style='color: var(--color-accent);'>experience</span>   Work experience");
        addOutput("output", "  <span style='color: var(--color-accent);'>projects</span>    Portfolio showcase");
        addOutput("output", "  <span style='color: var(--color-accent);'>interests</span>   Personal interests");
        addOutput("output", "  <span style='color: var(--color-accent);'>cv</span>          Download CV");

        if (isDevMode) {
          addOutput("output", "");
          addOutput("output", "  <span style='color: var(--color-dev);'>debug</span>        Debug page [dev]");
          addOutput("output", "  <span style='color: var(--color-dev);'>debug-carousel</span> Carousel debug [dev]");
        }
      }
    },
    {
      name: "pwd",
      description: "Print current page/route",
      execute: () => {
        const path = currentPath || window.location.pathname;
        addOutput("output", path);
      }
    },
    {
      name: "cat",
      description: "Display content (e.g., cat skills, cat contact)",
      execute: (args) => {
        if (args.length === 0) {
          addOutput("error", "cat: missing operand");
          addOutput("info", "Try: cat skills, cat contact, cat education");
          return;
        }

        const target = args[0].toLowerCase();

        switch (target) {
          case "contact":
          case "email":
            addOutput("output", "<strong>Contact Information:</strong>");
            addOutput("output", "");
            addOutput("output", "  Email:    yaqinhasan@outlook.com");
            addOutput("output", "  GitHub:   github.com/yaqinhasan");
            addOutput("output", "  LinkedIn: linkedin.com/in/yaqinhasan");
            addOutput("output", "  Location: Cambridge, UK");
            break;

          case "skills":
          case "tech":
            addOutput("output", "<strong>Core Technologies:</strong>");
            addOutput("output", "");
            addOutput("output", "  • TypeScript, JavaScript, Python, C#");
            addOutput("output", "  • React, Vue, Node.js, .NET");
            addOutput("output", "  • PostgreSQL, MySQL, Redis");
            addOutput("output", "  • AWS, Docker, Linux");
            addOutput("output", "  • Git, CI/CD, AGILE");
            break;

          case "education":
          case "degree":
            addOutput("output", "<strong>Education:</strong>");
            addOutput("output", "");
            addOutput("output", "  BSc Computer Science (Honours)");
            addOutput("output", "  University of Southampton");
            addOutput("output", "  2020 - 2023");
            break;

          case "experience":
          case "work":
            addOutput("output", "<strong>Current Role:</strong>");
            addOutput("output", "");
            addOutput("output", "  Software Engineer @ Cambridge Kinetics");
            addOutput("output", "  May 2024 - January 2026");
            addOutput("output", "");
            addOutput("info", "Visit /experience page for full details");
            break;

          case "status":
          case "info":
            addOutput("output", "<strong>System Status:</strong>");
            addOutput("output", "");
            addOutput("output", `  Current Page: ${currentPath || window.location.pathname}`);
            addOutput("output", `  Dev Mode:     ${isDevMode ? "ENABLED" : "DISABLED"}`);
            addOutput("output", `  Theme:        ${document.documentElement.classList.contains("dark") ? "Dark" : "Light"}`);
            break;

          default:
            addOutput("error", `cat: ${target}: No such file or directory`);
            addOutput("info", "Available: contact, skills, education, experience, status");
        }
      }
    },
    {
      name: "grep",
      description: "Search CV content (e.g., grep python)",
      execute: (args) => {
        if (args.length === 0) {
          addOutput("error", "grep: missing search pattern");
          addOutput("info", "Usage: grep <search_term>");
          return;
        }

        const searchTerm = args.join(" ").toLowerCase();
        const cvData = {
          skills: [
            "TypeScript",
            "JavaScript",
            "Python",
            "C#",
            "Java",
            "C",
            "Haskell",
            "Bash",
            "React",
            "Vue",
            "Node.js",
            ".NET",
            "Flutter",
            "JavaFX",
            "Tkinter",
            "PostgreSQL",
            "MySQL",
            "Redis",
            "AWS",
            "Docker",
            "Linux",
            "Git",
            "CI/CD"
          ],
          experience: [
            "AI-powered workflow optimization",
            "REST API development",
            "SMTP service implementation",
            "Real-time data syncing",
            "Stripe billing integration",
            "CI/CD with GitHub Actions"
          ],
          projects: [
            "ThymPi - Autonomous navigation robot",
            "flopPy - Python GUI Framework",
            "yaqinhasan.com - Portfolio website",
            "Structured Turtle Querying Language"
          ]
        };

        let found = false;

        // Search skills
        const matchingSkills = cvData.skills.filter((s) => s.toLowerCase().includes(searchTerm));
        if (matchingSkills.length > 0) {
          found = true;
          addOutput("info", "<strong>Skills:</strong>");
          matchingSkills.forEach((skill) => {
            addOutput("output", `  • ${skill}`);
          });
        }

        // Search experience
        const matchingExp = cvData.experience.filter((e) => e.toLowerCase().includes(searchTerm));
        if (matchingExp.length > 0) {
          found = true;
          addOutput("info", "<strong>Experience:</strong>");
          matchingExp.forEach((exp) => {
            addOutput("output", `  • ${exp}`);
          });
        }

        // Search projects
        const matchingProjects = cvData.projects.filter((p) => p.toLowerCase().includes(searchTerm));
        if (matchingProjects.length > 0) {
          found = true;
          addOutput("info", "<strong>Projects:</strong>");
          matchingProjects.forEach((proj) => {
            addOutput("output", `  • ${proj}`);
          });
        }

        if (!found) {
          addOutput("output", `No matches found for '${args.join(" ")}'`);
        }
      }
    },
    {
      name: "env",
      description: "Display environment information",
      execute: () => {
        addOutput("output", "<strong>Environment Variables:</strong>");
        addOutput("output", "");
        addOutput("output", `  SITE_NAME=yaqinhasan.com`);
        addOutput("output", `  VERSION=1.0.0`);
        addOutput("output", `  DEV_MODE=${isDevMode ? "true" : "false"}`);
        addOutput("output", `  THEME=${document.documentElement.classList.contains("dark") ? "dark" : "light"}`);
        addOutput("output", `  PATH=${currentPath || window.location.pathname}`);
        addOutput("output", `  USER_AGENT=${navigator.userAgent.split(" ").slice(0, 2).join(" ")}...`);
      }
    },
    {
      name: "easteregg",
      description: "You found it! 🎉",
      aliases: ["secret", "surprise"],
      execute: () => {
        addOutput("success", "🎉 Congratulations! You found the easter egg!");
        addOutput("output", "");
        addOutput("output", "You're clearly someone who likes to explore.");
        addOutput("output", "I appreciate your curiosity! 🕵️");
        addOutput("output", "");
        addOutput("info", "Pro tip: Check out the source code on GitHub 😉");
      }
    }
  ];
}
