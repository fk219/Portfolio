"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { formatLongDate, useNow } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import { SystemIcon } from "@/components/icons/SystemIcon";

function useClockParts() {
  const now = useNow(10000);
  return {
    time: now
      ? new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }).format(now)
      : "",
    date: now ? formatLongDate(now) : "",
  };
}

export function BootScreen() {
  return (
    <div className="system-screen boot-screen" role="status" aria-live="polite">
      <div className="boot-screen__brand">
        <SystemIcon name="apple" size={68} className="boot-screen__apple" />
        <span className="sr-only">Starting Portfolio OS</span>
      </div>
      <div className="boot-screen__progress" aria-hidden="true">
        <span className="boot-screen__progress-fill" />
      </div>
    </div>
  );
}

export function LoginScreen({ locked = false }: { locked?: boolean }) {
  const { enterDesktop, phase } = useOS();
  const clock = useClockParts();
  const isLocked = locked || phase === "locked";
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    setEntering(false);
  }, [phase]);

  const handleEnter = () => {
    setEntering(true);
    window.setTimeout(() => enterDesktop(), 220);
  };

  return (
    <div
      className="system-screen login-screen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-user-name"
    >
      <div className="login-screen__wallpaper-wash" aria-hidden="true" />
      <div className="login-screen__clock" aria-live="polite">
        <span className="login-screen__time">{clock.time}</span>
        <span className="login-screen__date">{clock.date}</span>
      </div>

      <div className="login-card">
        <div className="login-avatar" aria-hidden="true">
          <span>{profile.initials}</span>
          <div className="login-avatar__shine" />
        </div>
        <div className="login-card__identity">
          <h1 id="login-user-name">{profile.name}</h1>
          <p>
            {isLocked
              ? "Portfolio OS is locked"
              : `${profile.role} · ${profile.education}`}
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleEnter();
          }}
        >
          <button
            type="submit"
            className={`login-enter ${entering ? "is-entering" : ""}`}
            autoFocus
          >
            <span>{isLocked ? "Unlock desktop" : "Enter desktop"}</span>
            <span className="login-enter__arrow" aria-hidden="true">
              <SystemIcon name="arrow-right" size={15} />
            </span>
          </button>
          <p className="login-hint">
            {isLocked ? (
              <>
                <SystemIcon name="lock" size={11} /> Your workspace is still open
              </>
            ) : (
              "A macOS-inspired portfolio by Furqan Khan"
            )}
          </p>
        </form>
      </div>

      <div className="login-screen__footer">
        <span>Portfolio OS 1.0</span>
        <span className="login-screen__footer-dot" aria-hidden="true" />
        <span>Built with Next.js</span>
      </div>
    </div>
  );
}

export function SleepScreen() {
  const { wakeFromSleep } = useOS();

  return (
    <button
      type="button"
      className="system-screen sleep-screen"
      onClick={wakeFromSleep}
      aria-label="Wake Portfolio OS"
    >
      <span className="sleep-screen__mark" aria-hidden="true">
        <SystemIcon name="moon" size={18} />
      </span>
      <span className="sleep-screen__hint">Click anywhere to wake</span>
    </button>
  );
}

export function OffScreen() {
  const { powerOn } = useOS();

  return (
    <button
      type="button"
      className="system-screen off-screen"
      onClick={powerOn}
      aria-label="Power on Portfolio OS"
    >
      <span className="off-screen__power" aria-hidden="true">
        <SystemIcon name="power" size={24} />
      </span>
      <span className="off-screen__text">Click to start Portfolio OS</span>
    </button>
  );
}
