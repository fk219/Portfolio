"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { MENU_BAR_HEIGHT } from "@/lib/apps";
import { useOS } from "@/lib/os-context";
import type { OSWindow, WindowBounds } from "@/lib/types";
import { SystemIcon } from "@/components/icons/SystemIcon";

interface WindowFrameProps {
  window: OSWindow;
  active: boolean;
  children: ReactNode;
}

interface DragOrigin {
  pointerX: number;
  pointerY: number;
  bounds: WindowBounds;
}

interface ResizeOrigin extends DragOrigin {
  kind: "corner";
}

const MIN_VISIBLE_WIDTH = 160;
const MIN_VISIBLE_TITLEBAR = 72;

export function WindowFrame({ window, active, children }: WindowFrameProps) {
  const {
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    updateWindowBounds,
    isCompact,
  } = useOS();
  const frameRef = useRef<HTMLElement>(null);
  const dragRef = useRef<DragOrigin | null>(null);
  const resizeRef = useRef<ResizeOrigin | null>(null);
  const frameRequest = useRef<number | null>(null);
  const latestBounds = useRef<WindowBounds | null>(null);
  const interactionCleanup = useRef<(() => void) | null>(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    frameRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    return () => {
      interactionCleanup.current?.();
      if (frameRequest.current) {
        globalThis.window.cancelAnimationFrame(frameRequest.current);
      }
    };
  }, []);

  const queueBounds = (nextBounds: WindowBounds) => {
    latestBounds.current = nextBounds;
    if (frameRequest.current) return;
    frameRequest.current = globalThis.window.requestAnimationFrame(() => {
      if (latestBounds.current) {
        updateWindowBounds(window.id, latestBounds.current);
      }
      frameRequest.current = null;
    });
  };

  const endInteraction = () => {
    interactionCleanup.current?.();
    interactionCleanup.current = null;
    if (frameRequest.current) {
      globalThis.window.cancelAnimationFrame(frameRequest.current);
      frameRequest.current = null;
    }
    if (latestBounds.current) {
      updateWindowBounds(window.id, latestBounds.current);
      latestBounds.current = null;
    }
    dragRef.current = null;
    resizeRef.current = null;
    setDragging(false);
    setResizing(false);
  };

  const bindInteraction = (kind: "drag" | "resize", pointerId: number) => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const origin = kind === "drag" ? dragRef.current : resizeRef.current;
      if (!origin) return;

      if (kind === "drag") {
        const dx = event.clientX - origin.pointerX;
        const dy = event.clientY - origin.pointerY;
        const viewportWidth = globalThis.window.innerWidth;
        const viewportHeight = globalThis.window.innerHeight;
        const nextX = Math.min(
          viewportWidth - MIN_VISIBLE_WIDTH,
          Math.max(-origin.bounds.width + MIN_VISIBLE_WIDTH, origin.bounds.x + dx),
        );
        const nextY = Math.min(
          viewportHeight - MIN_VISIBLE_TITLEBAR,
          Math.max(MENU_BAR_HEIGHT, origin.bounds.y + dy),
        );
        queueBounds({ ...origin.bounds, x: nextX, y: nextY });
        return;
      }

      const minWidth = window.appId === "terminal" ? 500 : 620;
      const minHeight = window.appId === "terminal" ? 320 : 420;
      const nextWidth = Math.min(
        globalThis.window.innerWidth - origin.bounds.x - 8,
        Math.max(
          minWidth,
          origin.bounds.width + event.clientX - origin.pointerX,
        ),
      );
      const nextHeight = Math.min(
        globalThis.window.innerHeight - origin.bounds.y - 72,
        Math.max(
          minHeight,
          origin.bounds.height + event.clientY - origin.pointerY,
        ),
      );
      queueBounds({
        ...origin.bounds,
        width: nextWidth,
        height: nextHeight,
      });
    };

    const handleEnd = () => {
      endInteraction();
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handleEnd);
    document.addEventListener("pointercancel", handleEnd);
    document.addEventListener("mouseup", handleEnd);
    globalThis.window.addEventListener("blur", handleEnd);
    interactionCleanup.current = () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handleEnd);
      document.removeEventListener("pointercancel", handleEnd);
      document.removeEventListener("mouseup", handleEnd);
      globalThis.window.removeEventListener("blur", handleEnd);
    };
  };

  const handleTitlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (isCompact || window.maximized || event.pointerType === "touch") return;
    if ((event.target as HTMLElement).closest("button")) return;
    if (interactionCleanup.current) endInteraction();
    event.preventDefault();
    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      bounds: { ...window.bounds },
    };
    bindInteraction("drag", event.pointerId);
    setDragging(true);
  };

  const handleResizePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (isCompact || window.maximized) return;
    if (interactionCleanup.current) endInteraction();
    event.preventDefault();
    event.stopPropagation();
    resizeRef.current = {
      kind: "corner",
      pointerX: event.clientX,
      pointerY: event.clientY,
      bounds: { ...window.bounds },
    };
    bindInteraction("resize", event.pointerId);
    setResizing(true);
  };

  const style: CSSProperties = isCompact
    ? {
        zIndex: window.zIndex,
      }
    : {
        left: window.bounds.x,
        top: window.bounds.y,
        width: window.bounds.width,
        height: window.bounds.height,
        zIndex: window.zIndex,
      };

  return (
    <section
      ref={frameRef}
      className={`os-window ${active ? "is-active" : ""} ${
        window.minimized ? "is-minimized" : ""
      } ${window.maximized ? "is-maximized" : ""} ${
        dragging ? "is-dragging" : ""
      } ${resizing ? "is-resizing" : ""} ${isCompact ? "is-compact" : ""}`}
      style={style}
      data-app={window.appId}
      aria-label={window.title}
      aria-hidden={window.minimized || undefined}
      inert={window.minimized || undefined}
      tabIndex={-1}
      onPointerDown={() => {
        if (!active) focusWindow(window.id);
      }}
    >
      <header
        className="os-window__titlebar"
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={(event) => {
          if ((event.target as HTMLElement).closest("button")) return;
          if (!isCompact) toggleMaximizeWindow(window.id);
        }}
      >
        <div
          className="traffic-lights"
          role="group"
          aria-label="Window controls"
          onDoubleClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="traffic-light traffic-light--close"
            aria-label={`Close ${window.title}`}
            title="Close"
            onClick={() => closeWindow(window.id)}
          >
            <span className="traffic-light__glyph" aria-hidden="true">
              <svg viewBox="0 0 8 8">
                <path d="m2 2 4 4M6 2 2 6" />
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="traffic-light traffic-light--minimize"
            aria-label={`Minimize ${window.title}`}
            title="Minimize"
            onClick={() => minimizeWindow(window.id)}
          >
            <span className="traffic-light__glyph" aria-hidden="true">
              <svg viewBox="0 0 8 8">
                <path d="M1.8 4h4.4" />
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="traffic-light traffic-light--zoom"
            aria-label={
              window.maximized
                ? `Restore ${window.title}`
                : `Zoom ${window.title}`
            }
            title={window.maximized ? "Restore" : "Zoom"}
            onClick={() => toggleMaximizeWindow(window.id)}
          >
            <span className="traffic-light__glyph" aria-hidden="true">
              <SystemIcon
                name={window.maximized ? "minimize" : "maximize"}
                size={8}
                strokeWidth={2.1}
              />
            </span>
          </button>
        </div>

        <div className="os-window__title" aria-hidden="true">
          {window.title}
        </div>
        <div className="os-window__titlebar-tail" aria-hidden="true" />
      </header>

      <div className="os-window__body">{children}</div>

      {!isCompact && (
        <div
          className="os-window__resize-handle"
          aria-hidden="true"
          onPointerDown={handleResizePointerDown}
        />
      )}
    </section>
  );
}

