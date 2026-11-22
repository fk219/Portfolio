"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { formatMenuBarParts, useNow } from "@/lib/hooks";

export function IOSStatusBar({
  tone = "light",
  onOpenControlCenter,
}: {
  tone?: "light" | "dark";
  onOpenControlCenter?: () => void;
}) {
  const now = useNow(10000);
  const { time } = formatMenuBarParts(now);

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
      <span className="ios-island" aria-hidden="true">
        <span className="ios-island__camera" />
      </span>
      {onOpenControlCenter ? (
        <button
          type="button"
          className="ios-statusbar__right"
          aria-label="Open Control Center"
          onClick={onOpenControlCenter}
        >
          {right}
        </button>
      ) : (
        <span className="ios-statusbar__right">{right}</span>
      )}
    </div>
  );
}
