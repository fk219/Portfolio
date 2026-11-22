"use client";

import type { CSSProperties } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { useNow } from "@/lib/hooks";
import { useMediaPlayer } from "@/lib/media-player";
import {
  useDubaiWeather,
  WEATHER_ICON_NAMES,
} from "@/lib/weather";
import type { WallpaperId } from "@/lib/types";
import { Wallpaper } from "@/components/os/Wallpaper";
import { IOSHomeIndicator } from "./IOSChrome";

export function IOSLockScreen({
  wallpaper,
  onUnlock,
  onOpenMusic,
}: {
  wallpaper: WallpaperId;
  onUnlock: () => void;
  onOpenMusic: () => void;
}) {
  const now = useNow(15000);
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
  const weather = useDubaiWeather();
  const { currentTrack, isPlaying, toggle } = useMediaPlayer();

  return (
    <div className="ios-lock">
      <div className="ios-lock__wallpaper" aria-hidden="true">
        <Wallpaper id={wallpaper} />
        <span className="ios-lock__wash" />
      </div>

      <div className="ios-lock__content">
        <span className="ios-lock__date">
          {weekday}, {monthDay}
        </span>
        <span className="ios-lock__time">{time}</span>

        <div className="ios-lock__widgets">
          {weather && (
            <span
              className="ios-lock-widget ios-lock-widget--weather"
              title="Live weather in Dubai from Open-Meteo"
            >
              <SystemIcon name={WEATHER_ICON_NAMES[weather.icon]} size={17} />
              <span className="ios-lock-widget__copy">
                <strong>{weather.temperature}&deg;</strong>
                <small>
                  {weather.city} &middot; {weather.condition}
                </small>
              </span>
            </span>
          )}
          <button
            type="button"
            className="ios-lock-widget ios-lock-widget--work"
            onClick={onUnlock}
          >
            <span className="ios-lock-widget__pulse" aria-hidden="true" />
            <span className="ios-lock-widget__copy">
              <strong>Open to work</strong>
              <small>Dubai &middot; remote</small>
            </span>
          </button>
        </div>
      </div>

      <div className="ios-lock__bottom">
        {isPlaying && (
          <div
            className="ios-lock-player"
            style={
              {
                "--lock-cover-from": currentTrack.cover.from,
                "--lock-cover-to": currentTrack.cover.to,
              } as CSSProperties
            }
          >
            <button
              type="button"
              className="ios-lock-player__main"
              onClick={onOpenMusic}
              aria-label={`Unlock and open Music. ${currentTrack.title} by ${currentTrack.artist}.`}
            >
              <span className="ios-lock-player__art" aria-hidden="true" />
              <span className="ios-lock-player__copy">
                <strong>{currentTrack.title}</strong>
                <small>{currentTrack.artist}</small>
              </span>
            </button>
            <button
              type="button"
              className="ios-lock-player__toggle"
              onClick={toggle}
              aria-label={`Pause ${currentTrack.title}`}
            >
              <SystemIcon name="pause" size={14} />
            </button>
          </div>
        )}

        <button
          type="button"
          className="ios-notification"
          onClick={onUnlock}
          aria-label="Unlock and open the portfolio"
        >
          <span className="ios-notification__icon">FK</span>
          <span className="ios-notification__copy">
            <span>
              <strong>Portfolio OS</strong>
              <small>now</small>
            </span>
            <p>Welcome to Furqan&apos;s iPhone. Seven projects, one pocket.</p>
          </span>
        </button>
        <p className="ios-lock__hint">Swipe up to open</p>
        <IOSHomeIndicator onClose={onUnlock} tone="light" label="Unlock" />
      </div>
    </div>
  );
}
