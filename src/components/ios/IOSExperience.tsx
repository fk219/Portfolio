"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { Wallpaper } from "@/components/os/Wallpaper";
import { useOS } from "@/lib/os-context";
import { IOSHomeScreen } from "./IOSHomeScreen";
import { IOSLockScreen } from "./IOSLockScreen";
import { IOSControlCenter } from "./IOSControlCenter";
import { IOSSearch } from "./IOSSearch";
import { IOSStatusBar } from "./IOSStatusBar";
import { IOSHomeIndicator } from "./IOSChrome";
import type { IOSAppId, IOSAppOrigin } from "./ios-apps";
import { IOSProjectsApp } from "./apps/IOSProjectsApp";
import { IOSSafariApp } from "./apps/IOSSafariApp";
import { IOSPhotosApp } from "./apps/IOSPhotosApp";
import { IOSResumeApp } from "./apps/IOSResumeApp";
import { IOSProfileApp } from "./apps/IOSProfileApp";
import { IOSCareerApp } from "./apps/IOSCareerApp";
import { IOSLinksApp } from "./apps/IOSLinksApp";
import { IOSNotesApp } from "./apps/IOSNotesApp";
import { IOSCalculatorApp } from "./apps/IOSCalculatorApp";
import { IOSMusicApp } from "./apps/IOSMusicApp";
import { IOSDevKitApp } from "./apps/IOSDevKitApp";
import { IOSStoreApp } from "./apps/IOSStoreApp";
import { IOSArcadeApp } from "./apps/IOSArcadeApp";
import { IOSClockApp } from "./apps/IOSClockApp";
import { IOSContactApp } from "./apps/IOSContactApp";
import { IOSSettingsApp } from "./apps/IOSSettingsApp";
import { IOSNotificationCenter } from "./IOSNotificationCenter";

const FRAME_WIDTH = 418;
const FRAME_HEIGHT = 872;

function useFrameScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const fitWidth = (window.innerWidth - 56) / FRAME_WIDTH;
      const fitHeight = (window.innerHeight - 116) / FRAME_HEIGHT;
      setScale(Math.max(0.52, Math.min(1, fitWidth, fitHeight)));
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return scale;
}

export function IOSExperience() {
  const { settings, resolvedTheme, switchExperience } = useOS();
  const [activeApp, setActiveApp] = useState<IOSAppId | null>(null);
  const [pendingProjectSlug, setPendingProjectSlug] = useState("");
  const [closing, setClosing] = useState(false);
  const [controlCenter, setControlCenter] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsClosing, setNotificationsClosing] = useState(false);
  const [locked, setLocked] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const [appOrigin, setAppOrigin] = useState<IOSAppOrigin | null>(null);
  const [leaving, setLeaving] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const searchTimer = useRef<number | null>(null);
  const notificationTimer = useRef<number | null>(null);
  const scale = useFrameScale();

  const clearSearchTimer = useCallback(() => {
    if (searchTimer.current) {
      window.clearTimeout(searchTimer.current);
      searchTimer.current = null;
    }
  }, []);

  const clearNotificationTimer = useCallback(() => {
    if (notificationTimer.current) {
      window.clearTimeout(notificationTimer.current);
      notificationTimer.current = null;
    }
  }, []);

  const openApp = useCallback(
    (app: IOSAppId, projectSlug = "", origin?: IOSAppOrigin) => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      clearSearchTimer();
      clearNotificationTimer();
      setPendingProjectSlug(projectSlug);
      setActiveApp(app);
      setClosing(false);
      setSearching(false);
      setSearchClosing(false);
      setControlCenter(false);
      setNotificationsOpen(false);
      setNotificationsClosing(false);
      setLocked(false);
      setImmersive(false);
      setAppOrigin(origin ?? null);
    },
    [clearNotificationTimer, clearSearchTimer],
  );

  const closeApp = useCallback(() => {
    if (!activeApp) return;
    setClosing(true);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setActiveApp(null);
      setClosing(false);
      setImmersive(false);
      setAppOrigin(null);
    }, 280);
  }, [activeApp]);

  const openProject = useCallback(
    (slug: string) => {
      openApp("projects", slug);
    },
    [openApp],
  );

  const openSearch = useCallback(() => {
    clearSearchTimer();
    clearNotificationTimer();
    setSearchClosing(false);
    setSearching(true);
    setControlCenter(false);
    setNotificationsOpen(false);
    setNotificationsClosing(false);
  }, [clearNotificationTimer, clearSearchTimer]);

  const closeSearch = useCallback(() => {
    if (!searching || searchClosing) return;
    setSearchClosing(true);
    clearSearchTimer();
    searchTimer.current = window.setTimeout(() => {
      setSearching(false);
      setSearchClosing(false);
      searchTimer.current = null;
    }, 260);
  }, [clearSearchTimer, searchClosing, searching]);

  const openNotificationCenter = useCallback(() => {
    clearNotificationTimer();
    clearSearchTimer();
    setNotificationsClosing(false);
    setNotificationsOpen(true);
    setControlCenter(false);
    setSearching(false);
    setSearchClosing(false);
  }, [clearNotificationTimer, clearSearchTimer]);

  const closeNotificationCenter = useCallback(() => {
    if (!notificationsOpen || notificationsClosing) return;
    setNotificationsClosing(true);
    clearNotificationTimer();
    notificationTimer.current = window.setTimeout(() => {
      setNotificationsOpen(false);
      setNotificationsClosing(false);
      notificationTimer.current = null;
    }, 300);
  }, [clearNotificationTimer, notificationsClosing, notificationsOpen]);

  useEffect(() => {
    if (locked) {
      clearNotificationTimer();
      setNotificationsOpen(false);
      setNotificationsClosing(false);
    }
  }, [clearNotificationTimer, locked]);

  const goToMac = useCallback(() => {
    setLeaving(true);
    window.setTimeout(() => switchExperience("mac"), 280);
  }, [switchExperience]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (locked) {
        setLocked(false);
        return;
      }
      if (notificationsOpen) {
        closeNotificationCenter();
        return;
      }
      if (immersive) return;
      if (controlCenter) {
        setControlCenter(false);
        return;
      }
      if (searching) {
        closeSearch();
        return;
      }
      if (activeApp) closeApp();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    activeApp,
    closeApp,
    closeNotificationCenter,
    closeSearch,
    controlCenter,
    immersive,
    locked,
    notificationsOpen,
    searching,
  ]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      if (searchTimer.current) window.clearTimeout(searchTimer.current);
      if (notificationTimer.current) window.clearTimeout(notificationTimer.current);
    };
  }, []);

  const statusTone =
    locked || !activeApp
      ? "light"
      : notificationsOpen
        ? "light"
        : immersive
          ? "light"
          : activeApp === "safari" ||
              (resolvedTheme === "light" &&
                activeApp !== "calculator" &&
                activeApp !== "devkit" &&
                activeApp !== "store" &&
                activeApp !== "arcade")
            ? "dark"
            : "light";

  const homeBarTone =
    immersive
      ? "light"
      : activeApp === "safari"
        ? "dark"
        : activeApp === "calculator" ||
            activeApp === "devkit" ||
            activeApp === "store" ||
            activeApp === "arcade" ||
            resolvedTheme === "dark"
          ? "light"
          : "dark";

  const renderApp = (app: IOSAppId) => {
    switch (app) {
      case "projects":
        return (
          <IOSProjectsApp
            initialSlug={pendingProjectSlug}
            onOpenProjectHandled={() => setPendingProjectSlug("")}
          />
        );
      case "safari":
        return <IOSSafariApp onOpenProject={openProject} />;
      case "photos":
        return <IOSPhotosApp onViewerChange={setImmersive} />;
      case "resume":
        return <IOSResumeApp />;
      case "profile":
        return (
          <IOSProfileApp
            onOpenCareer={() => openApp("experience")}
            onOpenContact={() => openApp("contact")}
          />
        );
      case "experience":
        return <IOSCareerApp onOpenLinks={() => openApp("links")} />;
      case "links":
        return <IOSLinksApp />;
      case "notes":
        return <IOSNotesApp />;
      case "calculator":
        return <IOSCalculatorApp />;
      case "music":
        return <IOSMusicApp />;
      case "devkit":
        return <IOSDevKitApp />;
      case "store":
        return (
          <IOSStoreApp
            onOpenProject={openProject}
            onOpenResume={() => openApp("resume")}
          />
        );
      case "arcade":
        return <IOSArcadeApp />;
      case "clock":
        return <IOSClockApp />;
      case "contact":
        return <IOSContactApp />;
      case "settings":
        return (
          <IOSSettingsApp
            onSwitchToMac={goToMac}
            onOpenProfile={() => openApp("profile")}
            onLock={() => {
              setControlCenter(false);
              setLocked(true);
            }}
          />
        );
    }
  };

  return (
    <div
      className={`ios-experience ${leaving ? "is-leaving" : ""}`}
      data-theme={resolvedTheme}
      data-experience="ios"
    >
      <a className="skip-link" href="#ios-main">
        Skip to the iPhone portfolio
      </a>
      <h1 className="sr-only">
        Furqan Khan, founder of FKodeLabs and full-stack developer. iPhone
        portfolio.
      </h1>
      <div className="ios-stage" aria-hidden="true">
        <Wallpaper id={settings.wallpaper} />
        <span className="ios-stage__wash" />
      </div>

      <div className="ios-stage__top">
        <span className="ios-stage__label">
          <span className="ios-stage__dot" aria-hidden="true" />
          iPhone experience
          <small>PortfolioOS</small>
        </span>
        <button type="button" className="ios-stage__switch" onClick={goToMac}>
          <SystemIcon name="mac" size={15} />
          Mac desktop
        </button>
      </div>

      <div
        className="ios-frame-wrap"
        style={{
          width: FRAME_WIDTH * scale,
          height: FRAME_HEIGHT * scale,
        }}
      >
        <div
          className="ios-frame"
          style={{ transform: `scale(${scale})` }}
        >
          <span className="ios-hardware ios-hardware--silent" aria-hidden="true" />
          <span className="ios-hardware ios-hardware--volume-up" aria-hidden="true" />
          <span className="ios-hardware ios-hardware--volume-down" aria-hidden="true" />
          <button
            type="button"
            className="ios-hardware ios-hardware--power"
            aria-label={locked ? "Unlock iPhone" : "Lock iPhone"}
            onClick={() => setLocked((current) => !current)}
          />
          <div
            id="ios-main"
            className={`ios-screen ${activeApp ? "has-app" : ""}`}
            data-ios-theme={resolvedTheme}
            role="main"
            aria-label="iPhone portfolio"
            tabIndex={-1}
          >
            {locked ? (
              <IOSLockScreen
                wallpaper={settings.wallpaper}
                onUnlock={() => setLocked(false)}
                onOpenMusic={() => {
                  setLocked(false);
                  openApp("music");
                }}
              />
            ) : (
              <>
                <IOSHomeScreen
                  theme={resolvedTheme}
                  wallpaper={settings.wallpaper}
                  onOpenApp={(app, origin) => openApp(app, "", origin)}
                  onOpenProject={openProject}
                  onOpenSearch={openSearch}
                  onOpenControlCenter={() => setControlCenter(true)}
                  onOpenNotificationCenter={openNotificationCenter}
                  inert={Boolean(
                    activeApp ||
                      controlCenter ||
                      searching ||
                      notificationsOpen,
                  )}
                />
                {activeApp && (
                  <div
                    className={`ios-app-window ${
                      closing ? "is-closing" : ""
                    } ${appOrigin ? "has-origin" : ""}`}
                    style={
                      appOrigin
                        ? ({
                            "--ios-app-origin-x": `${appOrigin.x}px`,
                            "--ios-app-origin-y": `${appOrigin.y}px`,
                          } as CSSProperties)
                        : undefined
                    }
                  >
                    {renderApp(activeApp)}
                  </div>
                )}
              </>
            )}

            <IOSStatusBar
              tone={statusTone}
              onOpenControlCenter={
                locked || controlCenter
                  ? undefined
                  : () => setControlCenter(true)
              }
              onOpenNotificationCenter={
                locked || notificationsOpen
                  ? undefined
                  : openNotificationCenter
              }
              onOpenNowPlaying={
                locked ? undefined : () => openApp("music")
              }
            />

            {!locked && activeApp && !controlCenter && !searching && (
              <IOSHomeIndicator
                onClose={closeApp}
                tone={homeBarTone}
              />
            )}

            {controlCenter && !locked && (
              <IOSControlCenter
                onClose={() => setControlCenter(false)}
                onLock={() => {
                  setControlCenter(false);
                  setLocked(true);
                }}
                onOpenApp={(app) => openApp(app)}
                onOpenMusic={() => openApp("music")}
                onSwitchToMac={goToMac}
              />
            )}

            {searching && !locked && !controlCenter && (
              <IOSSearch
                closing={searchClosing}
                onClose={closeSearch}
                onOpenApp={(app) => openApp(app)}
                onOpenProject={openProject}
              />
            )}

            {notificationsOpen && !locked && !controlCenter && !searching && (
              <IOSNotificationCenter
                closing={notificationsClosing}
                onClose={closeNotificationCenter}
                onOpenApp={(app) => openApp(app)}
              />
            )}

            <span
              className="ios-brightness-shade"
              aria-hidden="true"
              style={{
                opacity: Math.max(0, (100 - settings.brightness) * 0.007),
              }}
            />
          </div>
        </div>
      </div>

      <div className="ios-stage__hint">
        <span>Same portfolio. Two operating systems.</span>
        <span>Use Mac desktop, top right, to switch back.</span>
      </div>
    </div>
  );
}
