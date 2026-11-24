"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { wallpaperOptions } from "@/data/wallpapers";
import { useOS } from "@/lib/os-context";
import type { DockAppId, ThemeMode, WallpaperId } from "@/lib/types";

type LineTone = "default" | "muted" | "accent" | "error" | "command";

interface TerminalLine {
  id: string;
  text: string;
  tone: LineTone;
}

const welcomeLines: TerminalLine[] = [
  {
    id: "welcome-1",
    text: "Portfolio OS shell 1.0.0",
    tone: "muted",
  },
  {
    id: "welcome-2",
    text: 'Type "help" for commands, or "open finder" to start.',
    tone: "muted",
  },
];

const appCommands: DockAppId[] = [
  "finder",
  "safari",
  "mail",
  "notes",
  "photos",
  "calendar",
  "music",
  "terminal",
  "devkit",
  "settings",
  "trash",
];

let lineCounter = 0;
function nextLineId() {
  lineCounter += 1;
  return `terminal-line-${lineCounter}`;
}

function output(
  text: string,
  tone: LineTone = "default",
): TerminalLine {
  return { id: nextLineId(), text, tone };
}

export function Terminal({ windowId }: { windowId?: string }) {
  const {
    openApp,
    openProject,
    openResume,
    updateSettings,
    closeWindow,
    closeActiveWindow,
  } = useOS();
  const [lines, setLines] = useState<TerminalLine[]>(welcomeLines);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const node = outputRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines]);

  const append = (next: TerminalLine[]) => {
    setLines((current) => [...current, ...next]);
  };

  const handleHelp = () => {
    append([
      output("Available commands:", "accent"),
      output("  help                  Show this list"),
      output("  whoami                About Furqan"),
      output("  projects              List every project"),
      output("  open <app|project>    Open an app or case study"),
      output("  ls                    List the virtual home folder"),
      output("  contact               Email and GitHub"),
      output("  theme <light|dark|auto>"),
      output("  wallpaper <name>      Change the desktop wallpaper"),
      output("  date                  Show the current date and time"),
      output("  neofetch              A small system portrait"),
      output("  devkit                Open DevKit (ship · system · playground)"),
      output("  deploy                Open DevKit's live check pipeline"),
      output("  clear                 Clear the window"),
      output("  exit                  Close the Terminal"),
    ]);
  };

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim();
    if (!command) return;

    const [nameRaw, ...args] = command.split(/\s+/);
    const name = nameRaw.toLowerCase();
    const argument = args.join(" ");
    const lowerArgument = argument.toLowerCase();

    append([output(`furqan@portfolio ~ % ${command}`, "command")]);

    switch (name) {
      case "help":
      case "?":
        handleHelp();
        break;

      case "whoami":
        append([
          output(`${profile.name} · ${profile.role}`, "accent"),
          output(profile.education),
          output("Full-stack developer working across product, API, and interface."),
        ]);
        break;

      case "about":
        append([output(profile.summary)]);
        break;

      case "projects":
        append([
          output(`Projects (${projects.length})`, "accent"),
          ...projects.map((project) =>
            output(
              `  ${project.slug.padEnd(22)} ${project.name} · ${project.category}`,
            ),
          ),
          output(""),
          output('Use "open <slug>" to view a case study.', "muted"),
        ]);
        break;

      case "ls":
        append([
          output("about.txt     contact.txt   projects/     notes/"),
          output("resume.pdf    portfolio.md  wallpapers/"),
          output(""),
          output(
            'Try "ls projects" or "open projects" for the work.',
            "muted",
          ),
        ]);
        break;

      case "cat":
        if (lowerArgument === "about.txt") {
          append([output(profile.summary)]);
        } else if (lowerArgument === "contact.txt") {
          append([
            output(`Email: ${profile.email}`),
            output("GitHub: https://github.com/fk219"),
          ]);
        } else if (lowerArgument === "portfolio.md") {
          append([
            output("# Portfolio OS"),
            output(
              "An interactive macOS-inspired portfolio for Furqan Khan.",
            ),
            output("All apps, windows, menus, and shortcuts are functional."),
          ]);
        } else {
          append([
            output(
              `cat: ${argument || "missing operand"}: No such file`,
              "error",
            ),
          ]);
        }
        break;

      case "open": {
        if (!argument) {
          append([
            output(
              "Usage: open <app|project>. Try 'open finder' or 'open foliofind'.",
              "error",
            ),
          ]);
          break;
        }

        if (lowerArgument === "projects" || lowerArgument === "finder") {
          openApp("finder", { section: "projects" });
          append([output("Opening Finder…", "muted")]);
          break;
        }

        if (lowerArgument === "resume") {
          openResume();
          append([output("Opening resume…", "muted")]);
          break;
        }

        if (appCommands.includes(lowerArgument as DockAppId)) {
          openApp(lowerArgument as DockAppId);
          append([
            output(
              `Opening ${lowerArgument.charAt(0).toUpperCase()}${lowerArgument.slice(1)}…`,
              "muted",
            ),
          ]);
          break;
        }

        const project = projects.find(
          (candidate) =>
            candidate.slug === lowerArgument ||
            candidate.name.toLowerCase() === lowerArgument,
        );
        if (project) {
          openProject(project.slug);
          append([output(`Opening ${project.name} case study…`, "muted")]);
          break;
        }

        append([
          output(`open: ${argument}: app or project not found`, "error"),
        ]);
        break;
      }

      case "contact":
        append([
          output(`Email   ${profile.email}`, "accent"),
          output("GitHub  https://github.com/fk219"),
          output(""),
          output(
            'Run "open mail" to write a message in the Mail app.',
            "muted",
          ),
        ]);
        break;

      case "theme": {
        if (!["light", "dark", "auto"].includes(lowerArgument)) {
          append([
            output("Usage: theme <light|dark|auto>", "error"),
          ]);
          break;
        }
        updateSettings({ appearance: lowerArgument as ThemeMode });
        append([
          output(`Appearance set to ${lowerArgument}.`, "muted"),
        ]);
        break;
      }

      case "wallpaper": {
        if (lowerArgument === "list" || !lowerArgument) {
          append([
            output("Wallpapers", "accent"),
            ...wallpaperOptions.map((wallpaper) =>
              output(`  ${wallpaper.id.padEnd(12)} ${wallpaper.name}`),
            ),
          ]);
          break;
        }
        const wallpaper = wallpaperOptions.find(
          (candidate) =>
            candidate.id === lowerArgument ||
            candidate.name.toLowerCase() === lowerArgument,
        );
        if (!wallpaper) {
          append([
            output(
              `wallpaper: ${argument}: not found. Run "wallpaper list".`,
              "error",
            ),
          ]);
          break;
        }
        updateSettings({ wallpaper: wallpaper.id as WallpaperId });
        append([output(`Wallpaper set to ${wallpaper.name}.`, "muted")]);
        break;
      }

      case "date":
        append([
          output(
            new Intl.DateTimeFormat("en-US", {
              dateStyle: "full",
              timeStyle: "long",
            }).format(new Date()),
          ),
        ]);
        break;

      case "pwd":
        append([output("/Users/furqan/portfolio")]);
        break;

      case "echo":
        append([output(argument)]);
        break;

      case "devkit":
        openApp("devkit");
        append([
          output("Opening DevKit…", "muted"),
          output('Run the live checks from the Ship panel, or open the Playground.', "muted"),
        ]);
        break;

      case "deploy":
        openApp("devkit");
        append([
          output("DevKit opened.", "accent"),
          output("Run the Ship checks to verify assets, services, and the live origin.", "muted"),
        ]);
        break;

      case "neofetch":
        append([
          output(
            "              .:'       Furqan Khan",
            "accent",
          ),
          output("          __ :'__        ------------"),
          output("       .'`  `-'  ````.   OS: Portfolio OS 1.0"),
          output("      :               :  Shell: portfolio-sh"),
          output("      :               :  UI: Next.js + React"),
          output(
            `       \`.__.-.__.'       Projects: ${projects.length}`,
          ),
        ]);
        break;

      case "sudo":
        append([
          output(
            "furqan is not in the sudoers file. This portfolio is not a real Mac.",
            "error",
          ),
        ]);
        break;

      case "clear":
        setLines([]);
        break;

      case "exit":
        append([output("Closing Terminal…", "muted")]);
        window.setTimeout(() => {
          if (windowId) closeWindow(windowId);
          else closeActiveWindow();
        }, 240);
        break;

      default:
        append([
          output(`zsh: command not found: ${name}`, "error"),
          output('Type "help" to see available commands.', "muted"),
        ]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
    setHistory((current) => [...current, input]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex < 0
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < 0) return;
      if (historyIndex >= history.length - 1) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }
  };

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal__chrome" aria-hidden="true">
        <span className="terminal__tab">
          <SystemIconMini />
          furqan@portfolio: ~
        </span>
      </div>
      <div
        className="terminal__output"
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={`terminal__line terminal__line--${line.tone}`}
          >
            {line.text || "\u00a0"}
          </div>
        ))}
        <form className="terminal__form" onSubmit={handleSubmit}>
          <label htmlFor="terminal-command" className="sr-only">
            Terminal command
          </label>
          <span className="terminal__prompt" aria-hidden="true">
            <span className="terminal__prompt-user">furqan@portfolio</span>
            <span className="terminal__prompt-path"> ~ </span>
            <span className="terminal__prompt-char">%</span>
          </span>
          <input
            ref={inputRef}
            id="terminal-command"
            className="terminal__input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleInputKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-describedby="terminal-hint"
          />
          <span id="terminal-hint" className="sr-only">
            Type help and press Enter for a list of commands.
          </span>
        </form>
      </div>
    </div>
  );
}

function SystemIconMini() {
  return (
    <span className="terminal__tab-icon" aria-hidden="true">
      &gt;_
    </span>
  );
}
