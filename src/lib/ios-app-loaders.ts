import type { IOSAppId } from "@/components/ios/ios-apps";

export const iosAppLoaders = {
  projects: () => import("@/components/ios/apps/IOSProjectsApp"),
  safari: () => import("@/components/ios/apps/IOSSafariApp"),
  photos: () => import("@/components/ios/apps/IOSPhotosApp"),
  resume: () => import("@/components/ios/apps/IOSResumeApp"),
  profile: () => import("@/components/ios/apps/IOSProfileApp"),
  experience: () => import("@/components/ios/apps/IOSCareerApp"),
  links: () => import("@/components/ios/apps/IOSLinksApp"),
  notes: () => import("@/components/ios/apps/IOSNotesApp"),
  calculator: () => import("@/components/ios/apps/IOSCalculatorApp"),
  music: () => import("@/components/ios/apps/IOSMusicApp"),
  devkit: () => import("@/components/ios/apps/IOSDevKitApp"),
  store: () => import("@/components/ios/apps/IOSStoreApp"),
  arcade: () => import("@/components/ios/apps/IOSArcadeApp"),
  clock: () => import("@/components/ios/apps/IOSClockApp"),
  contact: () => import("@/components/ios/apps/IOSContactApp"),
  settings: () => import("@/components/ios/apps/IOSSettingsApp"),
} satisfies Record<IOSAppId, () => Promise<unknown>>;

export function prefetchIOSApp(appId: IOSAppId) {
  const load = iosAppLoaders[appId];
  if (!load) return;
  void load().catch(() => {
    // Prefetch failures are harmless; opening the app retries the import.
  });
}
