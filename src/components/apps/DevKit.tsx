"use client";

import { useState } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import type { SystemIconName } from "@/components/icons/SystemIcon";
import { DevKitShip } from "./devkit/DevKitShip";
import { DevKitSystem } from "./devkit/DevKitSystem";
import { DevKitPlayground } from "./devkit/DevKitPlayground";

type DevKitSection = "ship" | "system" | "playground";

const sections: Array<{
  id: DevKitSection;
  label: string;
  caption: string;
  icon: SystemIconName;
}> = [
  {
    id: "ship",
    label: "Ship",
    caption: "Release checks",
    icon: "rocket",
  },
  {
    id: "system",
    label: "System",
    caption: "Runtime",
    icon: "gauge",
  },
  {
    id: "playground",
    label: "Playground",
    caption: "Run JavaScript",
    icon: "code",
  },
];

export function DevKit() {
  const [section, setSection] = useState<DevKitSection>("ship");
  const active = sections.find((item) => item.id === section) ?? sections[0];

  return (
    <div className="devkit">
      <aside className="devkit__rail">
        <div className="devkit__brand">
          <span className="devkit__mark">DK</span>
          <span>
            <strong>DevKit</strong>
            <small>portfolio.sh</small>
          </span>
        </div>

        <nav className="devkit__nav" aria-label="DevKit sections" role="tablist">
          {sections.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={section === item.id}
              className={`devkit__nav-item ${
                section === item.id ? "is-active" : ""
              }`}
              onClick={() => setSection(item.id)}
            >
              <SystemIcon name={item.icon} size={17} />
              <span>
                <strong>{item.label}</strong>
                <small>{item.caption}</small>
              </span>
              <span className="devkit__nav-glyph" aria-hidden="true">
                {section === item.id ? "↗" : ""}
              </span>
            </button>
          ))}
        </nav>

        <div className="devkit__rail-foot">
          <span className="devkit__branch">
            <SystemIcon name="branch" size={11} />
            main
          </span>
          <span className="devkit__version">v1.0.0</span>
        </div>
      </aside>

      <main
        className="devkit__main"
        role="tabpanel"
        aria-label={`${active.label} panel`}
      >
        {section === "ship" && <DevKitShip />}
        {section === "system" && <DevKitSystem />}
        {section === "playground" && <DevKitPlayground />}
      </main>
    </div>
  );
}
