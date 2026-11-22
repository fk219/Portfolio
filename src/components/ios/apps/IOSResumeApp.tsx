"use client";

import { ResumeSheet } from "@/components/apps/ResumeSheet";
import { SystemIcon } from "@/components/icons/SystemIcon";

export function IOSResumeApp() {
  return (
    <div className="ios-app-view ios-resume">
      <div className="ios-app-view__scroll">
        <header className="ios-resume__header">
          <div>
            <span className="ios-eyebrow">Curriculum vitae</span>
            <h1>Resume</h1>
          </div>
          <a
            href="/furqan-khan-resume.pdf"
            download
            className="ios-resume__download"
            aria-label="Download resume PDF"
          >
            <SystemIcon name="download" size={15} />
            PDF
          </a>
        </header>
        <div className="ios-resume__sheet">
          <ResumeSheet />
        </div>
        <a
          href="/furqan-khan-resume.pdf"
          download
          className="ios-button ios-button--primary ios-resume__download-wide"
        >
          Download resume
          <SystemIcon name="download" size={13} />
        </a>
      </div>
    </div>
  );
}
