export type IOSAppId =
  | "projects"
  | "safari"
  | "photos"
  | "resume"
  | "profile"
  | "experience"
  | "links"
  | "notes"
  | "calculator"
  | "music"
  | "clock"
  | "contact"
  | "settings";

export interface IOSAppDefinition {
  id: IOSAppId;
  name: string;
}

export const IOS_DOCK_APPS: IOSAppDefinition[] = [
  { id: "projects", name: "Projects" },
  { id: "safari", name: "Safari" },
  { id: "contact", name: "Contact" },
  { id: "settings", name: "Settings" },
];

export const IOS_HOME_APPS: IOSAppDefinition[] = [
  { id: "photos", name: "Photos" },
  { id: "resume", name: "Resume" },
  { id: "profile", name: "Profile" },
  { id: "experience", name: "Experience" },
  { id: "links", name: "Links" },
  { id: "notes", name: "Notes" },
  { id: "music", name: "Music" },
  { id: "clock", name: "Clock" },
];
