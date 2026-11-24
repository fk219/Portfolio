"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { useNow } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import { useDubaiWeather, WEATHER_ICON_NAMES } from "@/lib/weather";
import { featuredProjects, projects } from "@/data/projects";
import { certifications } from "@/data/career";

type WidgetId = "clock" | "project" | "recruiter";
type DragMode = "move" | "resize";

interface WidgetBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

type WidgetLayout = Record<WidgetId, WidgetBox>;

interface DragState {
  id: WidgetId;
  mode: DragMode;
  pointerId: number;
  startX: number;
  startY: number;
  origin: WidgetBox;
  moved: boolean;
}

const STORAGE_KEY = "furqan-os-widget-layout-v2";
const RESET_EVENT = "furqan-os:reset-widget-layout";
const WIDGET_IDS: WidgetId[] = ["clock", "project", "recruiter"];
const MIN_WIDTH = 112;
const MIN_HEIGHT = 102;
const MAX_WIDTH = 420;
const MAX_HEIGHT = 360;
const MIN_TOP = 38;
const DESKTOP_MARGIN = 12;
const DOCK_CLEARANCE = 104;
const SNAP = 8;

const DEFAULT_LAYOUT: WidgetLayout = {
  clock: { x: 22, y: 84, width: 120, height: 125 },
  project: { x: 22, y: 219, width: 120, height: 104 },
  recruiter: { x: 22, y: 333, width: 120, height: 108 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function snap(value: number) {
  return Math.round(value / SNAP) * SNAP;
}

function clampBox(box: WidgetBox): WidgetBox {
  if (typeof window === "undefined") return box;
  const maxWidth = Math.max(
    MIN_WIDTH,
    Math.min(MAX_WIDTH, window.innerWidth - DESKTOP_MARGIN * 2),
  );
  const maxHeight = Math.max(
    MIN_HEIGHT,
    Math.min(
      MAX_HEIGHT,
      window.innerHeight - MIN_TOP - DOCK_CLEARANCE,
    ),
  );
  const width = clamp(box.width, MIN_WIDTH, maxWidth);
  const height = clamp(box.height, MIN_HEIGHT, maxHeight);
  return {
    width,
    height,
    x: clamp(
      box.x,
      DESKTOP_MARGIN,
      Math.max(DESKTOP_MARGIN, window.innerWidth - width - DESKTOP_MARGIN),
    ),
    y: clamp(
      box.y,
      MIN_TOP,
      Math.max(MIN_TOP, window.innerHeight - height - DOCK_CLEARANCE),
    ),
  };
}

function snapMoveBox(box: WidgetBox): WidgetBox {
  return clampBox({ ...box, x: snap(box.x), y: snap(box.y) });
}

function snapResizeBox(box: WidgetBox): WidgetBox {
  return clampBox({ ...box, width: snap(box.width), height: snap(box.height) });
}

function isWidgetBox(value: unknown): value is WidgetBox {
  if (!value || typeof value !== "object") return false;
  const box = value as Partial<WidgetBox>;
  return (
    Number.isFinite(box.x) &&
    Number.isFinite(box.y) &&
    Number.isFinite(box.width) &&
    Number.isFinite(box.height)
  );
}

function readLayout(): WidgetLayout {
  const next: WidgetLayout = {
    clock: { ...DEFAULT_LAYOUT.clock },
    project: { ...DEFAULT_LAYOUT.project },
    recruiter: { ...DEFAULT_LAYOUT.recruiter },
  };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return next;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    for (const id of WIDGET_IDS) {
      if (isWidgetBox(parsed[id])) next[id] = clampBox(parsed[id]);
    }
  } catch {
    // A custom layout is optional.
  }
  return next;
}

function saveLayout(layout: WidgetLayout) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  } catch {
    // Ignore storage limits and private browsing.
  }
}

export function DesktopWidgets() {
  const { openApp } = useOS();
  const now = useNow(30000);
  const weather = useDubaiWeather();
  const current = now ?? new Date(2026, 10, 22, 9, 41);
  const timeParts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).formatToParts(current);
  const time = timeParts
    .filter((part) => part.type !== "dayPeriod")
    .map((part) => part.value)
    .join("")
    .trim();
  const dayPeriod =
    timeParts.find((part) => part.type === "dayPeriod")?.value ?? "";
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(current);
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(current);

  const [layout, setLayoutState] = useState<WidgetLayout>(DEFAULT_LAYOUT);
  const [dragging, setDragging] = useState<{
    id: WidgetId;
    mode: DragMode;
  } | null>(null);
  const layoutRef = useRef<WidgetLayout>(layout);
  const dragRef = useRef<DragState | null>(null);
  const suppressClick = useRef(false);
  const suppressTimer = useRef<number | null>(null);

  const commitLayout = useCallback(
    (id: WidgetId, box: WidgetBox, persist = false) => {
      const nextBox = clampBox(box);
      const next = { ...layoutRef.current, [id]: nextBox };
      layoutRef.current = next;
      setLayoutState(next);
      if (persist) saveLayout(next);
    },
    [],
  );

  useEffect(() => {
    const stored = readLayout();
    layoutRef.current = stored;
    setLayoutState(stored);

    const handleResize = () => {
      let next = layoutRef.current;
      for (const id of WIDGET_IDS) {
        next = { ...next, [id]: clampBox(next[id]) };
      }
      layoutRef.current = next;
      setLayoutState(next);
      saveLayout(next);
    };

    const handleReset = () => {
      const next: WidgetLayout = {
        clock: { ...DEFAULT_LAYOUT.clock },
        project: { ...DEFAULT_LAYOUT.project },
        recruiter: { ...DEFAULT_LAYOUT.recruiter },
      };
      layoutRef.current = next;
      setLayoutState(next);
      saveLayout(next);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener(RESET_EVENT, handleReset);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener(RESET_EVENT, handleReset);
      if (suppressTimer.current) window.clearTimeout(suppressTimer.current);
    };
  }, []);

  const beginDrag = (
    id: WidgetId,
    mode: DragMode,
    event: ReactPointerEvent<HTMLElement>,
    captureElement: HTMLElement,
  ) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = {
      id,
      mode,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: { ...layoutRef.current[id] },
      moved: false,
    };
    try {
      captureElement.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is an enhancement.
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved) {
      if (Math.hypot(dx, dy) < 4) return;
      drag.moved = true;
      setDragging({ id: drag.id, mode: drag.mode });
    }
    if (drag.mode === "move") {
      commitLayout(drag.id, {
        ...drag.origin,
        x: drag.origin.x + dx,
        y: drag.origin.y + dy,
      });
    } else {
      commitLayout(drag.id, {
        ...drag.origin,
        width: drag.origin.width + dx,
        height: drag.origin.height + dy,
      });
    }
  };

  const finishDrag = (
    event: ReactPointerEvent<HTMLDivElement>,
    cancelled = false,
  ) => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    setDragging(null);
    try {
      event.currentTarget.releasePointerCapture(drag.pointerId);
    } catch {
      // The pointer may already be released.
    }
    if (drag.moved && !cancelled) {
      const current = layoutRef.current[drag.id];
      const snapped =
        drag.mode === "move" ? snapMoveBox(current) : snapResizeBox(current);
      commitLayout(drag.id, snapped, true);
      suppressClick.current = true;
      if (suppressTimer.current) window.clearTimeout(suppressTimer.current);
      suppressTimer.current = window.setTimeout(() => {
        suppressClick.current = false;
      }, 80);
    }
  };

  const moveWithKeyboard = (
    id: WidgetId,
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (!event.altKey) return;
    const step = event.shiftKey ? 32 : 8;
    let dx = 0;
    let dy = 0;
    if (event.key === "ArrowLeft") dx = -step;
    else if (event.key === "ArrowRight") dx = step;
    else if (event.key === "ArrowUp") dy = -step;
    else if (event.key === "ArrowDown") dy = step;
    else return;
    event.preventDefault();
    event.stopPropagation();
    const box = layoutRef.current[id];
    commitLayout(
      id,
      snapMoveBox({ ...box, x: box.x + dx, y: box.y + dy }),
      true,
    );
  };

  const resizeWithKeyboard = (
    id: WidgetId,
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    const step = event.shiftKey ? 32 : 8;
    let width = 0;
    let height = 0;
    if (event.key === "ArrowLeft") width = -step;
    else if (event.key === "ArrowRight") width = step;
    else if (event.key === "ArrowUp") height = -step;
    else if (event.key === "ArrowDown") height = step;
    else return;
    event.preventDefault();
    event.stopPropagation();
    const box = layoutRef.current[id];
    commitLayout(
      id,
      snapResizeBox({
        ...box,
        width: box.width + width,
        height: box.height + height,
      }),
      true,
    );
  };

  const frame = (
    id: WidgetId,
    label: string,
    className: string,
    onOpen: () => void,
    content: ReactNode,
  ) => {
    const box = layout[id];
    const active = dragging?.id === id;
    return (
      <div
        key={id}
        className={`desktop-widget-frame ${active ? "is-dragging" : ""}`}
        data-widget={id}
        style={{
          left: box.x,
          top: box.y,
          width: box.width,
          height: box.height,
        }}
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest(".desktop-widget__resize")) {
            return;
          }
          beginDrag(id, "move", event, event.currentTarget);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => finishDrag(event)}
        onPointerCancel={(event) => finishDrag(event, true)}
        onClickCapture={(event) => {
          if (!suppressClick.current) return;
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
        }}
        onKeyDown={(event) => moveWithKeyboard(id, event)}
      >
        <button
          type="button"
          className={`desktop-widget ${className}`}
          onClick={onOpen}
          aria-label={label}
          aria-keyshortcuts="Alt+ArrowLeft Alt+ArrowRight Alt+ArrowUp Alt+ArrowDown"
          title="Drag to move · Alt + arrow keys · corner to resize"
        >
          {content}
        </button>
        <button
          type="button"
          className="desktop-widget__resize"
          aria-label={`Resize ${label.replace(/^Open /, "").replace(/\.$/, "")} widget`}
          aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown"
          title="Drag to resize · arrow keys adjust"
          onPointerDown={(event) => {
            event.stopPropagation();
            const captureElement = event.currentTarget.closest(
              ".desktop-widget-frame",
            ) as HTMLElement | null;
            if (captureElement) {
              beginDrag(id, "resize", event, captureElement);
            }
          }}
          onKeyDown={(event) => resizeWithKeyboard(id, event)}
          onClick={(event) => event.preventDefault()}
        />
      </div>
    );
  };

  return (
    <aside className="desktop-widgets" aria-label="Desktop widgets">
      {frame(
        "clock",
        "Open Calendar",
        "desktop-widget--clock",
        () => openApp("calendar"),
        <>
          <span className="desktop-widget__topline">
            <SystemIcon name="clock" size={12} />
            <span>Portfolio</span>
            {weather && (
              <span
                className="desktop-widget__weather"
                title={`Live weather in ${weather.city} from Open-Meteo`}
              >
                <SystemIcon name={WEATHER_ICON_NAMES[weather.icon]} size={11} />
                {weather.temperature}&deg;
              </span>
            )}
          </span>
          <span className="desktop-widget__time">
            {time}
            <small>{dayPeriod}</small>
          </span>
          <span className="desktop-widget__date">
            {weekday} · {date}
          </span>
          <span className="desktop-widget__accent" aria-hidden="true" />
        </>,
      )}

      {frame(
        "project",
        "Open all projects in Finder",
        "desktop-widget--project",
        () => openApp("finder", { section: "projects" }),
        <>
          <span className="desktop-widget__topline">
            <span className="desktop-widget__dot" aria-hidden="true" />
            <span>Selected work</span>
          </span>
          <span className="desktop-widget__count">{projects.length}</span>
          <span className="desktop-widget__caption">
            projects
            <small>{featuredProjects.length} case studies</small>
          </span>
          <span className="desktop-widget__arrow">
            <SystemIcon name="arrow-right" size={11} />
          </span>
        </>,
      )}

      {frame(
        "recruiter",
        "Open the recruiter profile on LinkedIn",
        "desktop-widget--recruiter",
        () => openApp("linkedin"),
        <>
          <span className="desktop-widget__topline">
            <span className="desktop-widget__dot" aria-hidden="true" />
            <span>Recruiter</span>
          </span>
          <span className="desktop-widget__recruiter">
            Open to work
            <small>Dubai · remote</small>
          </span>
          <span className="desktop-widget__caption">
            {featuredProjects.length} case studies
            <small>{certifications.length} certifications</small>
          </span>
          <span className="desktop-widget__arrow">
            <SystemIcon name="arrow-right" size={11} />
          </span>
        </>,
      )}
    </aside>
  );
}
