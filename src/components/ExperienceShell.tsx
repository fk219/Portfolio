"use client";

import { useOS } from "@/lib/os-context";
import { Desktop } from "@/components/os/Desktop";
import { IOSExperience } from "@/components/ios/IOSExperience";

export function ExperienceShell() {
  const { hydrated, settings, settingsReady } = useOS();

  if (!hydrated || !settingsReady) {
    return (
      <div className="experience-loading" aria-hidden="true">
        <span>Portfolio OS</span>
      </div>
    );
  }

  return settings.experience === "ios" ? <IOSExperience /> : <Desktop />;
}
