"use client";

import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";

export function IOSHomeIndicator({
  onClose,
  tone = "dark",
  label = "Go to Home Screen",
}: {
  onClose: () => void;
  tone?: "light" | "dark";
  label?: string;
}) {
  const startY = useRef<number | null>(null);

  const start = (event: ReactPointerEvent<HTMLButtonElement>) => {
    startY.current = event.clientY;
  };

  const end = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (startY.current !== null && startY.current - event.clientY > 24) {
      onClose();
    }
    startY.current = null;
  };

  return (
    <button
      type="button"
      className={`ios-home-indicator ios-home-indicator--${tone}`}
      aria-label={label}
      onPointerDown={start}
      onPointerUp={end}
      onPointerCancel={() => {
        startY.current = null;
      }}
      onClick={onClose}
    >
      <span aria-hidden="true" />
    </button>
  );
}

export function IOSAppHeader({
  eyebrow,
  title,
  subtitle,
  onBack,
  backLabel = "Back",
  trailing,
  size = "large",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
  trailing?: ReactNode;
  size?: "large" | "compact";
}) {
  return (
    <header
      className={`ios-app-header ${
        size === "compact" ? "ios-app-header--compact" : ""
      }`}
    >
      <div className="ios-app-header__bar">
        {onBack ? (
          <button
            type="button"
            className="ios-back-button"
            onClick={onBack}
            aria-label={`Back to ${backLabel}`}
          >
            <SystemIcon name="chevron-left" size={18} />
            <span>{backLabel}</span>
          </button>
        ) : (
          <span className="ios-app-header__spacer" />
        )}
        {trailing ? (
          <span className="ios-app-header__trailing">{trailing}</span>
        ) : null}
      </div>
      {eyebrow ? <span className="ios-eyebrow">{eyebrow}</span> : null}
      <h1>{title}</h1>
      {subtitle ? <p className="ios-app-header__subtitle">{subtitle}</p> : null}
    </header>
  );
}
