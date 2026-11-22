"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AppIcon } from "@/components/icons/AppIcon";
import { FolderIcon } from "@/components/icons/FileIcon";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { ProjectArtwork } from "@/components/apps/ProjectArtwork";
import { projects } from "@/data/projects";
import { useEscape, useFocusTrap } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import type { DockAppId } from "@/lib/types";

interface SpotlightResult {
  id: string;
  group: "Applications" | "Projects" | "Actions";
  label: string;
  subtitle: string;
  keywords: string;
  icon: ReactNode;
  run: () => void;
  href?: string;
}

const spotlightApps: Array<{ id: DockAppId; name: string; subtitle: string }> = [
  { id: "finder", name: "Finder", subtitle: "Browse the portfolio" },
  { id: "safari", name: "Safari", subtitle: "About Furqan" },
  { id: "mail", name: "Mail", subtitle: "Start a conversation" },
  { id: "notes", name: "Notes", subtitle: "Stories and details" },
  { id: "photos", name: "Photos", subtitle: "Project screenshots" },
  { id: "calendar", name: "Calendar", subtitle: "See the date" },
  { id: "music", name: "Music", subtitle: "Generated focus audio" },
  { id: "terminal", name: "Terminal", subtitle: "Run a few commands" },
  { id: "career", name: "Career", subtitle: "Experience and certifications" },
  { id: "links", name: "Links", subtitle: "GitHub, email, and the work" },
  { id: "settings", name: "System Settings", subtitle: "Make it yours" },
];

export function Spotlight() {
  const {
    closeOverlay,
    openApp,
    openProject,
    openResume,
    updateSettings,
    resolvedTheme,
    lockScreen,
    minimizeActiveWindow,
    closeActiveWindow,
    openOverlay,
  } = useOS();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useFocusTrap(rootRef, true, inputRef);
  useEscape(true, closeOverlay);

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(timer);
  }, []);

  const results = useMemo<SpotlightResult[]>(() => {
    const appResults = spotlightApps.map<SpotlightResult>((app) => ({
      id: `app-${app.id}`,
      group: "Applications",
      label: app.name,
      subtitle: app.subtitle,
      keywords: `${app.name} ${app.subtitle}`,
      icon: <AppIcon app={app.id} size={30} />,
      run: () => openApp(app.id),
    }));

    const projectResults = projects.map<SpotlightResult>((project) => ({
      id: `project-${project.slug}`,
      group: "Projects",
      label: project.name,
      subtitle: `${project.status} · ${project.category}`,
      keywords: `${project.name} ${project.category} ${project.stack.join(" ")} ${project.description}`,
      icon: (
        <span className="spotlight__project-thumb">
          <ProjectArtwork project={project} compact />
        </span>
      ),
      run: () => openProject(project.slug),
    }));

    const actionResults: SpotlightResult[] = [
      {
        id: "action-projects",
        group: "Actions",
        label: "Open the projects folder",
        subtitle: "Browse every case study in Finder",
        keywords: "projects work case studies finder open",
        icon: (
          <span className="spotlight__action-icon">
            <FolderIcon size={26} />
          </span>
        ),
        run: () => openApp("finder", { section: "projects" }),
      },
      {
        id: "action-resume",
        group: "Actions",
        label: "Open resume",
        subtitle: "Education, toolkit, and selected work",
        keywords: "resume cv preview print experience education",
        icon: (
          <span className="spotlight__action-icon">
            <SystemIcon name="document" size={16} />
          </span>
        ),
        run: openResume,
      },
      {
        id: "action-appearance",
        group: "Actions",
        label:
          resolvedTheme === "dark"
            ? "Switch to light appearance"
            : "Switch to dark appearance",
        subtitle: "Change how Portfolio OS looks",
        keywords: "theme dark light appearance settings",
        icon: (
          <span className="spotlight__action-icon">
            <SystemIcon
              name={resolvedTheme === "dark" ? "sun" : "moon"}
              size={16}
            />
          </span>
        ),
        run: () =>
          updateSettings({
            appearance: resolvedTheme === "dark" ? "light" : "dark",
          }),
      },
      {
        id: "action-wallpaper",
        group: "Actions",
        label: "Change wallpaper",
        subtitle: "Open the wallpaper picker",
        keywords: "wallpaper background desktop settings",
        icon: (
          <span className="spotlight__action-icon">
            <SystemIcon name="display" size={16} />
          </span>
        ),
        run: () => openApp("settings", { section: "wallpaper" }),
      },
      {
        id: "action-shortcuts",
        group: "Actions",
        label: "Keyboard shortcuts",
        subtitle: "Learn the fastest way around",
        keywords: "help keyboard shortcuts commands",
        icon: (
          <span className="spotlight__action-icon">
            <SystemIcon name="keyboard" size={16} />
          </span>
        ),
        run: () => {
          closeOverlay();
          window.setTimeout(() => openOverlay("help"), 30);
        },
      },
      {
        id: "action-lock",
        group: "Actions",
        label: "Lock screen",
        subtitle: "Leave the desktop as it is",
        keywords: "lock screen sleep privacy",
        icon: (
          <span className="spotlight__action-icon">
            <SystemIcon name="lock" size={16} />
          </span>
        ),
        run: lockScreen,
      },
      {
        id: "action-minimize",
        group: "Actions",
        label: "Minimize the active window",
        subtitle: "Send it down to the Dock",
        keywords: "minimize window hide dock",
        icon: (
          <span className="spotlight__action-icon">
            <SystemIcon name="minimize" size={16} />
          </span>
        ),
        run: minimizeActiveWindow,
      },
      {
        id: "action-close",
        group: "Actions",
        label: "Close the active window",
        subtitle: "Close the frontmost app window",
        keywords: "close window quit",
        icon: (
          <span className="spotlight__action-icon">
            <SystemIcon name="close" size={16} />
          </span>
        ),
        run: closeActiveWindow,
      },
    ];

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return [
        ...appResults.slice(0, 5),
        ...projectResults.slice(0, 2),
        ...actionResults.slice(0, 2),
      ];
    }

    const score = (result: SpotlightResult) => {
      const label = result.label.toLowerCase();
      if (label === trimmed) return 4;
      if (label.startsWith(trimmed)) return 3;
      if (label.includes(trimmed)) return 2;
      if (result.keywords.toLowerCase().includes(trimmed)) return 1;
      return 0;
    };

    return [...appResults, ...projectResults, ...actionResults]
      .map((result) => ({ result, score: score(result) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((item) => item.result);
  }, [
    closeActiveWindow,
    closeOverlay,
    lockScreen,
    minimizeActiveWindow,
    openApp,
    openOverlay,
    openProject,
    openResume,
    query,
    resolvedTheme,
    updateSettings,
  ]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const active = document.getElementById(
      `spotlight-result-${results[activeIndex]?.id ?? ""}`,
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, results]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length === 0 ? 0 : (index + 1) % results.length,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length === 0
          ? 0
          : (index - 1 + results.length) % results.length,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      results[activeIndex]?.run();
    }
  };

  const activeResult = results[activeIndex];
  let lastGroup: SpotlightResult["group"] | null = null;

  return (
    <div
      className="spotlight-layer"
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Spotlight search"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeOverlay();
      }}
    >
      <div className="spotlight">
        <div className="spotlight__search-row">
          <SystemIcon
            name="search"
            size={22}
            className="spotlight__search-icon"
          />
          <input
            ref={inputRef}
            type="text"
            className="spotlight__input"
            placeholder="Spotlight Search"
            aria-label="Spotlight Search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-controls="spotlight-results"
            aria-activedescendant={
              activeResult
                ? `spotlight-result-${activeResult.id}`
                : undefined
            }
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="spotlight__shortcut" aria-hidden="true">
            esc
          </kbd>
        </div>

        <div
          className="spotlight__results"
          id="spotlight-results"
          role={results.length > 0 ? "listbox" : undefined}
          aria-label={results.length > 0 ? "Search results" : undefined}
        >
          {results.length > 0 ? (
            results.map((result, index) => {
              const showGroup = result.group !== lastGroup;
              lastGroup = result.group;
              const isActive = index === activeIndex;
              return (
                <div key={result.id}>
                  {showGroup && (
                    <div
                      className="spotlight__group-label"
                      role="presentation"
                    >
                      {result.group}
                    </div>
                  )}
                  <button
                    type="button"
                    id={`spotlight-result-${result.id}`}
                    role="option"
                    aria-selected={isActive}
                    className={`spotlight__result ${
                      isActive ? "is-active" : ""
                    }`}
                    onPointerEnter={() => setActiveIndex(index)}
                    onClick={result.run}
                  >
                    <span className="spotlight__result-icon">{result.icon}</span>
                    <span className="spotlight__result-copy">
                      <span className="spotlight__result-label">
                        {result.label}
                      </span>
                      <span className="spotlight__result-subtitle">
                        {result.subtitle}
                      </span>
                    </span>
                    {isActive && (
                      <span className="spotlight__enter" aria-hidden="true">
                        <SystemIcon name="arrow-right" size={13} />
                      </span>
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="spotlight__empty" role="status">
              <p>No applications, projects, or actions match “{query}”.</p>
              <button
                type="button"
                className="os-text-button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
              >
                Clear search
              </button>
            </div>
          )}

        </div>

        {query.trim() && (
          <div className="spotlight__web">
            <a
              className="spotlight__result"
              href={`https://www.google.com/search?q=${encodeURIComponent(
                query.trim(),
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="spotlight__result-icon">
                <span className="spotlight__action-icon">
                  <SystemIcon name="search" size={16} />
                </span>
              </span>
              <span className="spotlight__result-copy">
                <span className="spotlight__result-label">
                  Search the web for “{query.trim()}”
                </span>
                <span className="spotlight__result-subtitle">
                  Opens a new browser tab
                </span>
              </span>
              <SystemIcon name="external" size={12} />
            </a>
          </div>
        )}

        <div className="spotlight__footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
