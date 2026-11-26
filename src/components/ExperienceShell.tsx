"use client";

import { useOS } from "@/lib/os-context";
import { Desktop } from "@/components/os/Desktop";
import { IOSExperience } from "@/components/ios/IOSExperience";

export function ExperienceShell() {
  const { hydrated, settings, settingsReady, isCompact, experienceChoice } =
    useOS();

  if (!hydrated || !settingsReady) {
    return (
      <div className="experience-loading" aria-hidden="true">
        <span>PortfolioOS</span>
      </div>
    );
  }

  // A phone should open in the iPhone experience even on a first visit.
  // Choosing either experience explicitly (or ?experience=mac) wins.
  const showIOS = experienceChoice
    ? experienceChoice === "ios"
    : settings.experience === "ios" || isCompact;

  return showIOS ? <IOSExperience /> : <Desktop />;
}
