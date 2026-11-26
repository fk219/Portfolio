"use client";

import { useRef, useState, type CSSProperties } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { useEscape, useFocusTrap, useNow } from "@/lib/hooks";
import { useMediaPlayer } from "@/lib/media-player";
import { useDubaiWeather, WEATHER_ICON_NAMES } from "@/lib/weather";
import { projects } from "@/data/projects";
import type { IOSAppId } from "./ios-apps";

export function IOSNotificationCenter({
  onClose,
  onOpenApp,
}: {
  onClose: () => void;
  onOpenApp: (app: IOSAppId) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, true);
  useEscape(true, onClose);
  const now = useNow(15000);
  const weather = useDubaiWeather();
  const { currentTrack, isPlaying } = useMediaPlayer();
  const [cleared, setCleared] = useState(false);
  const handleSwipe = useRef<number | null>(null);
  const current = now ?? new Date(2026, 10, 25, 9, 41);
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(current);
  const monthDay = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(current);

  const open = (app: IOSAppId) => {
    onClose();
    onOpenApp(app);
  };

  return (
    <div
      className="ios-notification-center"
      role="dialog"
      aria-modal="true"
      aria-label="Notification Center"
    >
      <button
        type="button"
        className="ios-notification-center__backdrop"
        onClick={onClose}
        aria-label="Close Notification Center"
      />
      <div className="ios-nc__panel" ref={panelRef}>
        <header className="ios-nc__header">
          <div className="ios-nc__clock">
            <span className="ios-nc__eyebrow">Notification Center</span>
            <strong className="ios-nc__date">
              {weekday}, {monthDay}
            </strong>
            {weather && (
              <span className="ios-nc__weather">
                <SystemIcon name={WEATHER_ICON_NAMES[weather.icon]} size={12} />
                {weather.temperature}&deg; {weather.city} &middot; {weather.condition}
              </span>
            )}
          </div>
          <button
            type="button"
            className="ios-nc__close"
            onClick={onClose}
            aria-label="Close Notification Center"
          >
            <SystemIcon name="close" size={13} />
          </button>
        </header>

        <div className="ios-nc__summary">
          <span>
            Notifications
            {!cleared && <b>4</b>}
          </span>
          <button
            type="button"
            onClick={() => setCleared(true)}
            disabled={cleared}
          >
            Clear
          </button>
        </div>

        <div className="ios-nc__scroll">
          {cleared ? (
            <div className="ios-nc__empty">
              <span>
                <SystemIcon name="check" size={18} />
              </span>
              <strong>No New Notifications</strong>
              <p>You&apos;re all caught up.</p>
            </div>
          ) : (
            <div className="ios-nc__list">
              <button
                type="button"
                className="ios-notification ios-nc__card"
                onClick={() => open("profile")}
              >
                <span className="ios-nc__icon ios-nc__icon--portfolio">FK</span>
                <span className="ios-notification__copy">
                  <span>
                    <strong>PortfolioOS</strong>
                    <small>now</small>
                  </span>
                  <p>
                    Welcome to Furqan&apos;s iPhone. {projects.length} projects,
                    one pocket.
                  </p>
                </span>
              </button>

              <button
                type="button"
                className="ios-notification ios-nc__card"
                onClick={() => open("resume")}
              >
                <span className="ios-nc__icon ios-nc__icon--work">
                  <SystemIcon name="person" size={17} />
                </span>
                <span className="ios-notification__copy">
                  <span>
                    <strong>Recruiter view</strong>
                    <small>9m</small>
                  </span>
                  <p>
                    Open to work in Dubai or remote. Resume and case studies are
                    ready.
                  </p>
                </span>
              </button>

              <button
                type="button"
                className="ios-notification ios-nc__card"
                onClick={() => open("music")}
                style={
                  {
                    "--nc-cover-from": currentTrack.cover.from,
                    "--nc-cover-to": currentTrack.cover.to,
                  } as CSSProperties
                }
              >
                <span className="ios-nc__icon ios-nc__icon--music" />
                <span className="ios-notification__copy">
                  <span>
                    <strong>{isPlaying ? "Now playing" : "Music"}</strong>
                    <small>{isPlaying ? "now" : "1h"}</small>
                  </span>
                  <p>
                    {currentTrack.title} &middot; {currentTrack.artist}
                    <br />
                    Original audio sessions for PortfolioOS.
                  </p>
                </span>
              </button>

              <button
                type="button"
                className="ios-notification ios-nc__card"
                onClick={() => open("arcade")}
              >
                <span className="ios-nc__icon ios-nc__icon--arcade">
                  <SystemIcon name="play" size={16} />
                </span>
                <span className="ios-notification__copy">
                  <span>
                    <strong>Arcade</strong>
                    <small>1h</small>
                  </span>
                  <p>
                    Snake + Bug Hunt are ready. Local bests stay on this device.
                  </p>
                </span>
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="ios-nc__handle"
          onClick={onClose}
          onPointerDown={(event) => {
            handleSwipe.current = event.clientY;
            try {
              event.currentTarget.setPointerCapture(event.pointerId);
            } catch {
              // Pointer capture is an enhancement.
            }
          }}
          onPointerUp={(event) => {
            const start = handleSwipe.current;
            handleSwipe.current = null;
            if (start !== null && start - event.clientY > 16) {
              onClose();
            }
          }}
          onPointerCancel={() => {
            handleSwipe.current = null;
          }}
          aria-label="Close Notification Center"
        >
          <span aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
