"use client";

import {
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useClickOutside, useEscape } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import { SystemIcon } from "@/components/icons/SystemIcon";

interface DesktopMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export function DesktopMenu({ x, y, onClose }: DesktopMenuProps) {
  const {
    openOverlay,
    openSettings,
    openAbout,
    windows,
    minimizeWindow,
  } = useOS();
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside([menuRef], true, onClose);
  useEscape(true, onClose);

  useEffect(() => {
    menuRef.current
      ?.querySelector<HTMLButtonElement>("[role='menuitem']:not([disabled])")
      ?.focus();
  }, []);

  const menuWidth = 236;
  const menuHeight = 232;
  const left = Math.min(x, window.innerWidth - menuWidth - 10);
  const top = Math.min(y, window.innerHeight - menuHeight - 10);

  const run = (action: () => void) => {
    onClose();
    action();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        "[role='menuitem']:not([disabled])",
      ),
    );
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    const delta = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex =
      index < 0 ? 0 : (index + delta + items.length) % items.length;
    items[nextIndex].focus();
  };

  return (
    <div
      ref={menuRef}
      className="desktop-menu"
      role="menu"
      aria-label="Desktop actions"
      style={{ left: Math.max(8, left), top: Math.max(8, top) }}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        role="menuitem"
        className="desktop-menu__item"
        onClick={() => run(() => openOverlay("launchpad"))}
      >
        <span>Open Launchpad</span>
        <SystemIcon name="grid" size={13} />
      </button>
      <button
        type="button"
        role="menuitem"
        className="desktop-menu__item"
        disabled={windows.length === 0}
        onClick={() =>
          run(() => windows.forEach((window) => minimizeWindow(window.id)))
        }
      >
        <span>Show Desktop</span>
      </button>
      <button
        type="button"
        role="menuitem"
        className="desktop-menu__item"
        onClick={() => run(() => openSettings("wallpaper"))}
      >
        <span>Change Wallpaper…</span>
      </button>
      <button
        type="button"
        role="menuitem"
        className="desktop-menu__item"
        onClick={() =>
          run(() =>
            window.dispatchEvent(new Event("furqan-os:reset-widget-layout")),
          )
        }
      >
        <span>Reset Widget Layout</span>
        <SystemIcon name="refresh" size={13} />
      </button>
      <div className="desktop-menu__separator" role="separator" />
      <button
        type="button"
        role="menuitem"
        className="desktop-menu__item"
        onClick={() => run(openAbout)}
      >
        <span>About This Mac</span>
      </button>
    </div>
  );
}
