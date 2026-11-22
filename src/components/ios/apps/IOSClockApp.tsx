"use client";

import { useNow } from "@/lib/hooks";

const zones = [
  { label: "Karachi", zone: "Asia/Karachi" },
  { label: "London", zone: "Europe/London" },
  { label: "New York", zone: "America/New_York" },
  { label: "Tokyo", zone: "Asia/Tokyo" },
];

export function IOSClockApp() {
  const now = useNow(1000);
  const current = now ?? new Date(2026, 10, 22, 9, 41);

  return (
    <div className="ios-app-view ios-clock">
      <div className="ios-app-view__scroll">
        <header className="ios-large-header">
          <span className="ios-eyebrow">World Clock</span>
          <h1>Clock</h1>
          <p>Time, wherever the work happens.</p>
        </header>

        <section className="ios-clock-hero">
          <span className="ios-clock-hero__time">
            {new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
            }).format(current)}
          </span>
          <span className="ios-clock-hero__date">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            }).format(current)}
          </span>
          <span className="ios-clock-hero__zone">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </span>
        </section>

        <section className="ios-group ios-group--list">
          <h2>World Clock</h2>
          {zones.map((zone) => (
            <div className="ios-world-clock" key={zone.zone}>
              <span>
                <strong>{zone.label}</strong>
                <small>{zone.zone.split("/")[0]}</small>
              </span>
              <strong>
                {new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  timeZone: zone.zone,
                }).format(current)}
              </strong>
            </div>
          ))}
        </section>

        <section className="ios-group">
          <h2>Focus</h2>
          <p className="ios-body-copy">
            One clock, one portfolio, one next task. The desktop and iPhone
            experiences share the same content and settings.
          </p>
        </section>
      </div>
    </div>
  );
}
