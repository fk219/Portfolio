"use client";

import Image from "next/image";
import { useRef } from "react";
import { AppIcon } from "@/components/icons/AppIcon";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { getProject } from "@/data/projects";
import { APP_DEFINITIONS } from "@/lib/apps";
import { useEscape, useFocusTrap } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";

export function MissionControl() {
  const {
    windows,
    activeWindow,
    closeAllWindows,
    closeOverlay,
    focusWindow,
    minimizeWindow,
  } = useOS();
  const rootRef = useRef<HTMLDivElement>(null);
  useFocusTrap(rootRef, true);
  useEscape(true, closeOverlay);

  const cards = [...windows]
    .filter((window) => !window.minimized)
    .sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div
      ref={rootRef}
      className="mission-control"
      role="dialog"
      aria-modal="true"
      aria-label="Mission Control"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeOverlay();
      }}
    >
      <div className="mission-control__backdrop" aria-hidden="true" />

      <header className="mission-control__header">
        <div>
          <span className="mission-control__eyebrow">Mission Control</span>
          <h2>
            {cards.length > 0
              ? `${cards.length} open ${cards.length === 1 ? "window" : "windows"}`
              : "A clear desktop"}
          </h2>
        </div>
        <button
          type="button"
          className="mission-control__close"
          onClick={closeOverlay}
          aria-label="Close Mission Control"
        >
          <SystemIcon name="close" size={12} />
        </button>
      </header>

      {cards.length > 0 ? (
        <div className="mission-control__grid">
          {cards.map((window) => {
            const project =
              window.appId === "project" && window.payload?.projectSlug
                ? getProject(window.payload.projectSlug)
                : undefined;
            const screenshot = project?.screenshots[0];
            return (
              <button
                key={window.id}
                type="button"
                className={`mission-control__card ${
                  activeWindow?.id === window.id ? "is-active" : ""
                }`}
                onClick={() => {
                  focusWindow(window.id);
                  closeOverlay();
                }}
              >
                <span className="mission-control__preview">
                  <span className="mission-control__preview-bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  {screenshot ? (
                    <Image
                      src={screenshot.src}
                      alt=""
                      width={screenshot.width}
                      height={screenshot.height}
                      sizes="(max-width: 760px) 80vw, 340px"
                    />
                  ) : (
                    <span className="mission-control__app-tile">
                      <AppIcon
                        app={
                          window.appId === "about"
                            ? "finder"
                            : window.appId === "project" ||
                                window.appId === "resume"
                              ? "preview"
                              : window.appId
                        }
                        size={54}
                      />
                    </span>
                  )}
                </span>
                <span className="mission-control__copy">
                  <strong>{window.title}</strong>
                  <small>{APP_DEFINITIONS[window.appId].name}</small>
                </span>
                <span className="mission-control__open" aria-hidden="true">
                  <SystemIcon name="arrow-right" size={12} />
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mission-control__empty">
          <span className="mission-control__empty-icon" aria-hidden="true">
            <SystemIcon name="grid" size={30} />
          </span>
          <h3>Nothing is open.</h3>
          <p>Launch an app from the Dock, then press F3 to see every window.</p>
        </div>
      )}

      <footer className="mission-control__footer">
        <span>
          Press <kbd>F3</kbd> or <kbd>Ctrl ↑</kbd> to toggle. Click a window to
          jump back into it.
        </span>
        <div className="mission-control__footer-actions">
          {cards.length > 0 && (
            <button
              type="button"
              onClick={() => {
                cards.forEach((window) => minimizeWindow(window.id));
                closeOverlay();
              }}
            >
              Show desktop
            </button>
          )}
          {windows.length > 0 && (
            <button
              type="button"
              onClick={() => {
                closeAllWindows();
                closeOverlay();
              }}
            >
              Close all
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
