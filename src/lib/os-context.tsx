"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  APP_DEFINITIONS,
  APP_WINDOW_LABELS,
  getDefaultBounds,
  getMaximizedBounds,
} from "./apps";
import { getProject } from "@/data/projects";
import { isTextInput, useMediaQuery } from "./hooks";
import {
  getActiveWindow,
  initialWindowManagerState,
  windowManagerReducer,
} from "./window-manager";
import type {
  AppId,
  OSWindow,
  OSSettings,
  OverlayId,
  Phase,
  ResolvedTheme,
  ThemeMode,
  WallpaperId,
  WindowBounds,
} from "./types";

type OpenableAppId = Exclude<AppId, "project">;

interface OpenAppOptions {
  section?: string;
}

interface OSContextValue {
  phase: Phase;
  hydrated: boolean;
  isCompact: boolean;
  windows: OSWindow[];
  activeWindow?: OSWindow;
  activeAppId: AppId;
  activeAppName: string;
  settings: OSSettings;
  resolvedTheme: ResolvedTheme;
  overlay: OverlayId | null;
  wifiEnabled: boolean;
  bluetoothEnabled: boolean;
  focusEnabled: boolean;
  openApp: (appId: OpenableAppId, options?: OpenAppOptions) => void;
  openProject: (slug: string) => void;
  openSettings: (section?: string) => void;
  openAbout: () => void;
  openResume: () => void;
  closeWindow: (id: string) => void;
  closeActiveWindow: () => void;
  minimizeWindow: (id: string) => void;
  minimizeActiveWindow: () => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  toggleMaximizeActiveWindow: () => void;
  updateWindowBounds: (id: string, bounds: WindowBounds) => void;
  closeAllWindows: () => void;
  quitActiveApp: () => void;
  closeApp: (appId: AppId) => void;
  updateSettings: (patch: Partial<OSSettings>) => void;
  resetSettings: () => void;
  toggleOverlay: (overlay: OverlayId) => void;
  openOverlay: (overlay: OverlayId) => void;
  closeOverlay: () => void;
  enterDesktop: () => void;
  lockScreen: () => void;
  sleepComputer: () => void;
  shutDown: () => void;
  restart: () => void;
  logOut: () => void;
  powerOn: () => void;
  wakeFromSleep: () => void;
  toggleWifi: () => void;
  toggleBluetooth: () => void;
  toggleFocus: () => void;
}

const OSContext = createContext<OSContextValue | null>(null);

const SESSION_KEY = "furqan-portfolio-os-entered";
const SETTINGS_KEY = "furqan-portfolio-os-settings";

const defaultSettings: OSSettings = {
  appearance: "light",
  wallpaper: "hunza",
  dockSize: 52,
  dockMagnification: true,
  brightness: 100,
};

const validThemes: ThemeMode[] = ["light", "dark", "auto"];
const validWallpapers: WallpaperId[] = [
  "hunza",
  "sonoma",
  "lagoon",
  "graphite",
];

export function OSProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    windowManagerReducer,
    initialWindowManagerState,
  );
  const [phase, setPhase] = useState<Phase>("boot");
  const [hydrated, setHydrated] = useState(false);
  const [settings, setSettings] = useState<OSSettings>(defaultSettings);
  const [overlay, setOverlay] = useState<OverlayId | null>(null);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [focusEnabled, setFocusEnabled] = useState(false);
  const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const isCompact = useMediaQuery("(max-width: 940px)");
  const settingsLoaded = useRef(false);
  const autoOpenedFinder = useRef(false);

  const resolvedTheme: ResolvedTheme =
    settings.appearance === "auto"
      ? systemPrefersDark
        ? "dark"
        : "light"
      : settings.appearance;

  const activeWindow = getActiveWindow(state);
  const activeAppId: AppId = activeWindow?.appId ?? "finder";
  const activeAppName = activeWindow
    ? (APP_WINDOW_LABELS[activeWindow.appId] ?? "Finder")
    : "Finder";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const skipIntro = params.get("skipIntro") === "1";
    let entered = false;
    try {
      entered = window.sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      entered = false;
    }
    setHydrated(true);
    if (skipIntro || entered) {
      setPhase("desktop");
    }
  }, []);

  useEffect(() => {
    if (!hydrated || phase !== "boot") return;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      setPhase("login");
    }, reduced ? 650 : 1650);
    return () => window.clearTimeout(timer);
  }, [hydrated, phase]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<OSSettings>;
        setSettings((current) => ({
          appearance:
            parsed.appearance && validThemes.includes(parsed.appearance)
              ? parsed.appearance
              : current.appearance,
          wallpaper:
            parsed.wallpaper && validWallpapers.includes(parsed.wallpaper)
              ? parsed.wallpaper
              : current.wallpaper,
          dockSize:
            typeof parsed.dockSize === "number"
              ? Math.min(64, Math.max(40, parsed.dockSize))
              : current.dockSize,
          dockMagnification:
            typeof parsed.dockMagnification === "boolean"
              ? parsed.dockMagnification
              : current.dockMagnification,
          brightness:
            typeof parsed.brightness === "number"
              ? Math.min(100, Math.max(60, parsed.brightness))
              : current.brightness,
        }));
      }
    } catch {
      // Storage can be unavailable in private or restricted contexts.
    } finally {
      settingsLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    if (!settingsLoaded.current) return;
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // The OS remains usable if persistence is blocked.
    }
  }, [settings]);

  const getWindowId = useCallback((appId: AppId) => `app:${appId}`, []);

  const openApp = useCallback(
    (appId: OpenableAppId, options?: OpenAppOptions) => {
      if (appId === "resume") {
        // Resume opens as a preview window. This branch is kept for completeness.
      }
      const id = getWindowId(appId);
      const existing = state.windows.find((candidate) => candidate.id === id);
      if (existing && options?.section) {
        dispatch({
          type: "UPDATE_WINDOW_SECTION",
          id,
          section: options.section,
        });
      }
      const definition = APP_DEFINITIONS[appId];
      const window: OSWindow = {
        id,
        appId,
        title:
          appId === "resume"
            ? "Furqan Khan - Resume"
            : appId === "about"
              ? "About This Mac"
              : definition.title,
        bounds: getDefaultBounds(appId, state.windows.length),
        minimized: false,
        maximized: false,
        zIndex: 0,
        payload: options?.section ? { section: options.section } : undefined,
      };
      dispatch({ type: "OPEN_WINDOW", window });
      setOverlay(null);
    },
    [getWindowId, state.windows],
  );

  const openProject = useCallback(
    (slug: string) => {
      const project = getProject(slug);
      if (!project) return;
      const window: OSWindow = {
        id: `project:${slug}`,
        appId: "project",
        title: project.name,
        bounds: getDefaultBounds("project", state.windows.length),
        minimized: false,
        maximized: false,
        zIndex: 0,
        payload: { projectSlug: slug },
      };
      dispatch({ type: "OPEN_WINDOW", window });
      setOverlay(null);
    },
    [state.windows.length],
  );

  const openSettings = useCallback(
    (section?: string) => {
      openApp("settings", { section });
    },
    [openApp],
  );

  const openAbout = useCallback(() => {
    openApp("about");
  }, [openApp]);

  const openResume = useCallback(() => {
    openApp("resume");
  }, [openApp]);

  const closeWindow = useCallback((id: string) => {
    dispatch({ type: "CLOSE_WINDOW", id });
  }, []);

  const closeActiveWindow = useCallback(() => {
    if (!state.activeWindowId) return;
    dispatch({ type: "CLOSE_WINDOW", id: state.activeWindowId });
  }, [state.activeWindowId]);

  const minimizeWindow = useCallback((id: string) => {
    dispatch({ type: "MINIMIZE_WINDOW", id });
  }, []);

  const minimizeActiveWindow = useCallback(() => {
    if (!state.activeWindowId) return;
    dispatch({ type: "MINIMIZE_WINDOW", id: state.activeWindowId });
  }, [state.activeWindowId]);

  const restoreWindow = useCallback((id: string) => {
    dispatch({ type: "RESTORE_WINDOW", id });
  }, []);

  const focusWindow = useCallback((id: string) => {
    dispatch({ type: "FOCUS_WINDOW", id });
  }, []);

  const toggleMaximizeWindow = useCallback((id: string) => {
    dispatch({
      type: "TOGGLE_MAXIMIZE",
      id,
      maximizedBounds: getMaximizedBounds(),
    });
  }, []);

  const toggleMaximizeActiveWindow = useCallback(() => {
    if (!state.activeWindowId) return;
    dispatch({
      type: "TOGGLE_MAXIMIZE",
      id: state.activeWindowId,
      maximizedBounds: getMaximizedBounds(),
    });
  }, [state.activeWindowId]);

  const updateWindowBounds = useCallback(
    (id: string, bounds: WindowBounds) => {
      dispatch({ type: "UPDATE_BOUNDS", id, bounds });
    },
    [],
  );

  const closeAllWindows = useCallback(() => {
    dispatch({ type: "CLOSE_ALL" });
  }, []);

  const closeApp = useCallback((appId: AppId) => {
    dispatch({ type: "CLOSE_APP", appId });
  }, []);

  const quitActiveApp = useCallback(() => {
    if (!state.activeWindowId) return;
    const window = state.windows.find(
      (candidate) => candidate.id === state.activeWindowId,
    );
    if (window) dispatch({ type: "CLOSE_APP", appId: window.appId });
  }, [state.activeWindowId, state.windows]);

  const updateSettings = useCallback((patch: Partial<OSSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const toggleOverlay = useCallback((nextOverlay: OverlayId) => {
    setOverlay((current) => (current === nextOverlay ? null : nextOverlay));
  }, []);

  const openOverlay = useCallback((nextOverlay: OverlayId) => {
    setOverlay(nextOverlay);
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlay(null);
  }, []);

  const enterDesktop = useCallback(() => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Session storage is optional.
    }
    setPhase("desktop");
    setOverlay(null);
  }, []);

  const lockScreen = useCallback(() => {
    setPhase("locked");
    setOverlay(null);
  }, []);

  const sleepComputer = useCallback(() => {
    setPhase("sleep");
    setOverlay(null);
  }, []);

  const shutDown = useCallback(() => {
    dispatch({ type: "CLOSE_ALL" });
    autoOpenedFinder.current = false;
    setPhase("off");
    setOverlay(null);
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: "CLOSE_ALL" });
    autoOpenedFinder.current = false;
    setPhase("boot");
    setOverlay(null);
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: "CLOSE_ALL" });
    autoOpenedFinder.current = false;
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Session storage is optional.
    }
    setPhase("login");
    setOverlay(null);
  }, []);

  const powerOn = useCallback(() => {
    autoOpenedFinder.current = false;
    setPhase("boot");
  }, []);

  const wakeFromSleep = useCallback(() => {
    setPhase("locked");
  }, []);

  useEffect(() => {
    if (!hydrated || phase !== "desktop") return;
    if (autoOpenedFinder.current) return;
    autoOpenedFinder.current = true;
    const timer = window.setTimeout(() => {
      openApp("finder");
    }, 260);
    return () => window.clearTimeout(timer);
  }, [hydrated, openApp, phase]);

  useEffect(() => {
    let frame = 0;

    const clampToViewport = () => {
      if (window.innerWidth <= 940) return;
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        dispatch({
          type: "CLAMP_WINDOWS",
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
        });
      });
    };

    window.addEventListener("resize", clampToViewport);
    window.addEventListener("orientationchange", clampToViewport);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", clampToViewport);
      window.removeEventListener("orientationchange", clampToViewport);
    };
  }, []);

  useEffect(() => {
    if (!hydrated || phase !== "desktop") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey;
      const target = event.target as Element | null;

      if (modifier && event.code === "Space") {
        event.preventDefault();
        setOverlay((current) =>
          current === "spotlight" ? null : "spotlight",
        );
        return;
      }

      if (modifier && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOverlay((current) =>
          current === "spotlight" ? null : "spotlight",
        );
        return;
      }

      if (modifier && event.key === ",") {
        event.preventDefault();
        openSettings();
        return;
      }

      if (modifier && event.altKey && event.key.toLowerCase() === "w") {
        event.preventDefault();
        dispatch({ type: "CLOSE_ALL" });
        return;
      }

      if (modifier && event.key.toLowerCase() === "w") {
        if (!state.activeWindowId) return;
        event.preventDefault();
        dispatch({ type: "CLOSE_WINDOW", id: state.activeWindowId });
        return;
      }

      if (modifier && event.key.toLowerCase() === "m") {
        if (!state.activeWindowId) return;
        event.preventDefault();
        dispatch({ type: "MINIMIZE_WINDOW", id: state.activeWindowId });
        return;
      }

      if (modifier && event.key.toLowerCase() === "h") {
        if (!state.activeWindowId) return;
        event.preventDefault();
        dispatch({ type: "MINIMIZE_WINDOW", id: state.activeWindowId });
        return;
      }

      if (modifier && event.key.toLowerCase() === "o") {
        event.preventDefault();
        openApp("finder", { section: "projects" });
        return;
      }

      if (modifier && event.key.toLowerCase() === "q") {
        if (event.shiftKey) {
          event.preventDefault();
          logOut();
          return;
        }
        if (event.metaKey && event.ctrlKey) {
          event.preventDefault();
          lockScreen();
          return;
        }
        if (activeWindow && activeWindow.appId !== "finder") {
          event.preventDefault();
          dispatch({ type: "CLOSE_APP", appId: activeWindow.appId });
        }
        return;
      }

      if (event.key === "Escape" && overlay) {
        event.preventDefault();
        setOverlay(null);
        return;
      }

      if (!modifier && event.key === "F4" && !isTextInput(target)) {
        event.preventDefault();
        setOverlay((current) =>
          current === "launchpad" ? null : "launchpad",
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    activeWindow,
    hydrated,
    lockScreen,
    logOut,
    openApp,
    openSettings,
    overlay,
    phase,
    state.activeWindowId,
  ]);

  const value = useMemo<OSContextValue>(
    () => ({
      phase,
      hydrated,
      isCompact,
      windows: state.windows,
      activeWindow,
      activeAppId,
      activeAppName,
      settings,
      resolvedTheme,
      overlay,
      wifiEnabled,
      bluetoothEnabled,
      focusEnabled,
      openApp,
      openProject,
      openSettings,
      openAbout,
      openResume,
      closeWindow,
      closeActiveWindow,
      minimizeWindow,
      minimizeActiveWindow,
      restoreWindow,
      focusWindow,
      toggleMaximizeWindow,
      toggleMaximizeActiveWindow,
      updateWindowBounds,
      closeAllWindows,
      quitActiveApp,
      closeApp,
      updateSettings,
      resetSettings,
      toggleOverlay,
      openOverlay,
      closeOverlay,
      enterDesktop,
      lockScreen,
      sleepComputer,
      shutDown,
      restart,
      logOut,
      powerOn,
      wakeFromSleep,
      toggleWifi: () => setWifiEnabled((enabled) => !enabled),
      toggleBluetooth: () => setBluetoothEnabled((enabled) => !enabled),
      toggleFocus: () => setFocusEnabled((enabled) => !enabled),
    }),
    [
      activeAppId,
      activeAppName,
      activeWindow,
      bluetoothEnabled,
      closeActiveWindow,
      closeAllWindows,
      closeApp,
      closeOverlay,
      closeWindow,
      enterDesktop,
      focusEnabled,
      focusWindow,
      hydrated,
      isCompact,
      lockScreen,
      logOut,
      minimizeActiveWindow,
      minimizeWindow,
      openAbout,
      openApp,
      openOverlay,
      openProject,
      openResume,
      openSettings,
      overlay,
      phase,
      powerOn,
      quitActiveApp,
      resetSettings,
      resolvedTheme,
      restart,
      restoreWindow,
      settings,
      shutDown,
      sleepComputer,
      state.windows,
      toggleMaximizeActiveWindow,
      toggleMaximizeWindow,
      toggleOverlay,
      updateSettings,
      updateWindowBounds,
      wakeFromSleep,
      wifiEnabled,
    ],
  );

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error("useOS must be used inside an OSProvider");
  }
  return context;
}

