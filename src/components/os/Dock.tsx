"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { DOCK_ENTRIES, type DockEntry } from "@/lib/apps";
import { prefetchApp } from "@/lib/app-loaders";
import { useNow } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import { AppIcon } from "@/components/icons/AppIcon";
import { SystemIcon } from "@/components/icons/SystemIcon";

function isIconEntry(entry: DockEntry) {
  return (
    entry.kind === "app" ||
    entry.kind === "launchpad" ||
    entry.kind === "mission-control" ||
    entry.kind === "preview" ||
    entry.kind === "trash"
  );
}

export function Dock() {
  const {
    openApp,
    openOverlay,
    overlay,
    windows,
    settings,
    isCompact,
    focusWindow,
  } = useOS();
  const dockRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [iconCenters, setIconCenters] = useState<number[]>([]);
  const [pointerX, setPointerX] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bouncingKey, setBouncingKey] = useState<string | null>(null);
  const bounceTimer = useRef<number | null>(null);
  const now = useNow(60000);
  const iconSize = isCompact ? 38 : settings.dockSize;
  const showMagnification =
    settings.dockMagnification && !isCompact && pointerX !== null;

  const previewWindow = windows
    .filter(
      (window) => window.appId === "project" || window.appId === "resume",
    )
    .sort((a, b) => b.zIndex - a.zIndex)[0];
  const settingsIndex = DOCK_ENTRIES.findIndex(
    (entry) => entry.kind === "app" && entry.id === "settings",
  );
  const dockEntries: DockEntry[] = previewWindow
    ? [
        ...DOCK_ENTRIES.slice(0, settingsIndex),
        { kind: "preview", label: "Preview" },
        ...DOCK_ENTRIES.slice(settingsIndex),
      ]
    : DOCK_ENTRIES;
  const iconEntries = dockEntries.filter(isIconEntry);

  useEffect(() => {
    const measure = () => {
      setIconCenters(
        itemRefs.current.map((element) => {
          if (!element) return 0;
          const bounds = element.getBoundingClientRect();
          return bounds.left + bounds.width / 2;
        }),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (dockRef.current) observer.observe(dockRef.current);
    iconEntries.forEach((_, index) => {
      if (itemRefs.current[index]) observer.observe(itemRefs.current[index]!);
    });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
    // The dock layout changes when items are hidden or its size changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompact, settings.dockSize, windows.length, overlay]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!settings.dockMagnification || isCompact) return;
    setPointerX(event.clientX);
  };

  const handlePointerLeave = () => {
    setPointerX(null);
    setHoveredIndex(null);
  };

  const getIconTransform = (index: number) => {
    if (!showMagnification || !iconCenters[index]) return "scale(1)";
    const distance = Math.abs(pointerX - iconCenters[index]);
    const sigma = Math.max(34, iconSize * 0.9);
    const influence = Math.exp(-(distance * distance) / (2 * sigma * sigma));
    const scale = 1 + influence * 0.58;
    return `scale(${scale.toFixed(3)})`;
  };

  const activateEntry = (entry: DockEntry) => {
    const key = entry.kind === "app" ? entry.id : entry.kind;
    setBouncingKey(key);
    if (bounceTimer.current) window.clearTimeout(bounceTimer.current);
    bounceTimer.current = window.setTimeout(() => setBouncingKey(null), 680);

    if (entry.kind === "launchpad") {
      openOverlay("launchpad");
      return;
    }
    if (entry.kind === "mission-control") {
      openOverlay("mission-control");
      return;
    }
    if (entry.kind === "preview" && previewWindow) {
      focusWindow(previewWindow.id);
      return;
    }
    if (entry.kind === "trash") {
      openApp("trash");
      return;
    }
    if (entry.kind === "app") {
      openApp(entry.id);
    }
  };

  useEffect(() => {
    return () => {
      if (bounceTimer.current) window.clearTimeout(bounceTimer.current);
    };
  }, []);

  let iconIndex = -1;

  return (
    <nav
      ref={dockRef}
      className={`dock ${isCompact ? "is-compact" : ""}`}
      aria-label="Dock"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ "--dock-icon-size": `${iconSize}px` } as CSSProperties}
    >
      <div className="dock__glass">
        {dockEntries.map((entry) => {
          if (entry.kind === "separator") {
            return (
              <div
                key="dock-separator"
                className="dock__separator"
                role="separator"
                aria-orientation="vertical"
              />
            );
          }

          iconIndex += 1;
          const currentIndex = iconIndex;
          const appId =
            entry.kind === "app"
              ? entry.id
              : entry.kind === "trash"
                ? "trash"
                : entry.kind === "preview"
                  ? "preview"
                  : entry.kind === "mission-control"
                    ? "launchpad"
                    : "launchpad";
          const isPreviewEntry = entry.kind === "preview";
          const appWindows = isPreviewEntry
            ? windows.filter(
                (window) =>
                  window.appId === "project" || window.appId === "resume",
              )
            : windows.filter((window) => window.appId === appId);
          const isRunning = isPreviewEntry
            ? Boolean(previewWindow)
            : appWindows.length > 0;
          const isOpen = isPreviewEntry
            ? appWindows.some((window) => !window.minimized)
            : appWindows.some((window) => !window.minimized);
          const optionalClass = entry.kind === "app" && entry.optional
            ? " is-optional"
            : "";
          const entryKey =
            entry.kind === "app" ? entry.id : entry.kind;
          const tooltipId = `dock-tooltip-${entryKey}`;

          return (
            <button
              key={entry.kind === "app" ? entry.id : entry.kind}
              ref={(node) => {
                itemRefs.current[currentIndex] = node;
              }}
              type="button"
              className={`dock__item${optionalClass} ${
                hoveredIndex === currentIndex ? "is-hovered" : ""
              } ${isRunning ? "is-running" : ""} ${
                isPreviewEntry ? "is-preview" : ""
              } ${
                bouncingKey === (entry.kind === "app" ? entry.id : entry.kind)
                  ? "is-bouncing"
                  : ""
              }`}
              aria-label={`${entry.label}${isRunning ? ", running" : ""}`}
              aria-describedby={tooltipId}
              onClick={() => activateEntry(entry)}
              onPointerDown={() => {
                if (entry.kind === "app") prefetchApp(entry.id);
              }}
              onPointerEnter={() => {
                setHoveredIndex(currentIndex);
                if (entry.kind === "app") prefetchApp(entry.id);
              }}
              onFocus={() => {
                setHoveredIndex(currentIndex);
                if (entry.kind === "app") prefetchApp(entry.id);
              }}
              onBlur={() => setHoveredIndex(null)}
            >
              <span
                className="dock__icon"
                style={{
                  transform: getIconTransform(currentIndex),
                  width: iconSize,
                  height: iconSize,
                }}
              >
                {entry.kind === "mission-control" ? (
                  <span
                    className="dock__mc-icon"
                    style={{ width: iconSize, height: iconSize }}
                  >
                    <SystemIcon
                      name="grid"
                      size={Math.round(iconSize * 0.52)}
                    />
                  </span>
                ) : (
                  <AppIcon
                    app={appId}
                    size={iconSize}
                    date={now ?? undefined}
                  />
                )}
              </span>
              <span className="dock__indicator" aria-hidden="true">
                <span className={isOpen ? "is-open" : ""} />
              </span>
              <span
                className="dock__tooltip"
                id={tooltipId}
                role="tooltip"
                aria-hidden={hoveredIndex !== currentIndex}
              >
                {entry.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
