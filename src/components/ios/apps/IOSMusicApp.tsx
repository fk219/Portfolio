"use client";

import type { CSSProperties } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import {
  formatTrackTime,
  useMediaPlayer,
} from "@/lib/media-player";

const equalizer = [22, 44, 30, 62, 38, 54, 28, 68, 36, 48, 26, 58];

export function IOSMusicApp() {
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
      className="ios-app-view ios-music"
      style={
        {
          "--music-cover-from": currentTrack.cover.from,
          "--music-cover-to": currentTrack.cover.to,
          "--music-cover-ink": currentTrack.cover.ink,
        } as CSSProperties
      }
    >
      <div className="ios-app-view__scroll">
        <header className="ios-music__header">
          <div>
            <span className="ios-eyebrow">Original audio</span>
            <h1>Listen Now</h1>
          </div>
          <span className="ios-music__badge">
            <span aria-hidden="true" />
            32s loops
          </span>
        </header>

        <section className="ios-music__now">
          <div className={`ios-music__art ${isPlaying ? "is-playing" : ""}`}>
            <span className="ios-music__ring" aria-hidden="true" />
            <span className="ios-music__art-mark">FK</span>
            <span className="ios-music__equalizer" aria-hidden="true">
              {equalizer.map((height, index) => (
                <i
                  key={index}
                  style={
                    {
                      "--bar-height": `${height}%`,
                      "--bar-delay": `${index * 0.06}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
          </div>

          <div className="ios-music__meta">
            <span>{currentTrack.album}</span>
            <h2>{currentTrack.title}</h2>
            <p>{currentTrack.artist}</p>
          </div>

          <div className="ios-music__progress">
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
            <div>
              <span>{formatTrackTime(currentTime)}</span>
              <span>-{formatTrackTime(Math.max(0, duration - currentTime))}</span>
            </div>
          </div>

          <div className="ios-music__controls">
            <button type="button" onClick={previous} aria-label="Previous track">
              <SystemIcon name="skip-back" size={22} />
            </button>
            <button
              type="button"
              className="ios-music__play"
              onClick={toggle}
              aria-label={
                isPlaying
                  ? `Pause ${currentTrack.title}`
                  : `Play ${currentTrack.title}`
              }
            >
              <SystemIcon name={isPlaying ? "pause" : "play"} size={25} />
            </button>
            <button type="button" onClick={next} aria-label="Next track">
              <SystemIcon name="skip-forward" size={22} />
            </button>
          </div>

          <div className="ios-music__volume">
            <SystemIcon
              name={volume === 0 ? "volume-off" : "volume"}
              size={14}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(volume * 100)}
              onChange={(event) =>
                setVolume(Number(event.target.value) / 100)
              }
              aria-label="Volume"
              style={
                {
                  "--range-progress": `${volume * 100}%`,
                } as CSSProperties
              }
            />
            <SystemIcon name="volume" size={17} />
          </div>
        </section>

        <section className="ios-music__queue">
          <div className="ios-music__queue-heading">
            <h2>Up Next</h2>
            <span>{tracks.length} tracks</span>
          </div>
          {tracks.map((track, index) => {
            const isActive = currentIndex === index;
            return (
              <button
                key={track.id}
                type="button"
                className={`ios-music__track ${isActive ? "is-active" : ""}`}
                onClick={() => {
                  if (isActive) {
                    toggle();
                  } else {
                    playTrack(index);
                  }
                }}
                aria-pressed={isActive}
              >
                <span
                  className="ios-music__track-art"
                  style={
                    {
                      "--track-from": track.cover.from,
                      "--track-to": track.cover.to,
                    } as CSSProperties
                  }
                  aria-hidden="true"
                />
                <span className="ios-music__track-copy">
                  <strong>{track.title}</strong>
                  <small>{track.album}</small>
                </span>
                <span className="ios-music__track-time">
                  {isActive && isPlaying ? (
                    <span className="ios-music__tiny-bars" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    formatTrackTime(track.duration)
                  )}
                </span>
              </button>
            );
          })}
        </section>
      </div>
    </div>
  );
}
