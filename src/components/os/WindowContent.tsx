"use client";

import type { OSWindow } from "@/lib/types";
import { Finder } from "@/components/apps/Finder";
import { Safari } from "@/components/apps/Safari";
import { Mail } from "@/components/apps/Mail";
import { Notes } from "@/components/apps/Notes";
import { Photos } from "@/components/apps/Photos";
import { Calendar } from "@/components/apps/Calendar";
import { Music } from "@/components/apps/Music";
import { Terminal } from "@/components/apps/Terminal";
import { DevKit } from "@/components/apps/DevKit";
import { Settings } from "@/components/apps/Settings";
import { Trash } from "@/components/apps/Trash";
import { Career } from "@/components/apps/Career";
import { Links } from "@/components/apps/Links";
import { AboutMac } from "@/components/apps/AboutMac";
import { Resume } from "@/components/apps/Resume";
import { ProjectView } from "@/components/apps/ProjectView";

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
