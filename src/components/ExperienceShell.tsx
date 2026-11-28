"use client";

import { useEffect } from "react";
import { useOS } from "@/lib/os-context";
import { Desktop } from "@/components/os/Desktop";
import { IOSExperience } from "@/components/ios/IOSExperience";

export function ExperienceShell() {
  const { hydrated, settings, settingsReady, isCompact, experienceChoice } =
    useOS();

  useEffect(() => {
    const updateVisibility = () => {
      document.documentElement.dataset.pageHidden = document.hidden
        ? "true"
        : "false";
    };
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

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
