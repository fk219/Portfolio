"use client";

import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/icons/AppIcon";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { formatLongDate, useClickOutside, useEscape, useNow } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";

interface Tip {
  id: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  actionLabel: string;
  onAction: () => void;
}

function MiniCalendar({ date }: { date: Date }) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const start = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: 42 }, (_, index) => {
    const day = index - start + 1;
    if (day < 1 || day > daysInMonth) return null;
    return day;
  });
  const today = date.getDate();

  return (
    <div className="notification-calendar" aria-hidden="true">
      <div className="notification-calendar__header">
        <span>
          {new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)}
        </span>
        <span>{year}</span>
      </div>
      <div className="notification-calendar__weekdays">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <div className="notification-calendar__days">
        {cells.map((day, index) => (
          <span
            key={index}
            className={day === today ? "is-today" : undefined}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

export function NotificationCenter() {
  const {
    closeOverlay,
    openApp,
    focusEnabled,
    toggleFocus,
    openSettings,
    openOverlay,
    isCompact,
  } = useOS();
  const now = useNow(30000);
  const currentDate = now ?? new Date();
  const [dismissed, setDismissed] = useState<string[]>(() => {
    try {
      const stored = window.sessionStorage.getItem(
        "furqan-os-dismissed-notifications",
      );
      if (!stored) return [];
      const parsed = JSON.parse(stored) as unknown;
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === "string")
        : [];
    } catch {
      return [];
    }
  });
  const panelRef = useRef<HTMLElement>(null);

  useClickOutside([panelRef], true, closeOverlay, ".menu-bar");
  useEscape(true, closeOverlay);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(
        "furqan-os-dismissed-notifications",
        JSON.stringify(dismissed),
      );
    } catch {
      // The panel still works without storage.
    }
  }, [dismissed]);

  const tips: Tip[] = [
    {
      id: "welcome",
      title: "Find your way around",
      body: isCompact
        ? "Projects live in Finder. Open it from the Dock, or use Launchpad to reach every app."
        : "Projects live in Finder. Double-click a desktop item, or use the Dock at the bottom.",
      icon: <AppIcon app="finder" size={34} />,
      actionLabel: "Open Finder",
      onAction: () => openApp("finder", { section: "projects" }),
    },
    {
      id: "spotlight",
      title: isCompact ? "Search from the menu bar" : "Search the whole desktop",
      body: isCompact
        ? "Tap the search icon in the menu bar to jump to an app, project, or action."
        : "Press ⌘K or Ctrl+K from anywhere to open Spotlight and jump to an app, project, or action.",
      icon: (
        <span className="notification-tip__system-icon">
          <SystemIcon name="keyboard" size={20} />
        </span>
      ),
      actionLabel: "See shortcuts",
      onAction: () => {
        closeOverlay();
        window.setTimeout(() => openOverlay("help"), 30);
      },
    },
  ];

  const visibleTips = tips.filter((tip) => !dismissed.includes(tip.id));

  return (
    <aside
      ref={panelRef}
      className="notification-center"
      role="dialog"
      aria-label="Notification Center"
    >
      <header className="notification-center__header">
        <div>
          <span className="notification-center__eyebrow">Today</span>
          <h2>
            {isCompact
              ? new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }).format(currentDate)
              : formatLongDate(currentDate)}
          </h2>
        </div>
        <span className="notification-center__time">
          {new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }).format(currentDate)}
        </span>
        <button
          type="button"
          className="notification-center__close"
          aria-label="Close Notification Center"
          onClick={closeOverlay}
        >
          <SystemIcon name="close" size={13} />
        </button>
      </header>

      <div className="notification-widgets">
        <button
          type="button"
          className="notification-widget notification-widget--calendar"
          onClick={() => openApp("calendar")}
          aria-label="Open Calendar"
        >
          <MiniCalendar date={currentDate} />
        </button>

        <section className="notification-widget notification-widget--focus">
          <div className="notification-widget__top">
            <span className="notification-widget__eyebrow">Focus</span>
            <span
              className={`notification-focus-dot ${
                focusEnabled ? "is-on" : ""
              }`}
              aria-hidden="true"
            />
          </div>
          <SystemIcon
            name="focus"
            size={24}
            className="notification-widget__moon"
          />
          <p>{focusEnabled ? "Quiet mode is on" : "Quiet mode is off"}</p>
          <button
            type="button"
            className="notification-widget__action"
            onClick={toggleFocus}
          >
            {focusEnabled ? "Turn off" : "Turn on"}
          </button>
        </section>

        <section className="notification-widget notification-widget--link">
          <div className="notification-widget__top">
            <span className="notification-widget__eyebrow">Make it yours</span>
            <SystemIcon name="display" size={18} />
          </div>
          <p>Change the wallpaper, appearance, and Dock size.</p>
          <button
            type="button"
            className="notification-widget__action"
            onClick={() => openSettings("wallpaper")}
          >
            Open System Settings
          </button>
        </section>
      </div>

      <div className="notification-center__section-heading">
        <h3>Notifications</h3>
        {visibleTips.length > 0 && (
          <button
            type="button"
            className="notification-center__clear"
            onClick={() => setDismissed(tips.map((tip) => tip.id))}
          >
            Clear
          </button>
        )}
      </div>

      <div className="notification-list">
        {visibleTips.length > 0 ? (
          visibleTips.map((tip) => (
            <article className="notification-tip" key={tip.id}>
              <span className="notification-tip__icon">{tip.icon}</span>
              <div className="notification-tip__content">
                <h4>{tip.title}</h4>
                <p>{tip.body}</p>
                <button
                  type="button"
                  className="notification-tip__action"
                  onClick={tip.onAction}
                >
                  {tip.actionLabel}
                </button>
              </div>
              <button
                type="button"
                className="notification-tip__dismiss"
                aria-label={`Dismiss ${tip.title}`}
                onClick={() =>
                  setDismissed((current) => [...current, tip.id])
                }
              >
                <SystemIcon name="close" size={10} />
              </button>
            </article>
          ))
        ) : (
          <div className="notification-empty" role="status">
            <SystemIcon name="check" size={18} />
            <p>You are all caught up.</p>
          </div>
        )}
      </div>
    </aside>
  );
}
