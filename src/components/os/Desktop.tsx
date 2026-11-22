"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AppIcon } from "@/components/icons/AppIcon";
import { IconGradients } from "@/components/icons/IconGradients";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { useOS } from "@/lib/os-context";
import { ControlCenter } from "./ControlCenter";
import { DesktopIcons } from "./DesktopIcons";
import { DesktopMenu } from "./DesktopMenu";
import { Dock } from "./Dock";
import { HelpDialog } from "./HelpDialog";
import { Launchpad } from "./Launchpad";
import { MenuBar } from "./MenuBar";
import { NotificationCenter } from "./NotificationCenter";
import { Spotlight } from "./Spotlight";
import {
  BootScreen,
  LoginScreen,
  OffScreen,
  SleepScreen,
} from "./SystemScreens";
import { Wallpaper } from "./Wallpaper";
import { WindowContent } from "./WindowContent";
import { WindowFrame } from "./WindowFrame";

const WELCOME_SEEN_KEY = "furqan-os-welcome-seen";

interface ContextMenuState {
  x: number;
  y: number;
}

export function Desktop() {
  const {
    phase,
    hydrated,
    windows,
    activeWindow,
    settings,
    resolvedTheme,
    overlay,
    focusEnabled,
    isCompact,
    openApp,
  } = useOS();
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const welcomeTimer = useRef<number | null>(null);

  useEffect(() => {
    if (phase !== "desktop") {
      setShowWelcome(false);
      setContextMenu(null);
      return;
    }
    if (focusEnabled || isCompact) {
      setShowWelcome(false);
      return;
    }
    let hasSeenWelcome = false;
    try {
      hasSeenWelcome =
        window.sessionStorage.getItem(WELCOME_SEEN_KEY) === "true";
    } catch {
      hasSeenWelcome = false;
    }
    if (hasSeenWelcome) return;

    welcomeTimer.current = window.setTimeout(() => {
      setShowWelcome(true);
      try {
        window.sessionStorage.setItem(WELCOME_SEEN_KEY, "true");
      } catch {
        // Session storage is optional.
      }
    }, 1300);

    return () => {
      if (welcomeTimer.current) window.clearTimeout(welcomeTimer.current);
    };
  }, [focusEnabled, isCompact, phase]);

  useEffect(() => {
    if (!showWelcome) return;
    const timer = window.setTimeout(() => setShowWelcome(false), 11000);
    return () => window.clearTimeout(timer);
  }, [showWelcome]);

  useEffect(() => {
    if (overlay) setContextMenu(null);
  }, [overlay]);

  useEffect(() => {
    const close = () => setContextMenu(null);
    window.addEventListener("blur", close);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("blur", close);
      window.removeEventListener("resize", close);
    };
  }, []);

  const handleContextMenu = (event: ReactMouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    if (
      target?.closest(
        "button, a, input, textarea, select, .os-window, .menu-bar, .dock, .desktop-icons, .launchpad, .spotlight-layer, .control-center, .notification-center, .help-dialog, .welcome-banner, .desktop-menu",
      )
    ) {
      return;
    }
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const handleDesktopKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest(".os-window, .menu-bar, .dock, .launchpad")) return;
    if (event.shiftKey && event.key === "F10") {
      event.preventDefault();
      setContextMenu({ x: 42, y: 82 });
    }
  };

  const dimOpacity =
    phase === "desktop"
      ? Math.max(0, ((100 - settings.brightness) / 40) * 0.32)
      : 0;

  return (
    <div
      className="os-shell"
      data-theme={resolvedTheme}
      data-wallpaper={settings.wallpaper}
      data-phase={phase}
      data-overlay={overlay ?? undefined}
    >
      <IconGradients />
      <Wallpaper id={settings.wallpaper} />

      <a href="#desktop-main" className="skip-link">
        Skip to portfolio desktop
      </a>

      <main
        id="desktop-main"
        className="os-desktop"
        tabIndex={-1}
        inert={phase !== "desktop"}
        aria-hidden={phase !== "desktop" || undefined}
        onContextMenu={handleContextMenu}
        onKeyDown={handleDesktopKeyDown}
        style={
          {
            "--dock-icon-size": `${isCompact ? 38 : settings.dockSize}px`,
          } as CSSProperties
        }
      >
        <h1 className="sr-only">
          Furqan Khan, full-stack developer. An interactive macOS-inspired
          portfolio desktop.
        </h1>

        <div
          className="desktop-base"
          inert={
            overlay === "launchpad" || overlay === "spotlight" || undefined
          }
          aria-hidden={
            overlay === "launchpad" || overlay === "spotlight" || undefined
          }
        >
          <MenuBar />
          <DesktopIcons />

          <div className="os-window-layer">
            {windows.map((window) => (
              <WindowFrame
                key={window.id}
                window={window}
                active={
                  phase === "desktop" && activeWindow?.id === window.id
                }
              >
                <WindowContent window={window} />
              </WindowFrame>
            ))}
          </div>

          {isCompact && windows.length === 0 && phase === "desktop" && (
            <div className="desktop-empty-hint">
              <span className="desktop-empty-hint__avatar" aria-hidden="true">
                FK
              </span>
              <h2>Furqan Khan</h2>
              <p>Full-stack developer. Open an app from the Dock.</p>
              <button
                type="button"
                className="os-primary-button"
                onClick={() => openApp("finder", { section: "projects" })}
              >
                Open projects
              </button>
            </div>
          )}

          <Dock />

          {showWelcome &&
            !isCompact &&
            phase === "desktop" &&
            !focusEnabled && (
            <aside
              className="welcome-banner"
              aria-label="Welcome notification"
            >
              <span className="welcome-banner__icon">
                <AppIcon app="finder" size={38} />
              </span>
              <div className="welcome-banner__copy">
                <strong>Welcome to Furqan&apos;s desktop</strong>
                <p>
                  The work lives in Finder. Press ⌘K or Ctrl K to search
                  everything.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    openApp("finder", { section: "projects" });
                    setShowWelcome(false);
                  }}
                >
                  Browse projects
                  <SystemIcon name="arrow-right" size={11} />
                </button>
              </div>
              <button
                type="button"
                className="welcome-banner__close"
                aria-label="Dismiss welcome notification"
                onClick={() => setShowWelcome(false)}
              >
                <SystemIcon name="close" size={10} />
              </button>
            </aside>
          )}
        </div>

        {overlay === "launchpad" && <Launchpad />}
        {overlay === "spotlight" && <Spotlight />}
        {overlay === "control-center" && <ControlCenter />}
        {overlay === "notification-center" && <NotificationCenter />}
        {overlay === "help" && <HelpDialog />}

        {contextMenu && (
          <DesktopMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}
      </main>

      {phase === "desktop" && dimOpacity > 0 && (
        <div
          className="screen-dimmer"
          style={{ opacity: dimOpacity }}
          aria-hidden="true"
        />
      )}

      {phase === "boot" && <BootScreen />}
      {phase === "login" && <LoginScreen />}
      {phase === "locked" && <LoginScreen locked />}
      {phase === "sleep" && <SleepScreen />}
      {phase === "off" && <OffScreen />}

      {/* The first paint has no stored phase. Keep the shell stable while
          session storage is checked after hydration. */}
      {!hydrated && <span className="sr-only">Loading Portfolio OS</span>}
    </div>
  );
}
