"use client";

import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/icons/AppIcon";
import { FolderIcon } from "@/components/icons/FileIcon";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { useEscape, useFocusTrap, useNow } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import type { DockAppId } from "@/lib/types";

interface LaunchpadApp {
  id: DockAppId | "projects";
  name: string;
}

const launchpadApps: LaunchpadApp[] = [
  { id: "finder", name: "Finder" },
  { id: "safari", name: "Safari" },
  { id: "mail", name: "Mail" },
  { id: "notes", name: "Notes" },
  { id: "photos", name: "Photos" },
  { id: "calendar", name: "Calendar" },
  { id: "music", name: "Music" },
  { id: "terminal", name: "Terminal" },
  { id: "career", name: "Career" },
  { id: "links", name: "Links" },
  { id: "settings", name: "System Settings" },
  { id: "projects", name: "Projects" },
];

export function Launchpad() {
  const { closeOverlay, openApp } = useOS();
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const now = useNow(60000);

  useFocusTrap(rootRef, true, searchRef);
  useEscape(true, closeOverlay);

  useEffect(() => {
    const timer = window.setTimeout(() => searchRef.current?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = launchpadApps.filter((app) =>
    app.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const open = (app: LaunchpadApp) => {
    if (app.id === "projects") {
      openApp("finder", { section: "projects" });
      return;
    }
    openApp(app.id);
  };

  return (
    <div
      ref={rootRef}
      className="launchpad"
      role="dialog"
      aria-modal="true"
      aria-label="Launchpad"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeOverlay();
      }}
    >
      <div className="launchpad__backdrop" aria-hidden="true" />
      <div className="launchpad__search-wrap">
        <SystemIcon name="search" size={15} aria-hidden="true" />
        <input
          ref={searchRef}
          type="search"
          className="launchpad__search"
          placeholder="Search apps"
          aria-label="Search Launchpad"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && filtered.length > 0) {
              event.preventDefault();
              open(filtered[0]);
            }
          }}
        />
        {query && (
          <button
            type="button"
            className="launchpad__clear"
            aria-label="Clear Launchpad search"
            onClick={() => {
              setQuery("");
              searchRef.current?.focus();
            }}
          >
            <SystemIcon name="close" size={11} />
          </button>
        )}
      </div>

      <div
        className="launchpad__content"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeOverlay();
        }}
      >
        {filtered.length > 0 ? (
          <div className="launchpad__grid">
            {filtered.map((app, index) => (
              <button
                key={app.id}
                type="button"
                className="launchpad__app"
                style={{ "--app-index": index } as React.CSSProperties}
                onClick={() => open(app)}
              >
                <span className="launchpad__app-icon">
                  {app.id === "projects" ? (
                    <FolderIcon size={76} />
                  ) : (
                    <AppIcon
                      app={app.id}
                      size={76}
                      date={now ?? undefined}
                    />
                  )}
                </span>
                <span className="launchpad__app-label">{app.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="launchpad__empty" role="status">
            <SystemIcon name="search" size={28} />
            <p>No apps match “{query}”</p>
            <button
              type="button"
              className="os-text-button"
              onClick={() => {
                setQuery("");
                searchRef.current?.focus();
              }}
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        className="launchpad__mobile-close"
        onClick={closeOverlay}
        aria-label="Close Launchpad"
      >
        <SystemIcon name="close" size={14} />
      </button>
      <p className="launchpad__hint" aria-hidden="true">
        Press Escape to close
      </p>
    </div>
  );
}
