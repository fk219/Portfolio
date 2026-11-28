"use client";

import dynamic from "next/dynamic";
import type { OSWindow } from "@/lib/types";
import { appLoaders } from "@/lib/app-loaders";

function AppLoading({ label }: { label: string }) {
  return (
    <div className="app-loading" role="status">
      <span className="app-loading__mark" aria-hidden="true" />
      <span>Opening {label}</span>
      <span className="app-loading__bar" aria-hidden="true" />
    </div>
  );
}

const Finder = dynamic(
  () => appLoaders.finder().then((mod) => mod.Finder),
  { ssr: false, loading: () => <AppLoading label="Finder" /> },
);
const Safari = dynamic(
  () => appLoaders.safari().then((mod) => mod.Safari),
  { ssr: false, loading: () => <AppLoading label="Safari" /> },
);
const Mail = dynamic(
  () => appLoaders.mail().then((mod) => mod.Mail),
  { ssr: false, loading: () => <AppLoading label="Mail" /> },
);
const Notes = dynamic(
  () => appLoaders.notes().then((mod) => mod.Notes),
  { ssr: false, loading: () => <AppLoading label="Notes" /> },
);
const Photos = dynamic(
  () => appLoaders.photos().then((mod) => mod.Photos),
  { ssr: false, loading: () => <AppLoading label="Photos" /> },
);
const Calendar = dynamic(
  () => appLoaders.calendar().then((mod) => mod.Calendar),
  { ssr: false, loading: () => <AppLoading label="Calendar" /> },
);
const Music = dynamic(
  () => appLoaders.music().then((mod) => mod.Music),
  { ssr: false, loading: () => <AppLoading label="Music" /> },
);
const Terminal = dynamic(
  () => appLoaders.terminal().then((mod) => mod.Terminal),
  { ssr: false, loading: () => <AppLoading label="Terminal" /> },
);
const DevKit = dynamic(
  () => appLoaders.devkit().then((mod) => mod.DevKit),
  { ssr: false, loading: () => <AppLoading label="DevKit" /> },
);
const Store = dynamic(
  () => appLoaders.store().then((mod) => mod.Store),
  { ssr: false, loading: () => <AppLoading label="Store" /> },
);
const LinkedIn = dynamic(
  () => appLoaders.linkedin().then((mod) => mod.LinkedIn),
  { ssr: false, loading: () => <AppLoading label="LinkedIn" /> },
);
const GitHub = dynamic(
  () => appLoaders.github().then((mod) => mod.GitHub),
  { ssr: false, loading: () => <AppLoading label="GitHub" /> },
);
const Settings = dynamic(
  () => appLoaders.settings().then((mod) => mod.Settings),
  { ssr: false, loading: () => <AppLoading label="System Settings" /> },
);
const Trash = dynamic(
  () => appLoaders.trash().then((mod) => mod.Trash),
  { ssr: false, loading: () => <AppLoading label="Trash" /> },
);
const Career = dynamic(
  () => appLoaders.career().then((mod) => mod.Career),
  { ssr: false, loading: () => <AppLoading label="Career" /> },
);
const Links = dynamic(
  () => appLoaders.links().then((mod) => mod.Links),
  { ssr: false, loading: () => <AppLoading label="Links" /> },
);
const AboutMac = dynamic(
  () => appLoaders.about().then((mod) => mod.AboutMac),
  { ssr: false, loading: () => <AppLoading label="About This Mac" /> },
);
const Resume = dynamic(
  () => appLoaders.resume().then((mod) => mod.Resume),
  { ssr: false, loading: () => <AppLoading label="Resume" /> },
);
const ProjectView = dynamic(
  () => appLoaders.project().then((mod) => mod.ProjectView),
  { ssr: false, loading: () => <AppLoading label="Project" /> },
);

export function WindowContent({ window }: { window: OSWindow }) {
  switch (window.appId) {
    case "finder":
      return <Finder section={window.payload?.section} />;
    case "safari":
      return <Safari section={window.payload?.section} />;
    case "mail":
      return <Mail />;
    case "notes":
      return <Notes />;
    case "photos":
      return <Photos />;
    case "calendar":
      return <Calendar />;
    case "music":
      return <Music />;
    case "terminal":
      return <Terminal windowId={window.id} />;
    case "devkit":
      return <DevKit />;
    case "store":
      return <Store />;
    case "linkedin":
      return <LinkedIn />;
    case "github":
      return <GitHub />;
    case "settings":
      return <Settings section={window.payload?.section} />;
    case "trash":
      return <Trash />;
    case "career":
      return <Career />;
    case "links":
      return <Links />;
    case "about":
      return <AboutMac />;
    case "resume":
      return <Resume />;
    case "project":
      return <ProjectView slug={window.payload?.projectSlug} />;
    default:
      return null;
  }
}
