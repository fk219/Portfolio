import type { AppId } from "./types";

/**
 * One loader per app so the Dock can warm a chunk on hover and the window
 * content can mount only the code the visitor actually opens.
 */
export const appLoaders = {
  finder: () => import("@/components/apps/Finder"),
  safari: () => import("@/components/apps/Safari"),
  mail: () => import("@/components/apps/Mail"),
  notes: () => import("@/components/apps/Notes"),
  photos: () => import("@/components/apps/Photos"),
  calendar: () => import("@/components/apps/Calendar"),
  music: () => import("@/components/apps/Music"),
  terminal: () => import("@/components/apps/Terminal"),
  devkit: () => import("@/components/apps/DevKit"),
  store: () => import("@/components/apps/Store"),
  linkedin: () => import("@/components/apps/LinkedIn"),
  github: () => import("@/components/apps/GitHub"),
  settings: () => import("@/components/apps/Settings"),
  trash: () => import("@/components/apps/Trash"),
  career: () => import("@/components/apps/Career"),
  links: () => import("@/components/apps/Links"),
  about: () => import("@/components/apps/AboutMac"),
  resume: () => import("@/components/apps/Resume"),
  project: () => import("@/components/apps/ProjectView"),
} satisfies Record<AppId, () => Promise<unknown>>;

export function prefetchApp(appId: AppId) {
  const load = appLoaders[appId];
  if (!load) return;
  void load().catch(() => {
    // A failed prefetch is harmless; the real open will retry the import.
  });
}
