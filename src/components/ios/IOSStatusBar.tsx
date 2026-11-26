"use client";

import {
  useRef,
  type CSSProperties,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { formatMenuBarParts, useNow } from "@/lib/hooks";
import { useMediaPlayer } from "@/lib/media-player";

export function IOSStatusBar({
  tone = "light",
  onOpenControlCenter,
  onOpenNotificationCenter,
  onOpenNowPlaying,
}: {
  tone?: "light" | "dark";
  onOpenControlCenter?: () => void;
  onOpenNotificationCenter?: () => void;
  onOpenNowPlaying?: () => void;
}) {
  const now = useNow(10000);
  const { time } = formatMenuBarParts(now);
  const { currentTrack, isPlaying } = useMediaPlayer();
  const ccSwipe = useRef<number | null>(null);
  const ncSwipe = useRef<number | null>(null);

  const startSwipe =
    (target: MutableRefObject<number | null>) =>
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      target.current = event.clientY;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is an enhancement.
      }
    };

  const finishSwipe =
    (target: MutableRefObject<number | null>, action?: () => void) =>
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      const start = target.current;
      target.current = null;
      if (start === null) return;
      if (event.clientY - start > 14) action?.();
    };

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
      {onOpenNotificationCenter ? (
        <button
          type="button"
          className="ios-statusbar__time ios-statusbar__time-trigger"
          onClick={onOpenNotificationCenter}
          onPointerDown={startSwipe(ncSwipe)}
          onPointerUp={finishSwipe(ncSwipe, onOpenNotificationCenter)}
          onPointerCancel={() => {
            ncSwipe.current = null;
          }}
          aria-label="Open Notification Center"
          aria-haspopup="dialog"
        >
          {time || "9:41"}
        </button>
      ) : (
        <span className="ios-statusbar__time">{time || "9:41"}</span>
      )}
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
            onPointerDown={startSwipe(ccSwipe)}
            onPointerUp={finishSwipe(ccSwipe, onOpenControlCenter)}
            onPointerCancel={() => {
              ccSwipe.current = null;
            }}
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
