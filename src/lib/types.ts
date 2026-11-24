export type AppId =
  | "finder"
  | "safari"
  | "mail"
  | "notes"
  | "photos"
  | "calendar"
  | "music"
  | "terminal"
  | "devkit"
  | "store"
  | "linkedin"
  | "github"
  | "settings"
  | "trash"
  | "career"
  | "links"
  | "project"
  | "resume"
  | "about";

export type DockAppId = Exclude<AppId, "project" | "resume" | "about">;

export type OverlayId =
  | "launchpad"
  | "spotlight"
  | "control-center"
  | "notification-center"
  | "help";

export type Phase =
  | "boot"
  | "login"
  | "locked"
  | "sleep"
  | "off"
  | "desktop";

export type WallpaperId = "hunza" | "sonoma" | "lagoon" | "graphite" | "blueprint";

export type ThemeMode = "light" | "dark" | "auto";

export type ExperienceMode = "mac" | "ios";

export type ResolvedTheme = "light" | "dark";

export interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowPayload {
  projectSlug?: string;
  section?: string;
}

export interface OSWindow {
  id: string;
  appId: AppId;
  title: string;
  bounds: WindowBounds;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  savedBounds?: WindowBounds;
  payload?: WindowPayload;
}

export interface OSSettings {
  experience: ExperienceMode;
  appearance: ThemeMode;
  wallpaper: WallpaperId;
  dockSize: number;
  dockMagnification: boolean;
  brightness: number;
}

export interface WallpaperOption {
  id: WallpaperId;
  name: string;
  description: string;
}

export interface AppDefinition {
  name: string;
  title: string;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
}

export interface ProfileLink {
  label: string;
  href: string;
  kind: "email" | "external";
}
