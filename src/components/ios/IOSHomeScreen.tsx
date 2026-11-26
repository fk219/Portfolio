"use client";

import {
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { ProjectArtwork } from "@/components/apps/ProjectArtwork";
import { Wallpaper } from "@/components/os/Wallpaper";
import { featuredProjects, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { certifications } from "@/data/career";
import { useNow } from "@/lib/hooks";
import type { ResolvedTheme, WallpaperId } from "@/lib/types";
import { IOSAppIcon } from "./IOSAppIcon";
import { IOS_DOCK_APPS, IOS_HOME_APPS, type IOSAppId, type IOSAppOrigin } from "./ios-apps";

export function IOSHomeScreen({
  theme,
  wallpaper,
  onOpenApp,
  onOpenProject,
  onOpenSearch,
  onOpenControlCenter,
  onOpenNotificationCenter,
  inert = false,
}: {
  theme: ResolvedTheme;
  wallpaper: WallpaperId;
  onOpenApp: (app: IOSAppId, origin?: IOSAppOrigin) => void;
  onOpenProject: (slug: string) => void;
  onOpenSearch: () => void;
  onOpenControlCenter: () => void;
  onOpenNotificationCenter: () => void;
  inert?: boolean;
}) {
  const featured = featuredProjects[0];
  const [widgetIndex, setWidgetIndex] = useState(0);
  const widgetSwipe = useRef<number | null>(null);
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
  const gestureStart = useRef<{
    x: number;
    y: number;
    fromTop: boolean;
  } | null>(null);
  const hotspotStart = useRef<number | null>(null);

  const originFor = (
    event: ReactMouseEvent<HTMLElement>,
  ): IOSAppOrigin | undefined => {
    const screenEl = event.currentTarget.closest(
      ".ios-screen",
    ) as HTMLElement | null;
    if (!screenEl) return undefined;
    const screenRect = screenEl.getBoundingClientRect();
    const icon =
      event.currentTarget.querySelector<HTMLElement>(".ios-app-icon") ??
      event.currentTarget;
    const rect = icon.getBoundingClientRect();
    if (rect.width === 0) return undefined;
    const scale = screenEl.offsetWidth
      ? screenRect.width / screenEl.offsetWidth
      : 1;
    return {
      x: (rect.left + rect.width / 2 - screenRect.left) / (scale || 1),
      y: (rect.top + rect.height / 2 - screenRect.top) / (scale || 1),
    };
  };

  const startHomeGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    gestureStart.current = {
      x: event.clientX,
      y: event.clientY,
      fromTop: event.clientY < 48,
    };
  };

  const endHomeGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = gestureStart.current;
    gestureStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (start.fromTop && dy > 34 && Math.abs(dx) < 80) {
      const screenRect = event.currentTarget
        .closest(".ios-screen")
        ?.getBoundingClientRect();
      const midpoint = screenRect
        ? screenRect.left + screenRect.width / 2
        : start.x;
      if (start.x < midpoint) onOpenNotificationCenter();
      else onOpenControlCenter();
      return;
    }
    if (
      !start.fromTop &&
      dy > 56 &&
      Math.abs(dy) > Math.abs(dx) * 1.4 &&
      event.clientY > 140
    ) {
      onOpenSearch();
    }
  };

  const startHotspotSwipe = (event: ReactPointerEvent<HTMLButtonElement>) => {
    hotspotStart.current = event.clientY;
    event.stopPropagation();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is an enhancement.
    }
  };

  const endHotspotSwipe = (
    event: ReactPointerEvent<HTMLButtonElement>,
    action: () => void,
  ) => {
    const start = hotspotStart.current;
    hotspotStart.current = null;
    event.stopPropagation();
    if (start !== null && event.clientY - start > 16) {
      action();
    }
  };

  return (
    <div
      className="ios-home"
      data-ios-theme={theme}
      inert={inert || undefined}
      aria-hidden={inert || undefined}
      onPointerDown={startHomeGesture}
      onPointerUp={endHomeGesture}
      onPointerCancel={() => {
        gestureStart.current = null;
      }}
    >
      <div className="ios-home__wallpaper" aria-hidden="true">
        <Wallpaper id={wallpaper} />
        <span className="ios-home__wallpaper-tint" />
      </div>

      <div className="ios-home__content">
        <button
          type="button"
          className="ios-widget ios-widget--hero"
          onClick={(event) => onOpenApp("experience", originFor(event))}
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
              <strong>{projects.length}</strong>
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
              onClick={(event) => onOpenApp(app.id, originFor(event))}
              aria-label={`Open ${app.name}`}
            >
              <IOSAppIcon app={app.id} size={60} />
              <span>{app.name}</span>
            </button>
          ))}
        </div>

        <div
          className="ios-smart-stack"
          role="group"
          aria-label="Home widgets"
          onPointerDown={(event) => {
            widgetSwipe.current = event.clientX;
          }}
          onPointerUp={(event) => {
            const start = widgetSwipe.current;
            if (start !== null) {
              const delta = event.clientX - start;
              if (Math.abs(delta) > 36) {
                setWidgetIndex((index) => (index + (delta < 0 ? 1 : 2)) % 3);
              }
            }
            widgetSwipe.current = null;
          }}
        >
          {widgetIndex === 0 && (
            <div className="ios-widget ios-widget--recruiter">
              <span className="ios-recruiter__top">
                <span className="ios-feature__kicker">Recruiter view</span>
                <span className="ios-recruiter__status">
                  <i aria-hidden="true" />
                  Open to work
                </span>
              </span>
              <span className="ios-recruiter__title">
                Full-stack developer · Dubai
                <small>On-site, hybrid, or remote</small>
              </span>
              <span className="ios-recruiter__stats">
                <span>
                  <strong>{featuredProjects.length}</strong>
                  case studies
                </span>
                <span>
                  <strong>{certifications.length}</strong>
                  certifications
                </span>
                <span>
                  <strong>{projects.length}</strong>
                  apps
                </span>
              </span>
              <span className="ios-recruiter__actions">
                <button type="button" onClick={(event) => onOpenApp("resume", originFor(event))}>
                  <SystemIcon name="document" size={10} />
                  Resume
                </button>
                <button type="button" onClick={(event) => onOpenApp("contact", originFor(event))}>
                  <SystemIcon name="mail" size={10} />
                  Contact
                </button>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SystemIcon name="person" size={10} />
                  LinkedIn
                </a>
              </span>
            </div>
          )}

          {widgetIndex === 1 && featured && (
            <button
              type="button"
              className="ios-widget ios-widget--feature"
              onClick={() => onOpenProject(featured.slug)}
              aria-label={`Open the ${featured.name} case study`}
            >
              <span className="ios-feature__art" aria-hidden="true">
                <ProjectArtwork project={featured} compact />
              </span>
              <span className="ios-feature__shade" aria-hidden="true" />
              <span className="ios-feature__copy">
                <span className="ios-feature__kicker">Selected work</span>
                <strong>{featured.name}</strong>
                <small>{featured.tagline}</small>
              </span>
              <span className="ios-feature__arrow">
                <SystemIcon name="arrow-right" size={12} />
              </span>
            </button>
          )}

          {widgetIndex === 2 && (
            <div className="ios-widget ios-widget--now">
              <span className="ios-recruiter__top">
                <span className="ios-feature__kicker">Now building</span>
                <span className="ios-now__live">
                  <i aria-hidden="true" />
                  active
                </span>
              </span>
              <strong className="ios-now__title">PortfolioOS 2.0</strong>
              <small className="ios-now__blurb">
                Store, Arcade, recruiter view, and a real developer toolkit.
              </small>
              <span className="ios-recruiter__actions">
                <button type="button" onClick={(event) => onOpenApp("arcade", originFor(event))}>
                  <SystemIcon name="play" size={10} />
                  Arcade
                </button>
                <button type="button" onClick={(event) => onOpenApp("store", originFor(event))}>
                  <SystemIcon name="bag" size={10} />
                  Store
                </button>
                <button type="button" onClick={(event) => onOpenApp("devkit", originFor(event))}>
                  <SystemIcon name="code" size={10} />
                  DevKit
                </button>
              </span>
            </div>
          )}

          <div className="ios-smart-stack__dots" role="tablist" aria-label="Switch widget">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={widgetIndex === index}
                aria-label={
                  index === 0
                    ? "Recruiter view"
                    : index === 1
                      ? "Selected work"
                      : "Now building"
                }
                className={widgetIndex === index ? "is-active" : ""}
                onClick={() => setWidgetIndex(index)}
              />
            ))}
          </div>
        </div>

        <div
          className="ios-recruiter-bar"
          role="group"
          aria-label="Recruiter quick actions"
        >
          <span className="ios-recruiter-bar__label">
            <i aria-hidden="true" />
            <span>
              <strong>Open to work</strong>
              <small>Dubai · remote</small>
            </span>
          </span>
          <div className="ios-recruiter-bar__actions">
            <button type="button" onClick={(event) => onOpenApp("resume", originFor(event))}>
              Resume
            </button>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
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
            onClick={(event) => onOpenApp(app.id, originFor(event))}
            aria-label={`Open ${app.name}`}
          >
            <IOSAppIcon app={app.id} size={58} />
          </button>
        ))}
      </div>

      <span className="ios-home__indicator" aria-hidden="true" />

      <button
        type="button"
        className="ios-notification-hotspot"
        aria-label="Open Notification Center"
        onClick={onOpenNotificationCenter}
        onPointerDown={startHotspotSwipe}
        onPointerUp={(event) => endHotspotSwipe(event, onOpenNotificationCenter)}
        onPointerCancel={() => {
          hotspotStart.current = null;
        }}
      />
      <button
        type="button"
        className="ios-control-center-hotspot"
        aria-label="Open Control Center"
        onClick={onOpenControlCenter}
        onPointerDown={startHotspotSwipe}
        onPointerUp={(event) => endHotspotSwipe(event, onOpenControlCenter)}
        onPointerCancel={() => {
          hotspotStart.current = null;
        }}
      />
    </div>
  );
}
