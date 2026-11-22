"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { Wallpaper } from "@/components/os/Wallpaper";
import { useNow } from "@/lib/hooks";
import type { ResolvedTheme, WallpaperId } from "@/lib/types";
import { IOSAppIcon } from "./IOSAppIcon";
import { IOS_DOCK_APPS, IOS_HOME_APPS, type IOSAppId } from "./ios-apps";

export function IOSHomeScreen({
  theme,
  wallpaper,
  onOpenApp,
  onOpenSearch,
  onOpenControlCenter,
}: {
  theme: ResolvedTheme;
  wallpaper: WallpaperId;
  onOpenApp: (app: IOSAppId) => void;
  onOpenSearch: () => void;
  onOpenControlCenter: () => void;
}) {
  const now = useNow(10000);
  const current = now ?? new Date(2026, 10, 22, 9, 41);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(current);
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(current);
  const monthDay = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(current);
  const gestureStart = useRef<number | null>(null);

  const startControlGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.clientY < 48) gestureStart.current = event.clientY;
  };

  const endControlGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (gestureStart.current !== null && event.clientY - gestureStart.current > 34) {
      onOpenControlCenter();
    }
    gestureStart.current = null;
  };

  return (
    <div
      className="ios-home"
      data-ios-theme={theme}
      onPointerDown={startControlGesture}
      onPointerUp={endControlGesture}
    >
      <div className="ios-home__wallpaper" aria-hidden="true">
        <Wallpaper id={wallpaper} />
        <span className="ios-home__wallpaper-tint" />
      </div>

      <div className="ios-home__content">
        <button
          type="button"
          className="ios-widget ios-widget--hero"
          onClick={() => onOpenApp("experience")}
          aria-label="Open experience. Furqan Khan, full-stack developer."
        >
          <span className="ios-widget__topline">
            <span className="ios-widget__brand">PORTFOLIO / OS</span>
            <span className="ios-widget__status">
              <i aria-hidden="true" />
              Open to work
            </span>
          </span>
          <span className="ios-widget__clock">{time}</span>
          <span className="ios-widget__date">
            {weekday}, {monthDay}
          </span>
          <span className="ios-widget__footer">
            <span>
              Furqan Khan
              <small>Founder, FKodeLabs · MCA</small>
            </span>
            <span className="ios-widget__count">
              <strong>7</strong>
              projects
            </span>
          </span>
          <svg
            className="ios-widget__pattern"
            viewBox="0 0 360 180"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path
              d="M-10 138C58 86 95 126 142 94S228 38 282 72s72 24 94 8"
              fill="none"
              stroke="currentColor"
              strokeOpacity=".12"
              strokeWidth="1.2"
            />
            <path
              d="M-20 162C44 118 88 148 142 118s92-56 148-28 72 42 102 22"
              fill="none"
              stroke="currentColor"
              strokeOpacity=".07"
              strokeWidth="1"
            />
            <circle cx="142" cy="94" r="3" fill="currentColor" opacity=".5" />
            <circle cx="282" cy="72" r="2" fill="currentColor" opacity=".35" />
          </svg>
        </button>

        <div className="ios-app-grid">
          {IOS_HOME_APPS.map((app, index) => (
            <button
              key={app.id}
              type="button"
              className="ios-home-app"
              style={{ "--app-index": index } as React.CSSProperties}
              onClick={() => onOpenApp(app.id)}
              aria-label={`Open ${app.name}`}
            >
              <IOSAppIcon app={app.id} size={60} />
              <span>{app.name}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="ios-search-pill"
          onClick={onOpenSearch}
          aria-label="Search apps and projects"
        >
          <SystemIcon name="search" size={13} />
          <span>Search</span>
        </button>

        <span className="ios-page-dots" aria-hidden="true">
          <i className="is-active" />
        </span>
      </div>

      <div className="ios-dock" role="group" aria-label="Dock">
        {IOS_DOCK_APPS.map((app) => (
          <button
            key={app.id}
            type="button"
            className="ios-dock__app"
            onClick={() => onOpenApp(app.id)}
            aria-label={`Open ${app.name}`}
          >
            <IOSAppIcon app={app.id} size={58} />
          </button>
        ))}
      </div>

      <span className="ios-home__indicator" aria-hidden="true" />

      <button
        type="button"
        className="ios-control-center-hotspot"
        aria-label="Open Control Center"
        onClick={onOpenControlCenter}
      />
    </div>
  );
}
