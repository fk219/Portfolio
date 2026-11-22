"use client";

import { useRef } from "react";
import { wallpaperOptions } from "@/data/wallpapers";
import { useClickOutside, useEscape } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import { SystemIcon } from "@/components/icons/SystemIcon";

export function ControlCenter() {
  const {
    closeOverlay,
    openSettings,
    lockScreen,
    settings,
    updateSettings,
    wifiEnabled,
    bluetoothEnabled,
    focusEnabled,
    toggleWifi,
    toggleBluetooth,
    toggleFocus,
    resolvedTheme,
  } = useOS();
  const panelRef = useRef<HTMLDivElement>(null);

  useClickOutside([panelRef], true, closeOverlay, ".menu-bar");
  useEscape(true, closeOverlay);

  const wallpaper =
    wallpaperOptions.find((option) => option.id === settings.wallpaper) ??
    wallpaperOptions[0];

  return (
    <div
      ref={panelRef}
      className="control-center"
      role="dialog"
      aria-label="Control Center"
    >
      <div className="control-center__grid">
        <section className="cc-tile cc-tile--connectivity" aria-label="Connectivity">
          <div className="cc-connectivity-row">
            <button
              type="button"
              className={`cc-toggle ${wifiEnabled ? "is-on" : ""}`}
              aria-pressed={wifiEnabled}
              onClick={toggleWifi}
            >
              <span className="cc-toggle__icon">
                <SystemIcon name={wifiEnabled ? "wifi" : "wifi-off"} size={17} />
              </span>
              <span className="cc-toggle__copy">
                <span>Wi-Fi</span>
                <small>{wifiEnabled ? "On" : "Off"}</small>
              </span>
            </button>
            <button
              type="button"
              className={`cc-toggle ${bluetoothEnabled ? "is-on" : ""}`}
              aria-pressed={bluetoothEnabled}
              onClick={toggleBluetooth}
            >
              <span className="cc-toggle__icon">
                <SystemIcon name="bluetooth" size={17} />
              </span>
              <span className="cc-toggle__copy">
                <span>Bluetooth</span>
                <small>{bluetoothEnabled ? "On" : "Off"}</small>
              </span>
            </button>
          </div>
          <button
            type="button"
            className={`cc-focus ${focusEnabled ? "is-on" : ""}`}
            aria-pressed={focusEnabled}
            onClick={toggleFocus}
          >
            <span className="cc-focus__icon">
              <SystemIcon name="focus" size={18} />
            </span>
            <span className="cc-focus__copy">
              <span>Focus</span>
              <small>{focusEnabled ? "On" : "Off"}</small>
            </span>
          </button>
        </section>

        <button
          type="button"
          className="cc-tile cc-tile--appearance"
          onClick={() =>
            updateSettings({
              appearance:
                resolvedTheme === "dark" ? "light" : "dark",
            })
          }
          aria-label={`Switch to ${
            resolvedTheme === "dark" ? "light" : "dark"
          } appearance`}
        >
          <span className="cc-tile__eyebrow">Appearance</span>
          <span className="cc-appearance-preview" aria-hidden="true">
            <span className="cc-appearance-preview__window cc-appearance-preview__window--back" />
            <span className="cc-appearance-preview__window" />
          </span>
          <span className="cc-tile__label">
            {resolvedTheme === "dark" ? "Dark" : "Light"}
          </span>
        </button>

        <section className="cc-tile cc-tile--display" aria-label="Display brightness">
          <div className="cc-tile__heading">
            <span>Display</span>
            <span className="cc-tile__value">{settings.brightness}%</span>
          </div>
          <label className="cc-slider">
            <span className="sr-only">Display brightness</span>
            <SystemIcon name="sun" size={13} />
            <input
              type="range"
              min="60"
              max="100"
              step="1"
              value={settings.brightness}
              onChange={(event) =>
                updateSettings({ brightness: Number(event.target.value) })
              }
              style={
                {
                  "--range-progress": `${
                    ((settings.brightness - 60) / 40) * 100
                  }%`,
                } as React.CSSProperties
              }
            />
            <SystemIcon name="display" size={15} />
          </label>
        </section>

        <button
          type="button"
          className="cc-tile cc-tile--wallpaper"
          onClick={() => openSettings("wallpaper")}
          aria-label={`Wallpaper: ${wallpaper.name}. Open wallpaper settings.`}
        >
          <span
            className="cc-wallpaper__thumb"
            data-wallpaper={settings.wallpaper}
            aria-hidden="true"
          />
          <span className="cc-wallpaper__copy">
            <span className="cc-tile__eyebrow">Wallpaper</span>
            <span className="cc-tile__label">{wallpaper.name}</span>
          </span>
          <SystemIcon name="chevron-right" size={13} />
        </button>
      </div>

      <footer className="control-center__footer">
        <button
          type="button"
          className="cc-footer-button"
          onClick={() => openSettings()}
        >
          <SystemIcon name="gear" size={15} />
          System Settings…
        </button>
        <button
          type="button"
          className="cc-footer-button"
          onClick={lockScreen}
        >
          <SystemIcon name="lock" size={14} />
          Lock Screen
        </button>
      </footer>
    </div>
  );
}
