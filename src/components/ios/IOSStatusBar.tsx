"use client";

import type { CSSProperties } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { formatMenuBarParts, useNow } from "@/lib/hooks";
import { useMediaPlayer } from "@/lib/media-player";

export function IOSStatusBar({
  tone = "light",
  onOpenControlCenter,
  onOpenNowPlaying,
}: {
  tone?: "light" | "dark";
  onOpenControlCenter?: () => void;
  onOpenNowPlaying?: () => void;
}) {
  const now = useNow(10000);
  const { time } = formatMenuBarParts(now);
  const { currentTrack, isPlaying } = useMediaPlayer();

  const right = (
    <>
      <span className="ios-signal" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <SystemIcon name="wifi" size={15} aria-hidden="true" />
      <span className="ios-battery" aria-hidden="true">
        <SystemIcon name="battery" size={22} />
      </span>
    </>
  );

  return (
    <div className={`ios-statusbar ios-statusbar--${tone}`}>
      <span className="ios-statusbar__time">{time || "9:41"}</span>
      {isPlaying && onOpenNowPlaying ? (
        <button
          type="button"
          className="ios-island ios-island--playing"
          onClick={onOpenNowPlaying}
          aria-label={`Now playing ${currentTrack.title}. Open Music.`}
          style={
            {
              "--island-cover-from": currentTrack.cover.from,
              "--island-cover-to": currentTrack.cover.to,
            } as CSSProperties
          }
        >
          <span className="ios-island__cover" aria-hidden="true" />
          <span className="ios-island__bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      ) : isPlaying ? (
        <span
          className="ios-island ios-island--playing"
          aria-hidden="true"
          style={
            {
              "--island-cover-from": currentTrack.cover.from,
              "--island-cover-to": currentTrack.cover.to,
            } as CSSProperties
          }
        >
          <span className="ios-island__cover" aria-hidden="true" />
          <span className="ios-island__bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </span>
      ) : (
        <span className="ios-island" aria-hidden="true">
          <span className="ios-island__camera" />
        </span>
      )}
      <div className="ios-statusbar__right">
        {onOpenControlCenter ? (
          <button
            type="button"
            className="ios-statusbar__cc-trigger"
            aria-label="Open Control Center"
            onClick={onOpenControlCenter}
          >
            {right}
          </button>
        ) : (
          <span className="ios-statusbar__status-icons">{right}</span>
        )}
      </div>
    </div>
  );
}
