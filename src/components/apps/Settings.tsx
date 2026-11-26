"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AppIcon } from "@/components/icons/AppIcon";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { profile } from "@/data/profile";
import { wallpaperOptions } from "@/data/wallpapers";
import { useOS } from "@/lib/os-context";
import type { ThemeMode } from "@/lib/types";

type SettingsPane =
  | "appearance"
  | "wallpaper"
  | "dock"
  | "experience"
  | "about";

const panes: Array<{
  id: SettingsPane;
  label: string;
  icon: "sun" | "display" | "grid" | "iphone" | "info";
}> = [
  { id: "appearance", label: "Appearance", icon: "sun" },
  { id: "wallpaper", label: "Wallpaper", icon: "display" },
  { id: "dock", label: "Dock", icon: "grid" },
  { id: "experience", label: "Experience", icon: "iphone" },
  { id: "about", label: "About", icon: "info" },
];

function toPane(section?: string): SettingsPane {
  if (
    section === "appearance" ||
    section === "wallpaper" ||
    section === "dock" ||
    section === "experience" ||
    section === "about"
  ) {
    return section;
  }
  return "appearance";
}

const appearanceOptions: Array<{
  id: ThemeMode;
  label: string;
  description: string;
}> = [
  { id: "light", label: "Light", description: "Always light" },
  { id: "dark", label: "Dark", description: "Always dark" },
  { id: "auto", label: "Auto", description: "Match the system" },
];

export function Settings({ section }: { section?: string }) {
  const {
    settings,
    updateSettings,
    resetSettings,
    resolvedTheme,
    openOverlay,
    isCompact,
  } = useOS();
  const [pane, setPane] = useState<SettingsPane>(() => toPane(section));
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    setPane(toPane(section));
  }, [section]);

  const handleReset = () => {
    resetSettings();
    setConfirmReset(false);
    setResetMessage("Settings have been reset to their defaults.");
    window.setTimeout(() => setResetMessage(""), 3000);
  };

  return (
    <div className={`settings ${isCompact ? "is-compact" : ""}`}>
      <aside className="settings__sidebar" aria-label="System Settings categories">
        <div className="settings__account">
          <span className="settings__account-avatar" aria-hidden="true">
            {profile.initials}
          </span>
          <div>
            <strong>{profile.name}</strong>
            <span>PortfolioOS</span>
          </div>
        </div>
        <nav className="settings__nav" aria-label="Settings panes">
          {panes.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`settings__nav-item ${
                pane === item.id ? "is-selected" : ""
              }`}
              onClick={() => setPane(item.id)}
              aria-current={pane === item.id ? "page" : undefined}
            >
              <span className="settings__nav-icon">
                <SystemIcon name={item.icon} size={14} />
              </span>
              <span>{item.label}</span>
              <SystemIcon name="chevron-right" size={10} />
            </button>
          ))}
        </nav>
        <p className="settings__sidebar-note">
          These settings apply to this browser and are saved locally.
        </p>
      </aside>

      <div className="settings__content">
        {pane === "appearance" && (
          <section className="settings__pane" aria-labelledby="appearance-heading">
            <header className="settings__pane-header">
              <h2 id="appearance-heading">Appearance</h2>
              <p>Choose how PortfolioOS looks. Both appearances work across every app.</p>
            </header>

            <div className="settings__card">
              <h3>Theme</h3>
              <div
                className="settings__appearance-options"
                role="group"
                aria-label="Appearance theme"
              >
                {appearanceOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`settings__appearance ${
                      settings.appearance === option.id ? "is-selected" : ""
                    }`}
                    aria-pressed={settings.appearance === option.id}
                    onClick={() =>
                      updateSettings({
                        appearance: option.id,
                      })
                    }
                  >
                    <span
                      className={`settings__appearance-preview settings__appearance-preview--${option.id}`}
                      aria-hidden="true"
                    >
                      <span className="settings__mini-menu" />
                      <span className="settings__mini-window">
                        <span />
                        <span />
                      </span>
                      <span className="settings__mini-dock" />
                    </span>
                    <span className="settings__appearance-copy">
                      <strong>{option.label}</strong>
                      <span>{option.description}</span>
                    </span>
                    {settings.appearance === option.id && (
                      <span className="settings__selected-check">
                        <SystemIcon name="check" size={10} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="settings__current-theme">
                <SystemIcon
                  name={resolvedTheme === "dark" ? "moon" : "sun"}
                  size={14}
                />
                <span>
                  Currently showing the {resolvedTheme} appearance.
                </span>
              </div>
            </div>

            <div className="settings__card">
              <div className="settings__row">
                <div>
                  <h3>Increase contrast</h3>
                  <p>
                    A browser preference. Use your operating system or browser
                    accessibility settings to enforce stronger contrast.
                  </p>
                </div>
                <span className="settings__browser-note">Browser setting</span>
              </div>
            </div>
          </section>
        )}

        {pane === "wallpaper" && (
          <section className="settings__pane" aria-labelledby="wallpaper-heading">
            <header className="settings__pane-header">
              <h2 id="wallpaper-heading">Wallpaper</h2>
              <p>
                Four original desktop scenes. Each one keeps menu bar text
                readable in both appearances.
              </p>
            </header>
            <div className="settings__wallpaper-grid">
              {wallpaperOptions.map((wallpaper) => (
                <button
                  key={wallpaper.id}
                  type="button"
                  className={`settings__wallpaper ${
                    settings.wallpaper === wallpaper.id ? "is-selected" : ""
                  }`}
                  aria-pressed={settings.wallpaper === wallpaper.id}
                  onClick={() =>
                    updateSettings({ wallpaper: wallpaper.id })
                  }
                >
                  <span
                    className="settings__wallpaper-preview"
                    data-wallpaper={wallpaper.id}
                    aria-hidden="true"
                  >
                    <span className="settings__wallpaper-sun" />
                    <span className="settings__wallpaper-ridge settings__wallpaper-ridge--back" />
                    <span className="settings__wallpaper-ridge settings__wallpaper-ridge--front" />
                  </span>
                  <span className="settings__wallpaper-copy">
                    <strong>{wallpaper.name}</strong>
                    <span>{wallpaper.description}</span>
                  </span>
                  {settings.wallpaper === wallpaper.id && (
                    <span className="settings__selected-check">
                      <SystemIcon name="check" size={10} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {pane === "dock" && (
          <section className="settings__pane" aria-labelledby="dock-heading">
            <header className="settings__pane-header">
              <h2 id="dock-heading">Dock</h2>
              <p>Adjust the size and hover behavior of the Dock.</p>
            </header>

            <div className="settings__card">
              <div className="settings__dock-preview" aria-hidden="true">
                <span className="settings__dock-preview-surface">
                  <AppIcon app="finder" size={Math.min(44, settings.dockSize * 0.78)} />
                  <AppIcon app="safari" size={Math.min(44, settings.dockSize * 0.78)} />
                  <AppIcon app="notes" size={Math.min(44, settings.dockSize * 0.78)} />
                  <AppIcon app="terminal" size={Math.min(44, settings.dockSize * 0.78)} />
                </span>
              </div>
              <label className="settings__slider-row">
                <span>
                  <strong>Size</strong>
                  <span>Icon size in the Dock</span>
                </span>
                <input
                  type="range"
                  min="40"
                  max="64"
                  step="1"
                  value={settings.dockSize}
                  onChange={(event) =>
                    updateSettings({ dockSize: Number(event.target.value) })
                  }
                  aria-label="Dock icon size"
                  style={
                    {
                      "--range-progress": `${
                        ((settings.dockSize - 40) / 24) * 100
                      }%`,
                    } as CSSProperties
                  }
                />
                <span className="settings__slider-value">
                  {settings.dockSize}px
                </span>
              </label>

              <div className="settings__switch-row">
                <div>
                  <strong>Magnification</strong>
                  <p>Grow icons as the pointer moves across the Dock.</p>
                </div>
                <label className="settings__switch">
                  <input
                    type="checkbox"
                    checked={settings.dockMagnification}
                    onChange={(event) =>
                      updateSettings({
                        dockMagnification: event.target.checked,
                      })
                    }
                  />
                  <span aria-hidden="true" />
                  <span className="sr-only">Enable Dock magnification</span>
                </label>
              </div>
            </div>

            <div className="settings__card">
              <div className="settings__row">
                <div>
                  <h3>Brightness</h3>
                  <p>
                    Dim the PortfolioOS display. This also appears in Control
                    Center.
                  </p>
                </div>
                <div className="settings__brightness-control">
                  <SystemIcon name="sun" size={13} />
                  <input
                    type="range"
                    min="60"
                    max="100"
                    step="1"
                    value={settings.brightness}
                    onChange={(event) =>
                      updateSettings({
                        brightness: Number(event.target.value),
                      })
                    }
                    aria-label="Display brightness"
                    style={
                      {
                        "--range-progress": `${
                          ((settings.brightness - 60) / 40) * 100
                        }%`,
                      } as CSSProperties
                    }
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {pane === "experience" && (
          <section
            className="settings__pane"
            aria-labelledby="experience-heading"
          >
            <header className="settings__pane-header">
              <h2 id="experience-heading">Experience</h2>
              <p>
                Move between the full macOS desktop and the iPhone version of
                the portfolio. Content, appearance, and wallpaper stay in sync.
              </p>
            </header>

            <div className="settings__card">
              <h3>Operating system</h3>
              <div
                className="settings__experience-options"
                role="group"
                aria-label="Portfolio experience"
              >
                <button
                  type="button"
                  className="settings__experience-option is-selected"
                  aria-pressed="true"
                >
                  <span className="settings__experience-icon">
                    <SystemIcon name="mac" size={19} />
                  </span>
                  <span>
                    <strong>macOS</strong>
                    <small>Desktop, windows, Dock, and menus</small>
                  </span>
                  <span className="settings__selected-check">
                    <SystemIcon name="check" size={10} />
                  </span>
                </button>
                <button
                  type="button"
                  className="settings__experience-option"
                  onClick={() => updateSettings({ experience: "ios" })}
                >
                  <span className="settings__experience-icon settings__experience-icon--iphone">
                    <SystemIcon name="iphone" size={19} />
                  </span>
                  <span>
                    <strong>iPhone</strong>
                    <small>Home screen, apps, and Control Center</small>
                  </span>
                  <SystemIcon name="arrow-right" size={12} />
                </button>
              </div>
            </div>

            <div className="settings__card">
              <div className="settings__row">
                <div>
                  <h3>Seamless handoff</h3>
                  <p>
                    Both experiences use the same projects, profile, resume,
                    wallpapers, and appearance settings. Switch at any time
                    without losing your place.
                  </p>
                </div>
                <span className="settings__browser-note">Synced</span>
              </div>
            </div>
          </section>
        )}

        {pane === "about" && (
          <section className="settings__pane" aria-labelledby="about-settings-heading">
            <header className="settings__pane-header">
              <h2 id="about-settings-heading">About PortfolioOS</h2>
              <p>A small operating system built as a portfolio.</p>
            </header>

            <div className="settings__about-hero">
              <span className="settings__about-mark" aria-hidden="true">
                <SystemIcon name="apple" size={32} />
              </span>
              <div>
                <h3>PortfolioOS 1.0</h3>
                <p>
                  An interactive desktop for the work of Furqan Khan. Every
                  menu, window, app, toggle, and shortcut is part of the
                  portfolio.
                </p>
              </div>
            </div>

            <div className="settings__card">
              <dl className="settings__about-list">
                <div>
                  <dt>Owner</dt>
                  <dd>{profile.name}</dd>
                </div>
                <div>
                  <dt>Education</dt>
                  <dd>{profile.education}</dd>
                </div>
                <div>
                  <dt>Built with</dt>
                  <dd>Next.js 16, React 19, TypeScript, and CSS</dd>
                </div>
                <div>
                  <dt>Audio</dt>
                  <dd>Generated locally with the Web Audio API</dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="settings__card">
              <div className="settings__row">
                <div>
                  <h3>Help and keyboard shortcuts</h3>
                  <p>
                    Learn every route through the desktop, with or without a
                    mouse.
                  </p>
                </div>
                <button
                  type="button"
                  className="os-secondary-button"
                  onClick={() => openOverlay("help")}
                >
                  Open help
                </button>
              </div>
            </div>

            <div className="settings__card settings__reset-card">
              <div className="settings__row">
                <div>
                  <h3>Reset settings</h3>
                  <p>Restore the default wallpaper, appearance, Dock, and brightness.</p>
                </div>
                {!confirmReset ? (
                  <button
                    type="button"
                    className="os-secondary-button"
                    onClick={() => setConfirmReset(true)}
                  >
                    Reset…
                  </button>
                ) : (
                  <div className="settings__reset-confirm">
                    <button
                      type="button"
                      className="os-secondary-button"
                      onClick={() => setConfirmReset(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="os-primary-button"
                      onClick={handleReset}
                    >
                      Reset settings
                    </button>
                  </div>
                )}
              </div>
              <p className="settings__reset-status" aria-live="polite">
                {resetMessage}
              </p>
            </div>

            <p className="settings__disclaimer">
              This is an independent portfolio project and is not affiliated
              with Apple Inc. macOS is a trademark of Apple Inc.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
