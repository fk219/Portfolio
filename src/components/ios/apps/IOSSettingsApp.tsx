"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { projects } from "@/data/projects";
import { wallpaperOptions } from "@/data/wallpapers";
import { useOS } from "@/lib/os-context";
import type { ThemeMode } from "@/lib/types";

const themes: Array<{ id: ThemeMode; label: string }> = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "auto", label: "Auto" },
];

export function IOSSettingsApp({
  onSwitchToMac,
  onLock,
  onOpenProfile,
}: {
  onSwitchToMac: () => void;
  onLock: () => void;
  onOpenProfile: () => void;
}) {
  const {
    settings,
    resolvedTheme,
    updateSettings,
    resetSettings,
  } = useOS();

  return (
    <div className="ios-app-view ios-settings">
      <div className="ios-app-view__scroll">
        <header className="ios-large-header">
          <span className="ios-eyebrow">PortfolioOS</span>
          <h1>Settings</h1>
        </header>

        <button
          type="button"
          className="ios-account-card"
          onClick={onOpenProfile}
          aria-label="Open Furqan Khan's profile"
        >
          <span className="ios-account-card__avatar">FK</span>
          <span>
            <strong>Furqan Khan</strong>
            <small>PortfolioOS · iPhone</small>
          </span>
          <SystemIcon name="chevron-right" size={14} />
        </button>

        <section className="ios-settings-group">
          <h2>Experience</h2>
          <button type="button" className="ios-settings-row" onClick={onSwitchToMac}>
            <span className="ios-settings-row__icon ios-settings-row__icon--mac">
              <SystemIcon name="mac" size={17} />
            </span>
            <span>
              <strong>Mac desktop</strong>
              <small>Open the full macOS portfolio</small>
            </span>
            <SystemIcon name="chevron-right" size={14} />
          </button>
          <div className="ios-settings-row">
            <span className="ios-settings-row__icon ios-settings-row__icon--iphone">
              <SystemIcon name="iphone" size={17} />
            </span>
            <span>
              <strong>iPhone</strong>
              <small>You are here</small>
            </span>
            <span className="ios-checkmark">
              <SystemIcon name="check" size={14} />
            </span>
          </div>
        </section>

        <section className="ios-settings-group">
          <h2>Appearance</h2>
          <div className="ios-theme-options">
            {themes.map((theme) => (
              <button
                key={theme.id}
                type="button"
                className={`ios-theme-card ${
                  settings.appearance === theme.id ? "is-active" : ""
                }`}
                onClick={() => updateSettings({ appearance: theme.id })}
                aria-pressed={settings.appearance === theme.id}
              >
                <span className={`ios-theme-card__preview is-${theme.id}`}>
                  <span />
                  <span />
                </span>
                <span>{theme.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="ios-settings-group">
          <h2>Wallpaper</h2>
          <div className="ios-wallpaper-grid">
            {wallpaperOptions.map((wallpaper) => (
              <button
                key={wallpaper.id}
                type="button"
                className={`ios-wallpaper-option is-${wallpaper.id} ${
                  settings.wallpaper === wallpaper.id ? "is-active" : ""
                }`}
                onClick={() => updateSettings({ wallpaper: wallpaper.id })}
                aria-label={`Use ${wallpaper.name} wallpaper`}
                aria-pressed={settings.wallpaper === wallpaper.id}
              >
                <span />
                <small>{wallpaper.name}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="ios-settings-group">
          <h2>Display &amp; brightness</h2>
          <div className="ios-settings-slider">
            <SystemIcon name="sun" size={16} />
            <input
              type="range"
              min="60"
              max="100"
              value={settings.brightness}
              onChange={(event) =>
                updateSettings({ brightness: Number(event.target.value) })
              }
              aria-label="Display brightness"
            />
          </div>
          <div className="ios-settings-row ios-settings-row--static">
            <span className="ios-settings-row__icon ios-settings-row__icon--muted">
              <SystemIcon name={resolvedTheme === "dark" ? "moon" : "sun"} size={16} />
            </span>
            <span>
              <strong>Current appearance</strong>
              <small>{resolvedTheme === "dark" ? "Dark" : "Light"}</small>
            </span>
          </div>
        </section>

        <section className="ios-settings-group">
          <h2>About</h2>
          <div className="ios-settings-row ios-settings-row--static">
            <span>
              <strong>PortfolioOS</strong>
              <small>Version 2.0 · iPhone experience</small>
            </span>
          </div>
          <div className="ios-settings-row ios-settings-row--static">
            <span>
              <strong>Built with</strong>
              <small>Next.js 16 · React 19 · TypeScript</small>
            </span>
          </div>
          <div className="ios-settings-row ios-settings-row--static">
            <span>
              <strong>Projects</strong>
              <small>
                {projects.length} projects ·{" "}
                {projects.filter((project) => project.featured).length} case
                studies ·{" "}
                {projects.filter((project) => !project.featured).length}{" "}
                experiments
              </small>
            </span>
          </div>
        </section>

        <section className="ios-settings-group">
          <h2>Session</h2>
          <button type="button" className="ios-settings-row" onClick={onLock}>
            <span className="ios-settings-row__icon ios-settings-row__icon--dark">
              <SystemIcon name="lock" size={16} />
            </span>
            <span>
              <strong>Lock iPhone</strong>
            </span>
            <SystemIcon name="chevron-right" size={14} />
          </button>
          <button
            type="button"
            className="ios-settings-row ios-settings-row--danger"
            onClick={resetSettings}
          >
            <span>
              <strong>Reset all settings</strong>
            </span>
          </button>
        </section>

        <p className="ios-settings__footer">
          PortfolioOS is an independent portfolio experience, not affiliated
          with Apple.
        </p>
      </div>
    </div>
  );
}
