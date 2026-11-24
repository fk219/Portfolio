"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { useNow } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import { useDubaiWeather, WEATHER_ICON_NAMES } from "@/lib/weather";
import { featuredProjects, projects } from "@/data/projects";
import { certifications } from "@/data/career";

export function DesktopWidgets() {
  const { openApp } = useOS();
  const now = useNow(30000);
  const weather = useDubaiWeather();
  const current = now ?? new Date(2026, 10, 22, 9, 41);
  const timeParts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).formatToParts(current);
  const time = timeParts
    .filter((part) => part.type !== "dayPeriod")
    .map((part) => part.value)
    .join("")
    .trim();
  const dayPeriod =
    timeParts.find((part) => part.type === "dayPeriod")?.value ?? "";
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(current);
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(current);

  return (
    <aside className="desktop-widgets" aria-label="Desktop widgets">
      <button
        type="button"
        className="desktop-widget desktop-widget--clock"
        onClick={() => openApp("calendar")}
        aria-label="Open Calendar"
      >
        <span className="desktop-widget__topline">
          <SystemIcon name="clock" size={12} />
          <span>Portfolio</span>
          {weather && (
            <span
              className="desktop-widget__weather"
              title={`Live weather in ${weather.city} from Open-Meteo`}
            >
              <SystemIcon name={WEATHER_ICON_NAMES[weather.icon]} size={11} />
              {weather.temperature}&deg;
            </span>
          )}
        </span>
        <span className="desktop-widget__time">
          {time}
          <small>{dayPeriod}</small>
        </span>
        <span className="desktop-widget__date">
          {weekday} · {date}
        </span>
        <span className="desktop-widget__accent" aria-hidden="true" />
      </button>

      <button
        type="button"
        className="desktop-widget desktop-widget--project"
        onClick={() => openApp("finder", { section: "projects" })}
        aria-label="Open all projects in Finder"
      >
        <span className="desktop-widget__topline">
          <span className="desktop-widget__dot" aria-hidden="true" />
          <span>Selected work</span>
        </span>
        <span className="desktop-widget__count">{projects.length}</span>
        <span className="desktop-widget__caption">
          projects
          <small>{featuredProjects.length} case studies</small>
        </span>
        <span className="desktop-widget__arrow">
          <SystemIcon name="arrow-right" size={11} />
        </span>
      </button>

      <button
        type="button"
        className="desktop-widget desktop-widget--recruiter"
        onClick={() => openApp("linkedin")}
        aria-label="Open the recruiter profile on LinkedIn"
      >
        <span className="desktop-widget__topline">
          <span className="desktop-widget__dot" aria-hidden="true" />
          <span>Recruiter</span>
        </span>
        <span className="desktop-widget__recruiter">
          Open to work
          <small>Dubai · remote</small>
        </span>
        <span className="desktop-widget__caption">
          {featuredProjects.length} case studies
          <small>{certifications.length} certifications</small>
        </span>
        <span className="desktop-widget__arrow">
          <SystemIcon name="arrow-right" size={11} />
        </span>
      </button>
    </aside>
  );
}
