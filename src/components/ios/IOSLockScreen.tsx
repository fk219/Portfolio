"use client";

import { useNow } from "@/lib/hooks";
import type { WallpaperId } from "@/lib/types";
import { Wallpaper } from "@/components/os/Wallpaper";
import { IOSHomeIndicator } from "./IOSChrome";

export function IOSLockScreen({
  wallpaper,
  onUnlock,
}: {
  wallpaper: WallpaperId;
  onUnlock: () => void;
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
      </div>

      <div className="ios-lock__bottom">
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
