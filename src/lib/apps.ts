import type {
  AppDefinition,
  AppId,
  DockAppId,
  WindowBounds,
} from "./types";

export const MENU_BAR_HEIGHT = 30;
export const COMPACT_MENU_BAR_HEIGHT = 44;

export const APP_DEFINITIONS: Record<AppId, AppDefinition> = {
  finder: {
    name: "Finder",
    title: "Portfolio",
    width: 1120,
    height: 680,
    minWidth: 660,
    minHeight: 430,
  },
  safari: {
    name: "Safari",
    title: "Furqan Khan",
    width: 1120,
    height: 720,
    minWidth: 720,
    minHeight: 500,
  },
  mail: {
    name: "Mail",
    title: "New Message",
    width: 920,
    height: 620,
    minWidth: 660,
    minHeight: 480,
  },
  notes: {
    name: "Notes",
    title: "Notes",
    width: 900,
    height: 600,
    minWidth: 660,
    minHeight: 430,
  },
  photos: {
    name: "Photos",
    title: "Project Artwork",
    width: 1000,
    height: 650,
    minWidth: 720,
    minHeight: 470,
  },
  calendar: {
    name: "Calendar",
    title: "Calendar",
    width: 900,
    height: 610,
    minWidth: 690,
    minHeight: 480,
  },
  music: {
    name: "Music",
    title: "Music",
    width: 760,
    height: 620,
    minWidth: 620,
    minHeight: 480,
  },
  terminal: {
    name: "Terminal",
    title: "furqan@portfolio: ~",
    width: 760,
    height: 500,
    minWidth: 500,
    minHeight: 320,
  },
  devkit: {
    name: "DevKit",
    title: "DevKit",
    width: 1080,
    height: 700,
    minWidth: 760,
    minHeight: 520,
  },
  store: {
    name: "Store",
    title: "Store",
    width: 1100,
    height: 720,
    minWidth: 780,
    minHeight: 520,
  },
  linkedin: {
    name: "LinkedIn",
    title: "Furqan Khan · LinkedIn",
    width: 1000,
    height: 720,
    minWidth: 700,
    minHeight: 500,
  },
  github: {
    name: "GitHub",
    title: "fk219 · GitHub",
    width: 1040,
    height: 720,
    minWidth: 720,
    minHeight: 500,
  },
  settings: {
    name: "System Settings",
    title: "System Settings",
    width: 850,
    height: 590,
    minWidth: 690,
    minHeight: 480,
  },
  trash: {
    name: "Trash",
    title: "Trash",
    width: 600,
    height: 410,
    minWidth: 460,
    minHeight: 320,
  },
  career: {
    name: "Career",
    title: "Experience & Certifications",
    width: 980,
    height: 700,
    minWidth: 660,
    minHeight: 480,
  },
  links: {
    name: "Links",
    title: "Links",
    width: 880,
    height: 640,
    minWidth: 620,
    minHeight: 460,
  },
  project: {
    name: "Projects",
    title: "Project",
    width: 1060,
    height: 700,
    minWidth: 720,
    minHeight: 480,
  },
  resume: {
    name: "Preview",
    title: "Furqan Khan - Resume",
    width: 760,
    height: 760,
    minWidth: 600,
    minHeight: 500,
  },
  about: {
    name: "Finder",
    title: "About This Mac",
    width: 560,
    height: 410,
    minWidth: 500,
    minHeight: 380,
  },
};

export type DockEntry =
  | { kind: "app"; id: DockAppId; label: string; optional?: boolean }
  | { kind: "launchpad"; label: string }
  | { kind: "preview"; label: string }
  | { kind: "trash"; label: string }
  | { kind: "separator" };

export const DOCK_ENTRIES: DockEntry[] = [
  { kind: "app", id: "finder", label: "Finder" },
  { kind: "launchpad", label: "Launchpad" },
  { kind: "app", id: "safari", label: "Safari" },
  { kind: "app", id: "store", label: "Store", optional: true },
  { kind: "app", id: "mail", label: "Mail" },
  { kind: "app", id: "notes", label: "Notes", optional: true },
  { kind: "app", id: "photos", label: "Photos", optional: true },
  { kind: "app", id: "calendar", label: "Calendar", optional: true },
  { kind: "app", id: "music", label: "Music", optional: true },
  { kind: "app", id: "terminal", label: "Terminal" },
  { kind: "app", id: "devkit", label: "DevKit" },
  { kind: "app", id: "settings", label: "System Settings" },
  { kind: "separator" },
  { kind: "trash", label: "Trash" },
];

export function getAppName(appId: AppId) {
  return APP_DEFINITIONS[appId].name;
}

export function getDefaultBounds(appId: AppId, cascadeIndex = 0): WindowBounds {
  const viewportWidth =
    typeof window === "undefined" ? 1440 : window.innerWidth;
  const viewportHeight =
    typeof window === "undefined" ? 900 : window.innerHeight;
  const definition = APP_DEFINITIONS[appId];
  const availableWidth = Math.max(320, viewportWidth - 48);
  const availableHeight = Math.max(320, viewportHeight - 156);
  const width = Math.min(definition.width, availableWidth);
  const height = Math.min(definition.height, availableHeight);
  const cascade = (cascadeIndex % 5) * 22;
  const centeredX = Math.round((viewportWidth - width) / 2);
  const workspaceTop = MENU_BAR_HEIGHT + 14;
  const workspaceBottom = viewportHeight - 96;
  const centeredY = Math.round(
    workspaceTop +
      Math.max(0, workspaceBottom - workspaceTop - height) / 2,
  );

  return {
    x: Math.min(
      Math.max(12, centeredX + cascade),
      Math.max(12, viewportWidth - width - 12),
    ),
    y: Math.min(
      Math.max(MENU_BAR_HEIGHT + 8, centeredY + cascade),
      Math.max(MENU_BAR_HEIGHT + 8, viewportHeight - height - 88),
    ),
    width,
    height,
  };
}

export function getMaximizedBounds(): WindowBounds {
  const viewportWidth =
    typeof window === "undefined" ? 1440 : window.innerWidth;
  const viewportHeight =
    typeof window === "undefined" ? 900 : window.innerHeight;

  return {
    x: 8,
    y: MENU_BAR_HEIGHT + 8,
    width: Math.max(360, viewportWidth - 16),
    height: Math.max(360, viewportHeight - MENU_BAR_HEIGHT - 102),
  };
}

export const APP_WINDOW_LABELS: Partial<Record<AppId, string>> = {
  finder: "Finder",
  safari: "Safari",
  mail: "Mail",
  notes: "Notes",
  photos: "Photos",
  calendar: "Calendar",
  music: "Music",
  terminal: "Terminal",
  devkit: "DevKit",
  store: "Store",
  linkedin: "LinkedIn",
  github: "GitHub",
  settings: "System Settings",
  trash: "Trash",
  career: "Career",
  links: "Links",
  project: "Preview",
  resume: "Preview",
  about: "Finder",
};
