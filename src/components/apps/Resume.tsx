"use client";

import { useRef, useState } from "react";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { copyText } from "@/lib/clipboard";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { ResumeSheet } from "./ResumeSheet";

export function Resume() {
  const [copyStatus, setCopyStatus] = useState("");
  const timerRef = useRef<number | null>(null);

  const resumeText = [
    profile.name,
    profile.role,
    profile.email,
    "https://github.com/fk219",
    "",
    profile.education,
    "",
    profile.summary,
    "",
    "Selected work",
    ...featuredProjects.map(
      (project) =>
        `${project.name} - ${project.category}: ${project.tagline} (${project.stack.join(", ")})`,
    ),
    "",
    "Toolkit",
    ...Object.entries(profile.skills).map(
      ([group, skills]) => `${group}: ${skills.join(", ")}`,
    ),
    "",
    "The most current resume and academic details are available on request.",
  ].join("\n");

  const handleCopy = async () => {
    const copied = await copyText(resumeText);
    setCopyStatus(copied ? "Copied" : "Copy unavailable");
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopyStatus(""), 2200);
  };

  return (
    <div className="resume">
      <div className="resume__toolbar">
        <div className="resume__toolbar-label">
          <SystemIcon name="document" size={13} />
          <span>Resume</span>
          <span className="resume__toolbar-meta">Printable preview</span>
        </div>
        <div className="resume__toolbar-actions">
          <span className="resume__copy-status" aria-live="polite">
            {copyStatus}
          </span>
          <button
            type="button"
            className="os-secondary-button"
            onClick={handleCopy}
          >
            <SystemIcon name="copy" size={12} />
            Copy text
          </button>
          <button
            type="button"
            className="os-primary-button"
            onClick={() => window.print()}
          >
            <SystemIcon name="download" size={12} />
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="resume__viewport">
        <ResumeSheet />
      </div>
    </div>
  );
}
