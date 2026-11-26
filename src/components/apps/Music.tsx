"use client";

import type { CSSProperties } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import {
  formatTrackTime,
  useMediaPlayer,
} from "@/lib/media-player";

const visualizerHeights = [
  24, 58, 34, 82, 44, 66, 28, 90, 52, 38, 72, 45, 86, 30, 60, 40, 76, 50,
  32, 64, 46, 88, 36, 54,
];

export function Music() {
  const {
    tracks,
    currentTrack,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    playTrack,
    toggle,
    next,
    previous,
    seek,
    setVolume,
  } = useMediaPlayer();

  return (
    <div
      className="music"
      style={
        {
          "--music-accent": currentTrack.cover.from,
          "--music-glow": currentTrack.cover.to,
        } as CSSProperties
      }
    >
      <div className="music__topbar">
        <span>Listen Now</span>
        <span className="music__generated-label">
          <span aria-hidden="true" />
          Original audio
        </span>
      </div>

      <div className="music__now">
        <div
          className={`music__art ${isPlaying ? "is-playing" : ""}`}
          aria-hidden="true"
        >
          <div className="music__art-orb music__art-orb--one" />
          <div className="music__art-orb music__art-orb--two" />
          <div className="music__art-lines">
            {visualizerHeights.map((height, index) => (
              <span
                key={index}
                style={
                  {
                    "--bar-height": `${height}%`,
                    "--bar-delay": `${index * 0.07}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <span className="music__art-mark">FK</span>
        </div>

        <div className="music__meta">
          <span className="music__eyebrow">{currentTrack.album}</span>
          <h2>{currentTrack.title}</h2>
          <p>{currentTrack.description}</p>

          <div className="music__progress">
            <span>{formatTrackTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={Math.max(0.1, duration)}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => seek(Number(event.target.value))}
              aria-label={`Seek ${currentTrack.title}`}
              style={
                {
                  "--range-progress": `${
                    duration ? (currentTime / duration) * 100 : 0
                  }%`,
                } as CSSProperties
              }
            />
            <span>{formatTrackTime(duration)}</span>
          </div>

          <div className="music__control-row">
            <div className="music__transport">
              <button
                type="button"
                className="music__skip"
                aria-label="Previous track"
                onClick={previous}
              >
                <SystemIcon name="skip-back" size={16} />
              </button>
              <button
                type="button"
                className="music__play"
                onClick={toggle}
                aria-label={
                  isPlaying
                    ? `Pause ${currentTrack.title}`
                    : `Play ${currentTrack.title}`
                }
              >
                <SystemIcon
                  name={isPlaying ? "pause" : "play"}
                  size={20}
                />
              </button>
              <button
                type="button"
                className="music__skip"
                aria-label="Next track"
                onClick={next}
              >
                <SystemIcon name="skip-forward" size={16} />
              </button>
            </div>

            <label className="music__volume">
              <SystemIcon
                name={volume === 0 ? "volume-off" : "volume"}
                size={14}
              />
              <span className="sr-only">Volume</span>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(volume * 100)}
                onChange={(event) =>
                  setVolume(Number(event.target.value) / 100)
                }
                style={
                  {
                    "--range-progress": `${volume * 100}%`,
                  } as CSSProperties
                }
              />
            </label>
          </div>

          <p className="music__status" aria-live="polite">
            {isPlaying
              ? `Playing track ${currentIndex + 1} of ${tracks.length}. Audio is served from this portfolio.`
              : "Press play to begin. Headphones recommended."}
          </p>
        </div>
      </div>

      <div className="music__track-list" role="group" aria-label="Tracks">
        {tracks.map((track, index) => {
          const isActive = track.id === currentTrack.id;
          const isTrackPlaying = isActive && isPlaying;
          return (
            <div
              key={track.id}
              className={`music__track ${isActive ? "is-active" : ""}`}
            >
              <button
                type="button"
                className="music__track-select"
                onClick={() => {
                  if (isActive) {
                    toggle();
                  } else {
                    playTrack(index);
                  }
                }}
                aria-pressed={isActive}
              >
                <span className="music__track-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="music__track-copy">
                  <strong>{track.title}</strong>
                  <span>{track.album}</span>
                </span>
                <span className="music__track-duration">
                  {formatTrackTime(track.duration)}
                </span>
              </button>
              <button
                type="button"
                className="music__track-play"
                onClick={() => {
                  if (isActive) {
                    toggle();
                  } else {
                    playTrack(index);
                  }
                }}
                aria-label={
                  isTrackPlaying
                    ? `Pause ${track.title}`
                    : `Play ${track.title}`
                }
              >
                {isTrackPlaying ? (
                  <span className="music__mini-bars" aria-hidden="true">
                    {[0, 1, 2, 3].map((bar) => (
                      <span key={bar} />
                    ))}
                  </span>
                ) : (
                  <SystemIcon name="play" size={12} />
                )}
              </button>
            </div>
          );
        })}
      </div>

      <p className="music__footnote">
        Three original instrumental loops written for PortfolioOS. Audio plays
        locally from this site, with no accounts, ads, or external streams.
      </p>
    </div>
  );
}
