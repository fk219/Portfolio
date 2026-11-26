"use client";

import { useRef, type CSSProperties } from "react";
import { Wallpaper } from "@/components/os/Wallpaper";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { useEscape, useFocusTrap } from "@/lib/hooks";
import { useMediaPlayer } from "@/lib/media-player";
import { useOS } from "@/lib/os-context";
import type { IOSAppId } from "./ios-apps";

export function IOSControlCenter({
  onClose,
  onLock,
  onOpenApp,
  onOpenMusic,
  onSwitchToMac,
}: {
  onClose: () => void;
  onLock: () => void;
  onOpenApp: (app: IOSAppId) => void;
  onOpenMusic: () => void;
  onSwitchToMac: () => void;
}) {
  const {
    bluetoothEnabled,
    focusEnabled,
    resolvedTheme,
    settings,
    toggleBluetooth,
    toggleFocus,
    toggleWifi,
    updateSettings,
    wifiEnabled,
  } = useOS();
  const {
    currentTrack,
    isPlaying,
    toggle: toggleMusic,
    volume,
    setVolume,
  } = useMediaPlayer();
  const rootRef = useRef<HTMLDivElement>(null);
  useFocusTrap(rootRef, true);
  useEscape(true, onClose);

  return (
    <div
      className="ios-control-center"
      role="dialog"
      aria-modal="true"
      aria-label="Control Center"
    >
      <div className="ios-control-center__wallpaper" aria-hidden="true">
        <Wallpaper id={settings.wallpaper} />
        <span className="ios-control-center__wash" />
      </div>
      <button
        type="button"
        className="ios-control-center__backdrop"
        aria-label="Close Control Center"
        onClick={onClose}
      />
      <div className="ios-control-center__panel" ref={rootRef}>
        <div className="ios-control-center__topline">
          <span>Control Center</span>
          <button
            type="button"
            className="ios-control-center__close"
            onClick={onClose}
            aria-label="Close Control Center"
          >
            <SystemIcon name="close" size={13} />
          </button>
        </div>

        <div className="ios-cc-grid">
              <section className="ios-cc-tile ios-cc-tile--connectivity" aria-label="Connectivity">
                <div className="ios-cc-connectivity-row">
                  <div className="ios-cc-connectivity-buttons">
                    <button
                      type="button"
                      className={`ios-cc-toggle ${wifiEnabled ? "is-on" : ""}`}
                      onClick={toggleWifi}
                      aria-pressed={wifiEnabled}
                      aria-label={`Wi-Fi ${wifiEnabled ? "on" : "off"}`}
                    >
                      <SystemIcon name={wifiEnabled ? "wifi" : "wifi-off"} size={17} />
                    </button>
                    <button
                      type="button"
                      className={`ios-cc-toggle ${bluetoothEnabled ? "is-on" : ""}`}
                      onClick={toggleBluetooth}
                      aria-pressed={bluetoothEnabled}
                      aria-label={`Bluetooth ${bluetoothEnabled ? "on" : "off"}`}
                    >
                      <SystemIcon name="bluetooth" size={17} />
                    </button>
                    <button
                      type="button"
                      className={`ios-cc-toggle ${focusEnabled ? "is-on" : ""}`}
                      onClick={toggleFocus}
                      aria-pressed={focusEnabled}
                      aria-label={`Focus ${focusEnabled ? "on" : "off"}`}
                    >
                      <SystemIcon name="focus" size={16} />
                    </button>
                  </div>
                  <span className="ios-cc-connectivity-copy">
                    <strong>{wifiEnabled ? "Wi-Fi on" : "Wi-Fi off"}</strong>
                    <small>
                      {bluetoothEnabled ? "Bluetooth on" : "Bluetooth off"} ·{" "}
                      {focusEnabled ? "Focus on" : "Focus off"}
                    </small>
                  </span>
                </div>
                <span className="ios-cc-tile__label">Connectivity</span>
              </section>

          <div
            className="ios-cc-tile ios-cc-tile--media"
            style={
              {
                "--cc-cover-from": currentTrack.cover.from,
                "--cc-cover-to": currentTrack.cover.to,
              } as CSSProperties
            }
          >
            <button
              type="button"
              className="ios-cc-media-main"
              onClick={onOpenMusic}
              aria-label={`Open Music. ${currentTrack.title} by ${currentTrack.artist}.`}
            >
              <span className="ios-cc-media-cover" aria-hidden="true" />
              <span>
                <strong>{currentTrack.title}</strong>
                <small>{currentTrack.artist}</small>
              </span>
            </button>
            <button
              type="button"
              className="ios-cc-media-play"
              onClick={toggleMusic}
              aria-label={
                isPlaying
                  ? `Pause ${currentTrack.title}`
                  : `Play ${currentTrack.title}`
              }
            >
              <SystemIcon name={isPlaying ? "pause" : "play"} size={17} />
            </button>
          </div>

          <section className="ios-cc-tile ios-cc-tile--focus" aria-label="Focus">
            <span className="ios-cc-focus-icon">
              <SystemIcon name={focusEnabled ? "moon" : "sun"} size={18} />
            </span>
            <span>
              <strong>{focusEnabled ? "Focus" : "Do Not Disturb"}</strong>
              <small>{focusEnabled ? "On" : "Off"}</small>
            </span>
            <button
              type="button"
              className={`ios-cc-pill ${focusEnabled ? "is-on" : ""}`}
              onClick={toggleFocus}
              aria-pressed={focusEnabled}
            >
              {focusEnabled ? "On" : "Off"}
            </button>
          </section>

          <section className="ios-cc-tile ios-cc-tile--slider" aria-label="Brightness">
            <SystemIcon name="sun" size={16} />
            <input
              type="range"
              min="60"
              max="100"
              value={settings.brightness}
              aria-label="Brightness"
              onChange={(event) =>
                updateSettings({ brightness: Number(event.target.value) })
              }
            />
          </section>

          <section className="ios-cc-tile ios-cc-tile--slider" aria-label="Volume">
            <SystemIcon name="volume" size={16} />
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(volume * 100)}
              aria-label="Volume"
              onChange={(event) => setVolume(Number(event.target.value) / 100)}
            />
          </section>

          <button
            type="button"
            className="ios-cc-tile ios-cc-tile--appearance"
            onClick={() =>
              updateSettings({
                appearance: resolvedTheme === "dark" ? "light" : "dark",
              })
            }
          >
            <SystemIcon name={resolvedTheme === "dark" ? "sun" : "moon"} size={17} />
            <span>{resolvedTheme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>

          <button
            type="button"
            className="ios-cc-tile ios-cc-tile--mac"
            onClick={onSwitchToMac}
          >
            <SystemIcon name="mac" size={18} />
            <span>Mac desktop</span>
          </button>

          <div className="ios-cc-shortcuts" role="group" aria-label="Portfolio shortcuts">
            <span className="ios-cc-section-label">Portfolio</span>
            <div className="ios-cc-shortcuts__row">
              <button type="button" onClick={() => onOpenApp("projects")}>
                <SystemIcon name="folder" size={16} />
                <span>Projects</span>
              </button>
              <button type="button" onClick={() => onOpenApp("store")}>
                <SystemIcon name="bag" size={16} />
                <span>Store</span>
              </button>
              <button type="button" onClick={() => onOpenApp("arcade")}>
                <SystemIcon name="play" size={16} />
                <span>Arcade</span>
              </button>
              <button type="button" onClick={() => onOpenApp("devkit")}>
                <SystemIcon name="code" size={16} />
                <span>DevKit</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            className="ios-cc-tile ios-cc-tile--lock"
            onClick={onLock}
          >
            <SystemIcon name="lock" size={18} />
            <span>Lock iPhone</span>
          </button>
        </div>

        <p className="ios-control-center__footnote">
          {settings.experience === "ios" ? "iPhone experience" : "PortfolioOS"}
        </p>
        <button
          type="button"
          className="ios-control-center__handle"
          onClick={onClose}
          aria-label="Close Control Center"
        >
          <span aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
