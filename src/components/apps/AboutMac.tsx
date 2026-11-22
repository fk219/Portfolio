"use client";

import { AppIcon } from "@/components/icons/AppIcon";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { profile } from "@/data/profile";
import { useOS } from "@/lib/os-context";

export function AboutMac() {
  const { openSettings, closeActiveWindow } = useOS();

  return (
    <div className="about-mac">
      <div className="about-mac__device-wrap" aria-hidden="true">
        <div className="about-mac__laptop">
          <div className="about-mac__screen">
            <span className="about-mac__screen-glow" />
            <span className="about-mac__screen-ridge" />
            <span className="about-mac__menu-line" />
            <span className="about-mac__mini-dock">
              <AppIcon app="finder" size={12} />
              <AppIcon app="safari" size={12} />
              <AppIcon app="notes" size={12} />
              <AppIcon app="terminal" size={12} />
            </span>
          </div>
          <div className="about-mac__base">
            <span />
          </div>
        </div>
      </div>

      <div className="about-mac__identity">
        <h2>Portfolio OS</h2>
        <p>Version 1.0</p>
      </div>

      <div className="about-mac__specs">
        <div>
          <span>Owner</span>
          <strong>{profile.name}</strong>
        </div>
        <div>
          <span>Built with</span>
          <strong>Next.js + React</strong>
        </div>
        <div>
          <span>Interface</span>
          <strong>TypeScript + CSS</strong>
        </div>
      </div>

      <div className="about-mac__actions">
        <button
          type="button"
          className="os-secondary-button"
          onClick={() => openSettings("about")}
        >
          More info…
        </button>
        <button
          type="button"
          className="os-primary-button"
          onClick={closeActiveWindow}
        >
          Done
        </button>
      </div>

      <p className="about-mac__disclaimer">
        <SystemIcon name="info" size={11} />
        Independent portfolio experience. Not affiliated with Apple Inc.
      </p>
    </div>
  );
}
