"use client";

import { useRef, useState } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { ProjectArtwork } from "@/components/apps/ProjectArtwork";
import { projects } from "@/data/projects";
import { useFocusTrap } from "@/lib/hooks";
import { IOSAppIcon } from "./IOSAppIcon";
import { IOS_DOCK_APPS, IOS_EXTRA_APPS, IOS_HOME_APPS, type IOSAppId } from "./ios-apps";

export function IOSSearch({
  closing = false,
  onClose,
  onOpenApp,
  onOpenProject,
}: {
  closing?: boolean;
  onClose: () => void;
  onOpenApp: (app: IOSAppId) => void;
  onOpenProject: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useFocusTrap(rootRef, true, inputRef);

  const needle = query.trim().toLowerCase();
  const apps = [...IOS_HOME_APPS, ...IOS_DOCK_APPS, ...IOS_EXTRA_APPS].filter(
    (app) => app.name.toLowerCase().includes(needle),
  );
  const matchedProjects = projects.filter((project) =>
    `${project.name} ${project.category} ${project.stack.join(" ")}`
      .toLowerCase()
      .includes(needle),
  );

  return (
    <div
      className={`ios-spotlight ${closing ? "is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <button
        type="button"
        className="ios-spotlight__backdrop"
        onClick={onClose}
        aria-label="Close search"
      />
      <div className="ios-spotlight__panel" ref={rootRef}>
        <div className="ios-spotlight__field">
          <SystemIcon name="search" size={15} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search apps and projects"
            aria-label="Search apps and projects"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="search"
          />
          {query && (
            <button
              type="button"
              className="ios-spotlight__clear"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
            >
              <SystemIcon name="close" size={11} />
            </button>
          )}
          <button type="button" className="ios-spotlight__cancel" onClick={onClose}>
            Cancel
          </button>
        </div>

        <div className="ios-spotlight__results">
          {apps.length > 0 && (
            <section>
              <h2>Applications</h2>
              <div className="ios-spotlight__apps">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => onOpenApp(app.id)}
                  >
                    <IOSAppIcon app={app.id} size={44} />
                    <span>{app.name}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {matchedProjects.length > 0 && (
            <section>
              <h2>Projects</h2>
              <div className="ios-spotlight__projects">
                {matchedProjects.map((project) => (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => onOpenProject(project.slug)}
                  >
                    <span className="ios-spotlight__thumb">
                      <ProjectArtwork project={project} compact />
                    </span>
                    <span>
                      <strong>{project.name}</strong>
                      <small>{project.category}</small>
                    </span>
                    <SystemIcon name="chevron-right" size={13} />
                  </button>
                ))}
              </div>
            </section>
          )}

          {apps.length === 0 && matchedProjects.length === 0 && (
            <p className="ios-spotlight__empty">No matches.</p>
          )}
        </div>
      </div>
    </div>
  );
}
